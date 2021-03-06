// Utilitie
import { Router } from "express";
import { upload } from "../lib/storage";

// Controller
import { ProductController } from "../controllers/ProductController";

// Service
import { ProductService } from "../services/ProductService";

// Auth
import { helpers } from "../lib/auth"


const routerProduct = Router();

const productController = new ProductController(
  ["name", "price", "detail", "category" ],
  ["id", "name", "price", "detail", "category"],
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


routerProduct.post("/add-product", helpers.isLoggedIn, upload.array('image', 5), (request, response) => {
  productController.create(request, response)
});

routerProduct.get("/search-product", helpers.isLoggedIn, (request, response) => {
  productController.search(request, response)
});

routerProduct.get("/edit-product", helpers.isLoggedIn, (request, response) => {
  productController.get(request, response)
});


routerProduct.post("/edit-product", helpers.isLoggedIn, upload.array('photo', 5), (request, response) => {
  productController.update(request, response)
});

routerProduct.post("/delete-product", helpers.isLoggedIn, (request, response) => {
  productController.delete(request, response)
});

routerProduct.get("/product-detail/", (request, response) => {
  productController.get_detail(request, response)
});

export { routerProduct };
