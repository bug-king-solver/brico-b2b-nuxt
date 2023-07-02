<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="dock-menu-link" onclick="naviate(item.url)">
      {{ item.name }}
    </div>
    <template v-if="item.children && item.children.length > 0">
      <span v-if="isFirst"
        ><i class="fa fa-chevron-down" aria-hidden="true"></i
      ></span>
      <span v-else><i class="fa fa-chevron-right" aria-hidden="true"></i></span>
    </template>
  </div>
</template>

<script>
export default {
  props: ["item", "isFirst"],
};
</script>