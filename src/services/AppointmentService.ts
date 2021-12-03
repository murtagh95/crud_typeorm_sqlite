import { getCustomRepository } from "typeorm";

// Repository
import { AppointmentRepository } from "../repositories/AppointmentRepository";

// Entities
import { Appointment } from "../entities/Appointments"
import { IService } from "./InterfaceService";
import { Product } from "../entities/Product";
import { User } from "../entities/User";

export interface IAppointment {
    id?: string;
    detail: string;
    products: Product[];
    user: User;
    date: Date;
}

class AppointmentService implements IService {

    constructor() {
    }

    async create({ detail, user, products, date }: IAppointment) {
        const appointmentRepository = getCustomRepository(AppointmentRepository)

        if (!detail || !user || !products || !date ) {
            throw new Error("Por favor enviar todos los campos");
        }
        const category = appointmentRepository.create({ detail, user, products, date });

        await appointmentRepository.save(category);

        return category;

    }

    async delete(id: string) {
        const appointmentRepository = getCustomRepository(AppointmentRepository)

        const category = await appointmentRepository
            .createQueryBuilder()
            .delete()
            .from(Appointment)
            .where("id = :id", { id })
            .execute();

        return category;

    }

    async getData(id: string) {
        const appointmentRepository = getCustomRepository(AppointmentRepository)

        const category = await appointmentRepository.findOne(id, { relations: ["user", "products"] });

        return category;
    }

    async list() {
        const appointmentRepository = getCustomRepository(AppointmentRepository)

        const category = await appointmentRepository.find({ relations: ["user", "products"] });

        return category;
    }

    async search(search: string){
        const appointmentRepository = getCustomRepository(AppointmentRepository)
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }

        const category = await appointmentRepository
            .createQueryBuilder()
            .where("detail like :search", { search: `%${search}%` })
            .orWhere("id like :search", { search: `%${search}%` })
            .getMany();

        return category;

    }

    async update({id, detail, user, products, date }: IAppointment) {
        const appointmentRepository = getCustomRepository(AppointmentRepository)

        const category = await appointmentRepository
            .createQueryBuilder()
            .update(Appointment)
            .set({ detail, user, products, date  })
            .where("id = :id", { id })
            .execute();

        return category;

    }
}

export { AppointmentService };
