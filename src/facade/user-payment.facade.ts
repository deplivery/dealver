import { Injectable } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import { PaymentService } from '../services/payment.service';

@Injectable()
export class UserPaymentFacade {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrderService,
    private readonly userService: UserService,
  ) {}
}
