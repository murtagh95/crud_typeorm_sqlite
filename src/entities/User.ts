import { Column, Entity } from "typeorm";

import { BaseEntity } from "./baseEntity";

@Entity("users")
class User extends BaseEntity {

  @Column()
  username: string;

  @Column()
  password: string;
  
  @Column({
    nullable: true,
  })
  name!: string;
  
  @Column({
    nullable: true,
  })
  lastname!: string;
  
  @Column({
    nullable: true,
  })
  gender!: string;
  
  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({
    nullable: true,
  })
  city!: string;

  @Column({
    nullable: true,
  })
  state!: string;

  constructor() {
    super()
  }

}

export { User };