import { NextFunction, Request, Response } from 'express';
import logger from '../library/logger/logger';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.time = new Date(Date.now()).toString();
  const log = `${req.method} ${req.originalUrl} ${res.statusCode} ${req.time}ms\n`;
  logger.info(log);

  next();
};

export default loggerMiddleware;
