<template>
  <div v-if="products.length > 0" class="w-100">
    <product-single
      :product="activeProduct"
      :next-product="nextProduct"
      :prev-product="prevProduct"
      @setActiveIndex="setActiveIndex"
    ></product-single>
  </div>
</template>

<script>
import ProductSingle from "~/components/features/product/ProductSingle";

export default {
  components: {
    ProductSingle,
  },
  props: {
    products: Array,
  },
  data: () => {
    return {
      activeId: 0,
    };
  },
  computed: {
    activeProduct() {
      return this.products[this.activeId];
    },
    prevProduct() {
      if (this.activeId == 0) return null;
      const prevId = this.activeId * 1 - 1;
      const prevProductId = this.products[prevId]?.id;
      return {
        index: prevId,
        productId: prevProductId,
      };
    },
    nextProduct() {
      if (this.activeId == this.products.length - 1) return null;
      const nextId = this.activeId * 1 + 1;
      const nextProductId = this.products[nextId]?.id;
      return {
        index: nextId,
        productId: nextProductId,
      };
    },
  },
  methods: {
    setActiveIndex(index) {
      this.activeId = index;
    },
  },
};
</script>