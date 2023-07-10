import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailDto } from './dto/send-eamil.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('notification')
export class NotificationController {
  constructor(@InjectQueue('email') private emailQueue: Queue) {}

  @Post('email')
  async sendNotification(@Body() input: SendEmailDto): Promise<{
    message: string;
    type: string;
  }> {
    await this.emailQueue.add({ ...input });
    return {
      message: 'success',
      type: 'email',
    };
  }
}
