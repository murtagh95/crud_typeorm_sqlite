import { Request, Response } from "express";
import { GenericController } from "./GenericController";

// Service
import { ProductService } from "../services/ProductService";
import { UserService } from "../services/UserService";
import { Product } from "../entities/Product";
import { AppointmentService, IAppointment } from "../services/AppointmentService";


class AppointmentController extends GenericController {
    private productService = new ProductService();
    private userService = new UserService();

    constructor(
        protected data_create: string[],
        protected data_update: string[],
        protected type_controller: string,
        protected service: AppointmentService
    ){
        super(data_create, data_update, type_controller, service)
    }


    async create(request: Request, response: Response) {
        
        if (!request.body["detail"] || !request.body["user"] || !request.body["products"] || !request.body["date"] ) {
            throw new Error("Por favor enviar todos los campos");
        }
        
        // Busco el usuario
        const user = await this.userService.getData(
            request.body["user"].toString()
        );
        
        // Busco lo/s porductos 
        let products: Product[] = [];
        if(typeof(request.body["products"]) === "string"){
            const product = await this.productService.getData(
                request.body["products"].toString()
            );
            products.push(product);
        }
        else{
            for (let i = 0; i < request.body["products"].length; i++) {
                
                const product = await this.productService.getData(
                    request.body["products"][i].toString()
                );
                products.push(product);                    
            }
        }
        
        const new_data: IAppointment = {
            detail: request.body["detail"].toString(),
            products,
            user,
            date: new Date(request.body["date"])  // Paso el str de la fecha a un objeto
        };

        try {
            await this.service.create( new_data ).then(() => {
                response.render("Appointment/message", {
                    message: "Turno creado con exito"
                });
            });
        } catch (err) {
            response.render("Appointment/message", {
                message: `Erro al crear el turno: ${err.message}`
            });
        }

    }

    async getForCreate(request: Request, response: Response) {
        const products = await this.productService.list();
        const users = await this.userService.getDataToType(false);

        return response.render("Appointment/add", {
            products,
            users
        });
    }

    
    async get(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();

        const appointment = await this.service.getData(id);
        const products = await this.productService.list();
        const users = await this.userService.getDataToType(false);

        const idProductsInAppointment = appointment.products.map(element => element.id);
        
        
        return response.render("Appointment/edit", {
            register: appointment,
            products,
            users,
            idProductsInAppointment
        });
    }

    async get_today(request: Request, response: Response) {
        
        const appointments = await this.service.list();
        const head: string = 'Nombre cliente, Productos, Fecha, Detalle, Precio total\n';
        let content: string = "";
        let product = "";
        let product_total = 0;

        const app = await this.service.listByDate(new Date())
        console.log(app)

        appointments.forEach(e => {  
            product = "";
            product_total = 0;

            e.products.forEach((element, i) => {
                product += `${element.name}`;
                product_total += element.price;

                if(i !== e.products.length -1) {
                    product += " - ";
                }
            });
            content += `${e.user.name || "Sin nombre"},${product},${e.date.toLocaleDateString()},${e.detail},${product_total}\n`;
        });
        
        
        return response.json({
            metadata: head + content
        })
    }

    // async update(request: Request, response: Response) {
    //     const data = this.get_data_request(request.body, this.data_update)
        
    //     const category = await this.productService.getData(
    //         data["category"].toString()
    //     );
    //     data["category"] = category
        
    //     try {
    //         await this.service.update( data ).then((product) => {
                
    //             if(request.files && product instanceof Product ){
    //                 for (let i = 0; i < request.files.length; i++) {
    //                     const file = request.files[i];
    //                     const image = this.imageProductService.create(file.filename, product)    
    //                 }                    
    //             }
    //             response.render("Appointment/message", {
    //                 message: "Producto actualizado con exito"
    //             });
    //         });
    //     } catch (err) {
    //         response.render("Appointment/message", {
    //             message: `Error al actualizar Producto: ${err.message}`
    //         });
    //     }

    // }

    async get_detail(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();

        const product = await this.service.getData(id);
        
        return response.render("Appointment/detail", {
            product: product
        });
    }

}

export { AppointmentController };
