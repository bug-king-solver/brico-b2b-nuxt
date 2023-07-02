<template>
  <pv-tabs class="product-single-tabs">
    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="product-tab-desc"
          data-toggle="tab"
          href="#product-desc-content"
          role="tab"
          aria-controls="product-desc-content"
          aria-selected="true"
          >DETAIL</a
        >
      </li>

      <li class="nav-item" v-if="!(isCustom || isFullwidth || isAddition)">
        <a
          class="nav-link"
          id="product-tab-tags"
          data-toggle="tab"
          href="#product-tags-content"
          role="tab"
          aria-controls="product-tags-content"
          aria-selected="false"
          >Features</a
        >
      </li>

      <li class="nav-item">
        <a
          class="nav-link"
          id="product-tab-reviews"
          data-toggle="tab"
          href="#product-reviews-content"
          role="tab"
          aria-controls="product-reviews-content"
          aria-selected="false"
          >REVEIWS ({{ totalReviews }})</a
        >
      </li>

      <li class="nav-item" v-if="isCustom">
        <a
          class="nav-link"
          id="product-tab-custom"
          data-toggle="tab"
          href="#product-custom-content"
          role="tab"
          aria-controls="product-custom-content"
          aria-selected="false"
          >Custom Tab</a
        >
      </li>
    </ul>

    <div class="tab-content">
      <div
        class="tab-pane fade show active"
        id="product-desc-content"
        role="tabpanel"
        aria-labelledby="product-tab-desc"
      >
        <div class="product-desc-content" v-if="isFullwidth">
          <p class="mb-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat.
          </p>

          <nuxt-img
            alt="image desc"
            width="275"
            height="276"
            :src="'./images/products/product-img.jpg'"
            class="float-right"
          />

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore.
          </p>

          <ul>
            <li>Any Product types that You want - Simple, Configurable</li>
            <li>Downloadable/Digital Products, Virtual Products</li>
            <li>Inventory Management with Backordered items</li>
          </ul>

          <div class="row justify-content-center">
            <div class="col-sm-6 col-xl-4">
              <div class="feature-box feature-box-simple text-center">
                <div class="feature-icon">
                  <i class="fa fa-star"></i>
                </div>

                <div class="feature-box-content">
                  <h3>Dedicated Service</h3>
                  <p>
                    Consult our specialists for help with an order,
                    customization, or design advice
                  </p>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-xl-4">
              <div class="feature-box feature-box-simple text-center">
                <div class="feature-icon">
                  <i class="fa fa-reply"></i>
                </div>

                <div class="feature-box-content">
                  <h3>Free Returns</h3>
                  <p>
                    Consult our specialists for help with an order,
                    customization, or design advice
                  </p>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-xl-4">
              <div class="feature-box feature-box-simple text-center">
                <div class="feature-icon">
                  <i class="fa fa-paper-plane"></i>
                </div>

                <div class="feature-box-content">
                  <h3>International Shipping</h3>
                  <p>
                    Consult our specialists for help with an order,
                    customization, or design advice
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore.Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore.
          </p>
        </div>
        <div class="product-desc-content" v-else>
          <div v-html="product.long_description"></div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="product-tags-content"
        role="tabpanel"
        aria-labelledby="product-tab-tags"
        v-if="!isCustom"
      >
        <table class="table table-striped mt-2">
          <tbody>
            <tr v-for="(item, index) in product.features" :key="index">
              <th>{{ index }}</th>
              <td>{{ item }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="tab-pane fade"
        id="product-reviews-content"
        role="tabpanel"
        aria-labelledby="product-tab-reviews"
      >
        <Review :product="product" />
      </div>

      <div
        class="tab-pane fade"
        id="product-custom-content"
        role="tabpanel"
        aria-labelledby="product-tab-custom"
        v-if="isCustom"
      >
        Custom Tab Content
      </div>
    </div>
  </pv-tabs>
</template>

<script>
import { mapGetters } from "vuex";
import Review from "~/components/common/partials/Review.vue";
import PvTabs from "~/components/features/PvTabs";

export default {
  components: {
    PvTabs,
    Review,
  },
  props: {
    product: Object,
  },
  data: function () {
    return {
      isCustom: false,
      isFullwidth: false,
      isAddition: false,
    };
  },
  computed: {
    ...mapGetters("review", ["reviews", "totalReviews"]),
  },
  watch: {
    $route: function () {
      this.getFlag();
    },
  },
  created: function () {
    this.getFlag();
  },
  methods: {
    getFlag: function () {
      if (this.$route.params.type === "custom-tab") this.isCustom = true;
      if (this.$route.path.includes("fullwidth")) this.isFullwidth = true;
      if (this.$route.path.includes("sticky-info")) this.isCustom = true;
      if (this.$route.path.includes("sticky-both")) this.isAddition = true;
    },
  },
};
</script>