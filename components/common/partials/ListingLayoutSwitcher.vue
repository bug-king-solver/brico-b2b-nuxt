<template>
  <div class="toolbox-item layout-modes">
    <a
      href="javascript:void(0)"
      class="layout-btn btn-grid"
      :class="{ active: type == shopShowTypes.GRID }"
      title="Grid"
      @click="setShowType(shopShowTypes.GRID)"
    >
      <i class="fa fa-th"></i>
    </a>
    <a
      href="javascript:void(0)"
      class="layout-btn btn-list"
      :class="{ active: type === shopShowTypes.LIST }"
      title="List"
      @click="setShowType(shopShowTypes.LIST)"
    >
      <i class="fa fa-th-list"></i>
    </a>
    <a
      href="javascript:void(0)"
      class="layout-btn btn-list"
      :class="{ active: type === shopShowTypes.SINGLE }"
      title="List"
      @click="setShowType(shopShowTypes.SINGLE)"
    >
      <i class="fa fa-square"></i>
    </a>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { SHOP_SHOW_TYPES } from "~/utils/data/constants";

export default {
  data: () => {
    return {
      shopShowTypes: SHOP_SHOW_TYPES,
    };
  },
  computed: {
    ...mapGetters("product", ["type", "route"]),
  },
  methods: {
    ...mapActions("product", ["setShowType"]),
  },
};
</script>
