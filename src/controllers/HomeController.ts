import { Request, Response } from "express";

// Service
import { ProductService } from "../services/ProductService";
import { CategoryService } from "../services/CategoryService";


class HomeController{
    private categoryService = new CategoryService();
    private productService = new ProductService();

    async get(request: Request, response: Response) {
        const products = await this.productService.list();
        const categories = await this.categoryService.list();
        products.forEach(product => console.log(product.images))
        return response.render("base/home", {
            products: products,
            categories: categories
        });
    }

}

export { HomeController };
