import { Router } from "express";

// Controller
import { FactoryController } from "../controllers/FactoryController";

// Service
import { UserService } from "../services/UserService";

// Auth
import { helpers } from "../lib/auth"


const routerUser = Router();

const userController =FactoryController.generateController(
  ["username", "email", "phone", "city", "state" ],
  ["id", "username", "email", "phone", "city", "state", "gender", "lastname", "name"],
  "User",
  new UserService()
);

// Home
routerUser.get("/", (request, response) => {
  response.render("base/home");
});


routerUser.get("/user", helpers.isLoggedIn, (request, response) => {
  userController.list(request, response)
});

routerUser.get("/add", helpers.isLoggedIn, (request, response) => {
  userController.getForCreate(request, response)
});

routerUser.post("/add-user", helpers.isLoggedIn, (request, response) => {
  userController.create(request, response)
});

routerUser.get("/search-user", helpers.isLoggedIn, (request, response) => {
  userController.search(request, response)
});
routerUser.get("/edit", helpers.isLoggedIn, (request, response) => {
  userController.get(request, response)
});
routerUser.post("/edit-user", helpers.isLoggedIn, (request, response) => {
  userController.update(request, response)
});
routerUser.post("/delete-user", helpers.isLoggedIn, (request, response) => {
  userController.delete(request, response)
});

routerUser.get("/change-pass", helpers.isLoggedIn, (request, response) => {
  response.render("auth/change_pass");
});

// routerUser.post("/change-pass", helpers.isLoggedIn, (request, response) => {
//   userController.change_pass(request, response)
// });


export { routerUser };
