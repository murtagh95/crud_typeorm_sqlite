import { getCustomRepository } from "typeorm";
import { Product } from "../entities/Product";
import { ImageProductRepository } from "../repositories/ImageProductRepository";


class ImageProductService{

    constructor() {
    }

    async create(name: string, product: Product) {
        const imageProductRepository = getCustomRepository(ImageProductRepository)

        if (!name || !product) {
            throw new Error("Por favor enviar todos los campos");
        }
        
        const image = imageProductRepository.create({ name, is_main:false });
        image.product = product

        await imageProductRepository.save(image);

        return image;

    }

}

export { ImageProductService };
