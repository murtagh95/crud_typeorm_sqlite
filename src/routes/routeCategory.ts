import { Router } from "express";
import { FactoryController } from "../controllers/FactoryController";

// Service
import { CategoryService } from "../services/CategoryService";

const routerCategory = Router();

const categoryController = FactoryController.generateController(
  ["username", "email", "phone", "city", "state" ],
  ["id", "username", "email", "phone", "city", "state"],
  "Category",
  new CategoryService()
);

// Category
routerCategory.get("/category", (request, response) => {
  categoryController.list(request, response)
});

routerCategory.get("/add-category", (request, response) => {
  categoryController.getForCreate(request, response)
});

routerCategory.post("/add-category", (request, response) => {
  categoryController.create(request, response)
});

routerCategory.get("/search-category", (request, response) => {
  categoryController.search(request, response)
});

routerCategory.get("/edit-category", (request, response) => {
  categoryController.get(request, response)
});

routerCategory.post("/edit-category", (request, response) => {
  categoryController.update(request, response)
});

routerCategory.post("/delete-category", (request, response) => {
  categoryController.delete(request, response)
});

export { routerCategory };
