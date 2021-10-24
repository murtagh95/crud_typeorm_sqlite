import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import {User} from "../entities/User";
import { IService } from "./InterfaceService";

interface IUser {
    id?: string;
    username: string;
    password?: string;
    name?: string;
    lastname?: string;
    gender?: string;
    email: string;
    phone?: string;
    city?: string;
    state?: string;
    is_admin: boolean
}

class UserService implements IService {

    constructor() {
    }

    async create({ username, email, phone, city, state, password,
        name, lastname, gender, is_admin
    }: IUser) {
        if (!username || !email  ) {
            throw new Error("Por favor enviar todos los campos");
        }

        const usersRepository = getCustomRepository(UsersRepository);

        const usernameAlreadyExists = await usersRepository.findOne({ username });

        if (usernameAlreadyExists) {
            throw new Error("Usuario ya existe");
        }

        const emailAlreadyExists = await usersRepository.findOne({ email });

        if (emailAlreadyExists) {
            throw new Error("Email ya existe");
        }

        const user = usersRepository.create({ username, email, phone, city, state,
            name, lastname, gender, password, is_admin });

        await usersRepository.save(user);

        return user;

    }

    async delete(id: string) {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("id = :id", { id })
            .execute();

        return user;

    }

    async getData(id: string) {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne(id);

        return user;
    }
    async getDataToUsername(username: string) {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.find(
            { where: { username: username } }
        );

        return user;
    }

    async list() {
        const usersRepository = getCustomRepository(UsersRepository);

        const users = await usersRepository.find();

        return users;
    }

    async search(search: string){
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository
            .createQueryBuilder()
            .where("username like :search", { search: `%${search}%` })
            .orWhere("email like :search", { search: `%${search}%` })
            .orWhere("phone like :search", { search: `%${search}%` })
            .orWhere("city like :search", { search: `%${search}%` })
            .orWhere("state like :search", { search: `%${search}%` })
            .getMany();

        return user;

    }

    async update({id, username, email, phone, city, state, gender, lastname, name, is_admin }: IUser) {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository
            .createQueryBuilder()
            .update(User)
            .set({ username, email , phone, city, state, gender, lastname, name, is_admin  })
            .where("id = :id", { id })
            .execute();

        return user;

    }
}

export { UserService };
