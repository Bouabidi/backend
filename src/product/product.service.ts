import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dtos/create-product.dto';
import { FilterProductDTO } from './dtos/filter-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getFilteredProducts(search: string): Promise<Product[]> {
    let products = await this.getAllProducts();
    products = products.filter(
      (product) =>
        product.name.toLowerCase().includes(search) ||
        product.longDescription.toLowerCase().includes(search),
    );
    return products;
  }

  async filterProducts(filter): Promise<Product[]> {
    let products = await this.getAllProducts();
    if (!filter) {
      return products;
    }
    products = products.filter(
      (product) =>
        product.name.includes(filter) ||
        product.shortDescription.includes(filter) ||
        product.longDescription.includes(filter),
    );
    return products;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products;
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    return product;
  }

  async addProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const newProduct = await this.productModel.create(createProductDTO);
    return newProduct.save();
  }

  async updateProduct(
    id: string,
    createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      createProductDTO,
      { new: true },
    );
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<any> {
    const deletedProduct = await this.productModel.findOneAndDelete({
      _id: id,
    });
    return deletedProduct;
  }
}
