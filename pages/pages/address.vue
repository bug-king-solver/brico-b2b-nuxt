<template>
  <main class="main">
    <div class="page-header">
      <div class="container d-flex flex-column align-items-center">
        <nav aria-label="breadcrumb" class="breadcrumb-nav">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <nuxt-link to="/">
                <i class="icon-home"></i>
              </nuxt-link>
            </li>
            <li class="breadcrumb-item" aria-current="shop">
              <nuxt-link to="/shop">{{ $t("Shop") }}</nuxt-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              <nuxt-link to="/pages/account">{{ $t("My Account") }}</nuxt-link>
            </li>
          </ol>
        </nav>

        <h1>{{ $t("My address") }}</h1>
      </div>
    </div>

    <div class="container account-container custom-account-container">
      <div class="row">
        <div class="col-lg-12 order-1 order-lg-last mt-lg-0 mt-4">
          <div
            class="tab-pane fade show active"
            id="address"
            role="tabpanel"
            aria-labelledby="address-tab"
          >
            <h3 class="account-sub-title d-none d-md-block mb-1">
              <i class="sicon-location-pin align-middle mr-3"></i
              >{{ $t("Addresses") }}
            </h3>
            <div class="addresses-content">
              <p class="mb-4">
                {{
                  $t(
                    "The following addresses will be used on the checkout page by default."
                  )
                }}
              </p>

              <div class="d-flex justify-content-center" v-if="isLoading">
                <div class="spinner-border" role="status">
                  <span class="sr-only">{{ $t("Loading...") }}</span>
                </div>
              </div>

              <div v-else>
                <div class="row" v-if="previousAddress">
                  <div
                    class="col-md-6"
                    v-for="(item, index) in previousAddress"
                    :key="index"
                  >
                    <div class="card">
                      <div class="card-header d-flex">
                        <h5 class="mb-0">
                          {{ item.address_line1 }}, {{ item.city }}
                        </h5>
                      </div>
                      <div class="card-body">
                        <p class="card-text">
                          {{ item.state }}, {{ item.country }},
                          {{ item.pincode }}
                        </p>
                        <p>{{ item.name }}</p>
                        <p>{{ item.email_id }}</p>
                        <p>{{ item.phone }}</p>
                        <p>{{ item.address_type }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-center" v-else>
                  {{ $t("There is no Address Data") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import { Api } from "~/api";
import { apiSearch, getAddressUrl } from "~/api/cloud.axios";

export default {
  data: () => {
    return {
      isLoading: false,
      previousAddress: null,
    };
  },
  computed: {
    ...mapGetters("auth", ["auth"]),
  },
  mounted() {
    this.getPreviousAddress();
  },
  methods: {
    getPreviousAddress() {
      if (this.auth) {
        this.isLoading = true;
        Api.get(`${apiSearch}${getAddressUrl}`)
          .then(({ data }) => {
            this.previousAddress = data.message;
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
  },
};
</script>