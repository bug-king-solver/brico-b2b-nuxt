<template>
  <div class="category-banner-container bg-gray" v-if="categoryDetail">
    <div
      class="category-banner banner text-uppercase"
      :style="{
        backgroundImage: `url(${categoryDetail.category_banner_image})`,
      }"
    >
      <div class="container position-relative">
        <div class="text-left">
          <h4 class="m-b-2 p-3 bg-primary text-yellow d-inline-block">{{ categoryDetail.title }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("product", ["categoryDetail"]),
  },
};
</script>