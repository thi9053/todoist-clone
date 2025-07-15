import { Response } from 'express'
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

  static success<T>(res: Response, data: T, message: string, statusCode: number = 200): Response<SuccessResponse<T>> {
    const response: SuccessResponse<T> = {
      success: true,
      data,
      message,
      statusCode
    }
    return res.status(statusCode).json(response)
  }

  static created<T>(res: Response, data: T, message: string, statusCode: number = 201): Response<SuccessResponse<T>> {
    return this.success(res, data, message, statusCode)
  }

  static updated<T>(res: Response, data: T, message: string, statusCode: number = 200): Response<SuccessResponse<T>> {
    return this.success(res, data, message, statusCode)
  }

  static deleted<T>(res: Response, data: T, message: string, statusCode: number = 200): Response<SuccessResponse<T>> {
    return this.success(res, data, message, statusCode)
  }

  static noContent<T>(res: Response, data: T, message: string, statusCode: number = 204): Response<SuccessResponse<T>> {
    return this.success(res, data, message, statusCode)
  }

  static error(res: Response, message: string, statusCode: number, error: AppError | string): Response<ErrorResponse> {
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
    return res.status(statusCode).json(response)
  }

  static notFound(res: Response, message: string, statusCode: number = 404): Response<ErrorResponse> {
    return this.error(res, message, statusCode, new NotFoundError(message))
  }

  static badRequest(res: Response, message: string, statusCode: number = 400): Response<ErrorResponse> {
    return this.error(res, message, statusCode, new BadRequestError(message))
  }

  static unauthorized(res: Response, message: string, statusCode: number = 401): Response<ErrorResponse> {
    return this.error(res, message, statusCode, new UnauthorizedError(message))
  }

  static forbidden(res: Response, message: string, statusCode: number = 403): Response<ErrorResponse> {
    return this.error(res, message, statusCode, new ForbiddenError(message))
  }
}
