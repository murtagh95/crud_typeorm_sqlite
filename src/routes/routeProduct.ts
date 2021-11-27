import { Router } from "express";

// Controller
import { FactoryController } from "../controllers/FactoryController";
import { upload } from "../lib/storage";

// Service
import { ProductService } from "../services/ProductService";

// Auth
import { helpers } from "../lib/auth"


const routerProduct = Router();

const productController = FactoryController.generateController(
  ["name", "price", "type", "category" ],
  ["id", "name", "price", "type", "category"],
  "Product",
  new ProductService()
);

// Routes
routerProduct.get("/product", helpers.isLoggedIn, (request, response) => {
  productController.list(request, response)
});

routerProduct.get("/add-product", helpers.isLoggedIn, (request, response) => {
  productController.getForCreate(request, response)
});


routerProduct.post("/add-product", helpers.isLoggedIn, upload.single('image'), (request, response) => {
  productController.create(request, response)
});

routerProduct.get("/search-product", helpers.isLoggedIn, (request, response) => {
  productController.search(request, response)
});

routerProduct.get("/edit-product", helpers.isLoggedIn, (request, response) => {
  productController.get(request, response)
});


routerProduct.post("/edit-product", helpers.isLoggedIn, upload.single('photo'), (request, response) => {
  productController.update(request, response)
});

routerProduct.post("/delete-product", helpers.isLoggedIn, (request, response) => {
  productController.delete(request, response)
});

export { routerProduct };
