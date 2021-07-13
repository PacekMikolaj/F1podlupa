$(document).ready(function(){
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
    
});