import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): { status: string } {
    return this.appService.getHealthCheck();
  }

  @Get('health')
  getHealth(): { status: string } {
    return this.appService.getHealthCheck();
  }

  @Get('kafka')
  async getKafka(): Promise<{ status: string }> {
    return this.appService.getKafka();
  }
}
