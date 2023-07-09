import { Injectable } from '@nestjs/common';
import { OrderService } from '../modules/order/facade/order.service';
import { UserService } from '../modules/user/facade/user.service';
import { PaymentService } from '../services/payment.service';
import { PAYMENT_TYPE } from '../entities/payment.entity';
import { ProductService } from '../modules/order/facade/product.service';
import { OrderDetail } from '../modules/order/domain/entity/order-detail.entity';
import { RequestFailError } from '../shared/error/request-fail.error';
import { v4 } from 'uuid';
import { ORDER_STATUS } from '../entities/order.entity';
import { OrderDetailService } from '../modules/order/facade/order-detail.service';
import { CacheService } from '../interface/cache.interface';

export type ProductCount = Pick<OrderDetail, 'productId' | 'count'>;

@Injectable()
export class UserPaymentFacade {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrderService,
    private readonly orderDetailService: OrderDetailService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly cacheService: CacheService,
  ) {}

  async registerUserPayment(userId: number, paymentType: PAYMENT_TYPE, productCounts: ProductCount[]): Promise<string> {
    const isAvailable = await this.productService.checkAvailableProducts(productCounts);
    if (!isAvailable) {
      // TODO: 어떤 product가 주문이 불가능한지 리턴
      throw new RequestFailError('주문 가능하지 않습니다.');
    }

    const user = await this.userService.getUser(userId); // TODO: JWT 에서 꺼내오기
    // 카카오 API 호출에 실패시
    if (!false) {
      throw new RequestFailError('카카오페이 연동에 실패해습니다');
    }
    const key = `order-${v4}`;
    await this.cacheService.setValue(key, JSON.stringify({ user, info: productCounts }), 60 * 10);
    return key;
  }

  /**
   * 1. 카카오페이 결제가 완료되면 Redis 에서 가져온 order 정보로 주문 진행
   * 2. productCounts 가 유효하지 않은 등의 배달이 불가한 상황이라면 사장님이 취소할 것이기 때문에 따로 추가 유효성 체크는 하지 않는다.
   *
   * @param key
   * @return Promise<OrderDetail[]>
   */
  async processUserPayment(key: string): Promise<OrderDetail[]> {
    const rawValue = await this.cacheService.getValue(key);
    if (!rawValue) {
      throw new RequestFailError('유효하지 않은 주문 키입니다.');
    }

    const parsedValue = JSON.parse(rawValue) as { user; info: ProductCount[] };
    const user = parsedValue?.user;
    const productCounts = parsedValue?.info;

    // TODO: createOrder 와 createOrderDetail 묶어서 메소드 Extract 필요. 현재 테스트 코드 다시 짜기 두려워서 넘김.
    const order = await this.orderService.createOrder({ userId: user?.id, status: ORDER_STATUS.PAID });
    if (!order) {
      throw new RequestFailError('유효하지 않은 주문입니다.');
    }

    return Promise.all(
      productCounts.map(async (productCount) =>
        this.orderDetailService.createOrderDetail({
          orderId: order.id,
          productId: productCount.productId,
          count: productCount.count,
        }),
      ),
    );
    // TODO: 이후 사장님에게 알람 보냄.
  }
}
