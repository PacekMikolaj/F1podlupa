$(document).ready(function () {


    $("#nav-h2").on("click", (e) => {

        if ($("nav").css("display") != "flex")
            $("nav").css("display", "flex");
        else
            $('nav').css('display', '');
        $(".submenuOS").css("display", "");
        $("#crossForMenu").css("transform", "");

    })

    $('#otherSeries').on("click", (e) => {
        if (window.matchMedia('(max-width: 767px)').matches) {

            if ($(".submenuOS").css("display") == "none") {
                $(".submenuOS").css("display", "block");
                $("#crossForMenu").css("transform", "rotate(180deg)");
            }
            else {
                $(".submenuOS").css("display", "");
                $("#crossForMenu").css("transform", "");
            }

        }
    })

})