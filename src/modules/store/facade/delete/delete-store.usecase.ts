import { Injectable } from '@nestjs/common';

import { DeleteStoreInput } from './dto/delete-store.input';
import { InputError } from '../../../../shared/error/input.error';
import { StoreRepository } from '../../infra/db/repository/store.repository';

@Injectable()
export class DeleteStoreUseCase {
  constructor(private readonly repository: StoreRepository) {}

  async execute(user: any, input: DeleteStoreInput) {
    const store = await this.repository.findById(input.storeId);
    if (!store) {
      throw new InputError('존재하지 않는 가게입니다.');
    }
    store.changeActivated(false);
    return this.repository.saveStore(store);
  }
}
