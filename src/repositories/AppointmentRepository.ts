import { Repository, EntityRepository } from "typeorm";
import { Appointment } from "../entities/Appointments";

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{ }

export { AppointmentsRepository };