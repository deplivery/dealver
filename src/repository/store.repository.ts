import { Injectable } from '@nestjs/common';
import { Store } from '../entities/store.entity';
import { StoreConfirm } from '../entities/storeConfirm.entity';

@Injectable()
export class StoreRepository {
  async findById(id: number) {
    return new Store();
  }

  async findByAddress(address: string): Promise<Store | undefined> {
    return new Store();
  }
  async save(store: Store): Promise<Store> {
    return store;
  }

  async saveConfirm(store: StoreConfirm) {
    return store;
  }
}
