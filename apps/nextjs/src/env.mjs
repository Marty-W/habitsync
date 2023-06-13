import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
    server: {
        NODE_ENV: z.enum(['development', 'test', 'production']),
        DATABASE_URL: z.string().url(),
        GOOGLE_CLIENT_ID: z.string(),
        GOOGLE_CLIENT_SECRET: z.string(),
        DOIST_CLIENT_ID: z.string(),
        DOIST_CLIENT_SECRET: z.string(),
        DOIST_VERIF_TOKEN: z.string(),
        DOIST_TEMP_API_TOKEN: z.string(),
        NEXTAUTH_URL: z.preprocess(
            // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
            // Since NextAuth.js automatically uses the VERCEL_URL if present.
            str => process.env.VERCEL_URL ?? str,
            // VERCEL_URL doesn't include `https` so it cant be validated as a URL
            process.env.VERCEL ? z.string() : z.string().url(),
        ),
        NEXTAUTH_SECRET:
            process.env.NODE_ENV === 'production'
                ? z.string().min(1)
                : z.string().min(1).optional(),
    },
    // client: {
    //     NEXT_PUBLIC_TEMP_API_TOKEN: process.env.NEXT_PUBLIC_TEMP_API_TOKEN,
    // },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        DATABASE_URL: process.env.DATABASE_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        DOIST_CLIENT_ID: process.env.DOIST_CLIENT_ID,
        DOIST_CLIENT_SECRET: process.env.DOIST_CLIENT_SECRET,
        DOIST_VERIF_TOKEN: process.env.DOIST_VERIF_TOKEN,
        DOIST_TEMP_API_TOKEN: process.env.DOIST_TEMP_API_TOKEN,
        // NEXT_PUBLIC_TEMP_API_TOKEN: process.env.NEXT_PUBLIC_TEMP_API_TOKEN,
    },
    skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
})
