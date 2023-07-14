import AWS from 'aws-sdk';

import { LogSender } from '@shared/interface/log-sender.interface';

export class CloudWatchLogSender implements LogSender {
  private cloudWatchLogs: AWS.CloudWatchLogs;

  private static instance: CloudWatchLogSender;

  private constructor() {
    this.cloudWatchLogs = new AWS.CloudWatchLogs();
  }

  static getInstance(): CloudWatchLogSender {
    if (!CloudWatchLogSender.instance) {
      CloudWatchLogSender.instance = new CloudWatchLogSender();
    }
    return CloudWatchLogSender.instance;
  }

  sendLog(message: string, context: any): Promise<void> {
    // 클라우드 워치 환경 변수 설정
    const logGroupName = '로그 그룹 이름';
    const logStreamName = '로그 스트림 이름';

    const logEvent = {
      message: message,
      timestamp: Date.now(),
      context: JSON.stringify(context),
    };

    const params = {
      logGroupName,
      logStreamName,
      logEvents: [logEvent],
    };

    return new Promise<void>((resolve, reject) => {
      this.cloudWatchLogs.putLogEvents(params, (e) => {
        if (e) {
          console.error('[CloudWatchLogSender] putLogEvents fail. error:', e);
          reject(e);
        } else {
          resolve();
        }
      });
    });
  }
}
