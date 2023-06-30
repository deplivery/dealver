import { Test } from '@nestjs/testing';
import { MockedValueProvider, mockProvider } from '../../test/util/mock';
import { PaymentRepository } from '../repository/payment.repository';
import { PaymentService } from './payment.service';

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
