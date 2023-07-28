import { Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { UserDomain } from '@module/user/domain/user.domain';
import { mapToDomain, mapToEntity } from '@shared/domain/mapper';
import { CustomRepository } from '@shared/orm/typeorm-ex.decorator';

import { UserEntity } from './entity/user.entity';

@CustomRepository({ entity: UserEntity })
export class UserRepository extends Repository<UserEntity> {
  findById(id: number): Observable<UserDomain | undefined> {
    return new Observable((subscriber) => {
      this.findOne({ where: { id } })
        .then((entity) => {
          if (entity) {
            const userDomain = mapToDomain<UserEntity, UserDomain>(entity, UserDomain);
            subscriber.next(userDomain);
            subscriber.complete();
          } else {
            subscriber.next(undefined);
            subscriber.complete();
          }
        })
        .catch((error) => {
          subscriber.error(error);
        });
    });
  }

  async saveUser(user: UserDomain): Promise<UserDomain> {
    const entity = mapToEntity(user, UserEntity);
    const savedEntity = await this.save(entity);
    return mapToDomain<UserEntity, UserDomain>(savedEntity, UserDomain);
  }
}
