import { UserService } from './user.service';
import { UserRepository } from '../repository/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../entities/user.entity';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: UserRepository, useValue: { findOne: jest.fn(), createUser: jest.fn() } }],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('getUser', () => {
    it('유저를 찾지 못했을때 에러를 반환한다.', async () => {
      const userId = 1;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(userService.getUser(userId)).rejects.toThrow();
    });

    it('하나의 유저를 찾았을때 유저 정보를 가져온다.', async () => {
      const userId = 1;
      const newUser = new UserEntity();
      newUser.id = 1;
      newUser.email = 'ash@gmail.com';
      newUser.nickname = 'ash';

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(newUser);

      const foundUser = await userService.getUser(userId);
      expect(foundUser).toEqual(newUser);
    });
  });
});
