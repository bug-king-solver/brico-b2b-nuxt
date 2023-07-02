<template>
  <pv-carousel
    class="brands-slider images-center appear-animate"
    data-animation-name="fadeIn"
    data-animation-duration="500"
    v-animate
    :options="brandSlider"
  >
    <div class="swiper-slide" v-for="(brand, index) in brandList" :key="index">
      <nuxt-link :to="brand.url">
        <nuxt-img
          :src="brand.image"
          width="130"
          height="56"
          :alt="brand.label"
        />
      </nuxt-link>
    </div>
  </pv-carousel>
</template>

<script>
import PvCarousel from "~/components/features/PvCarousel";
import { brandSlider } from "~/utils/data/carousel";

export default {
  components: {
    PvCarousel,
  },
  props: {
  	brandList: Array,
  },
  data: function () {
    return {
      brandSlider: brandSlider,
    };
  },
};
</script>
