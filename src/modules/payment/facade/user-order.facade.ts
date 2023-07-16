import { Injectable } from '@nestjs/common';

import { InputError } from '@/shared/error/input.error';

import { ORDER_STATUS } from '../../order/domain/entity/order.entity';
import { OrderDetailService } from '../../order/facade/order-detail.service';
import { OrderService } from '../../order/facade/order.service';

interface CreateOrderInputDto {
  userId: number;
  storeId: number;
  products: {
    productId: number;
    count: number;
  }[];
}

@Injectable()
export class UserOrderFacade {
  constructor(private readonly orderService: OrderService, private readonly orderDetailService: OrderDetailService) {}

  async createOrder(input: CreateOrderInputDto) {
    const order = await this.orderService.createOrder({
      userId: input.userId,
      storeId: input.storeId,
    });
    await this.orderDetailService.createOrderDetails(
      input.products.map((product) => ({
        orderId: order.id,
        productId: product.productId,
        count: product.count,
      })),
    );
    return order;
  }

  async deleteOrder(orderId: number) {
    const order = await this.orderService.getOrder(orderId);
    if (!order) {
      throw new InputError('Order not found');
    }
    return this.orderService.changeOrderStatus(order, ORDER_STATUS.CANCELED);
  }
}
