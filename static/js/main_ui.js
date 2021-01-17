$(document).ready(function () {

    var articles = document.querySelectorAll(".article");

    for (let i = 0; i < articles.length; i++) {

        ///canvas
          //console.log($(articles[i].children[2]));
        $(articles[i].children[2].children[1]).append(createTriangle(300, "triangle"));
        

    }

    
})

let createTriangle = (height, className) => {
    let canvas = document.createElement("canvas");

        canvas.classList.add(className);


        canvas.width = (height/2).toString();
        canvas.height = (height).toString();

        let context = canvas.getContext("2d");

        context.beginPath();
        context.moveTo(0, height);
        context.lineTo(height/3, height);
        context.lineTo(height/3, 0);

        context.closePath();

        context.fillStyle = "#FFFFFF";
        context.fill();

        return canvas;
}





