<template>
  <div>
    <div
      class="d-flex justify-content-between media-control_container align-items-center"
    >
      <div class="d-flex align-items-center">
        <div class="d-flex control-product_item align-items-center bg-main">
          <div class="p-1">107745</div>
          <nuxt-img :src="`${product.large_pictures[0].url}`" alt="lgPicture" />
        </div>
        <div class="fw-700 ml-4">
          <a href="javascript:;" @click="PrevProduct" class="text-dark">
            <span><i class="fa fa-angle-left" aria-hidden="true"></i></span>
            <span class="ml-3">{{ product.name }}</span>
          </a>
        </div>
      </div>
      <div class="control-product_item bg-main p-2">{{ product.name }}</div>
      <div class="d-flex align-items-center">
        <div class="fw-700 mr-4">
          <a href="javascript:;" @click="nextProduct" class="text-dark">
            <span class="mr-3">{{ product.name }}</span>
            <span><i class="fa fa-angle-right" aria-hidden="true"></i></span>
          </a>
        </div>
        <div class="d-flex control-product_item align-items-center bg-main">
          <nuxt-img :src="`${product.large_pictures[0].url}`" alt="lgPicture" />
          <div class="p-1">107745</div>
        </div>
      </div>
    </div>
    <div class="product-slider-container">
      <div class="label-group">
        <div class="product-label label-hot" v-if="product.is_hot">HOT</div>
        <div class="product-label label-sale" v-if="product.is_sale">Sale</div>
      </div>

      <PvCarousel
        ref="mediaRef"
        class="product-single-carousel show-nav-hover"
        :options="baseSlider1"
      >
        <div
          class="swiper-slide"
          v-for="item in product.large_pictures"
          :key="item.name"
        >
          <nuxt-img
            class="product-single-image"
            :src="`${item.url}`"
            :width="item.width"
            :height="item.height"
            alt="lgPicture"
          />
        </div>
      </PvCarousel>

      <span class="prod-full-screen" @click="openLightBox" v-if="isMagnify">
        <i class="icon-plus"></i>
      </span>
    </div>

    <PvCarousel
      class="prod-thumbnail swiper-dots show-nav-hover"
      ref="thumbRef"
      :options="baseSlider2"
    >
      <div
        class="swiper-dot swiper-slide"
        v-for="(item, index) in product.large_pictures"
        :key="'media-one' + index"
        @click="activeThumbItem(index, $event)"
        :class="{ active: index === 0 }"
      >
        <nuxt-img
          :src="`${item.url}`"
          :width="item.width"
          :height="item.height"
          alt="product-thumbnail"
        />
      </div>
    </PvCarousel>
    <light-box ref="lightBox" :media="lightBoxMedia" :show-light-box="false" />
  </div>
</template>

<script>
import LightBox from "vue-image-lightbox";
import "vue-image-lightbox/dist/vue-image-lightbox.min.css";
import { baseUrl } from "~/api/cms.axios";
import PvCarousel from "~/components/features/PvCarousel";
import { baseSlider1, baseSlider2 } from "~/utils/data/carousel";

export default {
  components: {
    PvCarousel,
    LightBox,
  },
  props: {
    product: Object,
    isMagnify: {
      type: Boolean,
      default: true,
    },
  },
  data: function () {
    return {
      baseSlider1: baseSlider1,
      baseSlider2: baseSlider2,
      baseUrl: baseUrl,
    };
  },
  computed: {
    lightBoxMedia: function () {
      return this.product.large_pictures.reduce((acc, cur) => {
        return [
          ...acc,
          {
            src: `${cur.url}`,
            thumb: `${cur.url}`,
          },
        ];
      }, []);
    },
  },
  mounted: function () {
    if (this.product !== null) {
      this.$nextTick(() => {
        let self = this;
        this.$refs.mediaRef.swiper.on("transitionStart", function () {
          let activeIndex = self.$refs.mediaRef.swiper.activeIndex;
          self.$refs.thumbRef.swiper.slideTo(activeIndex);
          self.$refs.thumbRef.swiper.$el
            .find(".swiper-wrapper")
            .find(".swiper-dot.active")[0]
            .classList.remove("active");
          self.$refs.thumbRef.swiper.$el
            .find(".swiper-wrapper")
            .find(".swiper-dot")
            [activeIndex].classList.add("active");
        });
      });
    }
  },
  methods: {
    activeThumbItem: function (index, e) {
      // remove active class from previous active item
      e.currentTarget.parentNode
        .querySelector(".swiper-dot.active")
        .classList.remove("active");

      // active current selected item
      e.currentTarget.classList.add("active");

      // translate thumb carousel
      this.$refs.mediaRef.swiper.slideTo(index);
    },
    openLightBox: function () {
      this.$refs.lightBox.showImage(this.$refs.mediaRef.swiper.activeIndex);
    },
    nextProduct(id) {
      this.$emit("navigateProduct", id);
    },
    PrevProduct(id) {
      this.$emit("navigateProduct", id);
    },
  },
};
</script>