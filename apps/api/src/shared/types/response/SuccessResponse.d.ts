import { BaseResponse } from './BaseResponse'

export interface SuccessResponse<T> extends BaseResponse {
  success: true
  data: T
}
