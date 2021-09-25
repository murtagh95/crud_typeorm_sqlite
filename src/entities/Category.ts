import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { Product } from "./Product";
import { BaseEntity } from "./baseEntity";

@Entity("category")
class Category  extends BaseEntity {

  @Column()
  name: string;

  @OneToMany(() => Product, product => product.category)
  product: Product[];

  constructor() {
    super()
  }

}

export { Category };