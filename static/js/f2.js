const carDisplayDimentions = {
  s: {
    height: 540,
    ext: 680,
    scale: 2
  },
  m: {
    height: 570,
    ext: 550,
    scale: 2
  },
  l: {
    height: 610,
    ext: 520,
    scale: 2
  },
  xl: {
    height: 610,
    ext: 300,
    scale: 3
  },
};

let flag = false;

$(document).ready(function () {

    changeSize(carDisplayDimentions);

    $('.expand').on('click', (e) => {

        console.log(flag)


        flag = !flag;
        flip();

        if (flag) {
            if (window.matchMedia('(max-width: 767px)').matches) {
                $(".text2").css("display", "flex");

            }
            else {

                if (window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(max-width: 949px)').matches) {
                    show(carDisplayDimentions.s);
                }

                if (window.matchMedia('(min-width: 950px)').matches && window.matchMedia('(max-width: 1223px)').matches) {
                    show(carDisplayDimentions.m);
                }

                if (window.matchMedia('(min-width: 1224px)').matches && window.matchMedia('(max-width: 1499px)').matches) {
                    show(carDisplayDimentions.l);
                }

                if (window.matchMedia('(min-width: 1500px)').matches) {
                    show(carDisplayDimentions.xl);

                }

            }


        } else {
            hide();
            $(".text2").css("display", "");

        }



    })

    $(window).on("resize", (e) => {
        changeSize(carDisplayDimentions);
    })

});