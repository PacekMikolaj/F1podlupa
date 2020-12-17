$(document).ready(function () {

    var articles = document.querySelectorAll(".article");

    for (let i = 0; i < articles.length; i++) {


        ///canvas
        //  console.log($(articles[i].children[1]));

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

    // $(window).bind("load", function () {

    //     gsap.registerPlugin(CSSRulePlugin);
        
    //     let notImg = document.querySelectorAll(".notImg");

    //     gsap.to(notImg, {stagger: .1});
    //     console.log(notImg)
        
    //     let ruleNotImgBefore = CSSRulePlugin.getRule('.notImg::before');
        
    //     console.log(ruleNotImgBefore);
        
    //     let ruleNotImgAfter = CSSRulePlugin.getRule('.notImg::after');
        
    //     let tl = gsap.timeline({ defaults: { ease: ' Power2.easeOut' } })
        
    //     tl.to(ruleNotImgBefore, {
    //         height: '100%',
    //     })
    //     tl.pause();
        
    //     console.log('ekhem')
        
    //     notImg.forEach(div => {
        
    //         div.addEventListener('mouseenter', () => {
    //             console.log('lol')
    //             tl.play();
    //         })
        
    //    });



    // });
})




