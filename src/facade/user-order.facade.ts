import { Injectable } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { OrderDetailService } from '../services/order-detail.service';

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
}
