import { Context, Next } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { APIResponse } from '@/shared/responses/APIResponse'
import { AppError, InternalServerError } from '@/domain/error'

export const errorHandler = (error: Error, c: Context) => {
  // Handle Hono's built-in HTTPException
  if (error instanceof HTTPException) {
    const status = error.status
    const message = error.message || 'HTTP Exception'

    return APIResponse.error(c, message, status, new AppError(message, status))
  }

  // Handle our custom AppError instances
  if (error instanceof AppError) {
    switch (error.constructor.name) {
      case 'BadRequestError':
        return APIResponse.badRequest(c, error.message)

      case 'UnauthorizedError':
        return APIResponse.unauthorized(c, error.message)

      case 'ForbiddenError':
        return APIResponse.forbidden(c, error.message)

      case 'NotFoundError':
        return APIResponse.notFound(c, error.message)

      case 'InternalServerError':
        return APIResponse.error(c, error.message, 500, error)

      default:
        // Generic AppError handling
        return APIResponse.error(c, error.message, error.statusCode, error)
    }
  }

  if (error.name === 'ValidationError') {
    return APIResponse.badRequest(c, `Validation failed: ${error.message}`)
  }

  if (error.name === 'MongoError' || error.name === 'MongooseError') {
    console.error('Database error:', error)
    return APIResponse.error(c, 'Database operation failed', 500, new InternalServerError('Database operation failed'))
  }

  if (error.name === 'MongoServerError' && (error as any).code === 11000) {
    return APIResponse.badRequest(c, 'Duplicate entry - resource already exists')
  }

  return APIResponse.error(c, error.message, 500, new InternalServerError(error.message))
}
