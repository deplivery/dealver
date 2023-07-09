import { Injectable } from '@nestjs/common';
import { StoreRepository } from '../../infra/db/repository/store.repository';
import { UpdateStoreInput } from './dto/update-store.input';
import { StoreDomainService } from '../../domain/service/store.domain.service';

@Injectable()
export class UpdateStoreUseCase {
  constructor(private domainService: StoreDomainService, private readonly repository: StoreRepository) {}

  async execute(user: any, input: UpdateStoreInput) {
    const store = await this.repository.findById(input.storeId);
    await this.domainService.validateStore(store, input.address);

    store.changeStoreInfo(input);
    return this.repository.saveStore(store);
  }
}
