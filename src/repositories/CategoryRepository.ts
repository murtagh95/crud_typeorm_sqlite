import { Repository, EntityRepository } from "typeorm";
import { Category } from "../entities/Category";

@EntityRepository(Category)
class CategoryRepository extends Repository<Category>{ }

export { CategoryRepository };