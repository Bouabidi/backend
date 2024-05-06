import { OrderItemInput } from "./order-item.input";


export class CreateOrderDTO {

  orderItems: OrderItemInput[];
  shippingAddress: string;
  paymentMethod: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}
