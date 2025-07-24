import 'reflect-metadata'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import router from './presentation/http/routes'
import DatabaseConnection from '@/infrastructure/database/mongodb/connection'

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

DatabaseConnection.getInstance()

app.use('/', router)

export default app
