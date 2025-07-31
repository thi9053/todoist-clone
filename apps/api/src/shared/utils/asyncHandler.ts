import { Context, Next } from 'hono'

export const asyncHandler = (fn: (c: Context, next: Next) => Promise<any>) => async (c: Context, next: Next) => {
  try {
    return await fn(c, next)
  } catch (error) {
    throw error
  }
}
