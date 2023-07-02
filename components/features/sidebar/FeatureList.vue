<template>
  <div
    class="widget widget-product-categories"
    v-if="featureList && featureList.length > 0"
  >
    <h3 class="widget-title">
      <a
        data-toggle="collapse"
        href="javascript:;"
        @click="feaOpened = !feaOpened"
        :class="{ collapsed: !feaOpened }"
        >Features</a
      >
    </h3>

    <vue-slide-toggle :open="feaOpened">
      <div class="widget-body">
        <div v-for="(feature, index) in featureList" :key="index">
          <h5>{{ feature.label_field }}</h5>
          <div v-if="feature.facet_results">
            <div
              class="custom-control custom-checkbox"
              v-for="(item, itemIndex) in feature.facet_results"
              :key="itemIndex"
              @click="handleFeature(feature.key, item.value)"
            >
              <input
                type="checkbox"
                class="custom-control-input"
                value="0"
                :checked="checkActive(feature.key, item.value)"
              />
              <label for="show-again" class="custom-control-label"
                >{{ item.value }} ({{ item.count }})</label
              >
            </div>
          </div>
        </div>
      </div>
    </vue-slide-toggle>
  </div>
</template>

<script>
import { VueSlideToggle } from "vue-slide-toggle";
import { mapGetters } from "vuex";
export default {
  components: { VueSlideToggle },
  data: () => {
    return {
      feaOpened: true,
    };
  },
  computed: {
    ...mapGetters("product", ["featureList"]),
  },
  methods: {
    handleFeature(feature, featureItem) {
      let featureQuery = feature + "=" + featureItem;
      if (this.checkActive(feature, featureItem)) {
        const { query } = this.$route;
        const features = query.features.split(",");
        const filteredFeatures = features.filter(
          (item) => item != featureQuery
        );
        featureQuery = filteredFeatures.toString();
      } else {
        if (this.$route.query?.features) {
          featureQuery = this.$route.query.features + "," + featureQuery;
        }
      }
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: 1,
          features: featureQuery,
        },
      });
    },
    checkActive(feature, featureItem) {
      const { query } = this.$route;
      if (query.features) {
        const featureQuery = feature + "=" + featureItem;
        const features = query.features.split(",");
        return features.includes(featureQuery);
      } else return false;
    },
  },
};
</script>