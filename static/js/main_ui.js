$(document).ready(function () {

    var articles = document.querySelectorAll(".article");

    for (let i = 0; i < articles.length; i++) {


        ///canvas
        console.log($(articles[i].children[1]));

        let canvas = document.createElement("canvas");
        canvas.classList.add("triangle");
        canvas.width = "100";
        canvas.height = "300";

        $(articles[i].children[1]).append(canvas);

        let context = canvas.getContext("2d");

        context.beginPath();
        context.moveTo(0, 300);
        context.lineTo(100, 300);
        context.lineTo(100, 0);

        context.closePath();

        context.fillStyle = "#FFFFFF";
        context.fill();

    }

    

})