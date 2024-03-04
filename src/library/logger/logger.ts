/* eslint-disable @typescript-eslint/no-explicit-any */
import winston, { format } from 'winston';
import { Logger } from '../../types/types';

const customLevels = {
  levels: {
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
  },
  colors: {
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
  },
};

const formatter = format.combine(
  format.colorize(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.splat(),
  format.printf((info) => {
    const { timestamp, level, message, meta } = info;

    return `${timestamp} [${level}]: ${message} ${meta ? JSON.stringify(meta) : ''}`;
  }),
);


const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: formatter,
});

winston.addColors(customLevels.colors);


const debug = (msg: string, meta?: any) => logger.debug(msg, meta);

const info = (msg: string, meta?: any) => logger.info(msg, meta);

const warn = (msg: string, meta?: any) => logger.warn(msg, meta);

const error = (msg: string, meta?: any) => logger.error(msg, meta);

export default { debug, info, warn, error } as Logger;
