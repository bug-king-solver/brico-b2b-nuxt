<template>
  <div class="bg-white py-2">
    <div class="d-flex align-items-center mx-4 mobile-search_container">
      <input
        type="text"
        class="form-control mb-0"
        name="search_term"
        placeholder="Search ..."
        required
        v-model="search_term"
        @input="searchProducts"
      />
      <button
        class="btn btn-sm btn-primary"
        title="search"
        type="submit"
        @click="submitSearchForm($event)"
      >
        <i class="icon-search-3"></i>
      </button>
    </div>
  </div>
</template>
<script>
import { CmsApi } from "~/api";
import { baseUrl, currentDemo } from "~/api/cms.axios";

export default {
  data: function () {
    return {
      search_term: "",
      suggestions: [],
      timeouts: [],
      baseUrl: baseUrl,
      currentDemo: currentDemo,
      searchCategory: "",
    };
  },

  mounted: function () {
    document
      .querySelector("body")
      .addEventListener("click", this.closeSearchForm);
  },
  methods: {
    searchProducts: function () {
      if (this.search_term.length > 2) {
        var search_term = this.search_term;
        this.timeouts.map((timeout) => {
          window.clearTimeout(timeout);
        });
        this.timeouts.push(
          setTimeout(() => {
            CmsApi.get(`${baseUrl}/search`, {
              params: {
                search_term: search_term,
                demo: this.currentDemo,
                category: this.searchCategory,
              },
            })
              .then((response) => {
                this.suggestions = response.data.reduce((acc, cur) => {
                  let max = 0;
                  let min = 99999;
                  min = cur.sale_price ? cur.sale_price : 99999;
                  max = cur.price ? cur.price : 0;
                  if (cur.variants && !cur.price) {
                    min = cur.variants[0].price;

                    cur.variants.forEach((item) => {
                      let itemPrice = item.sale_price
                        ? item.sale_price
                        : item.price;
                      if (min > itemPrice) min = itemPrice;
                      if (max < itemPrice) max = itemPrice;
                    });
                  }
                  if (min === 99999) min = max;
                  else if (max === 0) max = min;
                  return [
                    ...acc,
                    {
                      ...cur,
                      minPrice: min,
                      maxPrice: max,
                    },
                  ];
                }, []);
              })
              .catch((error) => {});
          }, 500)
        );
      } else {
        this.timeouts.map((timeout) => {
          window.clearTimeout(timeout);
        });
        this.suggestions = [];
      }
    },
    emphasizeMatchWord: function (name) {
      var regExp = new RegExp(this.search_term, "i");
      return name.replace(regExp, (match) => "<strong>" + match + "</strong>");
    },
    goShopPage: function () {
      this.search_term = "";
      this.suggestions = [];
    },
    searchToggle: function (e) {
      document.querySelector(".header-search").classList.toggle("show");
      e.stopPropagation();
    },
    closeSearchForm: function (e) {
      document.querySelector(".header .header-search").classList.remove("show");
    },
    submitSearchForm: function (e) {
      this.closeSearchForm();
      this.$router.push({
        path: "/shop",
        query: {
          search_term: this.search_term,
          category: this.searchCategory,
        },
      });
    },
    handler(e) {
      e.target.parentNode.setAttribute("style", "display: none");
    },
  },
};
</script>