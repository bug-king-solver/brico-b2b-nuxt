<template>
  <main>
    <div class="container">
      <nav aria-label="breadcrumb" class="breadcrumb-nav">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              <i class="icon-home"></i>
            </nuxt-link>
          </li>

          <li class="breadcrumb-item">
            <nuxt-link to="/shop">{{ $t("Shop") }}</nuxt-link>
          </li>
          <li class="breadcrumb-item" v-if="loaded">
            <nuxt-link
              :to="{ path: '/shop', query: { category: category.slug } }"
              v-for="(category, index) in productCategory"
              :key="`product-category-${index}`"
              >{{
                index === productCategory.length - 1
                  ? category.name
                  : category.name + ", "
              }}</nuxt-link
            >
          </li>
          <li class="breadcrumb-item active" aria-current="page" v-if="loaded">
            {{ product.name }}
          </li>
        </ol>
      </nav>

      <div class="row">
        <div
          class="custom-sidebar-toggle sidebar-toggle"
          @click="toggleSidebar"
          v-if="isSidebar"
        >
          <i class="fas fa-sliders-h"></i>
        </div>
        <div class="sidebar-overlay" @click="toggleSidebar"></div>

        <pv-product-sidebar-one
          :featured-products="featuredProducts"
          v-if="featuredProducts"
        ></pv-product-sidebar-one>

        <aside
          class="sidebar-product col-lg-3 mobile-sidebar"
          v-if="!featuredProducts"
        >
          <div class="sidebar-content skeleton-body">
            <aside class="widget"></aside>
            <aside class="widget"></aside>
            <aside class="widget"></aside>
          </div>
        </aside>

        <div class="col-lg-9 main-content pb-2 skeleton-body">
          <div
            class="product-single-container product-single-default product-left-sidebar"
            v-if="product"
          >
            <div class="row">
              <div class="col-lg-7 col-md-6 product-single-gallery">
                <pv-media-one :product="product"></pv-media-one>
              </div>

              <div class="col-lg-5 col-md-6 product-single-details">
                <pv-detail-one
                  :product="product"
                  :prev-product="prevProduct"
                  :next-product="nextProduct"
                ></pv-detail-one>
              </div>
            </div>
          </div>

          <div class="skel-group" v-else>
            <div class="summary-before col-lg-7 col-md-6"></div>
            <div class="summary entry-summary col-lg-5 col-md-6"></div>
            <div class="tab-content col-lg-12"></div>
          </div>

          <pv-desc-two :product="product" v-if="product"></pv-desc-two>

          <pv-related-products
            :products="relatedProducts"
            class="mb-1"
          ></pv-related-products>
        </div>
      </div>

      <hr class="mt-0 m-b-5" />

      <div class="skeleton-body">
        <pv-small-collection
          :featured-products="featuredProducts"
          :best-products="bestProducts"
          :latest-products="latestProducts"
          :top-rated-products="topRatedProducts"
        ></pv-small-collection>
      </div>
    </div>
  </main>
</template>
    
<script>
import PvRelatedProducts from "~/components/partials/product/PvRelatedProducts";
import PvSmallCollection from "~/components/partials/product/PvSmallCollection";
import PvDescTwo from "~/components/partials/product/description/PvDescTwo";
import PvDetailOne from "~/components/partials/product/detail/PvDetailOne";
import PvMediaOne from "~/components/partials/product/media/PvMediaOne";
import PvProductSidebarOne from "~/components/partials/product/sidebar/PvProductSidebarOne";
import { fetchProductDetailMixin } from "~/mixins";

export default {
  mixins: [fetchProductDetailMixin],
  components: {
    PvProductSidebarOne,
    PvMediaOne,
    PvDetailOne,
    PvDescTwo,
    PvRelatedProducts,
    PvSmallCollection,
  },
  data: function () {
    return {
      product: null,
      relatedProducts: null,
      featuredProducts: null,
      bestProducts: null,
      latestProducts: null,
      topRatedProducts: null,
      nextProduct: null,
      prevProduct: null,
      isSidebar: false,
      loaded: false,
      categoryList: [],
      productCategory: [],
    };
  },
  created: function () {
    this.getProduct();
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
    toggleSidebar: function () {
      let body = document.querySelector("body");
      if (body.classList.contains("sidebar-opened")) {
        body.classList.remove("sidebar-opened");
      } else {
        body.classList.add("sidebar-opened");
      }
    },
    resizeHandler: function () {
      this.isSidebar = window.innerWidth > 991 ? false : true;
    },
  },
};
</script>