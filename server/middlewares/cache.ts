import { createMiddleware } from "hono/factory";

// prettier-ignore
export const cache = (seconds: number) => createMiddleware(async (c, next) => {
  await next();

  if (!c.res.ok) return;

  c.res.headers.set("cache-control", `public, max-age=${seconds}`);
});
