import { createRoute } from '@hono/zod-openapi'
import { FooResponse } from '../../types/foo/foo-response'
import { FooRequestBody } from '../../types/foo/foo-request'

export const createFooRoute = createRoute({
  method: 'post',
  path: '/foo',
  tags: ['Foo'],
  request: {
    body: {
      content: {
        'application/json': { schema: FooRequestBody }
      }
    }
  },
  responses: {
    200: {
      description: 'Create foo',
      content: {
        'application/json': { schema: FooResponse }
      }
    }
  }
})
