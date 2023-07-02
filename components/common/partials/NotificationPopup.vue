<template>
  <notifications
    group="userNotification"
    :duration="2000"
    :width="300"
    :max="4"
    animation-name="fade-left"
    position="bottom right"
  >
    <template slot="body" slot-scope="props">
      <div :class="`minipopup-box`">
        <div :class="`d-flex align-items-center`">
          <i
            class="fa fa-exclamation-triangle mr-2"
            aria-hidden="true"
            v-if="props.item.type == 'danger'"
          ></i>
          <i class="fa fa-info-circle mr-2" aria-hidden="true" v-else></i>
          <div :class="`text-${props.item.type}  h5 mb-0`">
            {{ props.item.text }}
          </div>
        </div>
      </div>
      <button class="mfp-close" @click="props.close"></button>
    </template>
  </notifications>
</template>

<script>
import { baseUrl } from "~/api/cms.axios";

export default {
  name: "userNotify",
  data: function () {
    return {
      baseUrl: baseUrl,
    };
  },
};
</script>

<style lang="scss">
.vue-notification-wrapper {
  overflow: unset !important;
}

.fade-left-enter-active,
.fade-left-leave-active,
.fade-left-move {
  transition: all 0.5s;
}

.fade-left-enter,
.fade-left-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
