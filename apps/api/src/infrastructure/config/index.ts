import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  PORT: z.string().default('3000'),
  MONGODB_URL: z.string().regex(/^mongodb:\/\/.+$/),
  JWT_ACCESS_TOKEN_SECRET: z.string(),
  JWT_REFRESH_TOKEN_SECRET: z.string()
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
  process.exit(1)
}

export const config = {
  port: parseInt(result.data.PORT),
  mongodbUrl: result.data.MONGODB_URL,
  openapiDocument: {
    openapi: '3.0.1',
    info: {
      version: '1.0.0',
      title: 'Todoist Clone API',
      description: 'API documentation for the Todoist Clone application'
    }
  },
  jwtAccessTokenSecret: result.data.JWT_ACCESS_TOKEN_SECRET,
  jwtRefreshTokenSecret: result.data.JWT_REFRESH_TOKEN_SECRET
}
