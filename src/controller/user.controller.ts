import { Controller, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from '../shared/interceptors/undefinedToNull.interceptor';

@ApiInternalServerErrorResponse({
  description: 'server error',
})
@UseInterceptors(UndefinedToNullInterceptor)
@ApiBadRequestResponse({ description: 'bad request' })
@ApiTags('USERS')
@Controller('users')
class UserController {
  constructor() {}
}