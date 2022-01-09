const router = require("express").Router();
const Admin = require("../static/models/admin");
const Article = require("../static/models/article");
const Data = require("../static/models/data");
const bcrypt = require("bcryptjs");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const fs = require("fs");
const { redirectAdmin, redirectLogin } = require("../middleware/authorization");
const express = require("express");

require("dotenv").config();

router.use(morgan("dev"));
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(
  session({
    key: "user_sid",
    secret: process.env.SECRET_CODE,
    resave: true,
    saveUninitialized: false,
    cookie: { httpOnly: true },
  })
);

//Import and Use addArticle (put after all other ROUTER.USE!!!!)

const addArticle = require("./addArticles");
router.use("/add", addArticle);

router.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    req.session.destroy();
    res.redirect("/admin/login");
  } else {
    res.redirect("/admin");
  }
});

router.route("/").get(redirectLogin, (req, res) => {
  // res.sendFile(path.resolve(__dirname + "/../static/views/" + 'admin.html'));
  res.render("admin/admin");
});

router
  .route("/login")
  .get(redirectAdmin, (req, res) => {
    console.log("get login");
    //  res.sendFile(path.resolve(__dirname + "/../static/views/" + 'login.html'));
    res.render("admin/login");
  })
  .post(async (req, res) => {
    try {
      const admin = await Admin.findOne({ login: req.body.login });

      if (!admin)
        return res
          .status(400)
          .send(
            'Login or password is incorrect. <a href="/admin/login">Wróć</a>'
          );

      const validPass = await bcrypt.compare(req.body.password, admin.password);

      if (!validPass)
        return res
          .status(400)
          .send(
            'Login or password is incorrect. <a href="/admin/login">Wróć</a>'
          );

      console.log("req.session.user: " + req.session.user);
      console.log("admin" + admin);

      req.session.user = admin;
      res.redirect("/admin");
    } catch (e) {
      console.log(e);
    }
  });

router
  .route("/edit")
  .get(redirectLogin, (req, res) => {
    res.render("admin/edit_article");
  })
  .post(redirectLogin, async (req, res) => {
    console.log("KOD: " + req.body.code);
    let data = { code: req.body.code };

    try {
      data.article = await Article.findOne({ ID: req.body.code });

      data.date = data.article.date;

      console.log("data.date: ");
      console.log(data.date);

      if (isNaN(data.code)) {
        //nie koniecznie musi byc
        data = { error: "IC" };
        res.render("admin/edit_article", data);
      } else res.render("admin/add_article", data);
    } catch (err) {
      console.log("nie znaleziono artykulu...");
      console.log(err);

      data.error = "FNE";
      res.render("admin/edit_article", data);
    }
  });

router.post("/edit/confirmation", redirectLogin, async (req, res) => {
  let value = req.body.submit;
  let oldID = req.body.oldID;
  let newID = req.body.newID;

  console.log("value: " + value);

  if (value == "TAK") {
    fs.rmdirSync(
      "__dirname" + "/../static/upload/" + oldID,
      { recursive: true },
      (error) => {
        console.log("error przy usuwaniu folderu");
        console.log(error);
      }
    );

    await Article.deleteOne({ ID: oldID });

    fs.renameSync(
      "__dirname" + "/../static/upload/" + newID,
      "__dirname" + "/../static/upload/" + oldID,
      function (err) {
        console.log(err);
      }
    );

    await Article.updateOne({ ID: newID }, { $set: { ID: oldID } });

    res.redirect("/admin/add/confirmation");
  } else {
    fs.rmdirSync(
      "__dirname" + "/../static/upload/" + newID,
      { recursive: true },
      (error) => {
        console.log("error przy usuwaniu folderu");
        console.log(error);
      }
    );

    await Article.deleteOne({ ID: newID });

    res.send(
      "cofnięto usuwanie artykułu. Tak samemu se wejdz na strone glowna, nie chcialo mi sie juz tego robic xD"
    );
  }
});

router
  .route("/delete")
  .get(redirectLogin, (req, res) => {
    res.render("admin/delete_article");
  })
  .post(redirectLogin, async (req, res) => {
    console.log("KOD: " + req.body.code);
    let data = { code: req.body.code };

    try {
      data.article = await Article.findOne({ ID: req.body.code });

      data.date = data.article.date;

      console.log("data.date: ");
      console.log(data.date);

      if (isNaN(data.code)) {
        //nie koniecznie musi byc
        data = { error: "IC" };
        res.render("admin/delete_article", data);
      } else res.render("admin/deleting_confirm", data);
    } catch (err) {
      console.log("nie znaleziono artykulu...");
      console.log(err);

      data.error = "FNE";
      res.render("admin/delete_article", data);
    }
  });

router.post("/delete/confirmation", redirectLogin, async (req, res) => {
  let value = req.body.submit;
  let ID = req.body.ID;

  console.log("value: " + value);

  if (value == "TAK") {
    fs.rmdirSync(
      "__dirname" + "/../static/upload/" + ID,
      { recursive: true },
      (error) => {
        console.log("error przy usuwaniu folderu");
        console.log(error);
      }
    );

    await Article.deleteOne({ ID: ID });

    res.redirect("/admin");
  } else {
    res.redirect("/admin");
  }
});

module.exports = router;

router.route("/changeData").get(redirectLogin, (req, res) => {
  res.render("admin/change_data");
});

router.route("/changeData/:type").get(redirectLogin, async (req, res) => {
  let data = {};

  console.log(req.params.type);
  data.data = await Data.find({ type: req.params.type });
  console.log(data);
  res.render("admin/data", data);
});

router.get("/register", (req, res) => {
  res.sendFile(
    path.resolve(__dirname + "/../static/views/" + "admin/register.html")
  );
});

// router.post("/register", async (req, res) => {
//   //Hash password
//   const salt = bcrypt.genSaltSync(10);
//   const hashPassword = bcrypt.hashSync(req.body.password, salt);

//   const admin = new Admin({
//     login: req.body.login,
//     password: hashPassword,
//   });
//   try {
//     const savedAdmin = await admin.save();
//     res.send("Done.");
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });
