export default {
  data() {
    return {
      windowWidth: 0,
      isMobile: false,
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
      if (window.innerWidth * 1 < 768) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
  },
};
