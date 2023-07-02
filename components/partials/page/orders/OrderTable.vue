<template>
  <table class="w-100">
    <thead>
      <tr>
        <th class="text-center">
          <div>Order made on</div>
          <div v-html="order.billing_address"></div>
        </th>
        <th v-if="!isMobile">
          <div>Shippin at</div>
          <div>{{ order.creation }}</div>
        </th>
        <th v-if="!isMobile">
          <div>{{ $t("Total") }}</div>
          <div>{{ order.total }}</div>
        </th>
        <th>
          <div>Order No</div>
          <div>{{ order.name }}</div>
        </th>
        <th v-if="!isMobile"></th>
      </tr>
    </thead>
    <tbody>
      <item-record
        v-for="(item, itemIndex) in order.items"
        :key="itemIndex"
        :item="item"
      ></item-record>
    </tbody>
    <tfoot v-if="isMobile">
      <tr>
        <th>
          <div>Shippin at</div>
          <div>{{ order.creation }}</div>
        </th>
        <th>
          <div>{{ $t("Total") }}</div>
          <div>{{ order.total }}</div>
        </th>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import { deviceMixin } from "~/mixins";
import ItemRecord from "./ItemRecord.vue";

export default {
  props: {
    order: Object,
  },
  mixins: [deviceMixin],
  components: {
    ItemRecord,
  },
};
</script>