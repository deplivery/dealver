import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from '../entities/user.entity';
import { InputError } from '../shared/error/input.error';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(id: number): Promise<User> {
    const findUser = await this.userRepository.findOneBy({ id });
    if (!findUser) {
      throw new InputError('not found User');
    }
    return findUser;
  }

  async createUser(user: User): Promise<User> {
    return await this.userRepository.createUser(user);
  }
}
