const express = require("express")
const app = express();
const path = require("path")
const fs = require('fs');
const bodyParser = require("body-parser");
const formidable = require('formidable');
const connectDB = require('./DB/connection');
const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");

require('dotenv').config();

const port = process.env.PORT || 3000;

connectDB();

let Article = require("./static/models/article");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static('static'))
app.set("views", path.join(__dirname, "static/views"));
app.set("view engine", "pug");


app.get("/", async function (req, res) {

    let data = {};
    let tmp = await Article.find({}).sort({ _id: -1 }).limit(10).exec();
    data.newest = tmp.slice(0, 4);
    data.articles = tmp.slice(4);

    res.render("index", data);

})


app.get("/f1", async function (req, res) {

    let data = {}
    data.articlesF1 = await Article.find({ "section": "f1" }).sort({ _id: -1 }).exec();
    data.articlesF1basics = await Article.find({ "section": "f1basics" }).sort({ _id: -1 }).exec();

    res.render("f1", data);
})


app.get("/article/:ID", async function (req, res) {

    let data = {};
    data.articles = await Article.find({ "ID": { $ne: req.params.ID } }).limit(4).sort({ _id: -1 }).exec();
    data.article = await Article.find({ "ID": req.params.ID }).sort({ _id: -1 }).exec();
    data.article = data.article[0]; // changing from array to simple element

    res.render("article", data);

})

app.get("/add", function (req, res) {

    res.render("add_article");
})


app.post("/articles/add", function (req, res) {

    var form = new formidable.IncomingForm();

    let id = Date.now();

    let date = new Date();

    let minuty;

    if (date.getMinutes() < 10) {
        minuty = "0" + date.getMinutes();
    } else { minuty = date.getMinutes(); }

    form.keepExtensions = true;

    form.uploadDir = __dirname + '/static/upload/';

    fs.mkdirSync(form.uploadDir + `${id}/`);

    //FORM PARSE
    form.parse(req, function (err, fields, files) {

        console.log('PARSE')

        let article = new Article();

        let html = changePathWithRegex(fields.body, id);

        fs.writeFileSync(`${form.uploadDir}/${id}/body.html`, html, (error) => { console.log(error) })

        article.title = fields.title;
        article.author = fields.author;
        article.short = fields.short;
        article.section = fields.section;
        article.date = date.getHours() + ":" + minuty + " " + date.getDate() + "." + (date.getMonth() + 1) % 12 + "." + date.getFullYear();
        article.ID = id;

        article.save(function (err) {
            if (err) {
                console.log(err);
                return;
            }
        })

        console.log(fields);

    });

    //FORM ON FILE
    form.on('file', function (field, file) {

        console.log("FIELD:")
        console.log(field)

        addFile(file, field, id, form.uploadDir);


    });

    res.redirect("/add");
})


app.listen(port, function () {
    console.log("f1")
})





let changePathWithRegex = (body, id) => {
    console.log("changebody")

    let regex = /(img src=(.*)LINK)/gm;

    let array = body.matchAll(regex);

    console.log("BODY:");
    console.log(body);

    array = Array.from(array);

    console.log('Array:');
    console.log(array);

    array.forEach(elem => {
        let name = elem[2].split('.')[0];
        body = body.replace(elem[1], `<img alt='photo'src='/upload/${id}/${name}.webp'>`);
    });

    return body;
}






let addFile = (file, field, id, uploadDir) => {

    let name;

    if (field == 'cover')
        name = 'cover';
    else {
        name = file.name.split('.')[0];
    }

    console.log('NAME:' + name)

    let ext = name.split(".")[-1];

    fs.rename(file.path, uploadDir + `${id}/${name}.${ext}`, function (err) {
        if (err) console.log(err)

        // sharp(uploadDir + id + `/${name}.${ext}`)
        //     .toFile(uploadDir + id + `/${name}.webp`)
        //     .then(data => {
        //         fs.unlink(uploadDir + id + `/${name}.undefined`, (err) => {
        //             if (err) throw err;
        //         })
        //     }
        //     )
        //     .catch(err => console.log(err))
        imagemin([`./static/upload/${id}/${name}.${ext}`], {
            destination: `./static/upload/${id}/`,
            plugins: [
                imageminWebp({
                    quality: 90,
                    resize: {
                        width: 1000,
                        height: 0
                    }
                })
            ]
        }).then(() => {
            console.log('Images optimized');
            fs.unlink(uploadDir + id + `/${name}.undefined`, (err) => {
                if (err) throw err;
            })
        });
    });

}