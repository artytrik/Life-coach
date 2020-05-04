const header = document.querySelector(`.page-header`);
const stickyClass = `page-header--sticky`;
const headerAnchors = header.querySelectorAll(`.anchor`);
const pageHeader = document.querySelector(`.page-header`);
const toggle = pageHeader.querySelector(`.page-header__toggle`);

window.onscroll = () => document.documentElement.scrollTop > 1 ?
  header.classList.add(stickyClass) :
  header.classList.remove(stickyClass);

headerAnchors.forEach((anchor) => {
  anchor.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    const blockID = anchor.getAttribute(`href`).substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: `smooth`,
      block: `start`
    })
  });
});

$(window).scroll(function() {
  var scrollDistance = $(window).scrollTop();

$('.page-main__scroll').each(function(i) {
    if ($(this).position().top <= scrollDistance) {
        $('.site-list__link--active').removeClass('site-list__link--active');
        $('.anchor').eq(i).addClass('site-list__link--active');
    }
  });
}).scroll();

const onToggleClick = (evt) => {
  evt.preventDefault();

  pageHeader.classList.toggle(`page-header--opened`);
};

toggle.addEventListener(`click`, onToggleClick);
