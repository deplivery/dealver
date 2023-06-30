import { Injectable } from '@nestjs/common';
import { StoreRepository } from '../repository/store.repository';
import { PermissionError } from '../shared/error/permission.error';
import { InputError } from '../shared/error/input.error';
import { Store } from '../entities/store.entity';
import { StoreConfirm } from '../entities/store-confirm.entity';

export interface CreateStoreInput {
  name: string;
  address: string;
  startHour: number;
  endHour: number;
}
type UpdateStoreInput = { storeId: number } & Partial<CreateStoreInput>;

@Injectable()
export class StoreService {
  constructor(private readonly storeRepository: StoreRepository) {}

  async createStore(user: { role: string; id: number }, input: CreateStoreInput): Promise<Store> {
    this.validationPermission(user);
    const existStore = await this.storeRepository.findByAddress(input.address);
    if (existStore) {
      throw new InputError('이미 존재하는 가게입니다.');
    }
    return this.buildStore(user, input);
  }

  async updateStore(user: { role: string; id: number }, input: UpdateStoreInput): Promise<Store> {
    this.validationPermission(user);
    const store = await this.storeRepository.findById(input.storeId);
    if (!store) {
      throw new InputError('존재하지 않는 가게입니다.');
    }
    if (store.address !== input.address) {
      const existStore = await this.storeRepository.findByAddress(input.address);
      if (existStore) {
        throw new InputError('이미 존재하는 가게입니다.');
      }
    }
    store.changeStoreInfo(input);
    return this.storeRepository.save(store);
  }

  async deleteStore(user: { role: string; id: number }, storeId: number): Promise<Store> {
    this.validationPermission(user);
    const store = await this.storeRepository.findById(storeId);
    if (!store) {
      throw new InputError('존재하지 않는 가게입니다.');
    }

    store.changeActivated(false);
    const storeConfirm = StoreConfirm.of('Delete', '', user.id);
    await this.storeRepository.saveConfirm(storeConfirm);
    return this.storeRepository.save(store);
  }

  private validationPermission(user: { role: string; id: number }): void {
    if (user.role !== 'admin' && user.role !== 'owner') {
      throw new PermissionError('권한이 없습니다.');
    }
  }

  //TODO:strategy pattern으로 나중에 분리
  private async buildStore(user: { role: string; id: number }, input: CreateStoreInput): Promise<Store> {
    const store = Store.of(input);
    if (user.role === 'admin') {
      store.isActivated = true;
      const storeConfirm = StoreConfirm.of('Confirm', '', user.id);
      await this.storeRepository.saveConfirm(storeConfirm);
    }
    if (user.role === 'owner') {
      const storeConfirm = StoreConfirm.of('Ready', '', user.id);
      await this.storeRepository.saveConfirm(storeConfirm);
    }
    return this.storeRepository.save(store);
  }
}
