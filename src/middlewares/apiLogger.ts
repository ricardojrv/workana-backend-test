import { NextFunction, Request, Response } from "express";
import logger from "../library/logger/logger";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms\n`;
    logger.info(log);
  });

  next();
};

export default loggerMiddleware;
