import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { CreateOrderInput, Order } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(input: CreateOrderInput): Promise<Order> {
    return this.orderRepository.createOrder(Order.of(input));
  }

  async getOrder(id: number): Promise<Order> {
    return this.orderRepository.getOrderById(id);
  }
}
