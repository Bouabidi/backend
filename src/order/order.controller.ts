import {
  Body,
  Controller,
  Get,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/users/models/users.model';
import { Cart } from 'src/cart/schemas/cart.schema';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { Order } from './schemas/order.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private ordersService: OrderService) {}

  @Get()
  getOrders(@GetUser() user: User) {
    return this.ordersService.getOrders(user);
  }

}
