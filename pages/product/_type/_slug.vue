<template>
  <main class="main">
    <div class="container skeleton-body">
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

      <div class="product-single-container product-single-default">
        <div class="row" v-if="product">
          <div class="col-lg-5 col-md-6 product-single-gallery">
            <pv-media-one :product="product"></pv-media-one>
          </div>

          <div class="col-lg-7 col-md-6 product-single-details">
            <pv-detail-one
              :product="product"
              :prev-product="prevProduct"
              :next-product="nextProduct"
            ></pv-detail-one>
          </div>
        </div>
      </div>

      <div class="skel-group" v-if="!product">
        <div class="summary-before col-lg-5 col-md-6"></div>
        <div class="summary entry-summary col-lg-7 col-md-6"></div>
        <div class="tab-content col-lg-12"></div>
      </div>

      <pv-desc-one :product="product" v-if="product"></pv-desc-one>

      <pv-related-products :products="relatedProducts"></pv-related-products>

      <hr class="mt-0 m-b-5" />

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
import PvRelatedProducts from "~/components/partials/product/PvRelatedProducts";
import PvSmallCollection from "~/components/partials/product/PvSmallCollection";
import PvDescOne from "~/components/partials/product/description/PvDescOne";
import PvDetailOne from "~/components/partials/product/detail/PvDetailOne";
import PvMediaOne from "~/components/partials/product/media/PvMediaOne";
import { deviceMixin, fetchProductDetailMixin } from "~/mixins";

export default {
  mixins: [deviceMixin, fetchProductDetailMixin],
  components: {
    PvMediaOne,
    PvDetailOne,
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