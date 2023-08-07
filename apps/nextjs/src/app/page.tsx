import { Suspense } from "react"
import { auth } from "@habitsync/auth"

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-pink-400">T3</span> Turbo
        </h1>
        <AuthShowcase />

        {/* <CreatePostForm /> */}
        <Suspense fallback={<span>Loading...</span>}>
          <span>test</span>
          {/* <PostList /> */}
        </Suspense>
      </div>
    </main>
  )
}

export async function AuthShowcase() {
  const session = await auth()

  if (!session) {
    return <span>Sign in with Discord</span>
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {session && <span>Logged in as {session.user.name}</span>}
      </p>

      <span>Sign out</span>
    </div>
  )
}
