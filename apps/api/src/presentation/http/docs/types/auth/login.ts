import { z } from 'zod'
import { UserResponse } from '../user/create-user'

export const LoginRequestBody = z.object({
  email: z.email(),
  password: z.string().min(8)
})

export const LoginResponse = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: UserResponse
})
