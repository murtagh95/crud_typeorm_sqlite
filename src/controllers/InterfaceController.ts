import { Request, Response } from "express";

export interface IController{

    get_data_request(body: object, data_search: string[]): object
    create(request: Request, response: Response)
    delete(request: Request, response: Response)
    get(request: Request, response: Response)
    list(request: Request, response: Response)
    search(request: Request, response: Response)
    update(request: Request, response: Response)
    getForCreate(request: Request, response: Response)
}