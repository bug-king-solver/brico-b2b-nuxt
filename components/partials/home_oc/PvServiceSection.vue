<template>
  <div class="container appear-animate" v-animate>
    <pv-carousel class="info-boxes-slider mb-2" :options="serviceSlider">
      <div class="info-box info-box-icon-left swiper-slide">
        <i class="icon-shipping"></i>

        <div class="info-box-content">
          <h4>FREE SHIPPING &amp; RETURN</h4>
          <p class="text-body">Free shipping on all orders over $99.</p>
        </div>
      </div>

      <div class="info-box info-box-icon-left swiper-slide">
        <i class="icon-money"></i>

        <div class="info-box-content">
          <h4>MONEY BACK GUARANTEE</h4>
          <p class="text-body">100% money back guarantee</p>
        </div>
      </div>

      <div class="info-box info-box-icon-left swiper-slide">
        <i class="icon-support"></i>

        <div class="info-box-content">
          <h4>ONLINE SUPPORT 24/7</h4>
          <p class="text-body">Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </pv-carousel>

    <div class="banners-container mb-2">
      <pv-carousel class="banners-slider" :options="bannerSlider">
        <div
          v-for="(box, index) in promoBoxList"
          :key="index"
					class="banner banner2 banner-sm-vw text-uppercase d-flex align-items-center appear-animate swiper-slide"
					data-animation-name="fadeInLeftShorter"
					data-animation-delay="500"
					v-animate
				>
        <figure class="w-100">
            <nuxt-img
              ::src="box.slide_image"
              :src="box.slide_image"
              :alt="box.label"
              width="380"
              height="175"
            />
          </figure>
          <div class="banner-layer text-center">
						<nuxt-link
							:to="box.url"
							class="btn btn-sm btn-dark"
							>{{ box.label }}
              </nuxt-link
						> 
          </div>
				</div>
      </pv-carousel>
    </div>
  </div>
</template>

<script>
import PvCarousel from "~/components/features/PvCarousel";
import { bannerSlider, serviceSlider } from "~/utils/data/carousel";

export default {
  components: {
    PvCarousel,
  },
  props: {
    promoBoxList: Array,
  },
  data: function () {
    return {
      serviceSlider: serviceSlider,
      bannerSlider: bannerSlider,
    };
  },
};
</script>
