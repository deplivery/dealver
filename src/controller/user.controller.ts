import { UserService } from '../services/user.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, HttpStatus, ParseIntPipe, Post, Req, UseInterceptors } from '@nestjs/common';
import { UndefinedToNullInterceptor } from '../shared/interceptors/undefined-to-null.interceptor';
import { kakaoSignUpRequestDto } from './userControllerDto/userController.request.dto';
import { Param } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { UserAuthGuard } from '../shared/auth/guard/user-auth.guard';
import { Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { OneHour, OneWeeks } from '../shared/service/date-format.service';
import { AuthService } from '../services/auth.service';
import { InputError } from '../shared/error/input.error';
import { RedisService } from '../infra/redis.service';

@ApiInternalServerErrorResponse({
  description: 'server error',
})
@UseInterceptors(UndefinedToNullInterceptor)
@ApiBadRequestResponse({ description: 'bad request' })
@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly redisService: RedisService,
  ) {}

  @ApiCreatedResponse({ description: 'success' })
  @ApiOperation({ summary: '카카오 회원가입' })
  @Post('kakaoSignup')
  async signUp(@Body() body: kakaoSignUpRequestDto, @Res() res: Response) {
    const { tokenString } = body;
    const { user, token, refreshtoken } = await this.userService.createUser(tokenString);
    await this.redisService.setValue(refreshtoken, tokenString, OneWeeks);
    res.cookie('accessToken', token, {
      httpOnly: true,
      maxAge: OneHour,
    });

    res.cookie('refreshToken', refreshtoken, {
      httpOnly: true,
      maxAge: OneWeeks,
    });

    return res.status(HttpStatus.OK).json(user);
  }
  @ApiCreatedResponse({ description: 'success' })
  @ApiOperation({ summary: '내 정보 가져오기' })
  @UseGuards(UserAuthGuard)
  @Get('myinfo')
  async getMyInfo(@Req() req) {
    const { user } = req;
    if (!user) throw new Error('유저 정보가 없습니다.');
    return await this.userService.getUserById(user.id);
  }

  @ApiCreatedResponse({ description: 'success' })
  @ApiOperation({ summary: '유저 하나 가져오기' })
  @UseGuards(UserAuthGuard)
  @Post('refreshToken')
  async createTokenByRefreshToken(@Req() req: Request, @Res() res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const responseNewTokenString = await this.authService.makeAccessTokenByRefreshToken(refreshToken);
      res.cookie('accessToken', responseNewTokenString, {
        httpOnly: true,
      });
      return res.status(HttpStatus.OK).json(responseNewTokenString);
    } catch (e) {
      throw new InputError('Invalid refresh token');
    }
  }

  @ApiCreatedResponse({ description: 'success' })
  @ApiOperation({ summary: '유저 하나 가져오기' })
  @Get(':id')
  async findOneUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }
}
