import { FooResponseDTO } from '@/applications/dtos/foo/foo-response.dto'
import { z } from '@hono/zod-openapi'

export const FooResponse = z
  .object({
    id: z.string().openapi({
      example: '688b21fa722e0dc291679910'
    }),
    name: z.string().openapi({
      example: 'Foo'
    })
  })
  .openapi('Foo') satisfies z.ZodType<FooResponseDTO>
