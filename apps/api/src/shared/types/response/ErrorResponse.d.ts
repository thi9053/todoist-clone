import { BaseResponse } from './BaseResponse'

export interface ErrorResponse extends BaseResponse {
  success: false
  error: {
    name: string
    isOperational?: boolean
  }
}
