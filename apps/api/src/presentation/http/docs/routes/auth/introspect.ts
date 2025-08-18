import { createRoute } from '@hono/zod-openapi'
import { IntrospectRequestBody, IntrospectResponse } from '../../types/auth/introspect'

export const introspectRoute = createRoute({
  method: 'post',
  path: '/auth/introspect',
  tags: ['Auth'],
  summary: 'Introspect JWT token',
  description: 'Validate JWT token by checking signature, expiration, and user existence',
  request: {
    body: {
      content: {
        'application/json': { schema: IntrospectRequestBody }
      }
    }
  },
  responses: {
    200: {
      description: 'Token introspection result',
      content: {
        'application/json': { schema: IntrospectResponse }
      }
    }
  }
})
