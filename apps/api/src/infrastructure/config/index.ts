import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  PORT: z.string().default('3000'),
  MONGODB_URL: z.string().regex(/^mongodb:\/\/.+$/)
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
  process.exit(1)
}

export const config = {
  port: parseInt(result.data.PORT),
  mongodbUrl: result.data.MONGODB_URL
}
