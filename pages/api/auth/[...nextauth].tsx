import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import { getRefreshedTokenPair, loginOAthUser, loginOrRegisterUser } from "@/services/auth";
import { tokenExpiration } from "@/constants";


export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
            },
            async authorize(credentials, req) {
                const type = (credentials as any).type
                const data = await loginOrRegisterUser(type, credentials?.email, credentials?.password)
                if (data) {
                    return {
                        ...data,
                        accessTokenExpires: Date.now() + tokenExpiration * 1000,
                    }
                }
                return null
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    pages: {
        signIn: "/auth/login",
        signOut: "/",
    },
    callbacks: {
        async jwt({ token, user, account }) {
            // Initial sign in
            if (account && account.provider === "google") {
                const data = await loginOAthUser(account.id_token, account.provider)
                if (data) return { ...data }
                return null
            }
            if (user) return { ...user }
            // not sign in and still hasn't expired
            if (Date.now() < (token as any).accessTokenExpires) return token
            // access token expired
            return await getRefreshedTokenPair(token)
        },
        async session({ session, token }: { session: Session, token: any }) {
            session.user = token.use as any
            session.accessToken = token.accessToken
            session.error = token.error as any
            return session
        }
    }
})
