import { Injectable } from '@nestjs/common';
import pinoPretty from 'pino-pretty';
import pino from 'pino';

@Injectable()
class LoggerService {
  private static readonly logger: pino.Logger = pino(
    {
      level: 'info',
    },
    pinoPretty({
      colorize: true,
      translateTime: true,
      ignore: 'pid,hostname',
      messageFormat: '{msg}',
    }),
  );

  // TODO: 추후 로그 저장 (ex. ELK) 작업 필요
  static error(message: string, context?: any, stack?: any) {
    LoggerService.logger.error({ message, stack, context });
  }

  static log(message: string, context?: any) {
    LoggerService.logger.info({ message, context });
  }

  static warn(message: string, context?: any) {
    LoggerService.logger.warn({ message, context });
  }

  static debug(message: string, context?: any) {
    LoggerService.logger.debug({ message, context });
  }

  static verbose(message: string, context?: any) {
    LoggerService.logger.trace({ message, context });
  }
}

export const logger = LoggerService;
