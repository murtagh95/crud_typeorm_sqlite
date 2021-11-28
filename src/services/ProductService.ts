import { getCustomRepository } from "typeorm";

// Repository
import { ProductRepository } from "../repositories/ProductRepository";

// Entities
import { Product } from "../entities/Product"
import { IService } from "./InterfaceService";
import { Category } from "../entities/Category";

interface IProduct {
    id?: string;
    name: string;
    price: number;
    type: string;
    category?: Category;
}

class ProductService implements IService {

    async create({ name, price, type, category }: IProduct) {
        const productRepository = getCustomRepository(ProductRepository)

        if (!name || !price || !type || !category) {
            throw new Error("Por favor enviar todos los campos");
        }
        const product = productRepository.create({ name, price, type });
        product.category = category

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

        const product = await productRepository.findOne(id, { relations: ["category", "images"] });

        return product;
    }

    async list() {
        const productRepository = getCustomRepository(ProductRepository)
        
        const products = await productRepository.find({ relations: ["category", "images"] });
        
        return products;
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

    async update({id, name, price, type, category }: IProduct) {
        const productRepository = getCustomRepository(ProductRepository)

        const product = await productRepository
            .createQueryBuilder()
            .update(Product)
            .set({ name, price , type, category })
            .where("id = :id", { id })
            .execute();

        return this.getData(id);

    }
}

export { ProductService };
