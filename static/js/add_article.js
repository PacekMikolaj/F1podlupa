class Div_imageView {
  input;
  img;
  div;

  constructor() {
    this.input = $(
      '<input name="imageInput" class="imageInput" type="file" required>'
    );

    $(this.input).on("change", () => {
      this.handleChange();
    });
    console.log($(this.input));
    $("#labelForInputImg").append(this.input);
  }

  handleChange = () => {
    console.log($(this.input).prop("files"));

    let file = $(this.input).prop("files");

    if (file.length > 0) {
      let fileReader = new FileReader();

      this.img = $("<img alt='img'>");
      $(this.img).addClass("Img_imageView");

      fileReader.onload = (event) => {
        $(this.img).attr("src", event.target.result);

        console.log(event.target.result);

        this.createView();
      };
      fileReader.readAsDataURL(file[0]);

      $(this.input).css("display", "none");
    }
  };

  createView = () => {
    this.div = $("<div class='Div_imageView'>");

    $(this.div).append(this.img);

    let name = $(this.input).val().split("\\")[2];
    console.log(name);

    let img_name = $(`<p></p>`);
    $(img_name).addClass("Name_imageView");
    $(img_name).text(`img src=${name}LINK`);
    $(this.div).append(img_name);

    console.log($(this.div));

    $("#labelForInputImg").append(this.div);

    let del = $("<button></button>");
    $(del).addClass("delButton");
    $(del).text("delete");
    $(del).attr("type", "button");
    $(del).on("click", () => {
      this.onclickDelete();
    });

    $(this.div).append(del);
  };

  onclickDelete = () => {
    $(this.div).remove();
    $(this.input).remove();
  };
}

$(document).ready(() => {
  //$(".form").ajaxSumbit({url: '/admin/add/test', type: 'post'});

  // setTimeout(() => {

  //     let editor = document.getElementById("cke_ckeditor");

  //     console.log(editor);

  //     //ckeditor tab handling
  //     //const editor = this.editor;
  //     const view = editor.editing.view;
  //     const viewDocument = view.document;

  //     viewDocument.on('keydown', (evt, data) => {

  //         if ((data.keyCode == keyCodes.tab) && viewDocument.isFocused) {

  //             // with white space setting to pre
  //             editor.execute('input', { text: "\t" });
  //             // editor.execute( 'input', { text: "     " } );

  //             evt.stop(); // Prevent executing the default handler.
  //             data.preventDefault();
  //             view.scrollToTheSelection();
  //         }

  //     });

  // },1000)

  let createAddButton = () => {
    let btn = $("<button></button>");
    $(btn).addClass("addPhotoButton");
    $(btn).attr("type", "button");
    $(btn).text("Add Photo");
    $(btn).on("click", () => {
      tabOfImg.push(new Div_imageView());
    });
    $("#labelForInputImg").append(btn);
  };

  //idk
  $("#other").on("change", function () {
    console.log(this.children);
    // $(this.child[0]).prop("disabled",false);
  });

  let tabOfImg = [];

  createAddButton();

  $(".coverInput").on("change", function (event) {
    let img = new Image();
    img.src = window.URL.createObjectURL(event.target.files[0]);
    img.onload = () => {
      ///zdjecie musi byc 185.5:132 -> 1.41
      console.log("width: " + img.width + ", height: " + img.height);
      if (img.width / img.height < 1.41 || img.height > img.width)
        alert(
          "Zdjęcie nie spełnia wymagań dotyczących wymiarów. Zmień jego wymiary lub wybierz inne zdjęcie."
        );
    };
  });
});

const sectionChange = (section) => {
  //   console.log("section", section);

  const input = $("#moreSectionsInput");

  let value = input.val();
  console.log(value);

  value = value == "" ? [] : value.split("|");

  //   console.log("value before if", value);

  //   console.log("includes", value.includes(section));

  if (value.includes(section)) value = value.filter((elem) => elem != section);
  else value.push(section);

  //   console.log("value after if", value);

  input.val("");

  value.map((elem) => input.val(input.val() + elem + "|"));

  input.val(input.val().slice(0, -1)); //ostatni element

  //   console.log("input.value in the end", input.value);
};

let myFunction = () => {
  console.log("some shiiiiiit");

  let form = document.querySelector(".form");

  console.log("form:" + form);

  let fd = new FormData(form);

  //  let cover = document.querySelector('.coverInput').files[0];
  //let inputs = document.querySelectorAll('.imageInput');
  // let images = [];

  // inputs.forEach((input) => {

  //     fd.append('images[]', input.file);
  // })

  // fd.append('images[]', document.querySelector('.coverInput').files[0]);
  // fd.append('lol', 'xd');

  for (var [key, value] of fd.entries()) {
    console.log(key, value);
  }

  // fd = JSON.stringify(fd);

  var object = {};
  fd.forEach((value, key) => (object[key] = value));
  // var json = JSON.stringify(object);

  $.ajax({
    url: "/admin/add/test",
    type: "POST",
    // contentType: false,
    //  processData: false,
    dataType: "json",
    data: object,
    //contentType: 'application/json',
    headers: {
      "Content-Type": "application/json",
    },
    success: function (data) {
      console.log(data);
    },
  });
};
