import { Injectable } from '@nestjs/common';
import { Order } from '../../domain/entity/order.entity';
import { CustomRepository } from '../../../../shared/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository({ entity: Order })
export class OrderRepository extends Repository<Order> {
  async createOrder(order: Order): Promise<Order> {
    return new Order();
  }

  async getOrderById(id: number): Promise<Order> {
    return new Order();
  }

  async updateOrder(order: Order): Promise<Order> {
    return order;
  }
}
