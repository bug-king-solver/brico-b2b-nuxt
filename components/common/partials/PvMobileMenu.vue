<template>
  <div>
    <div class="mobile-menu-overlay" @click="hideMobileMenu"></div>

    <div class="mobile-menu-container">
      <div class="mobile-menu-wrapper">
        <span class="mobile-menu-close" @click="hideMobileMenu">
          <i class="fa fa-times"></i>
        </span>

        <nav class="mobile-nav">
          <ul class="mobile-menu">
            <div v-for="(item, index) in menuList" :key="index">
              <MultilMobileSubMenu v-if="item.children" :item="item" />
              <SingleMobileSubMenu v-else :item="item" />
            </div>
          </ul>
        </nav>

        <form
          class="search-wrapper mb-2"
          action="#"
          @submit.prevent="submitSearchForm"
        >
          <input
            type="text"
            class="form-control mb-0"
            placeholder="Search..."
            required
            v-model="search_term"
          />
          <button
            class="btn icon-search text-white bg-transparent p-0"
            type="submit"
          ></button>
        </form>

        <div class="social-icons">
          <a
            href="javascript:;"
            class="social-icon social-facebook icon-facebook"
          ></a>
          <a
            href="javascript:;"
            class="social-icon social-twitter icon-twitter"
          ></a>
          <a
            href="javascript:;"
            class="social-icon social-instagram icon-instagram"
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueSlideToggle } from "vue-slide-toggle";
import { Api } from "~/api";
import { apiSearch, getMenuUrl } from "~/api/cloud.axios";
import { mainMenu } from "~/utils/data/menu";
import MultilMobileSubMenu from "./MultilMobileSubMenu.vue";
import SingleMobileSubMenu from "./SingleMobileSubMenu.vue";

export default {
  components: {
    VueSlideToggle,
    MultilMobileSubMenu,
    SingleMobileSubMenu,
  },
  data: function () {
    return {
      menuList: [],
      mainMenu: mainMenu,
      catOpened: false,
      var1Opened: false,
      var2Opened: false,
      prodOpened: false,
      prod1Opened: false,
      prod2Opened: false,
      pageOpened: false,
      search_term: "",
    };
  },
  mounted() {
    this.getManu();
  },
  methods: {
    hideMobileMenu: function () {
      document.querySelector("body").classList.remove("mmenu-active");
    },
    submitSearchForm: function (e) {
      this.$router.push({
        path: "/shop",
        query: {
          search_term: this.search_term,
        },
      });
    },

    getManu() {
      Api.get(
        `${apiSearch}${getMenuUrl}`
      ).then(({ data }) => {
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
  },
};
</script>