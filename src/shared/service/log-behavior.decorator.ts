export function LogBehavior(
  methodNames?: string | string[],
  options?: { message?: string; context?: any; stack?: any },
) {
  return function (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) {
    if (propertyKey && descriptor) {
      const originalMethod = descriptor.value;

      descriptor.value = function (...args: any[]) {
        logWithLogger(this, propertyKey, args, options);
        return originalMethod.apply(this, args);
      };
    } else if (methodNames && Array.isArray(methodNames)) {
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
      process.env.NODE_ENV === 'test' && console.log(messageData, contextData, args);
      break;
    case 'log':
      process.env.NODE_ENV === 'test' && console.log(messageData, contextData, args);
      break;
    case 'warn':
      process.env.NODE_ENV === 'test' && console.log(messageData, contextData, args);
      break;
    case 'debug':
      process.env.NODE_ENV === 'test' && console.log(messageData, contextData, args);
      break;
    case 'verbose':
      process.env.NODE_ENV === 'test' && console.log(messageData, contextData, args);
      break;
  }
}
