import { Column, Entity, OneToMany } from "typeorm";

// Entities
import { BaseEntity } from "./baseEntity";
import { Appointments } from "./Appointments";

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

  @Column()
  is_admin: boolean;

  @OneToMany(() => Appointments, appointments => appointments.user)
  appointments: Appointments[];

  constructor() {
    super()
  }

}

export { User };