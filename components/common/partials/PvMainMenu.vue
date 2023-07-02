<template>
  <nav class="main-nav w-100">
    <DockMenu :menu="menuList" />

    <!-- <ul class="menu main-menu menu-arrow">
      <li v-for="(list, index) in menuList" :key="index">
        <nuxt-link :to="`/${list.url}`" class="sub-menu-link menu-with-ul">{{
          list.label
        }}</nuxt-link>
        <div
          class="megamenu megamenu-fixed-width megamenu-4cols"
          v-if="list.children"
        >
          <div class="row d-flex">
            <div :class="getCols(list)">
              <div class="row">
                <div
                  class="col-lg-4"
                  v-for="(subList, subIndex) in list.children"
                  :key="subIndex"
                >
                  <nuxt-link :to="`/${subList.url}`" v-if="subList.url">{{
                    subList.label
                  }}</nuxt-link>
                  <a href="javascript:;" class="nolink" v-else>{{
                    subList.label
                  }}</a>
                  <ul class="submenu" v-if="subList.children">
                    <li
                      v-for="(childList, childIndex) in subList.children"
                      :key="childIndex"
                    >
                      <nuxt-link :to="`/${childList.url}`">
                        {{ childList.label }}
                      </nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              v-if="list.category_menu_image"
              class="col-lg-3 p-0 d-flex flex-grow"
            >
              <div class="menu-banner d-flex flex-column">
                <div class="d-flex align-items-center justify-content-center">
                  <nuxt-link :to="list.url" :title="list.title">
                    <figure>
                      <nuxt-img
                        :src="`${list.category_menu_image}`"
                        :alt="list.label"
                      />
                    </figure>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul> -->
  </nav>
</template>

<script>
import { Api } from "~/api";
import { api, apiSearch, getMenuUrl } from "~/api/cloud.axios";
import DockMenu from "~/components/features/DockMenu";

export default {
  components: {
    DockMenu,
  },
  data: function () {
    return {
      menuList: [],
      api: api,
      dockMenu: [
        {
          name: "Home",
          link: "/",
          children: [],
        },
        {
          name: "Products",
          link: "/products",
          children: [
            {
              name: "Product 1",
              link: "/products/product-1",
              children: [
                {
                  name: "Sub Product1",
                  link: "/products/product-2/sub-product",
                  children: [],
                },
                {
                  name: "Sub Product2",
                  link: "/products/product-2/sub-product",
                  children: [
                    {
                      name: "TSub Product1",
                      link: "/products/product-2/sub-product",
                      children: [],
                    },
                    {
                      name: "TSub Product2",
                      link: "/products/product-2/sub-product",
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              name: "Product 2",
              link: "/products/product-2",
              children: [
                {
                  name: "Sub Product1",
                  link: "/products/product-2/sub-product",
                  children: [],
                },
                {
                  name: "Sub Product2",
                  link: "/products/product-2/sub-product",
                  children: [
                    {
                      name: "TSub Product1",
                      link: "/products/product-2/sub-product",
                      children: [],
                    },
                    {
                      name: "TSub Product2",
                      link: "/products/product-2/sub-product",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "Contact",
          link: "/contact",
          children: [],
        },
      ],
    };
  },
  mounted() {
    this.getManu();
  },
  computed: {
    isPageItemActived: function () {
      let exItems = ["blog", "about-us", "contact-us"];

      if (
        this.$route.path.includes("/pages") &&
        exItems.findIndex((item) => this.$route.path.includes(item)) === -1
      ) {
        return true;
      }

      return false;
    },
    productName() {
      const routeName = this.$route.name;
      const productName = routeName.includes("det-type-slug")
        ? this.$route.params.type
        : this.$route.params.slug;
      return productName;
    },
  },
  methods: {
    getCols(list) {
      return list.category_menu_image ? "col-lg-9" : "col-lg-12";
    },
    getManu() {
      Api.get(`${apiSearch}${getMenuUrl}`).then(({ data }) => {
        const menu = data.message;
        this.menuList = this.buildTreeList(menu, null);
      });
    },
    buildTreeList(nodes, parentId) {
      let tree = [];
      for (let node of nodes) {
        if (node.parent_menu === parentId) {
          let children = this.buildTreeList(nodes, node.name);
          if (children.length) {
            node.children = children;
          }
          tree.push(node);
        }
      }
      return tree;
    },
    handleSelected(item) {
      console.log(item);
    },
  },
};
</script>