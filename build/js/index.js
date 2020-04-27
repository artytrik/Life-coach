"use strict";

var header = document.querySelector(".page-header");
var stickyClass = "page-header--sticky";
var headerAnchors = header.querySelectorAll(".anchor");

window.onscroll = function () {
  return document.documentElement.scrollTop > 1 ? header.classList.add(stickyClass) : header.classList.remove(stickyClass);
};

headerAnchors.forEach(function (anchor) {
  anchor.addEventListener("click", function (evt) {
    evt.preventDefault();
    var blockID = anchor.getAttribute("href").substr(1);
    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});
$(window).scroll(function () {
  var scrollDistance = $(window).scrollTop();
  $('.page-main__scroll').each(function (i) {
    if ($(this).position().top <= scrollDistance) {
      $('.site-list__link--active').removeClass('site-list__link--active');
      $('.anchor').eq(i).addClass('site-list__link--active');
    }
  });
}).scroll();