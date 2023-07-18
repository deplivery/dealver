import { Injectable } from '@nestjs/common';

import { StoreManagerStrategy } from './store-manager.strategy';
import { StoreDomain } from '../../../domain/domain/store.domain';
import { StoreRepository } from '../../../infra/db/repository/store.repository';

export interface CreateStoreStrategy {
  create(store: StoreDomain): Promise<StoreDomain>;
}

@Injectable()
export class CreateStoreContext {
  //TODO: Map을 사용하지 않고, Record를 사용하는 이유는?
  private strategies: Record<string, CreateStoreStrategy> = {};

  constructor(private readonly storeManagerStrategy: StoreManagerStrategy) {
    this.use('manager', this.storeManagerStrategy);
  }

  use(key: 'manager', strategy: CreateStoreStrategy) {
    this.strategies[key] = strategy;
  }

  async create(mode: 'manager', store: StoreDomain) {
    return this.strategies[mode].create(store);
  }
}
