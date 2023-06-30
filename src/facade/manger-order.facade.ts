import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { InputError } from '../shared/error/input.error';
import { Order } from '../entities/order.entity';

@Injectable()
export class ManagerOrderFacade {
  constructor(private readonly repository: OrderRepository) {}

  async verifyOrder(input: { id: number }): Promise<Order> {
    const order = await this.repository.getOrderById(input.id);
    if (!order) {
      throw new InputError('Order not found');
    }
    order.toConfirm();
    //TODO: send notification to user
    return this.repository.save(order);
  }
}
