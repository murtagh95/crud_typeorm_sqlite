import { Router } from "express";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();

router.get("/", userController.list);

router.get("/add", (request, response) => {
  response.render("add");
});

router.post("/add-user", userController.create);

router.get("/search", userController.search);

router.get("/edit", userController.get);

router.post("/edit-user", userController.update);

router.post("/delete-user", userController.delete);

export { router };
