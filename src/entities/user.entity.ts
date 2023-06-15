import { CoreEntity } from '../shared/core.entity';
import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class UsersEntity extends CoreEntity {
  @Column('varchar', { name: 'username', length: 150 })
  username: string;

  @ApiProperty()
  @Column('varchar', { name: 'email', length: 150 })
  email: string;

  @ApiProperty()
  @Column({
    unique: true,
    nullable: true,
  })
  kakao_auth_id: string;
}
