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
    const users: User[] = await userService.getDataToUsername(username)

    if (users.length == 1) {
        const user: User = users[0]
        // Verifico si la contraseñas coinciden, devuelve un boolean
        const validPassword = await helpers.matchPassword(password, user.password);

        if (validPassword) {
            done(null, user);
        }else {
            req.flash('message', 'Usuario o contraseña incorrectos');
            done(null, false);
        }
    } else {
        req.flash('message', 'Usuario o contraseña incorrectos');
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
    // Verifico que la contraseña sea valida
    if(!/[a-z]/.test(password) || !/[A-Z]/.test(password) ||
            !/[0-9]/.test(password) || password.length < 8 ){
        req.flash('message', "Contraseña no valida");
        return done(null, null);
    }

    // Encriptamos la contraseña
    newUser.password = await helpers.encryptPassword(password);

    // Almaceno el usuario en la BD
    const userService = new UserService()
    try {
        await userService.create(newUser).then((result) => {
            req.flash('message', 'Usuario creado con éxito');
            return done(null, result);
        });
    } catch (err) {
        console.log(err.toString() )
        req.flash('message', err.toString());
        return done(null, null);
    }

}));

passport.serializeUser((usr: User, done) => {
    
    done(null, usr.id);
});

passport.deserializeUser(async (id: string, done) => {
    const userService = new UserService()
    const result = await userService.getData(id)
    done(null, result);
})