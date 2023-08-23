import { AutoInjectable } from '@tiny-nestjs/auto-injectable';

import { InputError } from '@shared/error/input.error';

import { DeleteStoreInput } from './dto/delete-store.input';
import { StoreRepository } from '../../infra/db/repository/store.repository';

@AutoInjectable()
export class DeleteStoreUsecase {
  constructor(private readonly repository: StoreRepository) {}

  async execute(user: any, input: DeleteStoreInput) {
    const store = await this.repository.findById(input.storeId);
    if (!store) {
      throw new InputError('존재하지 않는 가게입니다.');
    }
    if (store.props.storeManagerId !== user.id) {
      throw new InputError('가게를 삭제할 권한이 없습니다.');
    }
    const deletedStore = store.changeActivated(false);
    return this.repository.saveStore(deletedStore);
  }
}
