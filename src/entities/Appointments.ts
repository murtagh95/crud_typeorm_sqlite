import { Column, Entity, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";

import { BaseEntity } from "./baseEntity";
import { IEntities } from "./InterfaceEntities";
import { Product } from "./Product";
import { User } from "./User";

@Entity("appointments")
class Appointment extends BaseEntity implements IEntities {

  @ManyToOne(() => User, user => user.appointment)
  @JoinColumn({name: "user_fk_id"})
  user: User;

  @ManyToMany(() => Product, { 
    cascade: true 
  })

  @JoinTable()
  products: Product[];

  @Column()
  detail: string;

  @Column()
  date: Date;


  constructor() {
    super()
  }

}

export { Appointment };