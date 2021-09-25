import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import path from "path";
import "./database";

// Routers
import { routerCategory } from "./routes/routeCategory";
import { routerProduct } from "./routes/routeProduct";
import { routerUser } from "./routes/routeUser";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routerCategory);
app.use(routerUser);
app.use(routerProduct);
app.use(morgan('dev'))

// Config
app.set('view engine', 'ejs');

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
