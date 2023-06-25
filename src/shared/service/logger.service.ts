import { loggerConfig } from '../../config/logger.config';

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

  // TODO: 추후 로그 저장 (ex. ELK) 작업 필요
  error(message: string, context?: any, stack?: any) {
    this.logger.error({ message, stack, context });
  }

  log(message: string, context?: any) {
    this.logger.info({ message, context });
  }

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
