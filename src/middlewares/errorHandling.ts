import { Request, Response } from 'express';
import errorHandler from '../library/error/errorHandler';
import { BaseError } from '../library/error/baseError';
import logger from '../library/logger/logger';

const errorHandling = (
  error: BaseError,
  req: Request,
  res: Response,
) => {
  const isTrusted = errorHandler.isTrustedError(error);
  if (!isTrusted) {
    logger.error(error.message);
  }
  errorHandler.handleError(error);
  res.status(error.httpCode).json({
    status: error.httpCode,
    error: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : {},
  });
};

process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    process.exit(1);
  }
});

export default errorHandling;