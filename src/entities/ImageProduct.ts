import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./Product";
import { BaseEntity } from "./baseEntity";

@Entity("imageProduct")
class ImageProduct  extends BaseEntity {

  @Column()
  name: string;

  @ManyToOne(type => Product, { 
    onDelete: "CASCADE" 
  })
  @JoinColumn({name: "product_fk_id"})
  product: Product;

  constructor() {
    super()
  }

}

export { ImageProduct };