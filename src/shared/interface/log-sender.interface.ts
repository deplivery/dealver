export interface LogSender {
  sendLog(message: string, context: any, stack: any): void;
}

export class ElkLogSender implements LogSender {
  sendLog(message: string, context: any, stack: any): void {
    console.log('not implemented yet');
  }
}
