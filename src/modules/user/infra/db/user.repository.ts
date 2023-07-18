import { Repository } from 'typeorm';

import { UserDomain } from '@module/user/domain/domain/user.domain';
import { mapToDomain, mapToEntity } from '@shared/domain/mapper';
import { CustomRepository } from '@shared/orm/typeorm-ex.decorator';

import { UserEntity } from './entity/user.entity';

@CustomRepository({ entity: UserEntity })
export class UserRepository extends Repository<UserEntity> {
  async findById(id: number): Promise<UserDomain | undefined> {
    const entity = await this.findOne({ where: { id } });
    return entity ? mapToDomain<UserEntity, UserDomain>(entity, UserDomain) : undefined;
  }

  async saveUser(user: UserDomain): Promise<UserDomain> {
    const entity = mapToEntity(user, UserEntity);
    const savedEntity = await this.save(entity);
    return mapToDomain<UserEntity, UserDomain>(savedEntity, UserDomain);
  }
}
