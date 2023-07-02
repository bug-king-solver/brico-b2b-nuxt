<template>
  <li :class="{ open: isOpendParent }">
    <nuxt-link to="/shop" class="sub-menu-link menu-with-ul">
      {{ item.label }}
      <span
        v-if="item.children"
        class="mmenu-btn"
        @click.prevent="isOpendParent = !isOpendParent"
      ></span>
    </nuxt-link>

    <vue-slide-toggle :open="isOpendParent">
      <ul>
        <multi-mobile-sub-menu
          :class="{ open: subOpened == childMenu.label }"
          v-for="(childMenu, childIndex) in item.children"
          :key="childIndex"
          :item="childMenu"
        ></multi-mobile-sub-menu>
      </ul>
    </vue-slide-toggle>
  </li>
</template>

<script>
import { VueSlideToggle } from "vue-slide-toggle";

export default {
  components: {
    VueSlideToggle,
  },
  name: "multi-mobile-sub-menu",
  props: ["item"],
  data: () => {
    return {
      isOpendParent: false,
      subOpened: "",
    };
  },
  methods: {
    handleOpenClick(menu) {
      if (this.subOpened == menu.lable) this.subOpened = "";
      else this.subOpened = menu.lable;
    },
  },
};
</script>