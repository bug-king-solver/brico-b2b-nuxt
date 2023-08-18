export default {
  methods: {
    /**
     * Translate with key in item object
     */
    translateKey(item, key) {
      return item[key + '_' + this.$i18n.locale];
    },
  },
};
