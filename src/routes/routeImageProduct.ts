import { Router } from "express";

// Controller
import { ImageProductController } from "../controllers/ImageProductController ";


const routerImageProduct = Router();

const imageProductController = new ImageProductController();

// Routes

routerImageProduct.get("/edit-image", (request, response) => {
  imageProductController.get(request, response)
});

routerImageProduct.post("/edit-image", (request, response) => {
  imageProductController.update(request, response)
});


export { routerImageProduct };
