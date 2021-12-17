import { Router } from "express";
import { GenericController } from "../controllers/GenericController";

// Service
import { CategoryService } from "../services/CategoryService";

// Auth
import { helpers } from "../lib/auth"


const routerCategory = Router();

const categoryController = new GenericController(
  ["name"],
  ["id", "name"],
  "Category",
  new CategoryService()
);

// Category
routerCategory.get("/category", helpers.isLoggedIn, (request, response) => {
  categoryController.list(request, response)
});

routerCategory.get("/add-category", helpers.isLoggedIn, (request, response) => {
  categoryController.getForCreate(request, response)
});

routerCategory.post("/add-category", helpers.isLoggedIn, (request, response) => {
  categoryController.create(request, response)
});

routerCategory.get("/search-category", helpers.isLoggedIn, (request, response) => {
  categoryController.search(request, response)
});

routerCategory.get("/edit-category", helpers.isLoggedIn, (request, response) => {
  categoryController.get(request, response)
});

routerCategory.post("/edit-category", helpers.isLoggedIn, (request, response) => {
  categoryController.update(request, response)
});

routerCategory.post("/delete-category", helpers.isLoggedIn, (request, response) => {
  categoryController.delete(request, response)
});

export { routerCategory };
