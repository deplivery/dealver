import { CloudWatchLogSender } from '../infra/cloud-watch';
import { LogSender } from '../interface/log-sender.interface';

const logLevels: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose'];
const logSender: LogSender = CloudWatchLogSender.getInstance();

export function LogBehavior(
  methodNames?: LogLevel | LogLevel[],
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
  methodName: LogLevel,
  args: any[],
  options?: { message?: string; context?: any; stack?: any; level?: LogLevel },
) {
  const { message, context: logContext, level } = options || {};

  if (process.env.NODE_ENV === 'test') {
    ['error', 'log', 'warn', 'debug', 'verbose'].includes(methodName) && console.log(message, logContext, args);
    return;
  }

  if (logLevels.indexOf(level || 'log') <= logLevels.indexOf('log')) {
    logSender?.sendLog(message || '', logContext || {});
  }
}

type LogLevel = 'error' | 'log' | 'warn' | 'debug' | 'verbose';
