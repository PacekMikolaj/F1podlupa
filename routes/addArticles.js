const router = require('express').Router();
const fs = require('fs');
const formidable = require('formidable');
const bodyParser = require("body-parser");
const Article = require('./../static/models/article');
const { redirectAdmin, redirectLogin } = require('../middleware/authorization');
const sharp = require('sharp');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.route('/')
    .get(redirectLogin, (req, res) => {
        res.render("add_article");
    })
    .post(redirectLogin, function (req, res) {

        var form = new formidable.IncomingForm();

        let id = Date.now();

        let date = new Date();

        let minuty;

        if (date.getMinutes() < 10) {
            minuty = "0" + date.getMinutes();
        } else { minuty = date.getMinutes(); }

        form.keepExtensions = true;

        form.uploadDir = __dirname + '/../static/upload/';

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
                    res.send('Coś poszło nie tak. Poinformuj administratora.');
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

        res.redirect("/admin/add");
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

    console.log('NAME:' + name);

    console.log('file.name: ' + file.name);

    let tmp = file.name.split('.');

    let ext = tmp[tmp.length - 1];

    console.log('ext: ' + ext);

    fs.rename(file.path, uploadDir + `${id}/${name}.${ext}`, function (err) {

        if (err) console.log(err);

        console.log('path: ' + file.path);
        console.log('path2: ' + `./../static/upload/${id}/${name}.${ext}`);
        console.log('path3 : ' + uploadDir + `${id}/${name}.${ext}`);

        sharp(uploadDir + id + `/${name}.${ext}`)
            .resize({ width: 1000 })
            .webp({ quality: 90 })
            .toFile(uploadDir + id + `/${name}.webp`)
            .then(data => {
                fs.unlink(uploadDir + id + `/${name}.${ext}`, (err) => {
                    if (err) throw err;
                })
            }
            )
            .catch(err => console.log(err))
    });

}

module.exports = router;