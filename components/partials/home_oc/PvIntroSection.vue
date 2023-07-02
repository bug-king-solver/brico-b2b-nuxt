<template>
  <pv-carousel
    class="home-slider show-nav-hover nav-big mb-2 text-uppercase slide-animate"
    :options="baseSlider1"
    v-animate
    v-if="sliderTop.length > 0"
  >
    <div
      v-for="(slide, index) in sliderTop"
      :key="index"
      class="home-slide home-slide2 banner swiper-slide"
    >
      <nuxt-img
        class="slide-bg"
        :src="
          isMobile ? slide.slide_image_mobile[0].url : slide.slide_image[0].url
        "
        loading="lazy"
        :alt="slide.title_1"
        width="800"
        height="500"
        image-ratio="26"
        sizes="sm:100vw md:50vw lg:400px"
        quality="70"
      />
      <div class="container d-flex align-items-center">
        <div
          class="banner-layer d-flex justify-content-center appear-animate"
          data-animation-name="fadeInUpShorter"
        >
          <div class="mx-auto">
            <h3 class="m-b-2 p-3 bg-primary text-yellow" v-if="slide.title_1">
              {{ slide.title_1 }}
            </h3>
            <h4 class="m-b-2 p-3 bg-primary text-yellow" v-if="slide.title_2">
              {{ slide.title_2 }}
            </h4>
            <nuxt-link
              :to="slide.url"
              class="btn btn-block bg-primary text-yellow"
              v-if="slide.button"
              >{{ slide.button }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </pv-carousel>
</template>

<script>
import PvCarousel from "~/components/features/PvCarousel";
import { deviceMixin } from "~/mixins";
import { baseSlider1, homeSlider } from "~/utils/data/carousel";

export default {
  mixins: [deviceMixin],
  components: {
    PvCarousel,
  },
  props: {
    sliderTop: Array,
  },
  data: function () {
    return {
      baseSlider1: baseSlider1,
      homeSlider: homeSlider,
    };
  },
};
</script>
