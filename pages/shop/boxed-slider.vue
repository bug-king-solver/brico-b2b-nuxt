<template>
  <main class="main skeleton-body">
    <div class="container">
      <nav aria-label="breadcrumb" class="breadcrumb-nav">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              <i class="icon-home"></i>
            </nuxt-link>
          </li>
          <li class="breadcrumb-item">
            <nuxt-link :to="{ path: '/shop' }">{{ $t("Shop") }}</nuxt-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Boxed Slider
          </li>
        </ol>
      </nav>

      <div class="row">
        <div class="col-lg-9">
          <pv-carousel class="boxed-slider mb-2" :options="baseSlider6">
            <div class="swiper-slide boxed-slide boxed-slide-1">
              <figure>
                <nuxt-img
                  class="slide-bg"
                  :src="'./images/banners/banner-fashion-1.jpg'"
                  alt="banner"
                  width="870"
                  height="300"
                />
              </figure>
              <div class="slide-content">
                <h4>Fashion</h4>
                <h5>mega sale</h5>
                <span>extra</span>
                <b>
                  60
                  <i>%</i> OFF
                </b>
                <p>On order above $555</p>
              </div>
            </div>

            <div class="swiper-slide boxed-slide boxed-slide-2">
              <figure>
                <nuxt-img
                  class="slide-bg"
                  :src="'./images/banners/banner-fashion-2.jpg'"
                  alt="banner"
                  width="870"
                  height="300"
                />
              </figure>
              <div class="slide-content">
                <h5>
                  Check out over
                  <span>200</span>
                  <i>+</i>
                </h5>
                <h4>Men's jackets & coats</h4>
                <nuxt-link to="/shop/boxed-slider" class="btn btn-sm btn-dark"
                  >SHOP NOW</nuxt-link
                >
              </div>
            </div>
          </pv-carousel>

          <pv-product-list-one
            :category-list="categoryList"
          ></pv-product-list-one>
        </div>

        <div class="sidebar-overlay" @click="hideSidebar"></div>
        <aside
          class="sidebar-shop col-lg-3 order-lg-first mobile-sidebar"
          sticky-container
        >
          <div v-sticky="isSticky" sticky-offset="{top: 132}">
            <pv-sidebar-filter-one
              :category-list="categoryList"
              :featured-products="featuredProducts"
              v-if="featuredProducts.length > 0"
            ></pv-sidebar-filter-one>

            <div
              class="sidebar-content skeleton-body"
              v-if="featuredProducts.length === 0"
            >
              <aside class="widget"></aside>
              <aside class="widget"></aside>
              <aside class="widget"></aside>
            </div>
          </div>
        </aside>
      </div>

      <div class="mb-4"></div>
    </div>
  </main>
</template>

<script>
import Sticky from "vue-sticky-directive";
import PvCarousel from "~/components/features/PvCarousel";
import PvProductListOne from "~/components/partials/shop/product-list/PvProductListOne";
import PvSidebarFilterOne from "~/components/partials/shop/sidebar-filter/PvSidebarFilterOne";
import { baseSlider6 } from "~/utils/data/carousel";

export default {
  directives: {
    Sticky,
  },
  components: {
    PvSidebarFilterOne,
    PvProductListOne,
    PvCarousel,
  },
  data: function () {
    return {
      categoryList: [],
      featuredProducts: [],
      baseSlider6: baseSlider6,
      isSticky: false,
    };
  },
  mounted: function () {
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler, {
      passive: true,
    });
  },
  destroyed: function () {
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods: {
    resizeHandler: function () {
      this.isSticky = window.innerWidth > 991 ? true : false;
    },
    hideSidebar: function () {
      document.querySelector("body").classList.remove("sidebar-opened");
    },
  },
};
</script>