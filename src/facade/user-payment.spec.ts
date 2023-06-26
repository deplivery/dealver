import { UserService } from '../services/user.service';
import { PaymentService } from '../services/payment.service';
import { OrderService } from '../services/order.service';
import { MockedValueProvider, mockProvider } from '../../test/util/mock';
import { Test } from '@nestjs/testing';
import { ProductCount, UserPaymentFacade } from './user-payment.facade';
import { ProductService } from '../services/product.service';
import { OrderDetailService } from '../services/order-detail.service';
import { User } from '../entities/user.entity';
import { PAYMENT_TYPE } from '../entities/payment.entity';
import { RequestFailError } from '../shared/error/request-fail.error';
import { RedisService } from '../infra/redis.service';

describe('order-payment', () => {
  let orderService: MockedValueProvider<OrderService>;
  let orderDetailService: MockedValueProvider<OrderDetailService>;
  let userService: MockedValueProvider<UserService>;
  let paymentService: MockedValueProvider<PaymentService>;
  let productService: MockedValueProvider<ProductService>;
  let cacheService: MockedValueProvider<RedisService>;

  let userPaymentFacade: UserPaymentFacade;

  beforeAll(async () => {
    orderService = mockProvider(OrderService);
    userService = mockProvider(UserService);
    orderDetailService = mockProvider(OrderDetailService);
    paymentService = mockProvider(PaymentService);
    productService = mockProvider(ProductService);
    cacheService = mockProvider(RedisService, {
      setValue: jest.fn(),
      getValue: jest.fn(),
    });

    const app = (
      await Test.createTestingModule({
        imports: [],
        providers: [
          UserPaymentFacade,
          orderService,
          orderDetailService,
          userService,
          paymentService,
          productService,
          cacheService,
        ],
      }).compile()
    ).createNestApplication();
    await app.init();
    userPaymentFacade = app.get<UserPaymentFacade>(UserPaymentFacade);
  });

  describe('registerUserPayment', () => {
    let isAvailable = true;
    const user = {} as User;
    let valueFromRedis;
    beforeAll(() => {
      productService.useValue.checkAvailableProducts.mockImplementation(async (productCounts: ProductCount[]) => {
        return isAvailable;
      });
      userService.useValue.getUser.mockImplementation(async (userId: number) => {
        return user;
      });
      cacheService.useValue.getValue.mockImplementation(async (key: string): Promise<string | null> => valueFromRedis);
      cacheService.useValue.setValue.mockImplementation(
        async (key: string, value: string, ttlSeconds: number): Promise<void> => undefined,
      );
    });

    it('주문한 음식들이 주문 가능하지 않을 때, RequestFailError 던짐', async () => {
      isAvailable = false;
      const userId = 1;
      const paymentType = PAYMENT_TYPE.KAKAO;
      const productCounts = [];
      await expect(userPaymentFacade.registerUserPayment(userId, paymentType, productCounts)).rejects.toThrow(
        RequestFailError,
      );
    });

    it('주문한 음식들이 주문 가능하지만, 유효하지 않은 유저일 때, RequestFailError 던짐', async () => {});
  });
});
