import { createRoute } from '@hono/zod-openapi'
import { LoginRequestBody, LoginResponse } from '../../types/auth/login'

export const loginRoute = createRoute({
  method: 'post',
  path: '/auth/login',
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': { schema: LoginRequestBody }
      }
    }
  },
  responses: {
    200: {
      description: 'Login',
      content: {
        'application/json': { schema: LoginResponse }
      }
    }
  }
})
