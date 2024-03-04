import { BaseError } from './baseError';
import logger from '../logger/logger';

const handleError = (err: Error): void => {
  logger.error(`Error message: ${err.message}`, err.stack);
};

const isTrustedError = (error: Error): boolean => {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
};

export default { handleError, isTrustedError };