<template>
  <main class="main skeleton-body">
    <pv-shop-banner></pv-shop-banner>

    <div class="container">
      <nav aria-label="breadcrumb" class="breadcrumb-nav">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              <i class="icon-home"></i>
            </nuxt-link>
          </li>
          <li class="breadcrumb-item active">{{ $t("Shop") }}</li>
        </ol>
      </nav>

      <div class="row">
        <div class="col-12">
          <pv-product-list-two></pv-product-list-two>
        </div>
      </div>
    </div>

    <div class="mb-4"></div>
  </main>
</template>

<script>
import PvProductListTwo from "~/components/partials/shop/product-list/PvProductListTwo";
import PvShopBanner from "~/components/partials/shop/PvShopBanner";
import PvSidebarFilterOne from "~/components/partials/shop/sidebar-filter/PvSidebarFilterOne";

export default {
  components: {
    PvSidebarFilterOne,
    PvProductListTwo,
    PvShopBanner,
  },
  data: function () {
    return {
      categoryList: [],
      featuredProducts: [],
    };
  },
};
</script>