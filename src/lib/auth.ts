export class helpers{
    static isLoggedIn(req, res, next){
        // Usamos un método de passport que devuelve un boolean si hay un usuario logeado
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    };

    static isNotLoggedIn(req, res, next){
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/profile');
    };
}
