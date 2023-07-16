import { Test } from '@nestjs/testing';

import { MockedValueProvider, mockProvider } from '@test/util/mock';

import { OrderService } from './order.service';
import { OrderRepository } from '../infra/db/order.repository';

describe('order', () => {
  let service: OrderService;
  let orderRepository: MockedValueProvider<OrderRepository>;

  beforeAll(async () => {
    orderRepository = mockProvider(OrderRepository);
    const app = (
      await Test.createTestingModule({
        imports: [],
        providers: [OrderService, orderRepository],
      }).compile()
    ).createNestApplication();
    await app.init();
    service = app.get<OrderService>(OrderService);
  });
});
