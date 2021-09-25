import { IEntities } from "../entities/InterfaceEntities";

export interface IService {

    create(any): Promise<IEntities>
    delete(id: string): Promise<any>
    getData(id: string): Promise<IEntities>
    list(): Promise<IEntities[]>
    search(search: string): Promise<IEntities[]>
    update(any): Promise<any>
}
