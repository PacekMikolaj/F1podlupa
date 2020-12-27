$(document).ready(function () {

    $(window).on("resize", (e) => {
        if ($(window).width() > 630)
            $("nav").css("display", "flex");

    })

    $("#nav-h2").on("click", (e) => {

        if ($("nav").css("display") != "flex")
            $("nav").css("display", "flex");
        else
            $("nav").css("display", "none");

    })

})