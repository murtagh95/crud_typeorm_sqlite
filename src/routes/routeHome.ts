// Utilitie
import { Router } from "express";

// Controller
import { HomeController } from "../controllers/HomeController";

// Service
import { ProductService } from "../services/ProductService";

// Auth
import { helpers } from "../lib/auth"


const routerHome = Router();
const homeController = new HomeController();


// Home
routerHome.get("/", (request, response) => {
    homeController.get(request, response)
});

export { routerHome };