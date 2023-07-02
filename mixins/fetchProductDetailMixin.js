import { Api } from "~/api";
import { apiSearch, searchUrl } from "~/api/cloud.axios";

export default {
  computed: {
    productSlug() {
      const routeName = this.$route.name;
      const productName = routeName.includes("det-type-slug")
        ? this.$route.params.type
        : this.$route.params.slug;
      return productName;
    },
  },
  methods: {
    getProduct: function () {
      this.loaded = false;

      // Fetch Product Detail
      Api.get(`${apiSearch}${searchUrl}products`, {
        params: { slug: "det/" + this.productSlug },
      })
        .then((response) => {
          this.product = response.data.message.product;
          this.product.product_categories.map((item) => {
            this.productCategory.push(item);
          });

          this.loaded = true;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));

      // Fetch relational products
      Api.get(`${apiSearch}${searchUrl}shop?demo=demo4`).then((response) => {
        let products = [];
        if (response.data.message.products) {
          products = response.data.message.products.slice(0, 4);
        }
        this.relatedProducts = products;
        this.featuredProducts = products;
        this.bestProducts = products;
        this.latestProducts = products;
        this.topRatedProducts = products;

        /** TODO: prevProduct and nextProduct navigation in normal templates */
        // this.prevProduct = products;
        // this.nextProduct = products;
      });
    },
  },
};
