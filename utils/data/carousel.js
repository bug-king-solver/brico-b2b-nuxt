export const homeSlider = [
  {
    uri_image:
      "https://brico-casa.it/sites/default/files/banner_images/MIKABRKITCASSIOPEA.jpg",
    meta: {
      alt: "MIKABRKITCASSIOPEA",
    },
    uri: "https://brico-casa.it/catalogo/?promo=true&&id_subtype=0135&",
    slide_type: "home-slide1",
    detail: {
      h4: "Find the Boundaries. Push Through!",
      h2: "Summer Sale",
      h3: "70% Off",
      h5: {
        span: "Starting At",
        b: {
          sup: "$",
          em: "199",
          sup_2: "99",
        },
      },
      a: {
        text: "Shop Now!",
        to: "/shop",
      },
    },
  },
  {
    uri_image:
      "https://brico-casa.it/sites/default/files/banner_images/IRRIGAZIONE_0.jpg",
    meta: {
      alt: "IRRIGAZIONE",
    },
    uri: "https://brico-casa.it/catalogo/?promo=true&&id_subtype=0168&",
    slide_type: "home-slide2",
    detail: {
      h4: "Extra",
      h3: "20% off",
      h3_2: "Accessories",
      h2: "Summer Sale",
      a: {
        text: "Shop All Sale",
        to: "/shop",
      },
    },
  },
];

export const baseSlider1 = {
  slidesPerView: 1,
  spaceBetween: 0,
  centeredSlides: true,
  navigation: {
    nextEl: ".swiper-nav .swiper-next",
    prevEl: ".swiper-nav .swiper-prev",
  },
};

export const baseSlider2 = {
  slidesPerView: 4,
  spaceBetween: 8,
  nav: true,
  navigation: {
    nextEl: ".swiper-nav .swiper-next",
    prevEl: ".swiper-nav .swiper-prev",
  },
};

export const baseSlider3 = {
  spaceBetween: 20,
  autoplay: false,
  slidesPerView: 4,
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
  pagination: {
    el: ".swiper-dots",
    clickable: true,
  },
};

export const baseSlider4 = {
  loop: false,
  spaceBetween: 20,
  autoplay: false,
  slidesPerView: 2,
  breakpoints: {
    992: {
      slidesPerView: 1,
    },
  },
};

export const baseSlider5 = {
  loop: false,
  spaceBetween: 30,
  autoplay: false,
  slidesPerView: 3,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    1200: {
      slidesPerView: 2,
    },
  },
  pagination: {
    el: ".swiper-dots",
    clickable: true,
  },
};

export const baseSlider6 = {
  slidesPerView: 1,
  spaceBetween: 0,
};

export const baseSlider7 = {
  center: true,
  slidesPerView: 3,
  spaceBetween: 0,
  centeredSlides: true,
  loop: true,
  breakpoints: {
    768: {
      slidesPerView: 1,
    },
  },
};

export const baseSlider8 = {
  slidesPerView: 5,
  spaceBetween: 0,
  direction: "vertical",
  nav: false,
};

export const baseSlider9 = {
  spaceBetween: 20,
  autoplay: false,
  slidesPerView: 4,
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
};

baseSlider3;
// home

export const serviceSlider = {
  slidesPerView: 3,
  spaceBetween: 0,
  breakpoints: {
    576: {
      slidesPerView: 1,
    },
    992: {
      slidesPerView: 2,
    },
  },
};

export const bannerSlider = {
  slidesPerView: 3,
  breakpoints: {
    576: {
      slidesPerView: 1,
    },
    992: {
      slidesPerView: 2,
    },
  },
};

export const productSlider = {
  nav: true,
  navigation: {
    nextEl: ".swiper-nav .swiper-next",
    prevEl: ".swiper-nav .swiper-prev",
  },
  slidesPerView: 5,
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 4,
    },
  },
};

export const categorySlider = {
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-nav .swiper-next",
    prevEl: ".swiper-nav .swiper-prev",
  },
  slidesPerView: 5,
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
};

export const blogSlider = {
  spaceBetween: 20,
  slidesPerView: 4,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
  },
};

export const brandSlider = {
  slidesPerView: 6,
  breakpoints: {
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    991: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
  },
  navigation: {
    nextEl: ".swiper-nav .swiper-next",
    prevEl: ".swiper-nav .swiper-prev",
  },
};
