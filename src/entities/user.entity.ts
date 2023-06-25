import { InputError } from 'src/shared/error/input.error';

export interface CreateUserInput {
  nickName: string;
  email: string;
  kakaoAuthId: string;
}

export class User {
  id: number;
  nickName: string;
  email: string;
  kakaoAuthId: string;

  static of(input: CreateUserInput) {
    if (input.nickName.length < 1 || input.email.length < 1 || input.kakaoAuthId.length < 1) {
      throw new InputError('잘못된 input');
    }

    const user = new User();
    user.id = 1;
    user.email = input.email;
    user.nickName = input.nickName;
    user.kakaoAuthId = input.kakaoAuthId;
    return user;
  }
}
