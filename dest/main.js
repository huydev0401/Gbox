$(window).on("load", function () {
  let $toggleMenu = $(".hamburger");
  let $navMobile = $(".nav__mobile");
  $toggleMenu.on("click", function () {
    $(this).toggleClass("active");
    $navMobile.toggleClass("active");
  });
  $(window).on("resize", function () {
    if ($(window).innerWidth() > 767) {
      $toggleMenu.removeClass("active");
      $navMobile.removeClass("active");
    }
  });

  // libs
  // studio slider
  let $studioSlider = $(".studio__slider");
  $studioSlider.flickity({
    cellAlign: "left",
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    wrapAround: true,
    lazyLoad: 1,
  });
  $(".control__btn.--next").on("click", function () {
    $studioSlider.flickity("next");
  });
  $(".control__btn.--prev").on("click", function () {
    $studioSlider.flickity("previous");
  });

  // cafe gallery
  let $cafeGallery = $(".cafe__gallery");
  $cafeGallery.flickity({
    cellAlign: "left",
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    wrapAround: true,
    lazyLoad: 1,
  });
  $(".control__btn.--next").on("click", function () {
    $cafeGallery.flickity("next");
  });
  $(".control__btn.--prev").on("click", function () {
    $cafeGallery.flickity("previous");
  });
});
