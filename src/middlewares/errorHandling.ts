import { Request, Response, NextFunction } from 'express';
import errorHandler  from '../library/error/errorHandler';
import { BaseError } from '../library/error/baseError';



// catch all unhandled errors
const errorHandling = (
  error: BaseError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isTrusted = errorHandler.isTrustedError(error);
  if(!isTrusted){
     next(error);
  }
  res.status(error.httpCode).json({
    error: error.message,
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