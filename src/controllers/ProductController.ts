import { Request, Response } from "express";
import { GenericController } from "./GenericController";

// Service
import { IService } from "../services/InterfaceService";
import { CategoryService } from "../services/CategoryService";
import { ImageProductService } from "../services/ImageProductService";
import { Product } from "../entities/Product";


class ProductController extends GenericController {
    private categoryService = new CategoryService();
    private imageProductService = new ImageProductService();
    constructor(
        protected data_create: string[],
        protected data_update: string[],
        protected type_controller: string,
        protected service: IService
    ){
        super(data_create, data_update, type_controller, service)
    }


    async create(request: Request, response: Response) {
        const data = this.get_data_request(request.body, this.data_create)

        if(!!data["category"]){
            const category = await this.categoryService.getData(
                data["category"].toString()
            );
            data["category"] = category  
        }
        else{
            data["category"] = null
        }


        try {
            await this.service.create( data ).then((product) => {
                if(request.files && product instanceof Product ){
                    const image = this.imageProductService.create(request.file.filename, product)
                }

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

    async getForCreate(request: Request, response: Response) {
        const category = await this.categoryService.list();
        return response.render("Product/add", {
            categories: category
        });
    }

    async get(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();

        const product = await this.service.getData(id);
        const category = await this.categoryService.list();
        
        return response.render("Product/edit", {
            register: product,
            categories: category
        });
    }

    async update(request: Request, response: Response) {
        const data = this.get_data_request(request.body, this.data_update)
        
        const category = await this.categoryService.getData(
            data["category"].toString()
        );
        data["category"] = category
        
        try {
            await this.service.update( data ).then((product) => {
                
                if(request.files && product instanceof Product ){
                    for (let i = 0; i < request.files.length; i++) {
                        const file = request.files[i];
                        const image = this.imageProductService.create(file.filename, product)    
                        
                    }
                    
                }

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
