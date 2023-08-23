import { AutoInjectable } from '@tiny-nestjs/auto-injectable';

import { UpdateStoreInput } from './dto/update-store.input';
import { StoreDomainService } from '../../domain/service/store.domain.service';
import { StoreRepository } from '../../infra/db/repository/store.repository';

@AutoInjectable()
export class UpdateStoreUsecase {
  constructor(private domainService: StoreDomainService, private readonly repository: StoreRepository) {}

  async execute(user: any, input: UpdateStoreInput) {
    const store = await this.repository.findById(input.storeId);
    await this.domainService.existStore(store, input.address);

    const changedStore = store.changeStoreInfo(input);
    return this.repository.saveStore(changedStore);
  }
}
