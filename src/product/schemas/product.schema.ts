import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop({ required: true, index: true })
    name: string;

    @Prop()
    version: string;

    @Prop()
    image: string[];

    @Prop()
    shortDescription: string;

    @Prop()
    longDescription: string;
    
    //@Prop()
    price: {
        reseller: number;
        uvp: number;
        discount: number
    };

    //@Prop()
	rating: {
        count: number;
        avg: number;
    };

    @Prop()
    inStock: boolean;

}

export const ProductSchema = SchemaFactory.createForClass(Product);