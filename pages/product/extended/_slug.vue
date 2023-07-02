<template>
  <main
    class="main product-extended-page skeleton-body product-layout-extended"
  >
    <nav aria-label="breadcrumb" class="breadcrumb-nav">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/"> Home </nuxt-link>
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
      </div>
    </nav>

    <div class="container">
      <div class="skel-group">
        <div class="summary-before col-12"></div>
        <div class="summary entry-summary col-12"></div>
        <div class="tab-content col-lg-12"></div>
      </div>
    </div>

    <div
      class="product-single-container product-single-extended product-page"
      v-if="product"
    >
      <div class="container product-slider-container">
        <pv-media-four :product="product"></pv-media-four>

        <pv-detail-four
          :product="product"
          :prev-product="prevProduct"
          :next-product="nextProduct"
        ></pv-detail-four>
      </div>
    </div>

    <div class="container">
      <pv-desc-one :product="product" v-if="product"></pv-desc-one>

      <pv-related-products :products="relatedProducts"></pv-related-products>

      <pv-small-collection
        :featured-products="featuredProducts"
        :best-products="bestProducts"
        :latest-products="latestProducts"
        :top-rated-products="topRatedProducts"
      ></pv-small-collection>
    </div>
  </main>
</template>

<script>
import PvDescOne from "~/components/partials/product/description/PvDescOne";
import PvDetailFour from "~/components/partials/product/detail/PvDetailFour";
import PvMediaFour from "~/components/partials/product/media/PvMediaFour";
import PvRelatedProducts from "~/components/partials/product/PvRelatedProducts";
import PvSmallCollection from "~/components/partials/product/PvSmallCollection";
import { fetchProductDetailMixin } from "~/mixins";

export default {
  mixins: [fetchProductDetailMixin],
  components: {
    PvMediaFour,
    PvDetailFour,
    PvDescOne,
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
      loaded: false,
      productCategory: [],
    };
  },
  created: function () {
    this.getProduct();
  },
};
</script>