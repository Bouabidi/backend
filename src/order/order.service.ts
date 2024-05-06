import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { User } from 'src/users/models/users.model';
import { CreateOrderDTO } from './dtos/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
  ) {}

  async getOrders(user: User): Promise<Order[]> {
    const orders = await this.orderModel
      .find({ _user: user._id })
      .sort('-createdAt');
    return orders;
  }

  public async createOrder(userId: string, input: CreateOrderDTO) {
    try {
      const { orderItems } = input;
      if (!orderItems && orderItems?.length === 0) {
        throw new BadRequestException('Not items');
      }
      const order: Order = await this.orderModel.create({
        ...input,
        user: userId,
      });
      return order;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  public async findOrderById(id: string) {
    const order: Order = await this.orderModel.findById({ id }).lean();
    return order;
  }

  public async findOrdersByUser(userId: string) {
    const count = await this.orderModel.countDocuments({ 'user._id': userId });

    const orders: Order[] = await this.orderModel
      .find({ 'user._id': userId })
      .lean();
    return { count, orders };
  }
}
