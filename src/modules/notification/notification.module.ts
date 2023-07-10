import { Module } from '@nestjs/common';
import { EmailWorker } from './infra/worker/email.worker';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from './presentation/notification.controller';
import { Notification } from './domain/entity/notification.entity';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    BullModule.registerQueue({
      name: 'email',
      redis: {
        host: process.env.REDIS_HOST,
        port: 6379,
      },
    }),
  ],
  controllers: [NotificationController],
  providers: [EmailWorker],
})
export class NotificationModule {}
