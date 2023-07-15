import { CloudWatchLogSender } from '../infra/cloud-watch';
import { LogSender } from '../interface/log-sender.interface';

const logSender: LogSender = CloudWatchLogSender.getInstance();

export function LogBehavior(): MethodDecorator {
  return function (target: any, propertyKey: LogLevel, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const message = args[0];
      const context = args[1];
      logAction(propertyKey, message, context);
      return originalMethod.apply(this, args);
    };
  };
}

function logAction(level: LogLevel, message: string, context: any) {
  if (process.env.NODE_ENV === 'test') {
    ['error', 'log', 'warn', 'debug', 'verbose'].includes(level) && console.log(message, context);
    return;
  }
  logSender?.sendLog(message || '', context || {});
}

type LogLevel = 'error' | 'log' | 'warn' | 'debug' | 'verbose';
