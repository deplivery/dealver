import { Injectable } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';

@Injectable()
export class UserPaymentFacade {
  constructor(
    private readonly paymentService: OrderService,
    private readonly orderService: OrderService,
    private readonly userService: UserService,
  ) {}
}
