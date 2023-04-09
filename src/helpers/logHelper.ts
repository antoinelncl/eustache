import { config, createLogger, format, transports } from 'winston';

export const logHelper = createLogger({
  levels: config.npm.levels,
  level: 'silly',
  transports: [new transports.Console()],
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.splat(),
    format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`),
  ),
  exitOnError: false,
});
