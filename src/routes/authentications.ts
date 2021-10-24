import passport from 'passport';
import { helpers } from '../lib/auth';
import { Request, Response } from "express";
import { Router } from "express";

const routerAuthentications = Router();

routerAuthentications.get('/signup', helpers.isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

routerAuthentications.post('/signup', passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
}));

routerAuthentications.get('/signin', helpers.isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

routerAuthentications.post('/signin', (req: Request, res: Response, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

// Antes de dirigir a profile verificamos si el usuario esta logeado
routerAuthentications.get('/profile', helpers.isLoggedIn, (req, res) => {
    res.render('auth/profile');
})

routerAuthentications.get('/logout', (req, res) => {
    req.logOut();
    req.flash('message', 'Gracias por usar nuestra app');
    res.redirect('/signin');
});

export { routerAuthentications };