import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AutoInjectable } from '@tiny-nestjs/auto-injectable';

import { StoreRepository } from '../../infra/db/repository/store.repository';
import { FindStoreQuery } from '../query/find-store.query';

@QueryHandler(FindStoreQuery)
@AutoInjectable()
export class FindStoreHandler implements IQueryHandler<FindStoreQuery> {
  constructor(private readonly repository: StoreRepository) {}

  async execute(query: FindStoreQuery): Promise<any> {
    const store = await this.repository.findById(query.storeId);
    return store.props;
  }
}
