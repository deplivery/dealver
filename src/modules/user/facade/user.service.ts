import { Injectable } from '@nestjs/common';

import { InputError } from '@shared/error/input.error';

import { AuthService } from '../../auth/auth.service';
import { AuthType, UserEntity } from '../infra/db/entity/user.entity';
import { UserRepository } from '../infra/db/user.repository';

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
    const foundUser = await this.userRepository.findOne({
      where: { authId: kakaoUserData.id, authType: AuthType.KAKAO },
    });

    if (!foundUser) {
      const newUser = new UserEntity();
      newUser.email = kakaoUserData.kakao_account.email;
      newUser.nickname = kakaoUserData.properties.nickname;
      newUser.authId = kakaoUserData.id;
      newUser.authType = AuthType.KAKAO;

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
