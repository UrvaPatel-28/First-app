import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller('products')
export class ProductController {

    constructor(@Inject(ProductService) private readonly productService: ProductService) { }

    @Get()
    getProducts() {
        return this.productService.getProducts();
    }

    @Post()
    addProducts(@Body() body) {
        return this.productService.addProducts(body);
    }
}//