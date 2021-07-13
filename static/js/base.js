$(document).ready(function () {
    $(".slider").slick({
        infinite: true,
        // initialSlide: 1,
        lazyLoad: 'progressive',
        // prevArrow: '<span><i class="fas fa-chevron-circle-left prev"></i></span>',
        // nextArrow: '<span><i class="fas fa-chevron-circle-right next"></i></span>',
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnFocus: false,
        //  waitForAnimate: false 
    });
})