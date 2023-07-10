import { IsNotEmpty } from 'class-validator';

export class SendEmailDto {
  @IsNotEmpty()
  recipient: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  message: string;
}
