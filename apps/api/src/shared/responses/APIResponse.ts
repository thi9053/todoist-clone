import { Context } from 'hono'
import { SuccessResponse } from '../types/response/SuccessResponse'
import { ErrorResponse } from '../types/response/ErrorResponse'
import { AppError, BadRequestError, NotFoundError, UnauthorizedError, ForbiddenError } from '@/domain/error'

export class APIResponse<T> {
  constructor(
    public readonly success: boolean,
    public readonly data: T,
    public readonly message: string,
    public readonly statusCode: number,
    public readonly error: AppError
  ) {}

  static success<T>(c: Context, data: T, message: string, statusCode: number = 200) {
    const response: SuccessResponse<T> = {
      success: true,
      data,
      message,
      statusCode
    }
    return c.json(response, statusCode as any)
  }

  static created<T>(c: Context, data: T, message: string, statusCode: number = 201) {
    return this.success(c, data, message, statusCode)
  }

  static updated<T>(c: Context, data: T, message: string, statusCode: number = 200) {
    return this.success(c, data, message, statusCode)
  }

  static deleted<T>(c: Context, data: T, message: string, statusCode: number = 200) {
    return this.success(c, data, message, statusCode)
  }

  static noContent<T>(c: Context, data: T, message: string, statusCode: number = 204) {
    return this.success(c, data, message, statusCode)
  }

  static error(c: Context, message: string, statusCode: number, error: AppError | string) {
    let appError: AppError

    if (typeof error === 'string') {
      appError = new AppError(error, statusCode || 500, true)
    } else {
      appError = error
    }
    const response: ErrorResponse = {
      success: false,
      message,
      statusCode,
      error: {
        name: appError.name,
        isOperational: appError.isOperational
      }
    }
    return c.json(response, statusCode as any)
  }

  static notFound(c: Context, message: string, statusCode: number = 404) {
    return this.error(c, message, statusCode, new NotFoundError(message))
  }

  static badRequest(c: Context, message: string, statusCode: number = 400) {
    return this.error(c, message, statusCode, new BadRequestError(message))
  }

  static unauthorized(c: Context, message: string, statusCode: number = 401) {
    return this.error(c, message, statusCode, new UnauthorizedError(message))
  }

  static forbidden(c: Context, message: string, statusCode: number = 403) {
    return this.error(c, message, statusCode, new ForbiddenError(message))
  }
}
