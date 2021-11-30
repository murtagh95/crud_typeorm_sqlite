import { Router } from "express";

// Controller
import { UserController } from "../controllers/UserController";

// Service
import { UserService } from "../services/UserService";

// Auth
import { helpers } from "../lib/auth"


const routerUser = Router();

const userController = new UserController(
  ["username", "email", "phone", "city", "state" ],
  ["id", "username", "email", "phone", "city", "state", "gender", "lastname", "name"],
  "User",
  new UserService()
);


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
