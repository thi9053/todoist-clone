import { z } from 'zod'

export const introspectSchema = z.object({
  token: z.string()
})
