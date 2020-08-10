var articles = document.querySelectorAll(".article");

//console.log(articles)



let fi = (div, what) => {

    let little = $(div).find(what);
    $(little).css("display", "block");

}

let fo = (div, what) => {

    let little = $(div).find(what);
    $(little).css("display", "none");
}



//canvasy tez trzeb aresizowac

let triangle_w_o = 100;
let triangle_h_o = 300;

let triangle_w =100;
let triangle_h = 300;




 let resizeTriangles = (scale,ziomek)=>{

    triangle_w = triangle_w * scale;
    triangle_h = triangle_h * scale;

    let new_scale = Math.min(
         (triangle_w) / (triangle_w_o * 0.9)
    );



    
     let canvas = $(ziomek).find(".triangle");

     console.log(canvas)

     $(canvas).css("transform","scale(" + new_scale +")");

    
//     width = $(canvas).width();
//     height = $(canvas).height();

//     $(canvas).remove();

//     canvas = document.createElement("canvas");


//     triangle_w = parseFloat(width*scale);
//     triangle_h = parseFloat(height*scale);

//     console.log(triangle_w.toString());

//     canvas.width = parseInt(triangle_w).toString();
//     canvas.height = (triangle_h).toString();
//     $(canvas).attr("class","triangle")

//     let context = $(canvas)[0].getContext("2d");

//     context.clearRect(0, 0, canvas.width, canvas.height);

//     context.beginPath();
//     context.moveTo(0, height);
//     context.lineTo(width, height);
//     context.lineTo(width, 0);

//     context.closePath();

//     context.fillStyle = "#FFFFFF";
//     context.fill();

//     $(ziomek).append(canvas);



 }


for (let i = 0; i < articles.length; i++) {

    let canvas = document.createElement("canvas");
    canvas.classList.add("triangle");
    canvas.width = "100";
    canvas.height = "300";

    $(articles[i]).append(canvas);

    let context = canvas.getContext("2d");

    context.beginPath();
    context.moveTo(0, 300);
    context.lineTo(100, 300);
    context.lineTo(100, 0);

    context.closePath();

    context.fillStyle = "#FFFFFF";
    context.fill();


    $(articles[i]).on("mouseover", () => {

        //console.log($(articles[i].children[2]))

        let div = $(articles[i].children[2]);

        $(div).animate({ right: "0", width: "3%", height: "100%", top: "0" }, {
            duration: 100,
            start: () => { fi(div, "div") },
            queue: false
        })

        // let little = $(div).find("div");
        // $(little).css("display", "block");
    })

    $(articles[i]).on("mouseleave", () => {

        let div = $(articles[i].children[2]);

        $(div).animate({ right: "1%", width: "7px", height: "80%", top: "10%" }, {
            duration: 100,
            start: () => { fo(div, "div") },
            queue: false

        })

    })

}

let squares = document.querySelectorAll(".square");




for (let i = 0; i < squares.length; i++) {

    $(squares[i]).on("mouseover", () => {

        let div = $(squares[i].children[1]);

        $(div).animate({ height: "100%" }, {
            start: () => { fi(div, ".next"); fi(div, ".text") }, duration: 100, queue: false
        })


    })


    $(squares[i]).on("mouseleave", () => {


        let div = $(squares[i].children[1]);




        $(div).animate({ height: "initial" }, {
            start: () => { fo(div, ".next"); fo(div, ".text") }, duration: 100, queue: false
        }
        )


    })

    //   $(squares[i].children[0]).css("transform","translate(0,0) scale(" + scale +")");
    // $(squares[i].children[0]).css("width","10px");


}

let doResize = (elements,h) => {


        let width = $(elements[0]).width();
        let height = $(elements[0]).height();

    for (let i = 0; i < elements.length; i++) {
        

        let Bwidth = $("#news").width();

        let scale = Math.min(
            (Bwidth * 0.9) / (width * h)
        );

       console.log(scale);

        $(elements[i]).css("width", width * scale);
        $(elements[i]).css("height", height * scale);

      //  console.log(elements[i].children[0])
      if(elements == articles)
      {
          resizeTriangles(scale,articles[i]);
      }

    }

   
}

$(window).on("resize", () => { doResize(squares,3); doResize(articles,1) });

doResize(squares,3); doResize(articles,1);

