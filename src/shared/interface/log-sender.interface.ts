export interface LogSender {
  sendLog(message: string, context: any): void;
}

export class ElkLogSender implements LogSender {
  sendLog(message: string, context: any): void {
    console.log('not implemented yet');
  }
}
