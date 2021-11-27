import { getCustomRepository } from "typeorm";
import { Product } from "../entities/Product";
import { ImageProduct } from "../entities/ImageProduct";
import { ImageProductRepository } from "../repositories/ImageProductRepository";


interface Iimage{
    id: string,
    is_main: boolean
}

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

    async getData(id: string) {
        const imageProductRepository = getCustomRepository(ImageProductRepository)
        
        const image = await imageProductRepository.findOne(id);

        return image;
    }

    async update( {is_main, id}: Iimage ) {
        const imageProductRepository = getCustomRepository(ImageProductRepository)

        const image = await imageProductRepository
            .createQueryBuilder()
            .update(ImageProduct)
            .set({ is_main })
            .where("id = :id", { id })
            .execute();

        return image;

    }

}

export { ImageProductService };
