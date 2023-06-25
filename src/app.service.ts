import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthCheck(): { status: string } {
    return { status: 'ok' };
  }
}
