import { z } from 'zod'

export const createFooSchema = z.object({
  name: z.string().min(2).max(50)
})
