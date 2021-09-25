import { Request, Response } from "express";
import { IService } from "../services/InterfaceService";
import { IController } from "./InterfaceController";

class GenericController implements IController {

    constructor(
        protected data_create: string[],
        protected data_update: string[],
        protected type_controller: string,
        protected service: IService
    ){}

    get_data_request(body: object, data_search: string[]): object{
        let data = {}
        for(let data_create of data_search){
            data[data_create] = body[data_create]
        }
        return data
    }

    getForCreate(request: Request, response: Response){
        return response.render(this.type_controller + "/add");
    }

    async create(request: Request, response: Response) {
        const data = this.get_data_request(request.body, this.data_create);
        
        try {
            await this.service.create(data).then(() => {
                response.render(this.type_controller+"/message", {
                    message: "Registro creado con exito"
                });
            });
        } catch (err) {
            response.render(this.type_controller+"/message", {
                message: `Erro al crear el registro: ${err.message}`
            });
        }

    }

    async delete(request: Request, response: Response) {
        const { id } = request.body;
        try {
            await this.service.delete(id).then(() => {
                response.render(this.type_controller+"/message", {
                    message: "Registro eliminado con exito"
                });
            });
        } catch (err) {
            response.render(this.type_controller+"/message", {
                message: `Error al eliminar registro: ${err.message}`
            });
        }
    }

    async get(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();

        const data = await this.service.getData(id);

        return response.render(this.type_controller+"/edit", {
            register: data
        });
    }

    async list(request: Request, response: Response) {
        const data = await this.service.list();
                
        return response.render(this.type_controller+"/index", {
            registers: data,
            search: false
        });
    }

    async search(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();


        try {
            const data = await this.service.search(search);
            response.render(this.type_controller + "/index", {
                registers: data,
                search: search
            });
        } catch (err) {
            response.render(this.type_controller + "/message", {
                message: `Error al buscar registro: ${err.message}`
            });
        }
    }

    async update(request: Request, response: Response) {
        const data = this.get_data_request(request.body, this.data_update);

        try {
            await this.service.update( data ).then(() => {
                response.render(this.type_controller+"/message", {
                    message: "Registro actualizado con exito"
                });
            });
        } catch (err) {
            response.render(this.type_controller+"/message", {
                message: `Error al actualizar registro: ${err.message}`
            });
        }

    }

}

export { GenericController };

