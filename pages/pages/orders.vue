<template>
  <div class="container orders-container mt-3">
    <div
      class="d-flex justify-content-between"
      :class="isMobile ? 'flex-column' : ''"
    >
      <div class="d-flex align-items-center">
        <h3 class="mb-0">{{ $t("YOUR ORDER") }}s</h3>
        <div class="display-5 ml-5" v-if="!isMobile">{{ $t("Buy back") }}</div>
      </div>
      <div class="search_container d-flex">
        <div class="search-box">
          <input type="search" placeholder="Search..." class="form-control" />
        </div>
        <button class="btn">{{ $t("Search...") }}</button>
      </div>
    </div>
    <div
      class="d-flex mt-3 align-items-center"
      :class="isMobile ? 'justify-content-between' : ''"
    >
      <div class="fw-500 h4 mb-0">{{ $t("12 orders placed") }}</div>
      <div class="header-dropdown ml-5 select_period" v-if="isMobile">
        <a href="javascript:;"> {{ $t("Past 3 month") }} </a>
        <div class="header-menu">
          <ul>
            <li>
              <a href="javascript:;">{{ $t("Past 3 month") }}</a>
            </li>
            <li>
              <a href="javascript:;">{{ $t("Canceled orders") }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="ml-5" v-else>
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" href="javascript:;">{{
              $t("Past 3 month")
            }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:;">{{
              $t("Canceled orders")
            }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <div class="orders-group_container" v-if="orders">
        <order-table
          v-for="(order, index) in orders"
          :key="index"
          :order="order"
        ></order-table>
      </div>
      <div v-else>
        <div v-if="isLoading">
          <h5 class="p-5">
            {{ $t("Loading...") }}
            <i class="fa fa-cog fa-spin text-dark"></i>
          </h5>
        </div>
        <div v-else>
          <h5 class="p-5">{{ $t("There is no orders history") }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from "~/api";
import { apiSearch, salesOrderUrl } from "~/api/cloud.axios";
import OrderTable from "~/components/partials/page/orders/OrderTable.vue";
import { deviceMixin } from "~/mixins";

export default {
  mixins: [deviceMixin],
  components: {
    OrderTable,
  },
  data: () => {
    return {
      isLoading: false,
      page_num: 1,
      page_size: 8,
      orders: null,
    };
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    getOrders() {
      this.isLoading = true;

      Api.post(`${apiSearch}${salesOrderUrl}`, {
        page_num: this.page_num,
        page_size: this.page_size,
      })
        .then(({ data }) => {
          this.orders = data.message;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>