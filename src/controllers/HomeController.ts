import { json, Request, Response } from "express";

// Service
import { ProductService } from "../services/ProductService";
import { CategoryService } from "../services/CategoryService";


class HomeController{
    private categoryService = new CategoryService();
    private productService = new ProductService();

    async get(request: Request, response: Response) {
        const products = await this.productService.list();
        const categories = await this.categoryService.list();

        let new_products = products.map(product => {
            let link = ''
            if(product.images.length !== 0){
                product.images.forEach(function(image) { 
                    if(image.is_main){ 
                      link = "media/img/product/" + image.name
                    }
                })
                if(!link){
                    link = "media/img/product/" + product.images[0].name
                }
            }
            else{
                link = "/img/product_default.jpg"
            }
            
            product['link_img'] = link
            return product
        })
        
        return response.render("base/home", {
            products: new_products,
            categories: categories
        });
    }

}

export { HomeController };
