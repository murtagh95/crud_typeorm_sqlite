import { Router } from "express";

// Controller
import { AppointmentController } from "../controllers/AppointmentController";

// Service
import { AppointmentService } from "../services/AppointmentService";

// Auth
import { helpers } from "../lib/auth"


const routerAppointment = Router();

const appointmentController = new AppointmentController(
  ["detail", "user", "products", "date"],
  ["id", "detail", "user", "products", "date"],
  "Appointment",
  new AppointmentService()
);

routerAppointment.get("/appointments", (request, response) => {
  response.json({"dateNotAvailable": [3, 10 , 20]});
});

// Calendar
routerAppointment.get("/calendar", (request, response) => {
  return response.render("single_page/calendar");
});

routerAppointment.get("/appointment", helpers.isLoggedIn, (request, response) => {
  appointmentController.list(request, response)
});

routerAppointment.get("/add-appointment", helpers.isLoggedIn, (request, response) => {
  appointmentController.getForCreate(request, response)
});


routerAppointment.post("/add-appointment", helpers.isLoggedIn, (request, response) => {
  appointmentController.create(request, response)
});

routerAppointment.get("/search-appointment", helpers.isLoggedIn, (request, response) => {
  appointmentController.search(request, response)
});

routerAppointment.get("/edit-appointment", helpers.isLoggedIn, (request, response) => {
  appointmentController.get(request, response)
});


routerAppointment.post("/edit-appointment", helpers.isLoggedIn, (request, response) => {
  appointmentController.update(request, response)
});

routerAppointment.post("/delete-appointment", helpers.isLoggedIn, (request, response) => {
  appointmentController.delete(request, response)
});

routerAppointment.get("/get-today-appointment", helpers.isLoggedIn, (request, response) => {
  appointmentController.get_today(request, response)
});



export { routerAppointment };
