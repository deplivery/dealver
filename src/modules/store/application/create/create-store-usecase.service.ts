import { AutoInjectable } from '@tiny-nestjs/auto-injectable';

import { CreateStoreContext } from './strategy/create-store-strategy';
import { CreateStoreInput, StoreDomain } from '../../domain/domain/store.domain';
import { StoreDomainService } from '../../domain/service/store.domain.service';

@AutoInjectable()
export class CreateStoreUsecase {
  constructor(private domainService: StoreDomainService, private readonly createStoreStrategy: CreateStoreContext) {}

  async execute(user: { id: number; role: 'manager' }, input: CreateStoreInput) {
    const store = StoreDomain.of({ ...input, storeManagerId: user.id });
    await this.domainService.existStore(store, input.address);
    return this.createStoreStrategy.create(user.role, store);
  }
}
