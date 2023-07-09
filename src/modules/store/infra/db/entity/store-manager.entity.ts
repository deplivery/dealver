import { Column, Entity } from 'typeorm';
import { CoreEntity } from '@/shared/orm/core.entity';
import { AuthType } from '@/modules/user/domain/entity/user.entity';

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
