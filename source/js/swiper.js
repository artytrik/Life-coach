const reviewsSwiper = new Swiper(`.swiper-container`, {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  loop: true
});
