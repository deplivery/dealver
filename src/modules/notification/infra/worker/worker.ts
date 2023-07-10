import { Job } from 'bull';

export interface SendNotification {
  recipient: string;
  title: string;
  message: string;
}

export interface NotificationWorker {
  sendNotification(input: Job<unknown>): Promise<void>;
}
