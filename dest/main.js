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
});
