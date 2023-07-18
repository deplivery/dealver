import { Column, Entity } from 'typeorm';

import { AuthType } from '@module/user/infra/db/entity/user.entity';
import { CoreEntity } from '@shared/orm/core.entity';

@Entity({ name: 'store_manager' })
export class StoreManagerEntity extends CoreEntity {
  @Column()
  name: string;

  @Column()
  authId: string;

  @Column({
    type: 'enum',
    enum: AuthType,
    default: AuthType.KAKAO,
  })
  authType: AuthType;
}
