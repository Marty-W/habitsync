import { Suspense } from "react"
import Link from "next/link"

import { auth } from "@habitsync/auth"

import { SignIn, SignOut } from "~/components/auth"

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
        <div className="min-h-screen">
          <h1 className="text-5xl font-bold">HabitSync</h1>
          <p>Use todoist for tracking your habits.</p>
          <p>I get it. You love todoist. You also want to track your habits.</p>
          <AuthShowcase />
          <Suspense fallback={<span>Loading...</span>}>
            <span>test</span>
          </Suspense>
        </div>
      </div>
    </main>
  )
}

export async function AuthShowcase() {
  const session = await auth()

  if (!session) {
    return (
      <SignIn
        provider="google"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      >
        Sign in with Google
      </SignIn>
    )
  }

  return (
    <>
      <Link className="btn" href="/habits">
        Go to dashboard
      </Link>

      <SignOut className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
        Sign out
      </SignOut>
    </>
  )
}
