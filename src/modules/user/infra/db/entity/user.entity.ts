import { Column, Entity } from 'typeorm';

import { CoreEntity } from '@shared/orm/core.entity';

export enum AuthType {
  KAKAO = 'Kakao',
  GOOGLE = 'Google',
}

@Entity({ name: 'users' })
export class UserEntity extends CoreEntity {
  @Column('varchar', { name: 'nickname', length: 150 })
  nickname: string;

  @Column('varchar', { name: 'email', length: 100 })
  email: string;

  @Column('varchar', { name: 'auth_id', length: 200, nullable: true })
  authId: string;

  @Column('varchar', { name: 'auth_type', length: 16, nullable: true })
  authType: AuthType;
}
