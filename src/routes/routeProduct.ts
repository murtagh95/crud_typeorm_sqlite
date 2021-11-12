import { Router } from "express";

// Controller
import { FactoryController } from "../controllers/FactoryController";
import { upload } from "../lib/storage";

// Service
import { ProductService } from "../services/ProductService";

const routerProduct = Router();

const productController = FactoryController.generateController(
  ["name", "price", "type", "category" ],
  ["id", "name", "price", "type", "category"],
  "Product",
  new ProductService()
);

// Routes
routerProduct.get("/product", (request, response) => {
  productController.list(request, response)
});

routerProduct.get("/add-product", (request, response) => {
  productController.getForCreate(request, response)
});

routerProduct.post("/add-product", upload.single('image'), (request, response) => {
  productController.create(request, response)
});

routerProduct.get("/search-product", (request, response) => {
  productController.search(request, response)
});

routerProduct.get("/edit-product", (request, response) => {
  productController.get(request, response)
});

routerProduct.post("/edit-product", upload.single('photo'), (request, response) => {
  productController.update(request, response)
});

routerProduct.post("/delete-product", (request, response) => {
  productController.delete(request, response)
});

export { routerProduct };
