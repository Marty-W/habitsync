import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { signIn, signOut, useSession } from "next-auth/react"

const Home: NextPage = () => {
  const session = useSession()
  const router = useRouter()

  //TODO show landing page/dashboard components based on auth state, right now hardcoding to authed
  // TODO check if this imperative usage of router for authed pages is ok
  const authed = session.status === "authenticated"

  return (
    <div>
      <Head>
        <title>HabitSync</title>
        <meta
          name="description"
          content="Enrich your todoist experience with habit tracking"
        />
        {/* TODO add favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="hero min-h-screen bg-slate-200">
          <div className="hero-content h-full w-full flex-col lg:flex-row-reverse">
            <div className="h-1/2">
              <h1 className="text-5xl font-bold">HabitSync</h1>
              <p>Use todoist for tracking your habits.</p>
              <button className="btn" onClick={() => signIn()}>
                Sign In
              </button>
              {authed && (
                <>
                  <button
                    className="btn"
                    onClick={() => router.push("/habits")}
                  >
                    Go to dashboard
                  </button>

                  <button className="btn" onClick={() => signOut()}>
                    Sign Out
                  </button>
                </>
              )}
            </div>
            {/* TODO replace with your own screenshot */}
            <div className="flex w-full justify-center">
              <img
                src="https://via.placeholder.com/300"
                alt="product screenshot"
              />
            </div>
          </div>
        </div>
        <div className="min-h-screen">
          <p>I get it. You love todoist. You also want to track your habits.</p>
        </div>
      </main>
    </div>
  )
}

export default Home
