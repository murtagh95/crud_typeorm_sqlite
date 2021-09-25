import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { IEntities } from "./InterfaceEntities";


@Entity("users")
class User implements IEntities {

  @PrimaryColumn()
  id: string;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { User };