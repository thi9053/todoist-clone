import { Context } from 'hono'
import { APIResponse } from '@/shared/responses/APIResponse'

export const notFoundHandler = (c: Context) => {
  const method = c.req.method
  const path = c.req.path

  console.warn(`404 Not Found: ${method} ${path}`)

  return APIResponse.notFound(c, `Route ${method} ${path} not found`)
}
