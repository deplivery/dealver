import { Column, Entity, ManyToOne } from 'typeorm';

import { CoreEntity } from '@/shared/orm/core.entity';

import { StoreManagerEntity } from './store-manager.entity';

@Entity({ name: 'store' })
export class StoreEntity extends CoreEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  startHour: number;

  @Column()
  endHour: number;

  @Column()
  isActivated: boolean;

  @ManyToOne(() => StoreManagerEntity)
  storeManager: StoreManagerEntity;

  @Column()
  storeManagerId: number;
}
