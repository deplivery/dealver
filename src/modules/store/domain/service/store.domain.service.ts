import { AutoInjectable } from '@tiny-nestjs/auto-injectable';

import { InputError } from '@shared/error/input.error';

import { StoreRepository } from '../../infra/db/repository/store.repository';
import { StoreDomain } from '../domain/store.domain';

@AutoInjectable()
export class StoreDomainService {
  constructor(private readonly repository: StoreRepository) {}

  async existStore(store: StoreDomain, excludeAddress?: string): Promise<void> {
    const exist = await this.existAddress(store, excludeAddress);
    if (exist) {
      throw new InputError('이미 존재하는 가게입니다.');
    }
  }

  private async existAddress(store: StoreDomain, excludeAddress?: string): Promise<boolean> {
    const { address } = store.props;
    if (excludeAddress && excludeAddress === address) {
      return false;
    }
    const result = await this.repository.findByAddress(address);
    return !!result;
  }
}
