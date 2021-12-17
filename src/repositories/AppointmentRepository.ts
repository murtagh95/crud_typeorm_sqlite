import { Repository, EntityRepository } from "typeorm";
import { Appointment } from "../entities/Appointments";

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment>{ }

export { AppointmentRepository };