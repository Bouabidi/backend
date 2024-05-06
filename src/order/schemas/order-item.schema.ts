import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Product } from "src/product/schemas/product.schema";

export type OrderDocument = OrderItem & Document;

@Schema()
export class OrderItem extends Document {

	@Prop()
	name: string;

	@Prop()
	quantity: number;

	@Prop()
	price: number;

	@Prop()
	image: string;

	@Prop()
	product: Product;

	@Prop()
	createdAt?: Date;

	@Prop()
	updatedAt?: Date;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);