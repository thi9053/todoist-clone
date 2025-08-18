import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { createFooRoute } from './routes/foo'
import { config } from '../../../infrastructure/config'
import { createUserRoute } from './routes/user'
import { loginRoute, introspectRoute } from './routes/auth'

const { openapiDocument } = config

const docs = new OpenAPIHono()

docs.openapi(createFooRoute, (c) => {
  const body = c.req.valid('json')
  return c.json({ id: '688b21fa722e0dc291679910', name: body.name })
})

docs.openapi(createUserRoute, (c) => {
  const body = c.req.valid('json')
  return c.json({ id: '688b21fa722e0dc291679910', email: body.email })
})

docs.openapi(loginRoute, (c) => {
  const body = c.req.valid('json')
  return c.json({
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    user: { id: '688b21fa722e0dc291679910', email: body.email }
  })
})

docs.openapi(introspectRoute, (c) => {
  const body = c.req.valid('json')
  return c.json({ isValid: true })
})

docs.doc('/openapi.json', openapiDocument)

docs.get('/', swaggerUI({ url: '/docs/openapi.json' }))

export const openapi = docs.getOpenAPIDocument(openapiDocument)

export default docs
