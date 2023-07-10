import { NotificationWorker } from './worker';
import nodemailer from 'nodemailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SendEmailDto } from '../../presentation/dto/send-eamil.dto';

@Processor('email')
export class EmailWorker implements NotificationWorker {
  @Process()
  async sendNotification(job: Job<SendEmailDto>): Promise<void> {
    const { data } = job;
    const testAccount = await nodemailer.createTestAccount();
    const transporter = this.buildTransport(testAccount);
    const info = await transporter.sendMail({
      from: 'keumks0331@gmail.com',
      to: data.recipient,
      subject: data.title,
      text: data.message,
    });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }

  private buildTransport(account: nodemailer.TestAccount) {
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: account.user,
        pass: account.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
}
