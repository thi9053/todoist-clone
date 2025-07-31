import 'reflect-metadata'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { compress } from 'hono/compress'
import router from '@/presentation/http/routes'
import DatabaseConnection from '@/infrastructure/database/mongodb/connection'
import docs from '@/presentation/http/docs'
import { errorHandler } from '@/presentation/http/middleware/errorHandler'
import { notFoundHandler } from '@/presentation/http/middleware/notFoundHandler'

const app = new Hono()

// Global middleware
app.use(logger())
app.use(secureHeaders())
app.use(compress())

app.use('*', async (c, next) => {
  const start = Date.now()
  await next()
  const time = Date.now() - start
  console.log(`${c.req.method} ${c.req.path} - ${c.res.status} - ${time}ms`)
})

// Connect to database
DatabaseConnection.getInstance()

// Routes
app.route('/', router)
app.route('/docs', docs)

// Error handlers (must be after routes)
app.onError(errorHandler) // Global error handler
app.notFound(notFoundHandler) // 404 handler

export default app
