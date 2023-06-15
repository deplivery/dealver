import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { IKakaoUserData, UserService } from '../../services/user.service';
import { UserRepository } from '../../repository/user.repository';
import { UsersEntity } from '../../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;
  // 다른 필요한 의존성들 선언...
  const newUser = new UsersEntity();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: {
            findKakaoAuthId: jest.fn().mockResolvedValue(undefined),
            kakaoCallback: jest.fn().mockResolvedValue({
              id: '123456789',
              connected_at: '2021-01-01T00:00:00Z',
              properties: {
                nickname: 'dealver',
                profile_image: 'https://dealver.com/profile.png',
                thumbnail_image: 'https://dealver.com/thumbnail.png',
              },
              kakao_account: {
                profile_needs_agreement: false,
                profile: {
                  nickname: 'dealver',
                  thumbnail_image_url: 'https://dealver.com/thumbnail.png',
                  profile_image_url: 'https://dealver.com/profile.png',
                },
                has_email: true,
                email_needs_agreement: false,
                is_email_valid: true,
                is_email_verified: true,
                email: 'email@kakao.com',
              },
            }),
            createQueryRunner: jest.fn().mockReturnValue({
              connect: jest.fn(),
              startTransaction: jest.fn(),
              commitTransaction: jest.fn(),
              rollbackTransaction: jest.fn(),
              release: jest.fn(),
              manager: {
                save: jest.fn().mockResolvedValue(newUser),
              },
            }),
            save: jest.fn().mockResolvedValue(newUser),
          },
        },
        {
          // 필요한 다른 의존성들...
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              switch (key) {
                case 'JWT_SECRET':
                  return 'test-secret';
                // 다른 키에 대한 처리
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserRepository));
  });

  it('should register a new user if not already registered', async () => {
    const mockData: IKakaoUserData = {
      id: '123456789',
      connected_at: '2021-01-01T00:00:00Z',
      properties: {
        nickname: 'dealver',
        profile_image: 'https://dealver.com/profile.png',
        thumbnail_image: 'https://dealver.com/thumbnail.png',
      },
      kakao_account: {
        profile_needs_agreement: false,
        profile: {
          nickname: 'dealver',
          thumbnail_image_url: 'https://dealver.com/thumbnail.png',
          profile_image_url: 'https://dealver.com/profile.png',
        },
        has_email: true,
        email_needs_agreement: false,
        is_email_valid: true,
        is_email_verified: true,
        email: 'email@kakao.com',
      },
    };

    // jest.spyOn(userRepository, 'findKakaoAuthId').mockResolvedValue(undefined); // findKakaoAuthId 메소드가 예상한 값을 반환하도록 목업을 조정합니다.

    const newUser = new UsersEntity();
    newUser.kakao_auth_id = mockData.id;
    newUser.email = mockData.kakao_account.email;
    newUser.username = mockData.properties.nickname;
    const mockToken = 'mockTokenString'; // 'checkRegister' 함수에 필요한 토큰 문자열입니다.
    await service.checkRegister(mockToken);
    // 적절한 시점에 각 메소드가 적절한 인자로 호출되었는지 검증합니다.
    expect(userRepository.kakaoCallback).toHaveBeenCalledWith(mockToken);
    expect(userRepository.findKakaoAuthId).toHaveBeenCalledWith(mockData.id);
    expect(userRepository.save).toHaveBeenCalled();
  });
});
