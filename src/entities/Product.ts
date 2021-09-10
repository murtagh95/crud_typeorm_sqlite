import { Column, Entity, PrimaryColumn, ManyToMany } from "typeorm";
import { Category } from "./Category"
import { v4 as uuid } from "uuid";

@Entity("product")
class Product {

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: "double" })
  price: number;

  @Column({
    type: "varchar",
    length: 1,
  })
  type: string;

  @ManyToMany(type => Category, category => category.product)
  category: Category[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { Product };