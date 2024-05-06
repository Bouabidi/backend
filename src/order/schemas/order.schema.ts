import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { User } from 'src/users/models/users.model';
import { OrderItem } from './order-item.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: String, required: true })
  paymentMethod: string;

  @Prop({ type: Number, required: true, default: 0.0 })
  taxPrice: number;

  @Prop({ type: Number, required: true, default: 0.0 })
  shippingPrice: number;

  @Prop({ type: Number, required: true, default: 0.0 })
  totalPrice: number;

  @Prop({ type: Boolean, required: true, default: false })
  isPaid: boolean;

  @Prop({ type: Date, required: false })
  paidAt: Date;

  @Prop({ type: Boolean, required: true, default: false })
  isDelivered: boolean;

  @Prop({ type: Date, required: false })
  deliveredAt: Date;

  @Prop({ type: Types.ObjectId, required: true })
  user: User;

  @Prop({ type: [{ type: Types.ObjectId }] })
  orderItems: OrderItem[];

  @Prop()
  shippingAddress: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
