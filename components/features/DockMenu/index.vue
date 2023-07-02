<template>
  <div class="dock-menu">
    <nav>
      <ul class="d-flex">
        <MenuItem
          v-for="(item, index) in menu"
          :key="index"
          :item="item"
          :is-first="true"
          :is-last-item="false"
        />
      </ul>
    </nav>
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";

export default {
  components: {
    MenuItem,
  },
  props: ["menu"],
};
</script>
