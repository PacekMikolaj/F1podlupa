const router = require('express').Router();
const fs = require('fs');
const formidable = require('formidable');
const express = require("express");
const Article = require('./../static/models/article');
const { redirectAdmin, redirectLogin } = require('../middleware/authorization');
const sharp = require('sharp');


router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const sections = ["f1", "f2", "fe", "f1basics", "rallycross", "other"];

router.post('/test', (req, res) => {
    // console.log(req.body);

    // let data = JSON.parse(req.body);
    try {

        let data = req.body;
        console.log(data.imageInput);

    } catch (err) {
        console.log('error w nieparsowanym');
        console.log(err);
    }

    // try {
    //     let data = JSON.parse(req.body);
    //     console.log(data.fd);
    // } catch (err) {
    //     console.log('error w parsowanym');
    //     console.log(err);
    // }


    // for (var [key, value] of data.entries()) {
    //     console.log(key, value);
    // }

    // req.body.images.forEach( (image) => {
    //     console.log(image.name);
    // })

    res.send(data = { number: 'yo man its ok' });
})


router.route('/')
    .get(redirectLogin, (req, res) => {
        let data = {};
        data.sections = sections;
        res.render('admin/add_article', data);
    })
    .post(redirectLogin, function (req, res) {

        var form = new formidable.IncomingForm();

        let id = Date.now();

        form.keepExtensions = true;

        form.uploadDir = __dirname + '/../static/upload/';

        fs.mkdirSync(form.uploadDir + `${id}/`);

        //FORM PARSE
        form.parse(req, async function (err, fields, files) {



            console.log('files')
            console.log(files);

            let date;
            let html;

            if (fields.code) {
                console.log('edycja!');

                let old_id = fields.code;

                date = setDate(old_id);
                html = changePathWithRegex(fields.body, old_id);
            } else {
                date = setDate(id);
                html = changePathWithRegex(fields.body, id);
            }

            let article = new Article();

            fs.writeFileSync(`${form.uploadDir}/${id}/body.html`, html, (error) => { console.log(error) })

            console.log('moresections:');
            console.log(fields.moreSections);

            article.moreSections = [];
            article.title = fields.title;
            article.author = fields.author;
            article.short = fields.short;
            article.section = fields.section;
            article.date = date;
            article.ID = id;


            article.save(function (err) {
                if (err) {
                    console.log(err);
                    res.send('Coś poszło nie tak. Poinformuj administratora.');
                    return;
                }
            })
            console.log(fields);


            if (fields.code) {
                let data = { old_ID: fields.code, new_ID: id, title: fields.title };
                res.render('admin/edit_C', data);
            } else {
                res.render('admin/add_C');
            }


        });

        //FORM ON FILE
        form.on('file', function (field, file) {//async

            console.log("FIELD:")
            console.log(field)

            addFile(file, field, id, form.uploadDir); //await

        });

    })

router.get('/confirmation', redirectLogin, (req, res) => {
    res.render('admin/add_C');
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

    // await new Promise( () => {

    fs.rename(file.path, uploadDir + `${id}/${name}.${ext}`, function (err) {

        if (err) { console.log(err) };

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

    //  });

}

let setDate = (id) => {

    let date = new Date(parseInt(id));

    let minuty;

    if (date.getMinutes() < 10) {
        minuty = "0" + date.getMinutes();
    } else minuty = date.getMinutes();

    let month;

    if ((parseInt(date.getMonth() % 12) + 1) < 10) {
        month = "0" + (parseInt(date.getMonth() % 12) + 1);
    } else month = (parseInt(date.getMonth() % 12) + 1);

    date = date.getHours() + ":" + minuty + " " + date.getDate() + "." + month + "." + date.getFullYear();

    return date;

}

module.exports = router;
