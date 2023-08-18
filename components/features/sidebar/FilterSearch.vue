<template>
  <div class="filter-search d-flex">
    <div class="search-icon">
      <i class="fa fa-search" aria-hidden="true"></i>
    </div>
    <input type="search" placeholder="Search..." v-model="search" />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => {
    return {
      search: "",
    };
  },
  methods: {
    ...mapActions("product", ["setFilterSearch"]),
  },
  watch: {
    search(value) {
      this.setFilterSearch(value);
    },
  },
};
</script>