import { Injectable } from '@nestjs/common';
import { StoreRepository } from '../repository/store.repository';
import { PermissionError } from '../shared/error/permission.error';
import { InputError } from '../shared/error/input.error';
import { Store } from '../entities/store.entity';
import { StoreConfirm } from '../entities/storeConfirm.entity';

export interface CreateStoreInput {
  name: string;
  address: string;
  startHour: number;
  endHour: number;
}

@Injectable()
export class StoreService {
  constructor(private readonly storeRepository: StoreRepository) {}

  async createStore(user: { role: string; id: number }, input: CreateStoreInput): Promise<Store> {
    if (user.role !== 'admin' && user.role !== 'owner') {
      throw new PermissionError('권한이 없습니다.');
    }
    if (input.startHour >= input.endHour) {
      throw new InputError('영업시간이 영업 마감시간보다 늦습니다.');
    }
    const existStore = await this.storeRepository.findByAddress(input.address);
    if (existStore) {
      throw new InputError('이미 존재하는 가게입니다.');
    }
    const store = await this.buildStore(user, input);
    return this.storeRepository.save(store);
  }

  private async buildStore(user: { role: string; id: number }, input: CreateStoreInput): Promise<Store> {
    const store = Store.of(input);
    if (user.role !== 'admin') {
      store.isActivated = true;
      const storeConfirm = StoreConfirm.of('Confirm', '', user.id);
      await this.storeRepository.saveConfirm(storeConfirm);
    }
    if (user.role === 'owner') {
      const storeConfirm = StoreConfirm.of('Ready', '', user.id);
      await this.storeRepository.saveConfirm(storeConfirm);
    }
    return store;
  }
}
