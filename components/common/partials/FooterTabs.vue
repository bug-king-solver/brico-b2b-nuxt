<template>
  <pv-tabs>
    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="footer-description-content"
          data-toggle="tab"
          href="#product-desc-content"
          role="tab"
          aria-controls="product-desc-content"
          aria-selected="true"
          >Christmans search</a
        >
      </li>

      <li class="nav-item">
        <a
          class="nav-link"
          id="product-tab-size"
          data-toggle="tab"
          href="#product-size-content"
          role="tab"
          aria-controls="product-size-content"
          aria-selected="true"
          >Top ten kitchen
        </a>
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
          >Top in building</a
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
          >Top ten gardening</a
        >
      </li>
    </ul>

    <div class="tab-content">
      <div
        class="tab-pane fade show active"
        id="product-desc-content"
        role="tabpanel"
        aria-labelledby="footer-description-content"
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore.Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore.
        </div>
      </div>

      <div
        class="tab-pane fade"
        id="product-size-content"
        role="tabpanel"
        aria-labelledby="product-tab-size"
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore.Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore.
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="product-size-content"
        role="tabpanel"
        aria-labelledby="product-tab-size"
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore.Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore.
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="product-size-content"
        role="tabpanel"
        aria-labelledby="product-tab-size"
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore.Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore.
        </div>
      </div>
    </div>
  </pv-tabs>
</template>

<script>
  import PvTabs from "~/components/features/PvTabs";

  export default {
    components: {
      PvTabs,
    },
    data: function () {
      return {
        isCustom: false,
        isFullwidth: false,
        isAddition: false,
      };
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
      setRating: function (e) {
        if (e.currentTarget.parentNode.querySelector(".active"))
          e.currentTarget.parentNode
            .querySelector(".active")
            .classList.remove("active");
        e.currentTarget.classList.add("active");
      },
    },
  };
</script>
