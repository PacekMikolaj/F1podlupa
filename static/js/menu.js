$(document).ready(function () {

    $(window).on("resize", (e) => {
        if ($(window).width() > 630)
            $("#nav_elements").css("display", "flex");

    })

    $("#nav-h2").on("click", (e) => {

        if ($("#nav_elements").css("display") != "flex")
            $("#nav_elements").css("display", "flex");
        else
            $("#nav_elements").css("display", "none");

    })

})