import { FooRequestDTO } from '@/applications/dtos/foo/foo-request.dto'
import { z } from '@hono/zod-openapi'

export const FooRequestBody = z.object({
  name: z.string().min(2).max(50).openapi({
    example: 'Foo'
  })
}) satisfies z.ZodType<FooRequestDTO>
