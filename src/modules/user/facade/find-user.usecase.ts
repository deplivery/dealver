import { Observable } from 'rxjs';

import { UserDomain } from '@module/user/domain/user.domain';
import { UserDomainService } from '@module/user/domain/user.domain.service';

export class FindUserUsecase {
  constructor(private userDomainService: UserDomainService) {}

  findById(id: number): Observable<UserDomain> {
    return this.userDomainService.findById(id);
  }
}
