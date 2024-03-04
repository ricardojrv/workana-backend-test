
import { BaseError } from './baseError';
export enum HttpStatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}


export class NotFoundError extends BaseError {
  constructor(description: string = 'Not found') {
    super('NOT_FOUND', HttpStatusCode.NOT_FOUND, true, description);
  }
}

export class BadRequestError extends BaseError {
  constructor(description: string = 'Bad request') {
    super('BAD_REQUEST', HttpStatusCode.BAD_REQUEST, true, description);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(description: string = 'Unauthorized') {
    super('UNAUTHORIZED', HttpStatusCode.UNAUTHORIZED, true, description);
  }
}

export class ForbiddenError extends BaseError {
  constructor(description: string = 'Forbidden') {
    super('FORBIDDEN', HttpStatusCode.FORBIDDEN, true, description);
  }
}
export class InternalServerError extends BaseError {
  constructor(description: string = 'Internal server error') {
    super('INTERNAL_SERVER', HttpStatusCode.INTERNAL_SERVER, true, description);
  }
}
