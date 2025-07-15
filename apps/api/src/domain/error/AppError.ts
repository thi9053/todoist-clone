export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean
  public readonly timestamp: Date

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message)

    this.name = this.constructor.name
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.timestamp = new Date()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }

  public toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp.toISOString(),
      stack: this.stack
    }
  }
}
