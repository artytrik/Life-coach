const photosSwiper = new Swiper(`.swiper-container`, {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  loop: true,
  slidesPerView: 5
});
