<template>
  <main class="main skeleton-body">
    <pv-shop-banner></pv-shop-banner>

    <div class="mt-2">
      <div class="row">
        <div class="col-lg-10 row pr-0">
          <div class="col-lg-10">
            <pv-product-list-one
              :category-list="categoryList"
              :items-per-row="1"
            ></pv-product-list-one>
          </div>
          <div class="col-lg-2 pr-0">
            <asidebar-right></asidebar-right>
          </div>
        </div>

        <div class="sidebar-overlay" @click="hideSidebar"></div>
        <aside
          class="sidebar-shop col-lg-2 order-lg-first mobile-sidebar"
          sticky-container
        >
          <div v-sticky="isSticky" sticky-offset="{top: 132}">
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
          </div>
        </aside>
      </div>
    </div>

    <div class="mb-4"></div>
  </main>
</template>

<script>
import Sticky from "vue-sticky-directive";
import AsidebarRight from "~/components/features/sidebar/AsidebarRight";
import PvProductListOne from "~/components/partials/shop/product-list/PvProductListOne";
import PvShopBanner from "~/components/partials/shop/PvShopBanner";
import PvSidebarFilterOne from "~/components/partials/shop/sidebar-filter/PvSidebarFilterOne";

export default {
  components: {
    PvSidebarFilterOne,
    PvProductListOne,
    PvShopBanner,
    AsidebarRight,
  },
  directives: {
    Sticky,
  },
  data: function () {
    return {
      categoryList: [],
      featuredProducts: [],
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
