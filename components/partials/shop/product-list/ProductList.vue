<template>
  <div>
    <nav
      class="toolbox sticky-header mobile-sticky"
      data-start-top="550"
      data-offset-top="56"
      v-if="!products || (products && products.length > 0)"
      v-sticky
    >
      <div class="toolbox-left">
        <nav aria-label="breadcrumb" class="breadcrumb-nav">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <nuxt-link to="/">
                <i class="icon-home"></i>
              </nuxt-link>
            </li>
            <li class="breadcrumb-item active">{{ $t("Shop") }}</li>
          </ol>
        </nav>
      </div>

      <div class="toolbox-right mt-1">
        <div class="d-flex d-xs-block">
          <a
            href="javascript:;"
            class="sidebar-toggle"
            @click="showSidebarFilter"
          >
            <svg
              data-name="Layer 3"
              id="Layer_3"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="15" x2="26" y1="9" y2="9" class="cls-1" />
              <line x1="6" x2="9" y1="9" y2="9" class="cls-1" />
              <line x1="23" x2="26" y1="16" y2="16" class="cls-1" />
              <line x1="6" x2="17" y1="16" y2="16" class="cls-1" />
              <line x1="17" x2="26" y1="23" y2="23" class="cls-1" />
              <line x1="6" x2="11" y1="23" y2="23" class="cls-1" />
              <path
                d="M14.5,8.92A2.6,2.6,0,0,1,12,11.5,2.6,2.6,0,0,1,9.5,8.92a2.5,2.5,0,0,1,5,0Z"
                class="cls-2"
              />
              <path
                d="M22.5,15.92a2.5,2.5,0,1,1-5,0,2.5,2.5,0,0,1,5,0Z"
                class="cls-2"
              />
              <path d="M21,16a1,1,0,1,1-2,0,1,1,0,0,1,2,0Z" class="cls-3" />
              <path
                d="M16.5,22.92A2.6,2.6,0,0,1,14,25.5a2.6,2.6,0,0,1-2.5-2.58,2.5,2.5,0,0,1,5,0Z"
                class="cls-2"
              />
            </svg>
            <span>Filter</span>
          </a>

          <div class="toolbox-item toolbox-sort" v-if="!isOffCanvas">
            <label>{{ $t("Sort By") }}:</label>

            <div class="select-custom">
              <select
                name="orderby"
                class="form-control"
                v-model="orderBy"
                @change="getProducts"
              >
                <option value="default" selected="default">
                  {{ $t("Default sorting") }}
                </option>
                <!-- <option value="featured">{{ $t('Sort by popularity') }}</option>
                <option value="rating">{{ $t('Sort by average rating') }}</option>
                <option value="new">{{ $t('Sort by newness') }}</option> -->
                <option value="price-asc">
                  {{ $t("Sort by price") }}: {{ $t("low to high") }}
                </option>
                <option value="price-dec">
                  {{ $t("Sort by price") }}: {{ $t("high to low") }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="toolbox-item toolbox-sort" v-if="isOffCanvas">
          <label>{{ $t("Sort By") }}:</label>

          <div class="select-custom">
            <select
              name="orderby"
              class="form-control"
              v-model="orderBy"
              @change="getProducts"
            >
              <option value="default" selected="default">
                {{ $t("Default sorting") }}
              </option>
              <!-- <option value="featured">{{ $t('Sort by popularity') }}</option>
              <option value="rating">{{ $t('Sort by average rating') }}</option>
              <option value="new">{{ $t('Sort by newness') }}</option>` -->
              <option value="price-asc">
                {{ $t("Sort by price") }}: {{ $t("low to high") }}
              </option>
              <option value="price-dec">
                {{ $t("Sort by price") }}: {{ $t("high to low") }}
              </option>
            </select>
          </div>
        </div>

        <div class="toolbox-item toolbox-show" v-if="totalCount > 0">
          <label>Show:</label>

          <div class="select-custom">
            <select
              name="count"
              class="form-control"
              @change="changePerPage"
              v-model="itemsPerPage"
            >
              <option :value="15">15</option>
              <option :value="20">20</option>
              <option :value="25">25</option>
              <option :value="30">30</option>
            </select>
          </div>
        </div>

        <listing-layout-switcher></listing-layout-switcher>
      </div>
    </nav>

    <div
      class="row"
      :class="{ 'row-sm sm-padding': itemsPerRow > 6 }"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      infinite-scroll-distance="-300"
      infinite-scroll-throttle-delay="500"
    >
      <template v-if="products && products.length > 0">
        <template v-if="type == 'single'">
          <product-list-single :products="products"></product-list-single>
        </template>
        <template v-else>
          <div
            :class="gridCols[itemsPerRow]"
            v-for="(product, index) in products"
            :key="'shop-product' + index"
          >
            <template v-if="type == 'grid'">
              <pv-product-one
                :product="product"
                :is-actions="false"
                v-if="itemsPerRow > 6"
                key="gridType"
              ></pv-product-one>

              <pv-product-one
                :product="product"
                key="gridTypeNoAction"
                v-else
              ></pv-product-one>
            </template>

            <pv-product-two :product="product" v-else></pv-product-two>
          </div>
        </template>
      </template>
    </div>

    <template v-if="products && products.length === 0">
      <div class="info-box with-icon p-0 shop-info">
        <p>No products were found matching your selection.</p>
      </div>
    </template>

    <template v-if="!products">
      <div v-if="is_new_search" class="text-center">
        Please find what you want
      </div>
      <template v-else>
        <div
          :class="gridCols[itemsPerRow]"
          v-for="(item, index) in repeatCount.slice(0, itemsPerPage)"
          :key="'skel-shop' + index"
        >
          <div
            class="skel-pro mb-2"
            v-if="type !== 'list'"
            key="normalSkel"
          ></div>
          <div class="skel-pro skel-pro-list mb-2" v-else></div>
        </div>
      </template>
    </template>

    <nav
      class="toolbox toolbox-pagination"
      v-if="products && products.length > 0"
    >
      <div class="toolbox-item toolbox-show mb-0">
        <label>Show:</label>

        <div class="select-custom">
          <select
            name="count"
            class="form-control"
            @change="changePerPage"
            v-model="itemsPerPage"
          >
            <option :value="15">15</option>
            <option :value="20">20</option>
            <option :value="25">25</option>
            <option :value="30">30</option>
          </select>
        </div>
      </div>

      <pv-pagination
        :total-count="totalCount"
        :items-per-page="itemsPerPage"
        v-if="totalCount"
      ></pv-pagination>
    </nav>

    <div
      class="sidebar-toggle custom-sidebar-toggle"
      @click="showSidebarFilter"
      v-if="products && products.length === 0"
    >
      <i class="fas fa-sliders-h"></i>
    </div>
    <div class="bounce-loader">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  </div>
</template>

<script>
import infiniteScroll from "vue-infinite-scroll";
import { mapActions, mapGetters } from "vuex";
import ListingLayoutSwitcher from "~/components/common/partials/ListingLayoutSwitcher";
import PvProductOne from "~/components/features/product/PvProductOne";
import PvProductTwo from "~/components/features/product/PvProductTwo";
import PvPagination from "~/components/features/PvPagination";
import CategoryTabs from "~/components/partials/shop/CategoryTabs";
import ProductListSingle from "~/components/partials/shop/product-list/ProductListSingle";
import { deviceMixin } from "~/mixins";

export default {
  mixins: [deviceMixin],
  components: {
    PvProductOne,
    PvProductTwo,
    PvPagination,
    CategoryTabs,
    ListingLayoutSwitcher,
    ProductListSingle,
  },
  directives: {
    infiniteScroll,
  },
  computed: {
    ...mapGetters("product", [
      "products",
      "type",
      "is_new_search",
      "active_index",
      "current_page",
      "pages",
    ]),
    itemsPerRow: function () {
      if (this.type == "grid") return 4;
      return 1;
    },
    noMore: function () {
      if (this.loadedCount + 3 >= this.totalCount) {
        return true;
      } else {
        return false;
      }
    },
  },
  data: function () {
    return {
      // products: null,
      repeatCount: new Array(100),
      orderBy: "default",
      itemsPerPage: 16,
      totalCount: 0,
      isOffCanvas: {
        type: Boolean,
        default: false,
      },
      gridCols: {
        1: "col-12",
        3: "col-6 col-sm-4",
        4: "col-6 col-sm-4 col-md-3",
        5: "col-6 col-sm-4 col-md-3 col-xl-5col",
        6: "col-6 col-sm-4 col-md-3 col-xl-2",
        7: "col-6 col-sm-4 col-md-3 col-xl-7col",
        8: "col-6 col-sm-4 col-md-3 col-xl-8col",
      },
    };
  },
  watch: {
    $route: function () {
      this.itemsPerPage = this.$route.query["per_page"]
        ? parseInt(this.$route.query["per_page"])
        : 16;
      this.getProducts();
      this.isOffCanvas = this.$route.path.includes("off-canvas") ? true : false;
    },
  },
  created: function () {
    this.itemsPerPage = this.$route.query["per_page"]
      ? parseInt(this.$route.query["per_page"])
      : 16;
    if (this.active_index == null) {
      this.setNewSearch();
    }
    this.getProducts(false);
    this.isOffCanvas = this.$route.path.includes("off-canvas") ? true : false;
  },
  methods: {
    ...mapActions("product", [
      "getProductList",
      "setNewSearch",
      "getMoreProductList",
    ]),
    getProducts: function (isScrll = true) {
      this.getProductList({
        route: this.$route.fullPath,
        params: {
          ...this.$route.query,
          order_by: this.orderBy,
          per_page: this.itemsPerPage,
        },
      });
    },
    showSidebarFilter: function () {
      document.querySelector("body").classList.add("sidebar-opened");
    },
    load: function () {
      if (this.current_page < this.pages && this.type !== "single") {
        document.querySelector(".bounce-loader").style.display = "block";
        this.getMoreProductList({
          ...this.$route.query,
          order_by: this.orderBy,
          per_page: this.itemsPerPage,
          page: this.current_page + 1,
        });

        setTimeout(() => {
          this.loadedCount += 3;

          document.querySelector(".bounce-loader").style.display = "none";
        }, 1500);
      }
    },
    changePerPage: function () {
      this.$router.push({
        ...this.$route,
        query: { ...this.$route.query, per_page: this.itemsPerPage, page: 1 },
      });
    },
  },
};
</script>
