import { UserService } from './user.service';
import { UserRepository } from '../repository/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MockedValueProvider, mockProvider } from '../../test/util/mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockedValueProvider<UserRepository>;
  let authService: MockedValueProvider<AuthService>;

  beforeAll(async () => {
    userRepository = mockProvider(UserRepository);
    authService = mockProvider(AuthService);

    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [UserService, authService, userRepository],
    }).compile();
    await app.init();
    userService = app.get<UserService>(UserService);
  });

  describe('getUser()', () => {
    it('유저를 찾지 못했을때 에러를 반환한다.', async () => {
      const userId = 1;
      userRepository.useValue.findOne.mockResolvedValue(undefined);

      await expect(userService.getUser(userId)).rejects.toThrow();
    });

    it('하나의 유저를 찾았을때 유저 정보를 가져온다.', async () => {
      const userId = 1;
      const newUser = new User();
      newUser.id = 1;
      newUser.email = 'ash@gmail.com';
      newUser.nickname = 'ash';

      userRepository.useValue.findOne.mockResolvedValue(newUser);

      const foundUser = await userService.getUser(userId);
      expect(foundUser).toEqual(newUser);
    });
  });

  describe('createUser()', () => {
    it('카카오 소셜 회원가입 한다.', async () => {
      const tokenString = 'PNqCg-vJARDjjMlu1zWFqVFp8_-HZFjRxofUDR5LCj10mAAAAYkGP2XI';
      const kakaoUserData = {
        id: '123456789',
        connected_at: '2023-06-29',
        properties: {
          nickname: 'test',
          profile_image: 'image_url',
          thumbnail_image: 'image_url',
        },
        kakao_account: {
          profile_needs_agreement: false,
          has_email: true,
          email_needs_agreement: false,
          is_email_valid: true,
          is_email_verified: true,
          email: 'test@gmail.com',
        },
      };

      const newUser = new User();
      newUser.email = kakaoUserData.kakao_account.email;
      newUser.nickname = kakaoUserData.properties.nickname;
      newUser.kakao_auth_id = kakaoUserData.id;

      authService.useValue.kakaoCallback.mockResolvedValue(kakaoUserData);
      userRepository.useValue.findOne.mockResolvedValue(undefined);
      userRepository.useValue.save.mockResolvedValue(newUser);

      const result = await userService.createUser(tokenString);
      expect(result.user.email).toEqual(newUser.email);
      expect(result.user.kakao_auth_id).toEqual(newUser.kakao_auth_id);
      expect(result.user.nickname).toEqual(newUser.nickname);
    });
  });
});
