import { AutoInjectable } from '@tiny-nestjs/auto-injectable';

import { StoreManagerStrategy } from './store-manager.strategy';
import { StoreDomain } from '../../../domain/domain/store.domain';

export interface CreateStoreStrategy {
  create(store: StoreDomain): Promise<StoreDomain>;
}

@AutoInjectable()
export class CreateStoreContext {
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
