import { Injectable } from '@nestjs/common';
import { ProducerService } from './infra/kafka/producer.service';

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService) {}

  getHealthCheck(): { status: string } {
    return { status: 'ok' };
  }

  async getKafka(): Promise<{ status: string }> {
    await this.producerService.produce({
      topic: 'test',
      messages: [{ value: 'Hello KafkaJS user!' }],
    });
    return { status: 'ok' };
  }
}
