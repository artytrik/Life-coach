"use strict";

var photosSwiper = new Swiper(".swiper-container", {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  loop: true,
  slidesPerView: 3,
  spaceBetween: 10
});