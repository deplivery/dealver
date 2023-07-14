import { createMock, DeepMocked, MockOptions, PartialFuncReturn } from '@golevelup/ts-jest';
import { Abstract, Type } from '@nestjs/common';

export interface MockedValueProvider<T> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  provide: string | symbol | Type<T> | Abstract<T> | Function;
  useValue: DeepMocked<T>;
}

export function mockProvider<T extends object>(
  type: Type<T> | Abstract<T>,
  partial?: PartialFuncReturn<T>,
  options?: MockOptions,
): MockedValueProvider<T> {
  return { provide: type, useValue: createMock<T>(partial, options) };
}
