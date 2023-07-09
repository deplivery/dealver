import { Injectable } from '@nestjs/common';
import { StoreRepository } from '../../infra/db/repository/store.repository';
import { Store } from '../entity/store';
import { InputError } from '../../../../shared/error/input.error';

@Injectable()
export class StoreDomainService {
  constructor(private readonly repository: StoreRepository) {}

  async validateStore(store: Store, excludeAddress?: string): Promise<void> {
    const exist = await this.existAddress(store, excludeAddress);
    if (exist) {
      throw new InputError('이미 존재하는 가게입니다.');
    }
  }

  private async existAddress(store: Store, excludeAddress?: string): Promise<boolean> {
    const { address } = store.props;
    if (excludeAddress && excludeAddress === address) {
      return false;
    }
    const result = await this.repository.findByAddress(address);
    return !!result;
  }
}
