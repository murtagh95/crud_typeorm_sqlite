import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Category } from "./Category";
import { BaseEntity } from "./baseEntity";

@Entity("product")
class Product  extends BaseEntity{

  @Column()
  name: string;

  @Column({ type: "double" })
  price: number;

  @Column({
    type: "varchar",
    length: 1,
  })
  type: string;

  @ManyToOne(() => Category, category => category.product)
  @JoinColumn({name: "category_fk_id"})
  category: Category;

  constructor() {
    super()
  }

}

export { Product };