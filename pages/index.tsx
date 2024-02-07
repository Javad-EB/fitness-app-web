import OneRepMaxCalculator from "@/components/Forms/OneRepMaxCalculator";
import Page from "@/components/Page";
import { getMe } from "@/services/user";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";


export default function Home() {
  const { status, data } = useSession()

  return (
    <Page
      title="Fitness - Home"
      content="A Fitness Application"
    >
      <OneRepMaxCalculator />
      <div className="flex">
        <button className="btn btn-accent mr-5" onClick={() => getMe(data?.accessToken)}>
          Get Me
        </button>
        <div>
          {status === "authenticated" ? (
            <button
              className="btn btn-secondary"
              onClick={() => signOut({ redirect: false })}
            >
              Sign Out
            </button>
          ) : (
            <div>
              <Link href={"/auth/login"} className="btn mx-3 btn-secondary">
                Sign In
              </Link>
              <Link href={"/auth/register"} className="btn mx-3 btn-secondary">
                Sing Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </Page>
  )
}