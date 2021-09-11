import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { ProductController } from "./controllers/ProductController";
import { CategoryController } from "./controllers/CategoryController";

const router = Router();

const userController = new UserController();
const productController = new ProductController();
const categoryController = new CategoryController();

router.get("/", userController.list);

router.get("/add", (request, response) => {
  response.render("User/add");
});

router.get("/home", (request, response) => {
  response.render("base/home");
});

router.post("/add-user", userController.create);

router.get("/search", userController.search);

router.get("/edit", userController.get);

router.post("/edit-user", userController.update);

router.post("/delete-user", userController.delete);


// Product

router.get("/product", productController.list);

router.get("/add-product", (request, response) => {
  response.render("Product/add");
});

router.post("/add-product", productController.create);

router.get("/search-product", productController.search);

router.get("/edit-product", productController.get);

router.post("/edit-product", productController.update);

router.post("/delete-product", productController.delete);


// Category

router.get("/category", categoryController.list);

router.get("/add-category", (request, response) => {
  response.render("category/add");
});

router.post("/add-category", categoryController.create);

router.get("/search-category", categoryController.search);

router.get("/edit-category", categoryController.get);

router.post("/edit-category", categoryController.update);

router.post("/delete-category", categoryController.delete);

export { router };
