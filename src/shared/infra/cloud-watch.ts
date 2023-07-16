import { ConfigService } from '@nestjs/config';
import AWS from 'aws-sdk';

import { LogSender } from '@shared/interface/log-sender.interface';

export class CloudWatchLogSender implements LogSender {
  private cloudWatchLogs: AWS.CloudWatchLogs;
  private configService: ConfigService;

  private static instance: CloudWatchLogSender;

  private constructor() {
    this.cloudWatchLogs = new AWS.CloudWatchLogs();
    this.configService = new ConfigService();
  }

  static getInstance(): CloudWatchLogSender {
    if (!CloudWatchLogSender.instance) {
      CloudWatchLogSender.instance = new CloudWatchLogSender();
    }
    return CloudWatchLogSender.instance;
  }

  async sendLog(message: string, context: any, stack: any): Promise<void> {
    const logGroupName = this.configService.get<string>('AWS_CLOUDWATCH_LOG_GROUP_NAME');
    const logStreamName = this.configService.get<string>('AWS_CLOUDWATCH_LOG_STREAM_NAME');

    const logEvent: AWS.CloudWatchLogs.Types.InputLogEvent = {
      message: JSON.stringify({
        message,
        ...(context && { context }),
        ...(stack && { stack }),
      }),
      timestamp: Date.now(),
    };

    const params = {
      logGroupName,
      logStreamName,
      logEvents: [logEvent],
    };

    try {
      await this.cloudWatchLogs.putLogEvents(params).promise();
    } catch (error) {
      console.error('[CloudWatchLogSender] putLogEvents fail. error:', error);
      throw error;
    }
  }
}
