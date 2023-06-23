import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';


export class CoreResponseDto {
  @ApiProperty({
    description: 'true',
    example: 'true',
  })
  ok: boolean;

  @ApiProperty({
    description: 'message',
    example: 'SUCCESS',
  })
  message: string;

  @ApiProperty({
    description: 'statusCode',
    example: 200,
  })
  statusCode: number;
}

export function SuccessFulResponse<T>(data?: T, status = HttpStatus.OK) {
  if (status === HttpStatus.CREATED) {
    return {
      ok: true,
      statusCode: status,
      message: 'CREATE SUCCESS',
      data,
    };
  }
  return {
    ok: true,
    statusCode: status,
    message: 'SUCCESS',
    data,
  };
}
