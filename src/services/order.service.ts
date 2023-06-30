import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { ORDER_STATUS, Order } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(input: { userId: number; storeId: number }): Promise<Order> {
    return this.orderRepository.createOrder(Order.of({ ...input, status: ORDER_STATUS.PAID }));
  }

  async getOrder(id: number): Promise<Order> {
    return this.orderRepository.getOrderById(id);
  }

  async changeOrderStatus(order: Order, status: ORDER_STATUS): Promise<Order> {
    order.status = status;
    return this.orderRepository.save(order);
  }
}
