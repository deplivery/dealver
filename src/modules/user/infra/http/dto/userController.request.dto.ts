import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class kakaoSignUpRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'tokenString',
    description: 'tokenString',
  })
  tokenString: string;
}
