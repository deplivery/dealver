import { Injectable } from '@nestjs/common';
import { CreateStoreInput } from './dto/create-store.input';
import { Store } from '../../domain/entity/store';
import { StoreDomainService } from '../../domain/service/store.domain.service';
import { CreateStoreContext } from './strategy/create-store-strategy';
import { InputError } from '../../../../shared/error/input.error';

@Injectable()
export class CreateStoreUseCase {
  constructor(private domainService: StoreDomainService, private readonly createStoreStrategy: CreateStoreContext) {}

  //TODO: user type
  async execute(user: { id: number; role: 'manager' }, input: CreateStoreInput) {
    const store = Store.of(user.id, input);
    await this.domainService.validateStore(store, input.address);
    return this.createStoreStrategy.create(user.role, store);
  }
}
