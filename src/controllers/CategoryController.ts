import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";

class CategoryController {

    async create(request: Request, response: Response) {
        const categoryService = new CategoryService();

        const { name } = request.body;

        try {
            await categoryService.create({
                name
            }).then(() => {
                response.render("Category/message", {
                    message: "Categoria creado con exito"
                });
            });
        } catch (err) {
            response.render("Category/message", {
                message: `Erro al crear el categoria: ${err.message}`
            });
        }

    }

    async delete(request: Request, response: Response) {
        const categoryService = new CategoryService();
        const { id } = request.body;

        try {
            await categoryService.delete(id).then(() => {
                response.render("Category/message", {
                    message: "Categoria eliminado con exito"
                });
            });
        } catch (err) {
            response.render("Category/message", {
                message: `Error al eliminar categoria: ${err.message}`
            });
        }
    }

    async get(request: Request, response: Response) {
        const categoryService = new CategoryService();
        let { id } = request.query;
        id = id.toString();

        const category = await categoryService.getData(id);

        return response.render("Category/edit", {
            category: category
        });
    }

    async list(request: Request, response: Response) {
        const categoryService = new CategoryService();
        const category = await categoryService.list();

        return response.render("Category/index", {
            category: category,
            search: false
        });
    }

    async search(request: Request, response: Response) {
        const categoryService = new CategoryService();
        let { search } = request.query;
        search = search.toString();

        try {
            const category = await categoryService.search(search);
            response.render("Category/index", {
                category: category,
                search: search
            });
        } catch (err) {
            response.render("Category/message", {
                message: `Error al buscar categoria: ${err.message}`
            });
        }
    }

    async update(request: Request, response: Response) {
        const categoryService = new CategoryService();
        const { id, name } = request.body;


        try {
            await categoryService.update({ id, name }).then(() => {
                response.render("Category/message", {
                    message: "Categoria actualizado con exito"
                });
            });
        } catch (err) {
            response.render("Category/message", {
                message: `Error al actualizar categoria: ${err.message}`
            });
        }

    }

}

export { CategoryController };

