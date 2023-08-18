<template>
  <main class="main skeleton-body w-100">
    <div
      class="product-single-container product-single-default product-full-width"
      v-if="product"
    >
      <div class="container-fluid pl-lg-0 padding-right-lg">
        <div class="row">
          <div class="col-lg-6 product-single-gallery" sticky-container>
            <pv-media-web
              :product="product"
              @navigateProduct="navigateProduct"
            ></pv-media-web>
          </div>
          <div class="col-lg-6 pb-1 pr-0">
            <next-prev-control
              :next-product="nextProduct"
              :prev-product="prevProduct"
              @setActiveIndex="setActiveIndex"
            ></next-prev-control>
            <pv-detail-three
              :product="product"
              :prev-product="product"
              :next-product="product"
            ></pv-detail-three>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import NextPrevControl from "~/components/partials/product/NextPrevControl";
import PvDetailThree from "~/components/partials/product/detail/PvDetailThree";
import PvMediaWeb from "~/components/partials/product/media/PvMediaWeb";

export default {
  components: {
    PvMediaWeb,
    PvDetailThree,
    NextPrevControl,
  },
  props: {
    product: Object,
    nextProduct: Object,
    prevProduct: Object,
    adClass: String,
    isActions: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    navigateProduct(id) {
      this.$emit("navigateProduct", id);
    },
    setActiveIndex(index) {
      this.$emit("setActiveIndex", index);
    },
  },
};
</script>