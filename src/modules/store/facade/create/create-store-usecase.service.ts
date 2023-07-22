import { Injectable } from '@nestjs/common';

import { CreateStoreContext } from './strategy/create-store-strategy';
import { CreateStoreInput, StoreDomain } from '../../domain/domain/store.domain';
import { StoreDomainService } from '../../domain/service/store.domain.service';

@Injectable()
export class CreateStoreUsecase {
  constructor(private domainService: StoreDomainService, private readonly createStoreStrategy: CreateStoreContext) {}

  //TODO: user type
  async execute(user: { id: number; role: 'manager' }, input: CreateStoreInput) {
    const store = StoreDomain.of(input);
    await this.domainService.existStore(store, input.address);
    return this.createStoreStrategy.create(user.role, store);
  }
}
