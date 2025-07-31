import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { createFooRoute } from './routes/foo'

const docs = new OpenAPIHono()

docs.openapi(createFooRoute, (c) => {
  const body = c.req.valid('json')
  return c.json({ id: '688b21fa722e0dc291679910', name: body.name })
})

docs.doc('/openapi.json', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Todoist Clone API',
    description: 'API documentation for the Todoist Clone application'
  }
})

docs.get('/', swaggerUI({ url: '/docs/openapi.json' }))

export default docs
