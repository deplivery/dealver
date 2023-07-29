import { Test } from '@nestjs/testing';

import { RequestFailError } from '@shared/error/request-fail.error';
import { MockedValueProvider, mockProvider } from '@test/util/mock';

import { PaymentService } from './payment.service';
import { ProductCount, UserPaymentFacade } from './user-payment.facade';
import { RedisService } from '../../component/cache/infra/redis.service';
import { OrderDetail } from '../../order/domain/entity/order-detail.entity';
import { ORDER_STATUS, Order } from '../../order/domain/entity/order.entity';
import { OrderDetailService } from '../../order/facade/order-detail.service';
import { OrderService } from '../../order/facade/order.service';
import { ProductService } from '../../order/facade/product.service';
import { UserService } from '../../user/facade/user.service';
import { UserEntity } from '../../user/infra/db/entity/user.entity';
import { PAYMENT_TYPE } from '../domain/entity/payment.entity';

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

  describe('registerUserPayment() 테스트', () => {
    let isAvailable = true;
    let user = {} as UserEntity;
    let valueFromRedis;

    const userId = 1;
    const paymentType = PAYMENT_TYPE.KAKAO;
    const productCounts = [];

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
      await expect(userPaymentFacade.registerUserPayment(userId, paymentType, productCounts)).rejects.toThrow(
        RequestFailError,
      );
    });

    it('주문한 음식들이 주문 가능하지만, 유효하지 않은 유저일 때, RequestFailError 던짐', async () => {
      user = undefined;
      await expect(userPaymentFacade.registerUserPayment(userId, paymentType, productCounts)).rejects.toThrow(
        RequestFailError,
      );
    });
  });

  describe('processUserPayment() 테스트', () => {
    const key = 'key';
    const user = { id: 1 };
    const productCounts = [{ productId: 1, count: 5 }];
    const rawValue = JSON.stringify({ user, info: productCounts });

    const order = { id: 1, userId: user.id, storeId: 1, status: ORDER_STATUS.PAID };
    const orderDetail: OrderDetail = { id: 1, orderId: 1, productId: 1, count: 5 };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('Redis에 배달 정보가 없을 때, RequestFailError 던짐', async () => {
      cacheService.useValue.getValue.mockResolvedValue(null);
      await expect(userPaymentFacade.processUserPayment(key)).rejects.toThrow(RequestFailError);
      expect(cacheService.useValue.getValue).toHaveBeenCalledTimes(1);
    });

    it('주문한 음식들이 주문 가능하지만, 유효하지 않은 order일 때, RequestFailError 던짐', async () => {
      const parsedValue = JSON.parse(rawValue);
      const user = parsedValue.user;

      cacheService.useValue.getValue.mockResolvedValueOnce(rawValue); // getValue 메서드의 반환값 설정
      orderService.useValue.createOrder.mockResolvedValueOnce(null); // createOrder 메서드의 반환값 설정

      await expect(userPaymentFacade.processUserPayment(key)).rejects.toThrow(RequestFailError);

      expect(cacheService.useValue.getValue).toHaveBeenCalledWith(key);
      expect(orderService.useValue.createOrder).toHaveBeenCalledWith({
        userId: user.id,
        status: ORDER_STATUS.PAID,
      });

      expect(orderDetailService.useValue.createOrderDetail).not.toHaveBeenCalled();
    });

    it('정상적인 주문 상황일 때, OrderDetail[]을 리턴함', async () => {
      cacheService.useValue.getValue.mockResolvedValue(rawValue);
      orderService.useValue.createOrder.mockResolvedValue(order as Order);
      orderDetailService.useValue.createOrderDetail.mockResolvedValue(Promise.resolve(orderDetail));

      const result = await userPaymentFacade.processUserPayment(key);
      expect(result).toEqual([orderDetail]);
      expect(orderService.useValue.createOrder).toHaveBeenCalledTimes(1);
      expect(orderDetailService.useValue.createOrderDetail).toHaveBeenCalledTimes(productCounts.length);
      expect(cacheService.useValue.getValue).toHaveBeenCalledTimes(1);
    });
  });
});
