import { UserDomainService } from '@module/user/domain/user.domain.service';

export class CreateUserUsecase {
  constructor(private userDomainService: UserDomainService) {}
}
