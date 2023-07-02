<template>
  <div
    class="d-flex justify-content-end media-control_container align-items-center"
  >
    <a
      href="javascript:;"
      class="text-dark d-flex align-items-center control-item"
      v-if="prevProduct"
      @click="setActiveIndex(prevProduct.index)"
    >
      <div class="bg-main p-2 text-white">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
      </div>
      <div class="mx-3">{{ prevProduct.productId }}</div>
    </a>
    <a
      href="javascript:;"
      class="text-dark d-flex align-items-center control-item"
      v-if="isMoreProducts"
      @click="setActiveIndex(nextProduct.index)"
    >
      <div class="mx-3">
        <span v-if="isLoading">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </span>
        <span v-else>
          {{ nextProduct.productId }}
        </span>
      </div>
      <div class="bg-main p-2 text-white">
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </div>
    </a>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    nextProduct: Object,
    prevProduct: Object,
  },
  data: () => {
    return {
      orderBy: "default",
      itemsPerPage: 15,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("product", [
      "products",
      "type",
      "is_new_search",
      "active_index",
      "current_page",
      "pages",
    ]),
    isMoreProducts() {
      return this.current_page < this.pages;
    },
  },
  methods: {
    ...mapActions("product", ["getMoreProductList"]),
    setActiveIndex(index) {
      this.$emit("setActiveIndex", index);
    },
  },
  watch: {
    nextProduct(val) {
      if (!val) {
        this.isLoading = true;
        this.getMoreProductList({
          ...this.$route.query,
          order_by: this.orderBy,
          per_page: this.itemsPerPage,
          page: this.current_page + 1,
        }).finally(() => {
          this.isLoading = false;
        });
      }
    },
  },
};
</script>