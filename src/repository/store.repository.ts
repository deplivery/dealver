import { Injectable } from '@nestjs/common';
import { Store } from '../entities/store.entity';

@Injectable()
export class StoreRepository {
  async findByAddress(address: string): Promise<Store | undefined> {
    return new Store();
  }
}
