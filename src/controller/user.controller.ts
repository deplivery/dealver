import { Controller, Get, Req, Res, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from '../shared/interceptors/undefinedToNull.interceptor';
import { Response } from 'express';
import { UserService } from '../services/user.service';

@ApiInternalServerErrorResponse({
  description: 'server error',
})
@UseInterceptors(UndefinedToNullInterceptor)
@ApiBadRequestResponse({ description: 'bad request' })
@ApiTags('USERS')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiOperation({ summary: 'kakao_login' })
  @ApiOkResponse({ description: '성공', type: 'application/json' })
  @Get('/kakao/callback')
  async kakaoCallback(@Req() req: any, @Res() res: Response) {
    const responseCallBack = await this.usersService.checkRegister(req.headers['access-token']);

    return res.status(responseCallBack.statusCode).json(responseCallBack);
  }
}
