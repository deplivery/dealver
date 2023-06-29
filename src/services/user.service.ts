import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../entities/user.entity';
import { InputError } from '../shared/error/input.error';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly authService: AuthService) {}

  async getUser(id: number): Promise<UserEntity> {
    const findUser = await this.userRepository.findOne({ where: { id } });
    if (!findUser) {
      throw new InputError('not found User');
    }
    return findUser;
  }

  async createUser(tokenString: string) {
    const kakaoUserData = await this.authService.kakaoCallback(tokenString);
    const foundUser = await this.userRepository.findOne({ where: { kakao_auth_id: kakaoUserData.id } });

    if (!foundUser) {
      const newUser = new UserEntity();
      newUser.email = kakaoUserData.kakao_account.email;
      newUser.nickname = kakaoUserData.properties.nickname;
      newUser.kakao_auth_id = kakaoUserData.id;
      const responseCreatedUser = await this.userRepository.save(newUser);
      return {
        token: await this.authService.makeAccessToken(responseCreatedUser.id),
        refreshtoken: await this.authService.makeAccessRefreshToken(responseCreatedUser.id),
        user: responseCreatedUser,
      };
    }

    return {
      token: await this.authService.makeAccessToken(foundUser.id),
      refreshtoken: await this.authService.makeAccessRefreshToken(foundUser.id),
      user: foundUser,
    };
  }
}
