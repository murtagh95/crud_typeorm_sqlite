import { getCustomRepository } from "typeorm";

// Repository
import { ProductRepository } from "../repositories/ProductRepository";

// Entities
import { Category } from "../entities/Category"
import { Product } from "../entities/Product"

interface IProduct {
    id?: string;
    name: string;
    price: number;
    type: string;
    category?: Category;
}

class ProductService {

    constructor() {
    }

    async create({ name, price, type }: IProduct) {
        const productRepository = getCustomRepository(ProductRepository)

        if (!name || !price || !type) {
            throw new Error("Por favor enviar todos los campos");
        }
        const product = productRepository.create({ name, price, type });

        await productRepository.save(product);

        return product;

    }

    async delete(id: string) {
        const productRepository = getCustomRepository(ProductRepository)

        const product = await productRepository
            .createQueryBuilder()
            .delete()
            .from(Product)
            .where("id = :id", { id })
            .execute();

        return product;

    }

    async getData(id: string) {
        const productRepository = getCustomRepository(ProductRepository)

        const product = await productRepository.findOne(id);

        return product;
    }

    async list() {
        const productRepository = getCustomRepository(ProductRepository)

        const product = await productRepository.find();

        return product;
    }

    async search(search: string){
        const productRepository = getCustomRepository(ProductRepository)
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }

        const product = await productRepository
            .createQueryBuilder()
            .where("name like :search", { search: `%${search}%` })
            .orWhere("price like :search", { search: `%${search}%` })
            .orWhere("type like :search", { search: `%${search}%` })
            .getMany();

        return product;

    }

    async update({id, name, price, type }: IProduct) {
        const productRepository = getCustomRepository(ProductRepository)

        const product = await productRepository
            .createQueryBuilder()
            .update(Product)
            .set({ name, price , type  })
            .where("id = :id", { id })
            .execute();

        return product;

    }
}

export { ProductService };
