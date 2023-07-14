import { CloudWatchLogSender } from '@shared/infra/cloud-watch';
import { LogSender } from '@shared/interface/log-sender.interface';

const logLevels: LogLevel[] = ['error', 'warn', 'info', 'debug', 'verbose'];
const logSender: LogSender = CloudWatchLogSender.getInstance();

export function LogBehavior(
  methodNames?: string | string[],
  options?: { message?: string; context?: any; stack?: any; level?: LogLevel },
) {
  return function (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) {
    if (propertyKey && descriptor) {
      const originalMethod = descriptor.value;

      descriptor.value = function (...args: any[]) {
        logAction(this, propertyKey, args, options);
        return originalMethod.apply(this, args);
      };
    } else if (methodNames && Array.isArray(methodNames)) {
      methodNames.forEach((methodName) => {
        const originalMethod = target.prototype[methodName];

        target.prototype[methodName] = function (...args: any[]) {
          logAction(this, methodName, args, options);
          return originalMethod.apply(this, args);
        };
      });
    }
  };
}

function logAction(
  context: any,
  methodName: string,
  args: any[],
  options?: { message?: string; context?: any; stack?: any; level?: LogLevel },
) {
  const { message, context: logContext, level } = options || {};

  if (logLevels.indexOf(level || 'info') <= logLevels.indexOf('info')) {
    logSender?.sendLog(message || '', logContext || {});
  }

  // 테스트 수행을 위한 console.log
  process.env.NODE_ENV === 'test' &&
    ['error', 'log', 'warn', 'debug', 'verbose'].includes(methodName) &&
    console.log(message, logContext, args);
}

type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'verbose';
