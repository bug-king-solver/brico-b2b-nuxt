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

      <div
        class="product-single-container product-single-default"
        v-if="product"
      >
        <div class="row">
          <div class="col-lg-5 col-md-6 product-single-gallery">
            <pv-media-one :product="product"></pv-media-one>
          </div>

          <div class="col-lg-7 col-md-6 product-single-details">
            <pv-detail-two
              :product="product"
              :prev-product="prevProduct"
              :next-product="nextProduct"
            ></pv-detail-two>
          </div>
        </div>
      </div>

      <div class="skel-group" v-else>
        <div class="summary-before col-lg-5 col-md-6"></div>
        <div class="summary entry-summary col-lg-7 col-md-6"></div>
        <div class="tab-content col-lg-12"></div>
      </div>

      <pv-desc-one :product="product" v-if="product"></pv-desc-one>

      <pv-related-products
        :products="relatedProducts"
        class="mb-1"
      ></pv-related-products>

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
import PvDescOne from "~/components/partials/product/description/PvDescOne";
import PvDetailTwo from "~/components/partials/product/detail/PvDetailTwo";
import PvMediaOne from "~/components/partials/product/media/PvMediaOne";
import PvRelatedProducts from "~/components/partials/product/PvRelatedProducts";
import PvSmallCollection from "~/components/partials/product/PvSmallCollection";
import { fetchProductDetailMixin } from "~/mixins";

export default {
  mixins: [fetchProductDetailMixin],
  components: {
    PvMediaOne,
    PvDetailTwo,
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
      categoryList: [],
      productCategory: [],
    };
  },
  created: function () {
    this.getProduct();
  },
};
</script>