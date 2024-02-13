import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/db/entities/product.entity";
import type { Repository } from "typeorm";

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) { }


    async getProducts() {
        try {
            return await this.productRepository.find();
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async addProducts(products) {
        try {
            const product = this.productRepository.create(products);
            return this.productRepository.save(product);
        } catch (error) {
            throw new BadRequestException()
        }

    }
}