import { Repository, EntityRepository } from "typeorm";
import { ImageProduct } from "../entities/ImageProduct";

@EntityRepository(ImageProduct)
class UsersRepository extends Repository<ImageProduct>{ }

export { UsersRepository };