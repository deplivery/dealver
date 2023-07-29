import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { map } from 'rxjs/operators';

import { UserDomain } from '@module/user/domain/user.domain';
import { FindUserUsecase } from '@module/user/facade/find-user.usecase';

@Controller('users')
export class UserController {
  constructor(private readonly findUserUsecase: FindUserUsecase) {}

  @Get('/:id')
  findById(@Param('id') id: number, @Res() res: Response): void {
    this.findUserUsecase
      .findById(id)
      .pipe(map((userDomain: UserDomain) => res.status(HttpStatus.OK).json(userDomain)))
      .subscribe();
  }
}
