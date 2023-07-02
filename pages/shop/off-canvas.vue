<template>
  <main class="main skeleton-body">
    <pv-shop-banner></pv-shop-banner>

    <div class="container shop-off-canvas">
      <div class="row mt-2">
        <div class="sidebar-overlay" @click="hideSidebarFilter"></div>
        <aside
          class="sidebar-shop col-lg-3 order-lg-first mobile-sidebar custom-scrollbar position-fixed"
        >
          <pv-sidebar-filter-one
            :category-list="categoryList"
            :featured-products="featuredProducts"
            v-if="featuredProducts.length > 0"
          ></pv-sidebar-filter-one>

          <div class="sidebar-content skeleton-body" v-else>
            <aside class="widget"></aside>
            <aside class="widget"></aside>
            <aside class="widget"></aside>
          </div>
        </aside>

        <div class="col-lg-12">
          <pv-product-list-one
            :category-list="categoryList"
            :items-per-row="4"
          ></pv-product-list-one>
        </div>
      </div>
    </div>

    <div class="mb-4"></div>
  </main>
</template>

<script>
import PvShopBanner from "~/components/partials/shop/PvShopBanner";
import PvProductListOne from "~/components/partials/shop/product-list/PvProductListOne";
import PvSidebarFilterOne from "~/components/partials/shop/sidebar-filter/PvSidebarFilterOne";

export default {
  components: {
    PvSidebarFilterOne,
    PvProductListOne,
    PvShopBanner,
  },
  data: function () {
    return {
      categoryList: [],
      featuredProducts: [],
    };
  },
  methods: {
    hideSidebarFilter: function () {
      document.querySelector("body").classList.remove("sidebar-opened");
    },
  },
};
</script>