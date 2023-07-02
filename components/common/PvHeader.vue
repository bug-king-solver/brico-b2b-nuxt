<template>
  <header class="header">
    <div class="header-top">
      <div class="container">
        <div class="header-left d-none d-sm-block">
          <p class="top-message text-uppercase">
            FREE Returns. Standard Shipping Orders $99+
          </p>
        </div>

        <div class="header-right header-dropdowns ml-0 ml-sm-auto w-sm-100">
          <div class="header-dropdown dropdown-expanded d-none d-lg-block">
            <a href="javascript:;">Links</a>
            <div class="header-menu">
              <ul>
                <li>
                  <nuxt-link to="/pages/account">{{
                    $t("My Account")
                  }}</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/pages/about-us">About Us</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/pages/blog">Blog</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/shop?wishlist=true">My Wishlist</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/pages/cart">{{ $t("Cart") }}</nuxt-link>
                </li>
              </ul>
            </div>
          </div>

          <span class="separator"></span>

          <div class="header-dropdown">
            <a href="javascript:;" class="pl-0">
              <i class="flag-us flag mr-2" v-if="$i18n.locale == 'en'"></i>
              <i class="flag-it flag mr-2" v-else></i>
              {{ $t("LANG") }}
            </a>
            <div class="header-menu">
              <ul>
                <li>
                  <nuxt-link :to="switchLocalePath('en')"
                    ><i class="flag-us flag mr-2"></i>English</nuxt-link
                  >
                </li>
                <li>
                  <nuxt-link :to="switchLocalePath('it')"
                    ><i class="flag-it flag mr-2"></i>Italian</nuxt-link
                  >
                </li>
              </ul>
            </div>
          </div>

          <div class="header-dropdown mr-auto mr-sm-3 mr-md-0">
            <a href="javascript:;">USD</a>
            <div class="header-menu">
              <ul>
                <li>
                  <a href="javascript:;">EUR</a>
                </li>
                <li>
                  <a href="javascript:;">USD</a>
                </li>
              </ul>
            </div>
          </div>

          <span class="separator"></span>

          <div class="social-icons">
            <a
              href="javascript:;"
              class="social-icon social-facebook icon-facebook"
            ></a>
            <a
              href="javascript:;"
              class="social-icon social-twitter icon-twitter"
            ></a>
            <a
              href="javascript:;"
              class="social-icon social-instagram icon-instagram"
            ></a>
          </div>
        </div>
      </div>
    </div>

    <div class="header-middle sticky-header py-0 desktop-sticky">
      <div class="container py-1">
        <div class="header-left col-lg-2 w-auto pl-0">
          <button
            class="mobile-menu-toggler text-primary mr-2"
            type="button"
            @click="showMobileMenu"
          >
            <i class="fas fa-bars"></i>
          </button>
          <nuxt-link to="/" class="logo">
            <nuxt-img
              src="/images/logo.svg"
              width="101"
              height="40"
              alt="Porto Logo"
            />
          </nuxt-link>
        </div>

        <div class="header-right w-lg-max">
          <pv-header-search></pv-header-search>

          <div class="header-contact d-none d-lg-flex pl-4 pr-4">
            <nuxt-img
              alt="phone"
              src="/images/Isolation_Mode.png"
              sizes="xs:100vw lg:50vw xl:574px 2x:1148px"
              class="pb-1"
            />
          </div>

          <nuxt-link
            :to="auth ? '/pages/account' : '/pages/login'"
            class="header-icon"
            title="login"
            v-if="!isMobile"
          >
            <i class="icon-user-2"></i>
          </nuxt-link>

          <nuxt-link
            to="/shop?wishlist=true"
            class="header-icon"
            title="wishlist"
            v-if="!isMobile"
          >
            <i class="icon-wishlist-2"></i>
          </nuxt-link>

          <pv-cart-menu></pv-cart-menu>
        </div>
      </div>
      <div v-if="isMobile && isSearchShow" class="bg-white py-2">
        <mobile-header-search></mobile-header-search>
        <link-tab-carousel></link-tab-carousel>
      </div>

      <div class="header-bottom sticky-header d-none d-lg-block pb-3 bg-white">
        <div class="container">
          <pv-main-menu></pv-main-menu>
        </div>
        <div>
          <link-tab-carousel></link-tab-carousel>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import LinkTabCarousel from "~/components/common/partials/LinkTabCarousel";
import MobileHeaderSearch from "~/components/common/partials/MobileHeaderSearch";
import PvCartMenu from "~/components/common/partials/PvCartMenu";
import PvHeaderSearch from "~/components/common/partials/PvHeaderSearch";
import PvMainMenu from "~/components/common/partials/PvMainMenu";
import { deviceMixin, isSearchShowMixin } from "~/mixins";

document.querySelector("body").classList.add("loaded");

export default {
  mixins: [deviceMixin, isSearchShowMixin],
  components: {
    PvMainMenu,
    PvCartMenu,
    PvHeaderSearch,
    LinkTabCarousel,
    MobileHeaderSearch,
  },
  computed: {
    ...mapGetters("auth", ["auth"]),
  },
  methods: {
    openLoginModal: function () {
      this.$modal.show(
        () => import("~/components/features/modal/PvLoginModal"),
        {},
        { width: "525", height: "auto", adaptive: true }
      );
    },
    showMobileMenu: function () {
      document.querySelector("body").classList.add("mmenu-active");
    },
    showMobileSearch: function (e) {
      let headerSearch = e.currentTarget.closest(".header-search");
      headerSearch.classList.add("show");
      headerSearch
        .querySelector(".header-search-wrapper")
        .classList.add("show");
    },
  },
};
</script>
