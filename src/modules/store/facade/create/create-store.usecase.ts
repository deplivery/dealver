import { Injectable } from '@nestjs/common';

import { CreateStoreContext } from './strategy/create-store-strategy';
import { CreateStoreData, StoreDomain } from '../../domain/domain/store.domain';
import { StoreDomainService } from '../../domain/service/store.domain.service';

@Injectable()
export class CreateStoreUseCase {
  constructor(private domainService: StoreDomainService, private readonly createStoreStrategy: CreateStoreContext) {}

  //TODO: user type
  async execute(user: { id: number; role: 'manager' }, input: CreateStoreData) {
    const store = StoreDomain.of(input);
    await this.domainService.validateStore(store, input.address);
    return this.createStoreStrategy.create(user.role, store);
  }
}
