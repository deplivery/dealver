import { Injectable } from '@nestjs/common';

import { CreateStoreStrategy } from './create-store-strategy';
import { Store } from '../../../domain/entity/store';
import { StoreConfirm } from '../../../domain/value/store-confirm';
import { StoreState } from '../../../infra/db/entity/store-confirm.entity';
import { StoreRepository } from '../../../infra/db/repository/store.repository';

@Injectable()
export class StoreManagerStrategy implements CreateStoreStrategy {
  constructor(private readonly repository: StoreRepository) {}

  async create(store: Store) {
    const newStore = await this.repository.saveStore(store);
    const confirm = new StoreConfirm({
      state: StoreState.Ready,
      reason: '',
      storeId: newStore.getId(),
    });
    await this.repository.saveConfirm(confirm);
    return newStore;
  }
}
