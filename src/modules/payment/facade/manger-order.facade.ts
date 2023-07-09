import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../order/infra/db/order.repository';
import { Order } from '../../order/domain/entity/order.entity';
import { InputError } from '@/shared/error/input.error';

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

  async startDelivery(input: { id: number }): Promise<Order> {
    const order = await this.repository.getOrderById(input.id);
    if (!order) {
      throw new InputError('Order not found');
    }
    order.toShipped();
    //TODO: send notification to user
    return this.repository.save(order);
  }
}
