import { User } from '../entities/user.entity';
import { CustomRepository } from '../shared/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository({ entity: User })
export class UserRepository extends Repository<User> {
  async createUser(user: User): Promise<User> {
    return new User();
  }

  async updateUser(user: User): Promise<User> {
    return user;
  }
}
