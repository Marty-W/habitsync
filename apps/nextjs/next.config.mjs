// Importing env files here to validate on build
import "./src/env.mjs"

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@habitsync/api",
    "@habitsync/auth",
    "@habitsync/db",
    "@habitsync/lib",
  ],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
}

export default config
