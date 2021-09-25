import { Router } from "express";

// Controller
import { FactoryController } from "../controllers/FactoryController";

// Service
import { UserService } from "../services/UserService";

const routerUser = Router();

const userController =FactoryController.generateController(
  ["username", "email", "phone", "city", "state" ],
  ["id", "username", "email", "phone", "city", "state"],
  "User",
  new UserService()
);

// Home
routerUser.get("/", (request, response) => {
  response.render("base/home");
});


routerUser.get("/user", (request, response) => {
  userController.list(request, response)
});

routerUser.get("/add",(request, response) => {
  userController.getForCreate(request, response)
});

routerUser.post("/add-user",(request, response) => {
  userController.create(request, response)
});

routerUser.get("/search", (request, response) => {
  userController.search(request, response)
});
routerUser.get("/edit", (request, response) => {
  userController.get(request, response)
});
routerUser.post("/edit-user", (request, response) => {
  userController.update(request, response)
});
routerUser.post("/delete-user", (request, response) => {
  userController.delete(request, response)
});


export { routerUser };
