import NextAuth from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        error?: "RefreshAccessTokenError";
        accessToken: string;
        refreshToken: string;
        accessTokenExpires: string;
    }

    export interface JWT {
        error?: "RefreshAccessTokenError";
        accessToken: string;
        accessTokenExpires: number;
    }
}