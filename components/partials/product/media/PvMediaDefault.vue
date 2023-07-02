<template>
  <div class="position-relative">
    <div class="pg-vertical product-single-gallery">
      <div class="product-slider-container">
        <div class="label-group">
          <div class="product-label label-hot" v-if="product.is_hot">HOT</div>
          <div class="product-label label-sale" v-if="product.is_sale">
            Sale
          </div>
        </div>

        <div class="min-500px h-100">
          <image-magnifier
            v-if="selectImage"
            :src="selectImage.url"
            :zoom-src="selectImage.url"
            :width="selectImage.width"
            :height="selectImage.height"
            zoom-width="1000"
            zoom-height="900"
          ></image-magnifier>
        </div>

        <span class="prod-full-screen" @click="openLightBox" v-if="isMagnify">
          <i class="icon-plus"></i>
        </span>
      </div>

      <div class="vertical-thumbs">
        <button class="thumb-up">
          <i class="icon-angle-up"></i>
        </button>

        <PvCarousel
          class="prod-thumbnail swiper-dots show-nav-hover product-thumbs-wrap"
          ref="thumbRef"
          :options="baseSlider8"
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

        <button class="thumb-down">
          <i class="icon-angle-down"></i>
        </button>
      </div>
    </div>

    <light-box ref="lightBox" :media="lightBoxMedia" :show-light-box="false" />
  </div>
</template>

<script>
import LightBox from "vue-image-lightbox";
import "vue-image-lightbox/dist/vue-image-lightbox.min.css";
import { ImageMagnifier } from "vue-image-magnifier";
import { baseUrl } from "~/api/cms.axios";
import PvCarousel from "~/components/features/PvCarousel";
import { baseSlider1, baseSlider8 } from "~/utils/data/carousel";

export default {
  components: {
    PvCarousel,
    LightBox,
    ImageMagnifier,
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
      baseSlider8: baseSlider8,
      baseUrl: baseUrl,
      selectImage: null,
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
        this.selectImage = this.product.large_pictures[0];

        // let self = this;
        // this.$refs.mediaRef.swiper.on("transitionStart", function () {
        //   let activeIndex = self.$refs.mediaRef.swiper.activeIndex;
        //   self.$refs.thumbRef.swiper.slideTo(activeIndex);
        //   self.$refs.thumbRef.swiper.$el
        //     .find(".swiper-wrapper")
        //     .find(".swiper-dot.active")[0]
        //     .classList.remove("active");
        //   self.$refs.thumbRef.swiper.$el
        //     .find(".swiper-wrapper")
        //     .find(".swiper-dot")
        //     [activeIndex].classList.add("active");
        // });
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
      // this.$refs.mediaRef.swiper.slideTo(index);
      // this.$refs.mediaRef.swiper.slideTo(index);
      if (this.product.large_pictures[index].url)
        this.selectImage = this.product.large_pictures[index];
    },
    openLightBox: function () {
      // this.$refs.lightBox.showImage(this.$refs.mediaRef.swiper.activeIndex);
    },
  },
};
</script>