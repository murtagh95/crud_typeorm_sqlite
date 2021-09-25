import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

import { BaseEntity } from "./baseEntity";


@Entity("users")
class User extends BaseEntity {



  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  city: string;

  @Column()
  state: string;

  constructor() {
    super()
  }

}

export { User };