import type { Context, Next } from 'hono'

export const loggerMiddleware = async (c: Context, next: Next) => {
  const start = Date.now()

  console.log(`--> ${c.req.method} ${c.req.path}`)

  await next()

  const duration = Date.now() - start
  console.log(`<-- ${c.req.method} ${c.req.path} ${c.res.status} (${duration}ms)`)
}
