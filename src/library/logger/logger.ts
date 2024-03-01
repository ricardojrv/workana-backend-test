import winston from 'winston';
import { format } from 'winston';
import { Logger } from '../../types/types';

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red',
  },
};

const isDevEnvironment = (): boolean => process.env.NODE_ENV === 'development';

const formatter = format.combine(
  format.colorize(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.splat(),
  format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;

    return `${timestamp} [${level}]: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
    }`;
  }),
);


const logger = winston.createLogger({
  level: isDevEnvironment() ? 'trace' : 'error',
  levels: customLevels.levels,
  transports: [isDevEnvironment() ? new winston.transports.Console({ format: formatter }) : new winston.transports.File({ filename: 'logs/error.log', level: 'error' })],
});

winston.addColors(customLevels.colors);


const trace = (msg: string, meta?: any) => logger.log('trace', msg, meta);

const debug = (msg: string, meta?: any) => logger.debug(msg, meta);

const info = (msg: string, meta?: any) => logger.info(msg, meta);

const warn = (msg: string, meta?: any) => logger.warn(msg, meta);

const error = (msg: string, meta?: any) => logger.error(msg, meta);

const fatal = (msg: string, meta?: any) => logger.log('fatal', msg, meta);

export default { trace, debug, info, warn, error, fatal } as Logger;
