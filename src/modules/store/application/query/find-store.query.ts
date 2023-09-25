import { IQuery } from '@nestjs/cqrs';

export class FindStoreQuery implements IQuery {
  constructor(public readonly storeId: number) {}
}
