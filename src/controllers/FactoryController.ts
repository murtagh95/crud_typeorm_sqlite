// Service
import { IService } from "../services/InterfaceService";

// Controller
import { GenericController } from "./GenericController";
import { IController } from "./InterfaceController";
import { UserController } from "./UserController";
import { ProductController } from "./ProductController";

class FactoryController {

    static generateController(
        data_create: string[],
        data_update: string[],
        type_controller: "User" | "Category" | "Product",
        service: IService
    ): IController {
        if (type_controller === "Product") {
            return new ProductController(
                data_create,
                data_update,
                type_controller,
                service,
            )
        }
        else if (type_controller === "User"){
            return new UserController(
                data_create,
                data_update,
                type_controller,
                service,
            )
        }
        else{
            return new GenericController(
                data_create,
                data_update,
                type_controller,
                service,
            )
        }
    }
}

export { FactoryController };

