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
    userId?: string; // Assuming userId is a string
    tokenExp?: number; // Assuming tokenExp is a number (timestamp)
    token?: string; // The JWT token
  }
}

export interface JwtInput {
  userId: string;
}