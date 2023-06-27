import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../entities/user.entity';
import { InputError } from '../shared/error/input.error';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(id: number): Promise<UserEntity> {
    const findUser = await this.userRepository.findOne({ where: { id } });
    if (!findUser) {
      throw new InputError('not found User');
    }
    return findUser;
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.createUser(user);
  }
}
