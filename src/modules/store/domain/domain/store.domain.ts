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
    this.assertTime(input.startHour, input.endHour);
    return new StoreDomain({
      name: input.name,
      address: input.address,
      startHour: input.startHour,
      endHour: input.endHour,
      isActivated: false,
      storeManagerId: input.storeManagerId,
    });
  }

  changeActivated(isActivated: boolean): StoreDomain {
    return new StoreDomain({
      ...this.props,
      isActivated,
    });
  }

  changeStoreInfo(input: Partial<CreateStoreInput>): StoreDomain {
    this.assertOpeningTime(input.startHour, input.endHour);
    this.props.name = input.name || this.props.name;
    this.props.address = input.address || this.props.address;
    this.props.startHour = input.startHour || this.props.startHour;
    this.props.endHour = input.endHour || this.props.endHour;
    return new StoreDomain({
      ...this.props,
    });
  }

  private assertOpeningTime(startHour?: number, endHour?: number): void {
    if (startHour && endHour) {
      return StoreDomain.assertTime(startHour, endHour);
    }
    if (startHour) {
      return StoreDomain.assertTime(startHour, this.props.endHour);
    }
    if (endHour) {
      return StoreDomain.assertTime(this.props.startHour, endHour);
    }
  }

  private static assertTime(startHour: number, endHour: number): void {
    if (startHour >= endHour) {
      throw new InputError('영업시간이 영업 마감시간보다 늦습니다.');
    }
  }
}
