import { Request } from "express";

import passport from 'passport';
import * as passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import {helpers} from './helpers';

// Entities
import { User } from "../entities/User";

// Service
import { UserService } from "../services/UserService";

// MÉTODO PARA INGRESAR
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req: Request, username, password, done) => {
    
    const userService = new UserService()

    // Buscamos en la BD el usuario
    const user: User = await userService.getData(username)

    if (!!user) {
        // Verifico si la contraseñas coinciden, devuelve un boolean
        const validPassword = await helpers.matchPassword(password, user.password);

        if (validPassword) {
            done(null, user);
        }else {
            done(null, false);
        }
    } else {
        return done(null, false);
    }
}));


// MÉTODO PARA REGISTRARSE
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req: Request, username, password, done) => {
    const {email, name, city, state, phone} = req.body;

    const newUser = {
        username,
        password,
        name,
        email,
        city,
        state,
        phone,
        "is_admin": false
    }
    // Encriptamos la contraseña
    newUser.password = await helpers.encryptPassword(password);

    console.log(newUser)
    // Almaceno el usuario en la BD
    const userService = new UserService()
    const result = await userService.create(newUser)

    return done(null, result);
}));

passport.serializeUser((usr: User, done) => {
    
    done(null, usr.id);
});

passport.deserializeUser(async (id: string, done) => {
    const userService = new UserService()
    const result = await userService.getData(id)
    done(null, result);
})