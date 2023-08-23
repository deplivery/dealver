import { AutoInjectable } from '@tiny-nestjs/auto-injectable';

import { StoreRepository } from '../../infra/db/repository/store.repository';

@AutoInjectable()
export class GetStoreUsecase {
  constructor(private readonly repository: StoreRepository) {}

  async getOne(id: number) {
    return this.repository.findById(id);
  }
}
