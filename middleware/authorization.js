let redirectLogin = (req, res, next) => {

    if (req.session.user && req.cookies.user_sid) {
       next();
    } else res.redirect('/admin/login');
}

let redirectAdmin = (req, res, next) => {

    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/admin');
    } else next();
}

module.exports = { redirectAdmin , redirectLogin };