let redirectLogin = (req, res, next) => {
   // console.log( "redirectLogin:");
    //console.log(req.session.user);
    if (req.session.user && req.cookies.user_sid) {
       next();
    } else res.redirect('/admin/login');
}

let redirectAdmin = (req, res, next) => {
    //console.log( "redirectAdmin:");
   // console.log(req.session.user);
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/admin');
    } else next();
}

module.exports = { redirectAdmin , redirectLogin };