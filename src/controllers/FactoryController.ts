// Service
import { IService } from "../services/InterfaceService";

// Controller
import { GenericController } from "./GenericController";
import { IController } from "./InterfaceController";
import { ProductController } from "./ProductController";

class FactoryController {

    static generateController(
        data_create: string[],
        data_update: string[],
        type_controller: string,
        service: IService
    ): IController {
        if (type_controller === "Product") {
            return new ProductController(
                data_create,
                data_update,
                type_controller,
                service,
            )
        }else{
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

