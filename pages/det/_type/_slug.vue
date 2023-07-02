<template>
  <main class="main skeleton-body">
    <nav aria-label="breadcrumb" class="breadcrumb-nav container">
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

    <div
      class="product-single-container product-single-default product-full-width"
      v-if="product"
    >
      <div class="container-fluid pl-lg-0 padding-right-lg">
        <div class="row">
          <div class="col-lg-6 product-single-gallery" sticky-container>
            <pv-media-mobile
              :product="product"
              v-if="isMobile"
            ></pv-media-mobile>
            <pv-media-web :product="product" v-else></pv-media-web>
          </div>

          <div class="col-lg-6 pb-1 pr-0">
            <pv-detail-three
              :product="product"
              :prev-product="prevProduct"
              :next-product="nextProduct"
            ></pv-detail-three>
          </div>
          <general-condition></general-condition>
          <div class="container">
            <pv-desc-one :product="product" v-if="product"></pv-desc-one>
          </div>
          <div class="container-fluid container">
            <pv-related-products
              :products="relatedProducts"
              class="mb-1"
            ></pv-related-products>

            <hr class="mt-0 m-b-5" />
          </div>
          <div class="container">
            <div class="skeleton-body">
              <pv-small-collection
                :featured-products="featuredProducts"
                :best-products="bestProducts"
                :latest-products="latestProducts"
                :top-rated-products="topRatedProducts"
              ></pv-small-collection>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="skel-group" v-else>
      <div class="summary-before col-lg-6 mb-2"></div>
      <div class="summary entry-summary col-lg-6">
        <div class="tab-content col-lg-12"></div>
      </div>
    </div>
  </main>
</template>

<script>
import Sticky from "vue-sticky-directive";
import PvDescOne from "~/components/partials/product/description/PvDescOne";
import PvDetailThree from "~/components/partials/product/detail/PvDetailThree";
import GeneralCondition from "~/components/partials/product/GeneralCondition";
import PvMediaFive from "~/components/partials/product/media/PvMediaFive";
import PvMediaMobile from "~/components/partials/product/media/PvMediaMobile";
import PvMediaWeb from "~/components/partials/product/media/PvMediaWeb";
import PvRelatedProducts from "~/components/partials/product/PvRelatedProducts";
import PvSmallCollection from "~/components/partials/product/PvSmallCollection";
import { deviceMixin, fetchProductDetailMixin } from "~/mixins";

export default {
  mixins: [deviceMixin, fetchProductDetailMixin],
  directives: {
    Sticky,
  },
  components: {
    PvMediaFive,
    PvMediaMobile,
    PvMediaWeb,
    PvDetailThree,
    PvRelatedProducts,
    PvSmallCollection,
    PvDescOne,
    GeneralCondition,
  },
  data: function () {
    return {
      isSticky: false,
      product: null,
      relatedProducts: null,
      featuredProducts: null,
      bestProducts: null,
      latestProducts: null,
      topRatedProducts: null,
      nextProduct: null,
      prevProduct: null,
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
    resizeHandler: function () {
      this.isSticky = window.innerWidth > 991 ? true : false;
    },
  },
};
</script>
