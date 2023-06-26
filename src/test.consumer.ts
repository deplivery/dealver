import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './infra/kafka/consumer.service';

@Injectable()
export class TestConsumerService implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topics: ['test'], fromBeginning: true },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            topic,
            partition,
            offset: message.offset,
            value: message.value.toString(),
          });
        },
      },
    );
  }
}
