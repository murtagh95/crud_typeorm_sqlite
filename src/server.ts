import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import path from "path";
import "./database";
import flash from 'connect-flash';

import session from "express-session";
import passport from "passport";

// Routers
import { routerCategory } from "./routes/routeCategory";
import { routerProduct } from "./routes/routeProduct";
import { routerUser } from "./routes/routeUser";
import { routerAuthentications } from "./routes/authentications";

const app = express();

// Middleware
app.use(session({  // Configuro el guardado de seción
  secret: 'faztmysqlnodesession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'))
app.use(passport.initialize());
app.use(passport.session());

// GLOBAL VARIABLES
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');

  app.locals.message1 = 'hola';
  app.locals.login_user = req.user;
  next();
});

require('./lib/passport')

// Router
app.use(routerCategory);
app.use(routerUser);
app.use(routerProduct);
app.use(routerAuthentications);

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
