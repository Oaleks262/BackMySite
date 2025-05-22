const swiper = new Swiper('.swiper-container', {
  loop: true,


  slidesPerView: 2,
  spaceBetween: 16,

  // Responsive breakpoints
  breakpoints: {
      768: {
          slidesPerView: 1,
      }
  },

  pagination: {
      el: '.pagination',
    //   clickable: true, 
  },

  navigation: {
      nextEl: '.button-next',
      prevEl: '.button-prev',
  },
});