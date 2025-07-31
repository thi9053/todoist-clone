import { serve } from '@hono/node-server'
import app from './src/app'

const port = Number(process.env.PORT) || 3000

const server = serve({
  fetch: app.fetch,
  port
})

console.log(`Server is running on port ${port}`)

process.on('SIGINT', () => {
  console.log('Server closed')
  process.exit(0)
})
