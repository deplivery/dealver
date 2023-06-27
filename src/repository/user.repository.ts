import { UserEntity } from '../entities/user.entity';
import { CustomRepository } from '../shared/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository({ entity: UserEntity })
export class UserRepository extends Repository<UserEntity> {
  async createUser(user: UserEntity): Promise<UserEntity> {
    return new UserEntity();
  }

  async updateUser(user: UserEntity): Promise<UserEntity> {
    return user;
  }
}
