<template>
  <tr>
    <td>
      <nuxt-img :src="item.image" alt="" />
    </td>
    <td :colspan="isMobile ? 0 : 3">
      <div class="order-detail_container">
        <h3 class="text-custom-blue">{{ item.item_name }}</h3>
        <div class="fw-600">delivered: {{ item.delivered }}</div>
        <div class="fw-600">{{ item.item_code }}</div>
        <div class="fw-600">{{ item.rate }}</div>
        <div class="mt-1">
          <button class="btn btn-custom btn-sm">BUY BACK</button>
        </div>

        <a
          href="javascript:;"
          v-if="isMobile"
          class="btn-group_handler"
          @click="showHandler"
        >
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </a>
        <div
          class="btn-group"
          :class="isShowHandler ? 'd-block' : 'd-none'"
          v-click-outside="hideHandler"
        >
          <button-group @hideHandler="hideHandler"></button-group>
        </div>
      </div>
    </td>
    <td v-if="!isMobile">
      <button-group></button-group>
    </td>
  </tr>
</template>

<script>
import { deviceMixin } from "~/mixins";
import ButtonGroup from "./ButtonGroup.vue";

export default {
  mixins: [deviceMixin],
  props: {
    item: Object,
  },
  data: () => {
    return {
      isShowHandler: false,
    };
  },
  components: {
    ButtonGroup,
  },
  methods: {
    showHandler() {
      setTimeout(() => {
        this.isShowHandler = true;
      }, 100);
    },
    hideHandler(e) {
      this.$nextTick(() => {
        this.isShowHandler = false;
      });
    },
  },
};
</script>