import { loggerConfig } from '@/config/logger.config';

import { LogBehavior } from './log-behavior.decorator';

class LoggerService {
  private static instance: LoggerService;
  private readonly logger;

  private constructor() {
    this.logger = loggerConfig;
  }

  static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }

  @LogBehavior()
  error(message: string, context?: any, stack?: any) {
    this.logger.error({ message, context, stack });
  }

  @LogBehavior()
  log(message: string, context?: any) {
    this.logger.info({ message, context });
  }

  @LogBehavior()
  warn(message: string, context?: any) {
    this.logger.warn({ message, context });
  }

  debug(message: string, context?: any) {
    this.logger.debug({ message, context });
  }

  verbose(message: string, context?: any) {
    this.logger.trace({ message, context });
  }
}

export const logger = LoggerService.getInstance();
