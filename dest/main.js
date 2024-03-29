$(window).on("load", function () {
  AOS.init();
  // menu mobile
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

  // zoom in project
  let $popup = $(".popup");
  $(".project__detail .full-screen .zoom-in").on("click", function () {
    $popup.addClass("active");
  });
  $popup.on("click", function () {
    $(this).removeClass("active");
  });

  // back to top
  $backToTop = $(".backtotop");
  $backToTop.on("click", function () {
    // $("html").animate({ scrollTop: 0 });
    $(window).scrollTop(0);
  });

  // rental studio active
  $studioNum = $(".numbers .number");
  $studioNum.on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
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
    fullscreen: true,
  });
  $(".control__btn.--next").on("click", function () {
    $studioSlider.flickity("next");
  });
  $(".control__btn.--prev").on("click", function () {
    $studioSlider.flickity("previous");
  });
  $(".studio-detail .full-screen .zoom-in").on("click", function () {
    $studioSlider.flickity("viewFullscreen");
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

  // photo swipe
  var initPhotoSwipeFromDOM = function (gallerySelector) {
    var parseThumbnailElements = function (el) {
      var thumbElements = el.childNodes,
        numNodes = thumbElements.length,
        items = [],
        figureEl,
        linkEl,
        size,
        item;
      for (var i = 0; i < numNodes; i++) {
        figureEl = thumbElements[i]; // <figure> element
        if (figureEl.nodeType !== 1) {
          continue;
        }
        linkEl = figureEl.children[0]; // <a> element
        size = linkEl.getAttribute("data-size").split("x");
        item = {
          src: linkEl.getAttribute("href"),
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10),
        };
        if (figureEl.children.length > 1) {
          item.title = figureEl.children[1].innerHTML;
        }
        if (linkEl.children.length > 0) {
          // <img> thumbnail element, retrieving thumbnail url
          item.msrc = linkEl.children[0].getAttribute("src");
        }
        item.el = figureEl; // save link to element for getThumbBoundsFn
        items.push(item);
      }
      return items;
    };
    var closest = function closest(el, fn) {
      return el && (fn(el) ? el : closest(el.parentNode, fn));
    };
    var onThumbnailsClick = function (e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      var eTarget = e.target || e.srcElement;
      var clickedListItem = closest(eTarget, function (el) {
        return el.tagName && el.tagName.toUpperCase() === "FIGURE";
      });
      if (!clickedListItem) {
        return;
      }
      var clickedGallery = clickedListItem.parentNode,
        childNodes = clickedListItem.parentNode.childNodes,
        numChildNodes = childNodes.length,
        nodeIndex = 0,
        index;
      for (var i = 0; i < numChildNodes; i++) {
        if (childNodes[i].nodeType !== 1) {
          continue;
        }
        if (childNodes[i] === clickedListItem) {
          index = nodeIndex;
          break;
        }
        nodeIndex++;
      }
      if (index >= 0) {
        openPhotoSwipe(index, clickedGallery);
      }
      return false;
    };
    var photoswipeParseHash = function () {
      var hash = window.location.hash.substring(1),
        params = {};
      if (hash.length < 5) {
        return params;
      }
      var vars = hash.split("&");
      for (var i = 0; i < vars.length; i++) {
        if (!vars[i]) {
          continue;
        }
        var pair = vars[i].split("=");
        if (pair.length < 2) {
          continue;
        }
        params[pair[0]] = pair[1];
      }
      if (params.gid) {
        params.gid = parseInt(params.gid, 10);
      }
      return params;
    };
    var openPhotoSwipe = function (
      index,
      galleryElement,
      disableAnimation,
      fromURL
    ) {
      var pswpElement = document.querySelectorAll(".pswp")[0],
        gallery,
        options,
        items;
      items = parseThumbnailElements(galleryElement);
      options = {
        galleryUID: galleryElement.getAttribute("data-pswp-uid"),
        getThumbBoundsFn: function (index) {
          var thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
            pageYScroll =
              window.pageYOffset || document.documentElement.scrollTop,
            rect = thumbnail.getBoundingClientRect();

          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        },
        showAnimationDuration: 0,
        hideAnimationDuration: 0,
      };
      if (fromURL) {
        if (options.galleryPIDs) {
          for (var j = 0; j < items.length; j++) {
            if (items[j].pid == index) {
              options.index = j;
              break;
            }
          }
        } else {
          options.index = parseInt(index, 10) - 1;
        }
      } else {
        options.index = parseInt(index, 10);
      }
      if (isNaN(options.index)) {
        return;
      }
      if (disableAnimation) {
        options.showAnimationDuration = 0;
      }
      gallery = new PhotoSwipe(
        pswpElement,
        PhotoSwipeUI_Default,
        items,
        options
      );
      gallery.init();
    };
    var galleryElements = document.querySelectorAll(gallerySelector);
    for (var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute("data-pswp-uid", i + 1);
      galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
      openPhotoSwipe(
        hashData.pid,
        galleryElements[hashData.gid - 1],
        true,
        true
      );
    }
  };

  initPhotoSwipeFromDOM(".cafe__item");
});
