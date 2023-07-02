<template>
  <div class="sidebar-wrapper custom-scroll" :style="sidebarStyle">
    <div class="widget">
      <filter-search></filter-search>
    </div>

    <div
      class="widget widget-product-categories"
      v-if="categoryList.length > 0"
    >
      <h3 class="widget-title">
        <a
          data-toggle="collapse"
          href="javascript:;"
          @click="catOpened = !catOpened"
          :class="{ collapsed: !catOpened }"
          >Categories</a
        >
      </h3>

      <vue-slide-toggle :open="catOpened">
        <div class="widget-body">
          <vue-tree-list :model="categoryTree" :default-expanded="false">
            <template v-slot:leafNameDisplay="slotProps">
              <nuxt-link
                :to="{
                  path: $route.path,
                  query: {
                    ...$route.query,
                    category: slotProps.model.slug,
                    page: 1,
                  },
                }"
                :class="{ active: slotProps.model.slug === currentCategory }"
                :key="slotProps.model.id + '-' + slotProps.model.slug"
              >
                {{ slotProps.model.name }}
                <span class="products-count"
                  >({{ slotProps.model.counts }})</span
                >
              </nuxt-link>
            </template>
            <template v-slot:treeNodeIcon>
              <span></span>
            </template>
          </vue-tree-list>
        </div>
      </vue-slide-toggle>
    </div>

    <feature-list></feature-list>

    <vue-slide-toggle :open="!isEmptyQuery">
      <div class="widget clear-widget">
        <nuxt-link
          :to="{ path: $router.path }"
          class="btn btn-primary reset-filter-btn router-link-active"
          >Reset All Filters</nuxt-link
        >
      </div>
    </vue-slide-toggle>

    <div class="widget" v-if="isPriceFilter">
      <h3 class="widget-title">
        <a
          data-toggle="collapse"
          href="javascript:;"
          @click="priceOpenened = !priceOpenened"
          :class="{ collapsed: !priceOpenened }"
          >Price</a
        >
      </h3>

      <vue-slide-toggle :open="priceOpenened">
        <div class="widget-body pb-0">
          <form action="#">
            <div class="price-slider-wrapper">
              <vue-nouislider
                :config="priceSettings"
                :values="priceInfo"
                v-if="priceReset"
                id="price-slider"
              ></vue-nouislider>
            </div>

            <div
              class="filter-price-action d-flex align-items-center justify-content-between flex-wrap"
            >
              <div class="filter-price-text">
                Price: €{{ priceInfo[0] }} - €{{ priceInfo[1] }}
              </div>

              <nuxt-link :to="priceFilterRoute" class="btn btn-primary"
                >Filter</nuxt-link
              >
            </div>
          </form>
        </div>
      </vue-slide-toggle>
    </div>

    <div class="widget widget-block" v-if="isFeatured && categoryDetail">
      <h3 class="widget-title">{{ categoryDetail.label }}</h3>
      <h5>{{ categoryDetail.title }}</h5>
      <div v-html="categoryDetail.description"></div>
    </div>
  </div>
</template>

<script>
import { VueSlideToggle } from "vue-slide-toggle";
import { Tree, VueTreeList } from "vue-tree-list";
import { mapGetters } from "vuex";
import PvCarousel from "~/components/features/PvCarousel";
import PvSmallProduct from "~/components/features/product/PvSmallProduct";
import FeatureList from "~/components/features/sidebar/FeatureList.vue";
import FilterSearch from "~/components/features/sidebar/FilterSearch";
import { baseSlider1 } from "~/utils/data/carousel";
import { shopColors, shopSizes } from "~/utils/data/shop";

export default {
  components: {
    VueSlideToggle,
    VueTreeList,
    PvSmallProduct,
    PvCarousel,
    FilterSearch,
    FeatureList,
  },
  data: function () {
    return {
      catOpened: true,
      priceOpenened: true,
      sizeOpened: true,
      colorOpened: true,
      priceInfo: [0, 1000],
      shopColors: shopColors,
      shopSizes: shopSizes,
      baseSlider1: baseSlider1,
      emptyObject: {},
      isFeatured: true,
      priceReset: true,
      currentCategory: "",
    };
  },
  watch: {
    max_price_all(value) {
      this.priceInfo = [this.min_price_all, value];
    },
  },
  created: function () {
    this.getFlag();
  },
  computed: {
    ...mapGetters("product", [
      "max_price_all",
      "min_price_all",
      "categoryList",
      "categoryDetail",
    ]),
    sidebarStyle() {
      if (window.innerWidth > 768) {
        const height = window.innerHeight - 132;
        return `height: ${height}px; overflow-y: scroll`;
      }
      return "";
    },
    categoryTree: function () {
      return new Tree(this.categoryList);
    },
    priceFilterRoute: function () {
      return {
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: 1,
          max_price: this.priceInfo[1],
          min_price: this.priceInfo[0],
        },
      };
    },
    isEmptyQuery: function () {
      for (let key in this.$route.query) {
        if (key !== "page" && key !== "per_page" && this.$route.query[key]) {
          return false;
        }
      }
      return true;
    },
    isPriceFilter() {
      if (this.min_price_all == this.max_price_all) return false;
      return true;
    },
    priceSettings() {
      this.priceReset = false;
      let range = {
        min: 0,
        max: 1000,
      };
      if (this.max_price_all && this.min_price_all) {
        range = {
          min: this.min_price_all,
          max: this.max_price_all,
        };
      }
      this.priceReset = true;

      return {
        connect: true,
        step: 50,
        margin: 100,
        range,
        format: {
          from: Number,
          to: Number,
        },
      };
    },
  },
  methods: {
    colorFilterRoute: function (item) {
      let selectedColors = this.$route.query.color
        ? this.$route.query.color.split(",")
        : [];
      let index = selectedColors.indexOf(item.name);
      if (index > -1) {
        selectedColors.splice(index, 1);
      } else {
        selectedColors.push(item.name);
      }

      return {
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: 1,
          color: selectedColors.toString(),
        },
      };
    },
    sizeFilterRoute: function (item) {
      let selectedSizes = this.$route.query.size
        ? this.$route.query.size.split(",")
        : [];
      let index = selectedSizes.indexOf(item.size);
      if (index > -1) {
        selectedSizes.splice(index, 1);
      } else {
        selectedSizes.push(item.size);
      }

      return {
        path: this.$route.path,
        query: {
          ...this.$route.query,
          size: selectedSizes.toString(),
          page: 1,
        },
      };
    },
    isActivedColor: function (item) {
      return (
        this.$route.query.color &&
        this.$route.query.color.split(",").includes(item.name)
      );
    },
    isActivedSize: function (item) {
      return (
        this.$route.query.size &&
        this.$route.query.size.split(",").includes(item.size)
      );
    },
    getFlag: function () {
      if (this.$route.path.includes("horizontal-filter-1"))
        this.isFeatured = false;
    },
  },
};
</script>
