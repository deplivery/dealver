import { Entity } from '@/shared/domain/entity';
import { InputError } from '../../../../shared/error/input.error';
import { CreateStoreData } from '../types/create-store.data';

interface StoreProps {
  name: string;
  address: string;
  startHour: number;
  endHour: number;
  isActivated: boolean;
  storeManagerId: number;
}

export class Store extends Entity<StoreProps> {
  static of(creatorId: number, input: CreateStoreData): Store {
    if (input.startHour >= input.endHour) {
      throw new InputError('영업시간이 영업 마감시간보다 늦습니다.');
    }
    return new Store({
      name: input.name,
      address: input.address,
      startHour: input.startHour,
      endHour: input.endHour,
      isActivated: false,
      storeManagerId: creatorId,
    });
  }

  changeActivated(isActivated: boolean): void {
    this.props.isActivated = isActivated;
  }

  changeStoreInfo(input: Partial<CreateStoreData>): void {
    if (input.startHour && input.endHour) {
      if (input.startHour >= input.endHour) {
        throw new InputError('영업시간이 영업 마감시간보다 늦습니다.');
      }
    } else if (input.startHour) {
      if (input.startHour >= this.props.endHour) {
        throw new InputError('영업시간이 영업 마감시간보다 늦습니다.');
      }
    } else if (input.endHour) {
      if (this.props.startHour >= input.endHour) {
        throw new InputError('영업시간이 영업 마감시간보다 늦습니다.');
      }
    }
    this.props.name = input.name || this.props.name;
    this.props.address = input.address || this.props.address;
    this.props.startHour = input.startHour || this.props.startHour;
    this.props.endHour = input.endHour || this.props.endHour;
  }
}
