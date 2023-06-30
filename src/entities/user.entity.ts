import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../shared/core.entity';

@Entity({ name: 'users' })
export class UserEntity extends CoreEntity {
  @Column('varchar', { name: 'nickname', length: 150 })
  nickname: string;

  @Column('varchar', { name: 'email', length: 100 })
  email: string;

  @Column('varchar', { name: 'kakao_auth_id', length: 200, nullable: true })
  kakao_auth_id: string;
}
