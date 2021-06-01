$(document).ready(function () {

  //dodanie tekstu
  console.log($("#cover").attr('src'))
  let id = ($('#cover').attr('src')).split('/')[2];
  console.log(id)
  $("#text").load(`/upload/${id}/body.html`);

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

});
