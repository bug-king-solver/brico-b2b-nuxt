<template>
  <aside class="toolbox-left sidebar-shop mobile-sidebar">
    <div
      class="toolbox-item toolbox-sort price-sort select-custom"
      :class="{ opened: isPriceOpened }"
    >
      <a
        class="sort-menu-trigger"
        href="javascript:;"
        @click.prevent="isPriceOpened = !isPriceOpened"
        >Price</a
      >
      <div class="sort-list">
        <form class="filter-price-form d-flex align-items-center m-0">
          <input
            class="input-price mr-2"
            name="min_price"
            placeholder="0"
            v-model="prices[0]"
          />
          -
          <input
            class="input-price mx-2"
            name="max_price"
            placeholder="1000"
            v-model="prices[1]"
          />
          <nuxt-link
            type="submit"
            class="btn btn-primary ml-3"
            :to="priceFilterRoute"
            >Filter</nuxt-link
          >
        </form>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  data: function () {
    return {
      isPriceOpened: false,
      prices: [0, 1000],
    };
  },
  watch: {
    max_price_all(value) {
      this.priceInfo = [this.min_price_all, value];
    },
  },
  created: function () {},
  mounted: function () {
    window.addEventListener("click", this.removeOpenHandler);
  },
  destroyed: function () {
    window.removeEventListener("click", this.removeOpenHandler);
  },
  computed: {
    ...mapGetters("product", ["max_price_all", "min_price_all"]),
    priceFilterRoute: function () {
      return {
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: 1,
          max_price: this.prices[1],
          min_price: this.prices[0],
        },
      };
    },
  },
  methods: {
    removeOpenHandler: function (e) {
      if (
        !e.target.closest(".select-custom") ||
        e.target.classList.contains("form-control")
      ) {
        let item = document.querySelector(".select-custom.opened");
        if (item) {
          item.classList.remove("opened");
        }
      }
    },
  },
};
</script>