import { CreateUserInput, UserDomain } from '@module/user/domain/domain/user.domain';
import { UserDomainService } from '@module/user/domain/service/user.domain.service';

export class CreateUserUsecase {
  constructor(private userDomainService: UserDomainService) {}
}