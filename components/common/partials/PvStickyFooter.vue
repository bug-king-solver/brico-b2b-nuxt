<template>
  <div class="sticky-navbar">
    <div class="sticky-info">
      <nuxt-link to="/"> <i class="icon-home"></i>Home </nuxt-link>
    </div>
    <div class="sticky-info">
      <a href="javascript:;" @click="showMobileMenu">
        <i class="icon-bars"></i>Categories
      </a>
    </div>
    <div class="sticky-info">
      <nuxt-link to="/shop?wishlist=true">
        <i class="icon-wishlist-2"></i>Wishlist
      </nuxt-link>
    </div>
    <div class="sticky-info">
      <nuxt-link :to="auth ? '/pages/account' : '/pages/login'">
        <i class="icon-user-2"></i>Account
      </nuxt-link>
    </div>
    <div class="sticky-info">
      <nuxt-link to="/pages/cart">
        <i class="icon-shopping-cart position-relative">
          <span class="cart-count badge-circle">{{ totalCount }}</span> </i
        >{{ $t("Cart") }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("cart", ["totalCount"]),
    ...mapGetters("auth", ["auth"]),
  },
  methods: {
    showMobileMenu: function () {
      document.querySelector("body").classList.add("mmenu-active");
    },
  },
};
</script>