$(document).ready(function () {

    let resize = () => {

        $("#alphabet").css("height", "initial");

        if ($(".fa-chevron-left").css("display") == "none") {

            let alphabet_height = parseInt($("#alphabet").css("height"));

            let variable = parseInt($("#variable").css("height"));

            console.log(variable)

            $(".surnames").css("display", "block");

            $("#alphabet").css("height", alphabet_height / variable + 30 + "px");

        } else {

            let letters = document.querySelectorAll(".letter");

            letters.forEach(letter => {

                let parent = $(letter).parent();

                parent = parent[0];

                if (parent.children[1] != undefined) {

                    if ($(letter.children[1]).css("transform") == "matrix(1, 0, 0, 1, 0, 0)") {
                        $(parent.children[1]).css("display", "none");
                    }
                }
            });
        }

    }

    resize();


    $(window).on("resize", function () {

        setTimeout( () => {resize()}, 300);
        

    })



    $(".letter").on("click", function () {

        let parent = ($(this).parent());

        parent = parent[0];

        if ($(this.children[1]).css("transform") == "matrix(1, 0, 0, 1, 0, 0)")
            $(this.children[1]).css("transform", "rotate(-90deg)");
        else
            $(this.children[1]).css("transform", "rotate(0deg)");


        let surnames = $(parent.children[1]);


        if ($(".fa-chevron-left").css("display") != "none") {

            if ($(surnames).css("display") == "none") {

                $(surnames).animate({ height: "toggle" }, {
                    duration: 100,
                    queue: false
                })
            } else {

                $(surnames).animate({ height: "toggle" }, {
                    duration: 100,
                    queue: false
                })
            }

        }

    })

})