import status from './status.js';

/**
 * ErrorBuilder class to build error responses
 */
export class AppError extends Error {
  constructor(
    message = status.phrases.INTERNAL_SERVER_ERROR,
    code = status.codes.INTERNAL_SERVER_ERROR,
    detail = '',
    errors = null,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.isAppError = true;
    this.response = {
      success: false,
      status: code,
      message: message,
      detail,
      errors,
    };
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UnauthorizedError extends AppError {
  constructor(detail = '') {
    super(status.phrases.UNAUTHORIZED, status.codes.UNAUTHORIZED, detail);
  }
}
export class BadRequestError extends AppError {
  constructor(detail = '', errors = null) {
    super(status.phrases.BAD_REQUEST, status.codes.BAD_REQUEST, detail, errors);
  }
}
export class NotFoundError extends AppError {
  constructor(detail = '') {
    super(status.phrases.NOT_FOUND, status.codes.NOT_FOUND, detail);
  }
}

export class InternalServerError extends AppError {
  constructor(detail = '') {
    super(status.phrases.INTERNAL_SERVER_ERROR, status.codes.INTERNAL_SERVER_ERROR, detail);
  }
}
