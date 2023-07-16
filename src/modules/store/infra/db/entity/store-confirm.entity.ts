import { Column, Entity, ManyToOne } from 'typeorm';

import { CoreEntity } from '@/shared/orm/core.entity';

import { StoreEntity } from './store.entity';

export enum StoreState {
  Ready = 'Ready',
  Confirm = 'Confirm',
  Reject = 'Reject',
  Delete = 'Delete',
}

@Entity({ name: 'store_confirm' })
export class StoreConfirmEntity extends CoreEntity {
  @ManyToOne(() => StoreEntity, (store) => store.id)
  store: StoreEntity;

  @Column()
  storeId: number;

  @Column({ default: '' })
  reason: string;

  @Column({
    type: 'enum',
    enum: StoreState,
    default: StoreState.Ready,
  })
  state: StoreState;
}
