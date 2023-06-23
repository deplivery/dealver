import { Injectable } from '@nestjs/common';
import { StoreRepository } from '../repository/store.repository';
import { PermissionError } from '../shared/error/permission.error';
import { InputError } from '../shared/error/input.error';

interface CreateStoreInput {
  name: string;
  address: string;
  startHour: number;
  endHour: number;
}

@Injectable()
export class StoreService {
  constructor(private readonly storeRepository: StoreRepository) {}

  createStore(user: { role: string }, input: CreateStoreInput): boolean {
    if (user.role !== 'admin' && user.role !== 'owner') {
      throw new PermissionError('권한이 없습니다.');
    }
    if (input.startHour >= input.endHour) {
      throw new InputError('영업시간이 영업 마감시간보다 늦습니다.');
    }
    const existStore = this.storeRepository.findByAddress(input.address);
    if (existStore) {
      throw new InputError('이미 존재하는 가게입니다.');
    }
    return true;
  }
}
