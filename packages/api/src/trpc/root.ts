import { accRouter } from "./router/acc";
import { authRouter } from "./router/auth";
import { habitRouter } from "./router/habit";
import { statsRouter } from "./router/stats";
import { streakRouter } from "./router/streak";
import { syncRouter } from "./router/sync";
import { timestampRouter } from "./router/timestamp";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  acc: accRouter,
  habit: habitRouter,
  timestamp: timestampRouter,
  streak: streakRouter,
  stats: statsRouter,
  sync: syncRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
