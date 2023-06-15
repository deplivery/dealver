import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class KakaoSignUpRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'username',
    description: 'username',
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'ash@gmail.com',
    description: 'email',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'kakao_auth_id',
    description: 'kakao_auth_id',
  })
  kakao_auth_id: string;
}
