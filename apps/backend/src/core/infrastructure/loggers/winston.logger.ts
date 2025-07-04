// eslint-disable-next-line import/no-nodejs-modules
import { styleText } from 'node:util';

import { format as formatDate } from 'date-fns';
import { LoggerOptions, format, createLogger, transports } from 'winston';

import { AppLogger } from '../../domain/interfaces/logger.interface';

const { combine, printf, timestamp } = format;

// eslint-disable-next-line @typescript-eslint/no-shadow
const myFormat = printf(({ level, message, label, timestamp }) => {
    const levelEmojis: Record<string, string> = {
        info: '🟢',
        warn: '🟡',
        error: '🔴',
        debug: '🟠',
    };

    // Usamos el mismo color para el level, timestamp y label
    const coloredLevel = styleText('green', level.toUpperCase());
    const formattedTimestamp = typeof timestamp === 'string' || typeof timestamp === 'number' ? formatDate(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss') : 'Invalid timestamp';

    // Usamos el mismo color para el timestamp y el label
    const coloredTimestamp = styleText('green', formattedTimestamp);
    const coloredLabel = styleText('green', label as string);

    return `${levelEmojis[level] || '🔔'} [${coloredLevel}][${coloredTimestamp}][${coloredLabel}]: ${message}`;
});

const loggerOptions: LoggerOptions = {
    level: process.env.LOG_LEVEL || 'debug',
    format: combine(timestamp(), myFormat),
    transports: [new transports.Console()],
};

const winstonLogger = createLogger(loggerOptions);

export const appLogger: AppLogger = {
    info: (message: string, label: string) => winstonLogger.child({ label }).info(message),
    warn: (message: string, label: string) => winstonLogger.child({ label }).warn(message),
    error: (message: string, label: string) => winstonLogger.child({ label }).error(message),
    debug: (message: string, label: string) => winstonLogger.child({ label }).debug(message),
};
