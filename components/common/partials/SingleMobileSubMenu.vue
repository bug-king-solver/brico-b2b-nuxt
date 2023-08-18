<template>
  <li>
    <nuxt-link :to="item.url">{{ item.label }}</nuxt-link>
  </li>
</template>

<script>
export default {
  props: ["item"],
};
</script>