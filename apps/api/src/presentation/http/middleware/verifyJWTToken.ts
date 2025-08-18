import { Context, Next } from 'hono'
import jwt from 'jsonwebtoken'
import { config } from '@/infrastructure/config'
import { UnauthorizedError } from '@/domain/error'

export const verifyJWTToken = (c: Context, next: Next) => {
  try {
    const token = c.req.header('Authorization')?.split('Bearer ')[1]

    if (!token) {
      throw new UnauthorizedError('No token provided')
    }

    const decoded = jwt.verify(token, config.jwtAccessTokenSecret)
    c.set('user', decoded)
    next()
  } catch (error) {
    throw new UnauthorizedError('Invalid token')
  }
}
