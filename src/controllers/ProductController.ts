import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { CategoryService } from "../services/CategoryService";

class ProductController {

    async create(request: Request, response: Response) {
        const productService = new ProductService();

        const { name, price, type } = request.body;

        try {
            await productService.create({
                name,
                price,
                type
            }).then(() => {
                response.render("Product/message", {
                    message: "Producto creado con exito"
                });
            });
        } catch (err) {
            response.render("Product/message", {
                message: `Erro al crear el producto: ${err.message}`
            });
        }

    }

    async delete(request: Request, response: Response) {
        const productService = new ProductService();
        const { id } = request.body;

        try {
            await productService.delete(id).then(() => {
                response.render("Product/message", {
                    message: "Producto eliminado con exito"
                });
            });
        } catch (err) {
            response.render("Product/message", {
                message: `Error al eliminar producto: ${err.message}`
            });
        }
    }

    async get(request: Request, response: Response) {
        const productService = new ProductService();
        const categoryService = new CategoryService();
        let { id } = request.query;
        id = id.toString();

        const product = await productService.getData(id);
        const category = await categoryService.list();
        
        return response.render("Product/edit", {
            product: product,
            category: category
        });
    }

    async list(request: Request, response: Response) {
        const productService = new ProductService();
        const product = await productService.list();

        return response.render("Product/index", {
            product: product,
            search: false
        });
    }

    async search(request: Request, response: Response) {
        const productService = new ProductService();
        let { search } = request.query;
        search = search.toString();

        try {
            const product = await productService.search(search);
            response.render("Product/index", {
                product: product,
                search: search
            });
        } catch (err) {
            response.render("Product/message", {
                message: `Error al buscar producto: ${err.message}`
            });
        }
    }

    async update(request: Request, response: Response) {
        const productService = new ProductService();
        const { id, name, price, type, category } = request.body;
        
        console.error(category)

        try {
            await productService.update({ id, name, price, type, category }).then(() => {
                response.render("Product/message", {
                    message: "Producto actualizado con exito"
                });
            });
        } catch (err) {
            response.render("Product/message", {
                message: `Error al actualizar Producto: ${err.message}`
            });
        }

    }

}

export { ProductController };
