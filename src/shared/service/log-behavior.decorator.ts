export function LogBehavior(
  methodNames?: string | string[],
  options?: { message?: string; context?: any; stack?: any },
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
  options?: { message?: string; context?: any; stack?: any },
) {
  const messageData = options?.message;
  const contextData = options?.context || {};

  // 테스트 수행을 위한 console.log
  process.env.NODE_ENV === 'test' &&
    ['error', 'log', 'warn', 'debug', 'verbose'].includes(methodName) &&
    console.log(messageData, contextData, args);

  // todo: 로그 저장 혹은 cloudWatch 로그 전송 등 로직
  switch (methodName) {
    case 'error':
      break;
    case 'log':
      break;
    case 'warn':
      break;
    case 'debug':
      break;
    case 'verbose':
      break;
  }
}
