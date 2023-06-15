import { Injectable, Res } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { SuccessFulResponse } from '../shared/dto/core.response.dto';
import { ConfigService } from '@nestjs/config';
import { UsersEntity } from '../entities/user.entity';
import { Response } from 'express';
import Jwt from 'jsonwebtoken';
import { OneWeeks } from '../shared/service/dateFormat.service';

export interface IKakaoUserData {
  id: string;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image: string;
    thumbnail_image: string;
  };
  kakao_account: {
    profile_needs_agreement: boolean;
    profile: any; // 객체 타입이 정해져 있지 않으므로 any로 처리합니다.
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email: string;
  };
}

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly configService: ConfigService) {}

  async makeAccessToken(userId: number) {
    const payload = { userId: userId };
    const jwtSecret = this.configService.get('JWT_SECRET');

    return Jwt.sign(payload, jwtSecret, {
      expiresIn: OneWeeks,
      algorithm: 'HS256',
    });
  }

  async findKakaoAuthId(authId: string): Promise<UsersEntity> {
    return await this.userRepository.findKakaoAuthId(authId);
  }

  async checkRegister(tokenString: string) {
    const kakaoUserData: IKakaoUserData = await this.userRepository.kakaoCallback(tokenString);
    const foundUser = await this.findKakaoAuthId(kakaoUserData.id);

    if (foundUser) {
      const accessToken = await this.makeAccessToken(foundUser.id);
      return SuccessFulResponse({
        foundUser,
        accessToken,
      });
    }

    const kakaoAuthId = kakaoUserData.id;
    const email = kakaoUserData.kakao_account.email;
    const username = kakaoUserData.properties.nickname || email.split('@')[0];

    const newUser = new UsersEntity();
    newUser.kakao_auth_id = kakaoAuthId;
    newUser.email = email;
    newUser.username = username;
    const responseCreatedUser = await this.userRepository.save(newUser);

    const accessToken = await this.makeAccessToken(responseCreatedUser.id);
    return SuccessFulResponse({
      foundUser: kakaoUserData,
      accessToken,
    });
  }
}
