import { getCustomRepository } from "typeorm";

// Repository
import { CategoryRepository } from "../repositories/CategoryRepository";

// Entities
import { Category } from "../entities/Category"

interface ICategory {
    id?: string;
    name: string;
}

class CategoryService {

    constructor() {
    }

    async create({ name }: ICategory) {
        const categoryRepository = getCustomRepository(CategoryRepository)

        if (!name ) {
            throw new Error("Por favor enviar todos los campos");
        }
        const category = categoryRepository.create({ name });

        await categoryRepository.save(category);

        return category;

    }

    async delete(id: string) {
        const categoryRepository = getCustomRepository(CategoryRepository)

        const category = await categoryRepository
            .createQueryBuilder()
            .delete()
            .from(Category)
            .where("id = :id", { id })
            .execute();

        return category;

    }

    async getData(id: string) {
        const categoryRepository = getCustomRepository(CategoryRepository)

        const category = await categoryRepository.findOne(id);

        return category;
    }

    async list() {
        const categoryRepository = getCustomRepository(CategoryRepository)

        const category = await categoryRepository.find();

        return category;
    }

    async search(search: string){
        const categoryRepository = getCustomRepository(CategoryRepository)
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }

        const category = await categoryRepository
            .createQueryBuilder()
            .where("name like :search", { search: `%${search}%` })
            .orWhere("price like :search", { search: `%${search}%` })
            .orWhere("type like :search", { search: `%${search}%` })
            .getMany();

        return category;

    }

    async update({id, name }: ICategory) {
        const categoryRepository = getCustomRepository(CategoryRepository)

        const category = await categoryRepository
            .createQueryBuilder()
            .update(Category)
            .set({ name  })
            .where("id = :id", { id })
            .execute();

        return category;

    }
}

export { CategoryService };
