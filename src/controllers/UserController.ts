import { Request, Response } from "express";
import { GenericController } from "./GenericController";

// Service
import { IService } from "../services/InterfaceService";
import { CategoryService } from "../services/CategoryService";

// Helpers
import {helpers} from '../lib/helpers';

// Models
import { User } from "../entities/User";

class UserController extends GenericController {
    private categoryService = new CategoryService();
    constructor(
        protected data_create: string[],
        protected data_update: string[],
        protected type_controller: string,
        protected service: IService
    ){
        super(data_create, data_update, type_controller, service)
    }


    // async change_pass(request: Request, response: Response) {
    //     const { password, new_pass, new_pass_confirmation } = request.body
                
    //     const user: User = await this.service.getData(request.user.id);

    //     const validPassword = await helpers.matchPassword(password, user.password);
    //     if (validPassword) {
    //         done(null, user);
    //     }else {
    //         request.flash('message', 'Contraseña incorrectos');
    //         response.render("/message", {
    //             message: "Producto creado con exito"
    //         });
    //     }
        // try {
        //     await this.service.create( data ).then(() => {
        //         response.render("Product/message", {
        //             message: "Producto creado con exito"
        //         });
        //     });
        // } catch (err) {
        //     response.render("Product/message", {
        //         message: `Erro al crear el producto: ${err.message}`
        //     });
        // }

    // }

}

export { UserController };
