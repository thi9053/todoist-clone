import { createRoute } from '@hono/zod-openapi'
import { UserResponse } from '../../types/user/create-user'
import { UserRequestBody } from '../../types/user/create-user'

export const createUserRoute = createRoute({
  method: 'post',
  path: '/user',
  tags: ['User'],
  request: {
    body: {
      content: {
        'application/json': { schema: UserRequestBody }
      }
    }
  },
  responses: {
    200: {
      description: 'Create user',
      content: {
        'application/json': { schema: UserResponse }
      }
    }
  }
})
