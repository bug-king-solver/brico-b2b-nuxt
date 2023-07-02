import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("wishlist", ["wishList"]),
    ...mapGetters("auth", ["auth"]),
    isWishlisted: function () {
      if (
        this.auth &&
        this.wishList.findIndex((item) => item.item_code === this.product.sku) >
          -1
      )
        return true;
      return false;
    },
  },
  methods: {
    ...mapActions("wishlist", [
      "addToWishlist",
      "removeFromWishlist",
      "getWishList",
    ]),
    /**Add Wishlist */
    addWishlist: function (e) {
      if (!this.auth) {
        this.$router.push("/pages/login");
        return;
      }
      const currentElement = e.currentTarget;
      currentElement.classList.add("load-more-overlay", "loading");

      this.addToWishlist(this.product).then(() => {
        currentElement.classList.remove("load-more-overlay", "loading");
        document.querySelector(".wishlist-popup").classList.add("active");

        setTimeout(() => {
          document.querySelector(".wishlist-popup").classList.remove("active");
        }, 1000);
      });
    },
    removeWishlist(e) {
      const currentElement = e.currentTarget;

      currentElement.classList.add("load-more-overlay", "loading");
      this.removeFromWishlist(this.product).then(() => {
        if (this.$route.fullPath == "/shop?wishlist=true") {
          window.location.reload();
        }
        currentElement.classList.remove("load-more-overlay", "loading");
        document
          .querySelector(".wishlist-remove-popup")
          .classList.add("active");

        setTimeout(() => {
          document
            .querySelector(".wishlist-remove-popup")
            .classList.remove("active");
        }, 1000);
      });
    },
  },
};
