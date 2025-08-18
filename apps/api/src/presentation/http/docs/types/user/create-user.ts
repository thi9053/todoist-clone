import { CreateUserRequestDTO } from '@/applications/dtos/user/create/request.dto'
import { CreateUserResponseDTO } from '@/applications/dtos/user/create/response.dto'
import { z } from '@hono/zod-openapi'

export const UserRequestBody = z.object({
  email: z
    .email({
      message: 'Invalid email'
    })
    .openapi({
      example: 'test@test.com'
    }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).openapi({
    example: '12345678'
  })
}) satisfies z.ZodType<CreateUserRequestDTO>

export const UserResponse = z.object({
  id: z.string().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000'
  }),
  email: z.string().email().openapi({
    example: 'test@test.com'
  })
}) satisfies z.ZodType<CreateUserResponseDTO>
