const carDisplayDimentions = {
  s: {
    height: 480,
    ext: 850,
    scale: 2
  },
  m: {
    height: 530,
    ext: 780,
    scale: 2
  },
  l: {
    height: 600,
    ext: 700,
    scale: 2
  },
  xl: {
    height: 610,
    ext: 400,
    scale: 3
  },
};

let flag = false;

$(document).ready(function () {

  $("#sliderForF1").slick({
    infinite: false,
    // prevArrow: '<span><i class="fas fa-chevron-circle-left prev"></i></span>',
    // nextArrow: '<span><i class="fas fa-chevron-circle-right next"></i></span>',
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]

  });

  // //cardisplay

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