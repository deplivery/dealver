import { UserService } from './user.service';
import { UserRepository } from '../repository/user.repository';
import { Test } from '@nestjs/testing';
import { MockedValueProvider, mockProvider } from 'test/util/mock';
import { User } from 'src/entities/user.entity';
import { InputError } from '../shared/error/input.error';

describe('user', () => {
  let userService: UserService;
  let userRepository: MockedValueProvider<UserRepository>;

  beforeEach(async () => {
    userRepository = mockProvider(UserRepository);
    const app = (
      await Test.createTestingModule({
        imports: [],
        providers: [UserService, userRepository],
      }).compile()
    ).createNestApplication();
    await app.init();
    userService = app.get<UserService>(UserService);
  });

  describe('getUser()', () => {
    const user = User.of({
      nickName: 'hello',
      email: 'ash@kakao.com',
      kakaoAuthId: '2481283',
    });

    beforeAll(() => {
      userService.getUser(1).then(() => user);
    });

    it('이메일 길이가 짧다', async () => {
      const user = User.of({
        nickName: 'hello',
        email: '',
        kakaoAuthId: '2481283',
      });
      await expect(userService.getUser(1)).rejects.toThrow(new InputError('잘못된 input'));
    });

    it('유효하지 id 일때 error', async () => {
      await expect(userService.getUser(0)).rejects.toThrow(new InputError('not found User'));
    });

    it('유효한 id일 때 user 리턴', async () => {
      const result = await userService.getUser(1);
      expect(result).toBe(user);
    });
  });

  it('unit test', async () => {
    console.log('unit test');
  });
});
