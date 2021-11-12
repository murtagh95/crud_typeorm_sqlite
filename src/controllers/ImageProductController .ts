import { Request, Response } from "express";


// Service
import { ImageProductService } from "../services/ImageProductService";


class ImageProductController{

    
    private service = new ImageProductService();



    async get(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
        
        const product = await this.service.getData(id);
        
        return response.render("ImageProduct/edit", {
            register: product,
        });
    }

    async update(request: Request, response: Response) {
        let { is_main, id } = request.body;
        id = id.toString();
        is_main = Boolean(is_main);
        
        try {
            await this.service.update( {is_main, id} ).then(() => {
                
                response.render("Product/message", {
                    message: "Imagen actualizada con exito"
                });
            });
        } catch (err) {
            response.render("Product/message", {
                message: `Error al actualizar Imagen: ${err.message}`
            });
        }

    }

}

export { ImageProductController };
