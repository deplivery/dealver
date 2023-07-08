import { logger } from './logger.service';

function LogBehavior(options?: { message?: string; context?: any; stack?: any }) {
  return function (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) {
    if (propertyKey && descriptor) {
      const originalMethod = descriptor.value;

      descriptor.value = function (...args: any[]) {
        logWithLogger(this, propertyKey, args, options);
        return originalMethod.apply(this, args);
      };
    } else {
      const methodNames: string[] = target;

      methodNames.forEach((methodName) => {
        const originalMethod = target.prototype[methodName];

        target.prototype[methodName] = function (...args: any[]) {
          logWithLogger(this, methodName, args, options);
          return originalMethod.apply(this, args);
        };
      });
    }
  };
}

function logWithLogger(
  context: any,
  methodName: string,
  args: any[],
  options?: { message?: string; context?: any; stack?: any },
) {
  const messageData = options?.message;
  const contextData = options?.context || {};

  switch (methodName) {
    case 'error':
      logger.error(messageData, contextData, ...args);
      break;
    case 'log':
      logger.log(messageData, contextData);
      break;
    case 'warn':
      logger.warn(messageData, contextData);
      break;
    case 'debug':
      logger.debug(messageData, contextData);
      break;
    case 'verbose':
      logger.verbose(messageData, contextData);
      break;
    default:
      break;
  }
}
