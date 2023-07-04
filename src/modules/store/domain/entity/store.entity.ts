import { InputError } from '../../../../shared/error/input.error';
import { CreateStoreInput } from '../../facade/store.service';

export class Store {
  name: string;
  address: string;
  startHour: number;
  endHour: number;
  isActivated: boolean;

  static of(input: CreateStoreInput): Store {
    if (input.startHour >= input.endHour) {
      throw new InputError('영업시간이 영업 마감시간보다 늦습니다.');
    }
    const store = new Store();
    store.name = input.name;
    store.address = input.address;
    store.startHour = input.startHour;
    store.endHour = input.endHour;
    store.isActivated = false;
    return store;
  }

  changeActivated(isActivated: boolean): void {
    this.isActivated = isActivated;
  }

  changeStoreInfo(input: Partial<CreateStoreInput>): void {
    if (input.startHour && input.endHour) {
      if (input.startHour >= input.endHour) {
        throw new InputError('영업시간이 영업 마감시간보다 늦습니다.');
      }
    } else if (input.startHour) {
      if (input.startHour >= this.endHour) {
        throw new InputError('영업시간이 영업 마감시간보다 늦습니다.');
      }
    } else if (input.endHour) {
      if (this.startHour >= input.endHour) {
        throw new InputError('영업시간이 영업 마감시간보다 늦습니다.');
      }
    }
    this.name = input.name || this.name;
    this.address = input.address || this.address;
    this.startHour = input.startHour || this.startHour;
    this.endHour = input.endHour || this.endHour;
  }
}
