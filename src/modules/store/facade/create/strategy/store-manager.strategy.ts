import { AutoInjectable } from '@tiny-nestjs/auto-injectable';

import { CreateStoreStrategy } from './create-store-strategy';
import { StoreDomain } from '../../../domain/domain/store.domain';
import { StoreConfirmValue } from '../../../domain/value/store-confirm';
import { StoreState } from '../../../infra/db/entity/store-confirm.entity';
import { StoreRepository } from '../../../infra/db/repository/store.repository';

@AutoInjectable()
export class StoreManagerStrategy implements CreateStoreStrategy {
  constructor(private readonly repository: StoreRepository) {}

  async create(store: StoreDomain) {
    const newStore = await this.repository.saveStore(store);
    const confirm = new StoreConfirmValue({
      state: StoreState.Ready,
      reason: '',
      storeId: newStore.getId(),
    });
    await this.repository.saveConfirm(confirm);
    return newStore;
  }
}
