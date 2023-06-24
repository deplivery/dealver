import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}
}
