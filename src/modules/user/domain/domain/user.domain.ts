import { AuthType } from '@module/user/infra/db/entity/user.entity';
import { Domain } from '@shared/domain/domain';

interface UserProps {
  nickname: string;
  email: string;
  authId: string;
  authType: AuthType;
}

export class UserDomain extends Domain<UserProps> {
  static of(input: UserProps): UserDomain {
    return new UserDomain({
      nickname: input.nickname,
      email: input.email,
      authId: input.authId,
      authType: input.authType,
    });
  }
}
