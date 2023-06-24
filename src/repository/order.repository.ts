import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
  async createOrder(): Promise<Order> {
    return new Order();
  }

  async getOrder(): Promise<Order> {
    return new Order();
  }

  async updateOrder(order: Order): Promise<Order> {
    return order;
  }
}
