import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
    async create(request: Request, response: Response) {
        const { username, email, phone, city, state } = request.body;

        const userService = new UserService();

        try {
            await userService.create({
                username,
                email,
                phone,
                city,
                state
            }).then(() => {
                response.render("User/message", {
                    message: "Usuario creado con exito"
                });
            });
        } catch (err) {
            response.render("User/message", {
                message: `Erro al crear el usuario: ${err.message}`
            });
        }

    }

    async delete(request: Request, response: Response) {
        const { id } = request.body;

        const userService = new UserService();

        try {
            await userService.delete(id).then(() => {
                response.render("User/message", {
                    message: "Usuario eliminado con exito"
                });
            });
        } catch (err) {
            response.render("User/message", {
                message: `Error al eliminar usuario: ${err.message}`
            });
        }
    }

    async get(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();

        const userService = new UserService();

        const user = await userService.getData(id);

        return response.render("User/edit", {
            user: user
        });
    }

    async list(request: Request, response: Response) {
        const userService = new UserService();

        const users = await userService.list();

        return response.render("User/index", {
            users: users
        });
    }

    async search(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();

        const userService = new UserService();

        try {
            const users = await userService.search(search);
            response.render("User/search", {
                users: users,
                search: search
            });
        } catch (err) {
            response.render("User/message", {
                message: `Error al buscar usuario: ${err.message}`
            });
        }
    }

    async update(request: Request, response: Response) {
        const { id, username, email, phone, city, state } = request.body;

        const userService = new UserService();

        try {
            await userService.update({ id, username, email, phone, city, state }).then(() => {
                response.render("User/message", {
                    message: "Usuario actualizado con exito"
                });
            });
        } catch (err) {
            response.render("User/message", {
                message: `Error al actualizar usuario: ${err.message}`
            });
        }

    }

}

export { UserController };

