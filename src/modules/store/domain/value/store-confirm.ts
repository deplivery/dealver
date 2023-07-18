import { ValueObject } from '@/shared/domain/value-object';

import { StoreState } from '../../infra/db/entity/store-confirm.entity';

interface StoreConfirmProps {
  reason: string;
  storeId: number;
  state: StoreState;
}

export class StoreConfirmValue extends ValueObject<StoreConfirmProps> {
  constructor(props: StoreConfirmProps) {
    super(props);
  }
}
