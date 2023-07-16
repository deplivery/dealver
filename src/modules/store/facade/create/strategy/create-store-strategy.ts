import { Injectable } from '@nestjs/common';

import { StoreManagerStrategy } from './store-manager.strategy';
import { Store } from '../../../domain/entity/store';
import { StoreRepository } from '../../../infra/db/repository/store.repository';

export interface CreateStoreStrategy {
  create(store: Store): Promise<Store>;
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

  async create(mode: 'manager', store: Store) {
    return this.strategies[mode].create(store);
  }
}
