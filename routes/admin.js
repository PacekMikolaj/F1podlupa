const router = require('express').Router();
const Admin = require('../static/models/admin');
const bcrypt = require('bcryptjs');
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const { redirectAdmin, redirectLogin } = require('../middleware/authorization');


require("dotenv").config();


router.use(morgan("dev"));
router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(
    session({
        key: 'user_sid',
        secret: process.env.SECRET_CODE,
        resave: true,
        saveUninitialized: false,
        cookie: {
            expires: 600000,
        }
    })
)

//Import and Use addArticle (put after all other ROUTER.USE!!!!)

const addArticle = require('./addArticles');
router.use('/add', addArticle);



router.get('/logout', (req, res) => {

    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        req.session.destroy();
        res.redirect('/admin/login');
    } else {
        res.redirect('/admin');
    }

})


router
    .route('/')
    .get(redirectLogin, (req, res) => {

       // res.sendFile(path.resolve(__dirname + "/../static/views/" + 'admin.html'));
        res.render("admin");
    })

router
    .route('/login')
    .get(redirectAdmin, (req, res) => {
        console.log('get login');
      //  res.sendFile(path.resolve(__dirname + "/../static/views/" + 'login.html'));
      res.render("login");

    })
    .post(async (req, res) => {

        try {

            const admin = await Admin.findOne({ login: req.body.login });

            if (!admin) return res.status(400).send('Login or password is incorrect. <a href="/admin/login">Wróć</a>');

            const validPass = await bcrypt.compare(req.body.password, admin.password);

            if (!validPass) return res.status(400).send('Login or password is incorrect. <a href="/admin/login">Wróć</a>');

            console.log("req.session.user: " + req.session.user);
            console.log("admin" + admin);

            req.session.user = admin;
            res.redirect('/admin');

        } catch (e) { console.log(e); }
    })


module.exports = router;




// router.get('/register', (req, res) => {
//     res.sendFile(path.resolve(__dirname + "/../static/views/" + 'register.html'));
// })

// router.post('/register', async (req, res) => {

//     //Hash password
//     const salt = bcrypt.genSaltSync(10);
//     const hashPassword = bcrypt.hashSync(req.body.password, salt);

//     const admin = new Admin({
//         login: req.body.login,
//         password: hashPassword
//     });
//     try {
//         const savedAdmin = await admin.save();
//         res.send("Done.");
//     } catch (err) {
//         res.status(400).send(err);
//     }


// })
