import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./Product";
import { BaseEntity } from "./baseEntity";

@Entity("imageProduct")
class ImageProduct  extends BaseEntity {

  @Column()
  name: string;

  @ManyToOne(() => Product, product => product.images)
  product: Product;

  constructor() {
    super()
  }

}

export { ImageProduct };