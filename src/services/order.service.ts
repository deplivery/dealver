import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { CreateOrderInput, Order } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(input: CreateOrderInput): Promise<Order> {
    // TODO: productId 로 storeId 가져오는 쿼리 필요
    return this.orderRepository.createOrder(Order.of(input));
  }

  async getOrder(id: number): Promise<Order> {
    return this.orderRepository.getOrderById(id);
  }
}
