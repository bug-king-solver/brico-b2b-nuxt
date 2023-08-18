export default {
  computed: {
    isSearchShow() {
      const notShowPageList = [
        "/pages/cart",
        "/pages/checkout",
        "/pages/login",
        "/pages/register",
      ];
      if (notShowPageList.includes(this.$route.fullPath)) return false;
      return true;
    },
  },
};
