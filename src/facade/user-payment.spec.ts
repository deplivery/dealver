import { UserService } from '../services/user.service';
import { PaymentService } from '../services/payment.service';
import { OrderService } from '../services/order.service';
import { MockedValueProvider, mockProvider } from '../../test/util/mock';
import { Test } from '@nestjs/testing';
import { UserPaymentFacade } from './user-payment.facade';
import { ProductService } from '../services/product.service';

describe('order', () => {
  let orderService: MockedValueProvider<OrderService>;
  let userService: MockedValueProvider<UserService>;
  let paymentService: MockedValueProvider<PaymentService>;
  let productService: MockedValueProvider<ProductService>;

  let userPaymentFacade: UserPaymentFacade;

  beforeAll(async () => {
    orderService = mockProvider(OrderService);
    userService = mockProvider(UserService);
    paymentService = mockProvider(PaymentService);
    productService = mockProvider(ProductService);
    const app = (
      await Test.createTestingModule({
        imports: [],
        providers: [UserPaymentFacade, orderService, userService, paymentService, productService],
      }).compile()
    ).createNestApplication();
    await app.init();
    userPaymentFacade = app.get<UserPaymentFacade>(UserPaymentFacade);
  });
});
