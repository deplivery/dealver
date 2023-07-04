import { Injectable } from '@nestjs/common';
import { UserRepository } from '../infra/db/user.repository';
import { AuthType, User } from '../domain/entity/user.entity';
import { InputError } from '../../../shared/error/input.error';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly authService: AuthService) {}

  async getUser(id: number): Promise<User> {
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
      const newUser = new User();
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
