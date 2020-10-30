class Div_imageView {

    input;
    img;
    div;

    constructor() {


        this.input = $('<input name="imageInput" type="file" required>');

        $(this.input).on('change', () => { this.handleChange() });
        console.log($(this.input));
        $('#labelForInputImg').append(this.input);

    }

    handleChange = () => {

        console.log($(this.input).prop('files'));

        let file = $(this.input).prop('files');

        if (file.length > 0) {

            let fileReader = new FileReader();

            this.img = $("<img alt='img'>");
            $(this.img).addClass('Img_imageView');

            fileReader.onload = (event) => {
                $(this.img).attr('src', event.target.result);

                this.createView();

            }
            fileReader.readAsDataURL(file[0])

            $(this.input).css('display', 'none');

        }

    }

    createView = () => {

        this.div = $("<div class='Div_imageView'>");

        $(this.div).append(this.img);

        let name = $(this.input).val().split('\\')[2];
        console.log(name);

        let img_name = $(`<p></p>`);
        $(img_name).addClass('Name_imageView');
        $(img_name).text(`img src=${name}LINK`);
        $(this.div).append(img_name);

        console.log($(this.div));

        $('#labelForInputImg').append(this.div);

        let del = $("<button></button>");
        $(del).addClass('delButton');
        $(del).text('delete');
        $(del).attr('type', 'button')
        $(del).on('click', () => { this.onclickDelete() })

        $(this.div).append(del);


    }

    onclickDelete = () => {

        $(this.div).remove();
        $(this.input).remove();

        }

    }

$(document).ready(() => {



    let createAddButton = () => {

        let btn = $("<button></button>");
        $(btn).addClass('addPhotoButton');
        $(btn).attr('type', 'button');
        $(btn).text('Add Photo');
        $(btn).on('click', () => { tabOfImg.push(new Div_imageView()) })
        $('#labelForInputImg').append(btn);
    }

    //idk
    $("#other").on("change", function () {
        console.log(this.children)
        // $(this.child[0]).prop("disabled",false);
    })

    let tabOfImg = [];

    createAddButton();


})

