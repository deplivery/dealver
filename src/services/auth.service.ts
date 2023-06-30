import { Injectable } from '@nestjs/common';
import { InputError } from '../shared/error/input.error';
import { HttpService } from '@nestjs/axios';
import * as Jwt from 'jsonwebtoken';
import { OneHour, OneWeeks } from '../shared/service/date-format.service';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { UserService } from './user.service';
import { RedisService } from 'src/infra/redis.service';
import { AxiosError } from 'axios';

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
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async kakaoCallback(tokenString: string): Promise<any> {
    const getProfileUrl = 'https://kapi.kakao.com/v2/user/me';
    const getProfileHeaders = {
      Authorization: `Bearer ${tokenString}`,
    };

    try {
      const response = await this.httpService
        .post<IKakaoUserData>(
          getProfileUrl,
          {
            property_keys: ['properties.nickname', 'kakao_account.email'],
          },
          {
            headers: getProfileHeaders,
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error);
            throw new InputError('kaka server error');
          }),
        );

      const foundFirstValue = await firstValueFrom(response);

      if (!foundFirstValue.data) {
        throw new InputError('not found User');
      }

      return foundFirstValue.data;
    } catch (error) {
      throw new InputError('not found User');
    }
  }

  async makeAccessToken(id: number) {
    const payload = { id: id };
    const options: Jwt.SignOptions = {
      expiresIn: OneHour,
      issuer: 'dealver',
      algorithm: 'HS256',
    };
    return Jwt.sign(payload, this.configService.get('JWT_ACCESS_TOKEN_SECRET'), options);
  }

  async makeAccessTokenByRefreshToken(refreshToken: string) {
    const decodedRefreshToken: any = Jwt.verify(refreshToken, this.configService.get('JWT_REFRESH_TOKEN_SECRET'));
    const userId = decodedRefreshToken?.sub;
    // redis.service.ts 에서 레디스 set 을한다.
    const redisRefreshToken = await this.redisService.getValue(String(userId));
    if (redisRefreshToken !== refreshToken) {
      throw new InputError('invalid refresh token');
    }

    return await this.makeAccessToken(userId);
  }

  async makeAccessRefreshToken(id: number) {
    const payload = { id: id };
    const options: Jwt.SignOptions = {
      expiresIn: OneWeeks,
      issuer: 'dealver',
      algorithm: 'HS256',
    };
    return Jwt.sign(payload, this.configService.get('JWT_REFRESH_TOKEN_SECRET'), options);
  }
}
