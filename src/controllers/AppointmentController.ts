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

    async generateData(body: object){
        // Busco el usuario
        const user = await this.userService.getData(
            body["user"].toString()
        );
        
        // Busco lo/s porductos 
        let products: Product[] = [];
        if(typeof(body["products"]) === "string"){
            const product = await this.productService.getData(
                body["products"].toString()
            );
            products.push(product);
        }
        else{
            for (let i = 0; i < body["products"].length; i++) {
                
                const product = await this.productService.getData(
                    body["products"][i].toString()
                );
                products.push(product);                    
            }
        }
        
        const data: IAppointment = {
            detail: body["detail"].toString(),
            products,
            user,
            date: new Date(body["date"])  // Paso el str de la fecha a un objeto
        };

        return data
    }

    async create(request: Request, response: Response) {
        
        if (!request.body["detail"] || !request.body["user"] || !request.body["products"] || !request.body["date"] ) {
            return response.render("Appointment/message", {
                message: `Se deben cargar todos los campos del formulario`
            });
        }
        
        const new_data: IAppointment = await this.generateData(request.body)

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
        
        const appointments = await this.service.listByDate(new Date())
        const head: string = 'Nombre cliente, Productos, Fecha, Detalle, Precio total\n';
        let content: string = "";
        let product = "";
        let product_total = 0;

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
            content += `${e.user.name || "Sin nombre"},${product},${e.date.toLocaleDateString()} ${e.date.toLocaleTimeString()},${e.detail},${product_total}\n`;
        });
        
        
        return response.json({
            metadata: head + content
        })
    }

    async update(request: Request, response: Response) {
        if (!request.body["id"] || !request.body["detail"] || !request.body["user"] || !request.body["products"] || !request.body["date"] ) {
            return response.render("Appointment/message", {
                message: `Se deben cargar todos los campos del formulario`
            });
        }
        
        let new_data: IAppointment = await this.generateData(request.body)
        new_data = {...new_data, id :request.body["id"]}
        
        try {
            await this.service.update( new_data ).then(() => {
                
                response.render("Appointment/message", {
                    message: "Producto actualizado con exito"
                });
            });
        } catch (err) {
            response.render("Appointment/message", {
                message: `Error al actualizar Producto: ${err.message}`
            });
        }

    }

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
