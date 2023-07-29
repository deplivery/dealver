import { Domain } from '@shared/domain/domain';
import { InputError } from '@shared/error/input.error';

interface StoreProps {
  name: string;
  address: string;
  startHour: number;
  endHour: number;
  isActivated: boolean;
  storeManagerId: number;
}

export type CreateStoreInput = Omit<StoreProps, 'isActivated'>;

export class StoreDomain extends Domain<StoreProps> {
  static of(input: CreateStoreInput): StoreDomain {
    if (input.startHour >= input.endHour) {
      throw new InputError('영업시간이 영업 마감시간보다 늦습니다.');
    }
    return new StoreDomain({
      name: input.name,
      address: input.address,
      startHour: input.startHour,
      endHour: input.endHour,
      isActivated: false,
      storeManagerId: input.storeManagerId,
    });
  }

  changeActivated(isActivated: boolean): void {
    this.props.isActivated = isActivated;
  }

  changeStoreInfo(input: Partial<CreateStoreInput>): void {
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
