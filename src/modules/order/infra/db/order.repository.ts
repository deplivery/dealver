import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CustomRepository } from '@/shared/orm/typeorm-ex.decorator';

import { Order } from '../../domain/entity/order.entity';

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
