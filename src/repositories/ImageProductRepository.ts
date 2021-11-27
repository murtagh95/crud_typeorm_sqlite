import { Repository, EntityRepository } from "typeorm";
import { ImageProduct } from "../entities/ImageProduct";

@EntityRepository(ImageProduct)
class ImageProductRepository extends Repository<ImageProduct>{ }

export { ImageProductRepository };