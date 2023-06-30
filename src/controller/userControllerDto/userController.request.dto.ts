import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class kakaoSignUpRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'tokenString',
    description: 'tokenString',
  })
  tokenString: string;
}

export class RefreshTokenRequestDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
