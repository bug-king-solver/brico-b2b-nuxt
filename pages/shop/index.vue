<template>
  <main class="main skeleton-body">
    <pv-shop-banner></pv-shop-banner>

    <div class="mt-2">
      <div class="row">
        <div class="col-lg-9 row pr-0">
          <div class="col-lg-12">
            <product-list></product-list>
          </div>
          <!-- <div class="col-lg-2 pr-0 d-none d-sm-block">
            <asidebar-right></asidebar-right>
          </div> -->
        </div>

        <div class="sidebar-overlay" @click.prevent="toggleSidebar"></div>
        <aside
          class="sidebar-shop col-lg-3 order-lg-first mobile-sidebar"
          sticky-container
        >
          <div v-sticky="isSticky" sticky-offset="{top: 132, bottom:0}">
            <pv-sidebar-filter-one v-if="categoryList"></pv-sidebar-filter-one>

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
import { mapGetters } from "vuex";
import AsidebarRight from "~/components/features/sidebar/AsidebarRight";
import PvShopBanner from "~/components/partials/shop/PvShopBanner";
import ProductList from "~/components/partials/shop/product-list/ProductList";
import PvSidebarFilterOne from "~/components/partials/shop/sidebar-filter_oc/PvSidebarFilterOne";
import { setStoreItem } from "~/services/localstorage.service";
import { LOCALSTORAGE_KEYS } from "~/utils/data/constants";

export default {
  components: {
    PvSidebarFilterOne,
    ProductList,
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
  computed: {
    ...mapGetters("auth", ["auth"]),
  },
  mounted: function () {
    this.checkWishListRoute();
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
    toggleSidebar: function () {
      if (document.querySelector("body").classList.contains("sidebar-opened")) {
        document.querySelector("body").classList.remove("sidebar-opened");
      } else {
        document.querySelector("body").classList.add("sidebar-opened");
      }
    },
    checkWishListRoute() {
      if (this.$route.fullPath == "/shop?wishlist=true") {
        if (!this.auth) {
          setStoreItem(
            LOCALSTORAGE_KEYS.LAST_ROUTE_BEFORE_LOGIN,
            "/shop?wishlist=true"
          );
          this.$router.push("/pages/login");
        }
      }
    },
  },
};
</script>
