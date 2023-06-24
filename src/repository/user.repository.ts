import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  async createUser(): Promise<User> {
    return new User();
  }

  async getUser(): Promise<User> {
    return new User();
  }

  async updateUser(user: User): Promise<User> {
    return user;
  }
}
