import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';

@Injectable()
export class DeliveryFacade {
  constructor(private readonly repository: OrderRepository) {}

  async endDelivery(input: { id: number }) {
    const order = await this.repository.getOrderById(input.id);
    if (!order) {
      throw new Error('Order not found');
    }
    order.toFinishDelivery();
    return this.repository.save(order);
  }
}
