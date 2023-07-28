import { CreateUserInput, UserDomain } from '@module/user/domain/user.domain';
import { UserDomainService } from '@module/user/domain/user.domain.service';

export class CreateUserUsecase {
  constructor(private userDomainService: UserDomainService) {}

  async createUser(input: CreateUserInput) {
    const user = UserDomain.of(input);
    this.userDomainService.createUser(user).subscribe();
  }
}
