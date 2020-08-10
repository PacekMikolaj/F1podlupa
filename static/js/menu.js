$(document).ready(function () {

    let nav_h2_flag = false;

    $("#nav-h2").on("click", (e) => { ///do poprawki

        if (!nav_h2_flag)
            $("#nav_elements").css("display", "flex");
        else
            $("#nav_elements").css("display", "none");

        nav_h2_flag = !nav_h2_flag;

    })
})