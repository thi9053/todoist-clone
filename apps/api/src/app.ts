import 'reflect-metadata'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { compress } from 'hono/compress'
import router from './presentation/http/routes'
import DatabaseConnection from '@/infrastructure/database/mongodb/connection'

const app = new Hono()

app.use(logger())
app.use(secureHeaders())
app.use(compress())

DatabaseConnection.getInstance()

app.route('/', router)

export default app
