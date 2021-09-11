import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { ProductController } from "./controllers/ProductController";

const router = Router();

const userController = new UserController();
const productController = new ProductController();

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

export { router };
