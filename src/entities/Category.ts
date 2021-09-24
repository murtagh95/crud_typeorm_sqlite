import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { Product } from "./Product"
import { v4 as uuid } from "uuid";

@Entity("category")
class Category {

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Product, product => product.category)
  product: Product[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { Category };