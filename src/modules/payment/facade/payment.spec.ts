import { Test } from '@nestjs/testing';

import { PaymentService } from './payment.service';
import { MockedValueProvider, mockProvider } from '../../../../test/util/mock';
import { PaymentRepository } from '../infra/db/payment.repository';

describe('payment', () => {
  let service: PaymentService;
  let paymentRepository: MockedValueProvider<PaymentRepository>;

  beforeAll(async () => {
    paymentRepository = mockProvider(PaymentRepository);
    const app = (
      await Test.createTestingModule({
        imports: [],
        providers: [PaymentService, paymentRepository],
      }).compile()
    ).createNestApplication();
    await app.init();
    service = app.get<PaymentService>(PaymentService);
  });
});
