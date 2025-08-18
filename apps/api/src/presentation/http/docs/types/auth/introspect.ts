import { z } from 'zod'

export const IntrospectRequestBody = z.object({
  token: z.string().describe('JWT token to introspect')
})

export const IntrospectResponse = z.object({
  isValid: z.boolean().describe('Whether the token is valid or not')
})
