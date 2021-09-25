import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { IEntities } from "./InterfaceEntities";

export abstract class BaseEntity implements IEntities {

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
    @PrimaryColumn()
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}