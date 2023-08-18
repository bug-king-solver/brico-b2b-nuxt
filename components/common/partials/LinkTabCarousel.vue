<template>
  <div class="container px-5" v-if="tabs && tabs.length > 0">
    <VueSlickCarousel v-bind="settings">
      <nuxt-link
        :to="`/${item.url}`"
        v-for="(item, index) in tabs"
        :key="index"
        @click="setCategory(item)"
      >
        <div
          class="slick-tab d-flex align-items-center"
          :class="{ active: checkActive(item.url) }"
        >
          <span class="mr-3">{{ item.text }}</span>
          <i :class="`fa fa-${item.icon}`" aria-hidden="true"></i>
        </div>
      </nuxt-link>
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import { Api } from "~/api";
import { apiResource, getPromoSliderUrl } from "~/api/cloud.axios";

export default {
  name: "LinkTabCarousel",
  components: { VueSlickCarousel },
  data: function () {
    return {
      settings: {
        dots: false,
        infinite: false,
        centerMode: false,
        centerPadding: "20px",
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
      },
      activeItem: 1,
      tabs: [],
    };
  },
  mounted() {
    this.getPromoList();
  },
  methods: {
    getPromoList() {
      Api.get(
        `${apiResource}${getPromoSliderUrl}?fields=["*"]&limit_page_length=0`
      ).then(({ data }) => {
        this.tabs = data.data;
      });
    },
    checkActive(query) {
      if (this.$route.fullPath == `/${query}`) {
        return true;
      }

      return false;
    },
  },
};
</script>
