import pino from 'pino';
import pinoPretty from 'pino-pretty';

const loggerOptions: pino.LoggerOptions = {
  level: 'info',
};

const prettyPrintOptions: pinoPretty.PrettyOptions = {
  colorize: true,
  translateTime: true,
  ignore: 'pid,hostname',
  messageFormat: '{msg}',
};

export const pinoLoggerConfig: pino.Logger = pino(loggerOptions, pinoPretty(prettyPrintOptions));
