import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { UndefinedToNullInterceptor } from '@shared/interceptors/undefined-to-null.interceptor';

import { kakaoSignUpRequestDto } from './dto/userController.request.dto';
import { UserService } from '../../facade/user.service';

@ApiInternalServerErrorResponse({
  description: 'server error',
})
@UseInterceptors(UndefinedToNullInterceptor)
@ApiBadRequestResponse({ description: 'bad request' })
@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ description: 'success' })
  @ApiOperation({ summary: '카카오 회원가입' })
  @Post('kakaoSignup')
  async signUp(@Body() body: kakaoSignUpRequestDto) {
    const { tokenString } = body;
    return await this.userService.createUser(tokenString);
  }
}
