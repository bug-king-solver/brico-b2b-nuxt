<template>
  <li :class="{ 'mr-5 first-li': isFirst }">
    <MenuLinkItem :item="item" :is-first="isFirst" />
    <template v-if="!isLastItemInside">
      <ul
        v-if="item.children && item.children.length > 0"
        class="right-block"
        :class="{ 'first-ul': isFirst }"
      >
        <MenuItem
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          :is-first="false"
          :is-last-item="isLastItemInside"
        />
      </ul>
    </template>

    <div
      v-else
      class="right-block"
      :class="{ 'first-ul': isFirst, 'last-item': item.category_menu_image }"
    >
      <div class="row">
        <div :class="item.category_menu_image ? 'col-6' : 'col-12'">
          <MenuItem
            v-for="(child, index) in item.children"
            :key="index"
            :item="child"
            :is-first="false"
            :is-last-item="isLastItemInside"
          />
        </div>
        <div class="col-6 my-auto" v-if="item.category_menu_image">
          <div class="menu-banner">
            <figure>
              <nuxt-img
                :src="`${item.category_menu_image}`"
                :alt="item.label"
              />
            </figure>
            <div class="banner-content">
              <nuxt-link to="/shop" class="btn btn-sm btn-primary">
                {{ $t("SHOP NOW") }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import MenuLinkItem from "./MenuLinkItem.vue";

export default {
  name: "MenuItem",
  components: { MenuLinkItem },
  props: ["item", "isFirst", "isLastItem"],
  data: () => {
    return {
      isLastItemInside: false,
    };
  },
  mounted() {
    console.log(this.item);
    this.checkIfLastItem();
  },
  methods: {
    naviate(url) {
      console.log(url);
    },
    checkIfLastItem() {
      if (this.item.children) {
        const hasChildItems = this.item.children.filter(
          (item) => item.children
        );
        if (hasChildItems.length == 0) this.isLastItemInside = true;
      }
    },
  },
};
</script>
