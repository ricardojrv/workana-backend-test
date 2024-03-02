export type LoggerFunction = (message: string, metadata?: any) => void;

export interface Logger {
  debug: LoggerFunction;
  info: LoggerFunction;
  warn: LoggerFunction;
  error: LoggerFunction;
}

import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
    tokenExp?: number;
    token?: string;
    time?: string
  }
}

export interface JwtInput {
  userId: string;
}