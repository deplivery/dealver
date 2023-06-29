import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as Jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../../services/user.service';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService, private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const accessToken = req.cookies['access-token'];

    let userId: number | null;

    try {
      const decodedUserJwt: any = Jwt.verify(accessToken, this.configService.get('JWT_ACCESS_TOKEN_SECRET'));
      userId = decodedUserJwt?.id;
    } catch (jwtErr) {
      res.cookie('accessToken', null, {
        expires: new Date(new Date().getTime() - 1),
        httpOnly: true,
        secure: true,
      });
      throw new HttpException('check your authorization', HttpStatus.UNAUTHORIZED);
    }
    if (!userId) {
      res.cookie('accessToken', null, {
        expires: new Date(new Date().getTime() - 1),
        httpOnly: true,
        secure: true,
      });
      throw new HttpException('check user decodeUser data', HttpStatus.UNAUTHORIZED);
    }

    const userData = await this.userService.getUserById(userId);
    if (!userData) {
      res.cookie('accessToken', null, {
        expires: new Date(new Date().getTime() - 1),
        httpOnly: true,
        secure: true,
      });
      throw new HttpException('does not found users.', HttpStatus.UNAUTHORIZED);
    }
    req.user = userData;

    return true;
  }
}

@Injectable()
export class UserRefreshAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService, private readonly userService: UserService) {} canActivate(context: ExecutionContext) {
    return undefined;
  }
}
