import { Between, getCustomRepository, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual } from "typeorm";

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
        const appointment = appointmentRepository.create({ detail, user, products, date });

        await appointmentRepository.save(appointment);

        return appointment;

    }

    async delete(id: string) {
        const appointmentRepository = getCustomRepository(AppointmentRepository)

        const appointment = await appointmentRepository
            .createQueryBuilder()
            .delete()
            .from(Appointment)
            .where("id = :id", { id })
            .execute();

        return appointment;

    }

    async getData(id: string) {
        const appointmentRepository = getCustomRepository(AppointmentRepository)

        const appointment = await appointmentRepository.findOne(id, { relations: ["user", "products"] });

        return appointment;
    }

    async list() {
        const appointmentRepository = getCustomRepository(AppointmentRepository)

        const appointment = await appointmentRepository.find({ relations: ["user", "products"] });

        return appointment;
    }

    async listByDate(date: Date) {
        const appointmentRepository = getCustomRepository(AppointmentRepository)

        const appointment = await appointmentRepository.find({ 
            relations: ["user", "products"],
            where:{
                date: Between(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`, `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`),
            }
        });
        
        return appointment;
    }

    async search(search: string){
        const appointmentRepository = getCustomRepository(AppointmentRepository)
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }

        const appointment = await appointmentRepository
            .createQueryBuilder()
            .where("detail like :search", { search: `%${search}%` })
            .orWhere("id like :search", { search: `%${search}%` })
            .getMany();

        return appointment;

    }

    async update({id, detail, user, products, date }: IAppointment) {
        const appointmentRepository = getCustomRepository(AppointmentRepository)

        const appointment = await appointmentRepository
            .createQueryBuilder()
            .update(Appointment)
            .set({ detail, user, date  })
            .where("id = :id", { id })
            .execute();

        const appoin = await this.getData(id);
        const products_ids = products.map(e =>{
            return e.id
        })
        
        appoin.products = appoin.products.filter(product => {
            return products_ids.includes(product.id)
        })

        await appointmentRepository.save(appoin);

        return appointment;

    }
}

export { AppointmentService };
