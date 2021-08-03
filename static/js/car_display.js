// let flag = false;

// $(document).ready(function () {

//     changeSize();

//     $('.expand').on('click', (e) => {

//         console.log(flag)


//         flag = !flag;
//         flip();

//         if (flag) {
//             if (window.matchMedia('(max-width: 767px)').matches) {
//                 $(".text2").css("display", "flex");

//             }
//             else {
//              //   let height,ext,scale;

//                 if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(max-width: 949px)').matches) {
//                     show(700, 515, 2);
//                 }

//                 if (window.matchMedia('(min-width: 950px)').matches && window.matchMedia('(max-width: 1223px)').matches) {
//                     show(570, 550, 2);
//                 }

//                 if (window.matchMedia('(min-width: 1224px)').matches && window.matchMedia('(max-width: 1499px)').matches) {
//                     show(520, 610, 2);
//                 }

//                 if (window.matchMedia('(min-width: 1500px)').matches) {
//                     show(300, 610, 3);

//                 }

//             }


//         } else {
//             hide();
//             $(".text2").css("display", "");

//         }



//     })

//     $(window).on("resize", (e) => {
//         changeSize();
//     })

// });


let changeSize = (carDimentions) => {

    console.log(carDimentions);

    flip();

    setTimeout(() => {

        if (window.matchMedia('(max-width: 767px)').matches) {

            $('.centerC').css('width', '');
            $('.centerC').css('height', '');
            $('#introduction .decription').css('height', '');
            $('#introduction .carDisplay').css('height', '');
        }

        if (window.matchMedia('(min-width: 768px)').matches) {

            $(".text2").css("display", "");


            let ext, height, scale;

            let width = $('.carDisplay').width();
            let rightCenter = -1 * (width);

            if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(max-width: 949px)').matches) {

                console.log('bingo')
                //  ext = 515;
                // height = 700;
                // scale = 2;
                ext = carDimentions.s.ext;
                height = carDimentions.s.height;
                scale = carDimentions.s.scale;
            }
            if (window.matchMedia('(min-width: 950px)').matches && window.matchMedia('(max-width: 1223px)').matches) {

                // ext = 550;
                // height = 570;
                // scale = 2;
                ext = carDimentions.m.ext;
                height = carDimentions.m.height;
                scale = carDimentions.m.scale;
            }

            if (window.matchMedia('(min-width: 1224px)').matches && window.matchMedia('(max-width: 1499px)').matches) {

                // ext = 610;
                // height = 520;
                // scale = 2;
                ext = carDimentions.l.ext;
                height = carDimentions.l.height;
                scale = carDimentions.l.scale;
            }

            if (window.matchMedia('(min-width: 1500px)').matches) {

                // ext = 610;
                // height = 300;
                // scale = 3;
                ext = carDimentions.xl.ext;
                height = carDimentions.xl.height;
                scale = carDimentions.xl.scale;

                $('.centerC').css('right', rightCenter * 2);

                $('.bgc1').css('width', (width * 2) + 'px');
                $('.bgc1').css('height', (height - 32) + 'px');

                $('.bgc2').css('width', ((width) - 32) + 'px');
                $('.bgc2').css('height', (ext + 32) + 'px');

                $('.bgc3').css('width', (width * 2) + 'px');
                $('.bgc3').css('height', (ext + 32) + 'px');


            } else {

                $('.centerC').css('right', rightCenter);

                $('.bgc1').css('width', (width) + 'px');
                $('.bgc1').css('height', (height - 32) + 'px');

                $('.bgc2').css('width', (width - 32) + 'px');
                $('.bgc2').css('height', (ext + 32) + 'px');

                $('.bgc3').css('width', width + 'px');
                $('.bgc3').css('height', (ext + 32) + 'px');

            }



            console.log('width: ' + width);

            $('.centerC').css('width', ((width) * scale) + 'px');



            $('.blockT').css('width', (width - 64) + 'px');
            $('.blockB').css('width', (width - 64) + 'px');

            $('.centerC').css('height', (ext + height) + 'px');
            $('#introduction .decription').css('height', height);
            $('#introduction .carDisplay').css('height', height);
            $('.blockL').css('height', (height - 64) + 'px');
            $('.blockR').css('height', (height - 64) + 'px');

            if (flag) {
                hide();
                flag = false;
            }

        }

    }, 150)

}

let show = ({ ext, height, scale }) => {

    console.log(ext,height,scale);

    let width = $('.centerC').width();
    let rightCenter = $('.centerC').css('right');
    let scaleWidth = ((width * scale) + 16) / (width - 66);
    let scaleHeight = ((ext - 32) + (height - 32)) / (height - 66);
    //1px wprowadzony zeby nie tworzyla sie szczelina

    if (scale == 3) {
        scaleWidth = ((width * scale) + 16) / (width - 132) + 0.001;
        rightCenter = parseFloat(rightCenter);

    }

    $('.fa-chevron-up').css('transform', 'rotate(0deg)');
    $('h4').text('ukryj szczegóły');
    $('.support').css('transition', '0.3s');
    $('.fake').css('opacity', '0');
    $('.centerC').css('transform', 'scaleY(1)');
    $('.shifter').css('height', (ext + 40) + 'px');
    $('.description').css('opacity', '0');
    $('.centerC .text2').css('transition-delay', '0.2s');


    $('.real').css('opacity', '1');


    setTimeout(() => {

        $('.centerC').css('transition-duration', '0.3s'); //

        $('.centerC .text2').css('opacity', '1');  //


        if (scale == 3) {
            $('.centerC').css('transform', 'translateX(' + parseFloat(rightCenter) + 'px )');

            $('.expand').css('left', '-100%');


        }
        else {
            $('.centerC').css('transform', 'translateX(' + parseFloat(rightCenter) + 'px )');

            $('.expand').css('left', '-50%');


        }

        $('.blockTL').css('transform', 'translateX(' + parseFloat(rightCenter) + 'px )');

        $('.blockBL').css('transform', 'translate(' + parseFloat(rightCenter) + 'px,' + ext + 'px )');

        $('.blockTL').css('transform', 'translateX(' + parseFloat(rightCenter) + 'px )');

        $('.blockBL').css('transform', 'translate(' + parseFloat(rightCenter) + 'px,' + ext + 'px )');

        $('.blockL').css('transform', 'translateX(' + parseFloat(rightCenter) + 'px ) scaleY(' + scaleHeight + ')');


        $('.blockBR').css('transform', 'translateY( ' + ext + 'px )');

        $('.blockT').css('transform', 'scaleX(' + scaleWidth + ')');


        $('.blockB').css('transform', 'translateY( ' + ext + 'px ) scaleX(' + scaleWidth + ')');

        $('.blockR').css('transform', 'scaleY(' + scaleHeight + ')');

        $('.c').css('transform', 'scale(1)');

        $('.expand').css('bottom', -ext);

    }, 20)
}

let hide = () => {


    $('.centerC .text2').css('transition-delay', '');
    $('.centerC .text2').css('opacity', '');


    setTimeout(() => {

        $('.fake').css('opacity', '');
        $('.real').css('opacity', '');

        $('.centerC').css('transform', '');
        $('.centerC').css('transition-duration', '');
        $('.support').css('transition', '');


    }, 450)

    setTimeout(() => {

        $('.shifter').css('height', '');

        $('.description').css('opacity', '');

        $('.centerC').css('transform', 'translateX(0)');

        $('.blockTL').css('transform', '');

        $('.blockBL').css('transform', '');

        $('.blockBR').css('transform', '');

        $('.blockT').css('transform', '');

        $('.blockL').css('transform', '');

        $('.blockB').css('transform', '');

        $('.blockR').css('transform', '');

        $('.c').css('transform', '');



        $('.expand').css('bottom', '');

        $('.expand').css('left', '');

    }, 150)

}

let flip = () => {
    if (flag) {
        $('.fa-chevron-up').css('transform', 'rotate(0deg)');
        $('h4').text('ukryj szczegóły');

    } else {

        $('.fa-chevron-up').css('transform', 'rotate(180deg)');
        $('h4').text('pokaż szczegóły');
    }
};
