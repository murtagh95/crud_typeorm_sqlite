import { Column, JoinTable, Entity, PrimaryColumn, ManyToMany } from "typeorm";
import { Product } from "./Product"
import { v4 as uuid } from "uuid";

@Entity("category")
class Category {

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(type => Product, product => product.category, {
    cascade: true
  })
  @JoinTable()
  product: Product[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { Category };