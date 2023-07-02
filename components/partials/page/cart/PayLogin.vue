<template>
  <div class="login-form-container">
    <h3>
      {{ $t("Returning customer?") }}
      <button
        data-toggle="collapse"
        data-target="#collapseOne"
        aria-expanded="true"
        aria-controls="collapseOne"
        class="btn bg-gray"
        @click="loginOpened = !loginOpened"
      >
        {{ $t("ACCESS NOW") }}
      </button>
    </h3>

    <vue-slide-toggle :open="loginOpened">
      <div class="login-section feature-box">
        <div class="feature-box-content">
          <form @submit.prevent="handleSubmit" id="login-form">
            <p>
              {{
                $t(
                  "If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing & Shipping section."
                )
              }}
            </p>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="mb-0 pb-1">
                    {{ $t("Username or email") }}
                    <span class="required">*</span>
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="form.usr"
                    required
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="mb-0 pb-1">
                    {{ $t("Password") }}
                    <span class="required">*</span>
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="form.pwd"
                    required
                  />
                </div>
              </div>
            </div>
            <button type="submit  btn-dark btn-md" class="btn">
              <span v-if="isLoading">
                <i class="fa fa-cog fa-spin text-white"></i>
              </span>
              <span v-else>{{ $t("Login") }}</span>
            </button>

            <div class="form-footer mb-1">
              <div class="custom-control custom-checkbox mb-0 mt-0">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="lost-password"
                />
                <label class="custom-control-label mb-0" for="lost-password">
                  Remember me
                </label>
              </div>

              <nuxt-link to="/pages/forgot-password" class="forget-password"
                >Lost your password?</nuxt-link
              >
            </div>
          </form>
        </div>
      </div>
    </vue-slide-toggle>
  </div>
</template>

<script>
import { VueSlideToggle } from "vue-slide-toggle";
import { mapActions } from "vuex";
import { Api } from "~/api";
import { apiSearch, loginUrl } from "~/api/cloud.axios";

export default {
  components: {
    VueSlideToggle,
  },
  data: () => {
    return {
      loginOpened: false,
      isLoading: false,
      form: {
        usr: null,
        pwd: null,
      },
    };
  },
  methods: {
    ...mapActions("auth", ["setAuth", "getUserInfo"]),
    handleSubmit() {
      this.isLoading = true;

      Api.post(`${apiSearch}${loginUrl}`, this.form)
        .then(({ data }) => {
          this.setAuth({ ...data.message, email: this.form.usr });
          this.getUserInfo();
          this.$notify({
            group: "userNotification",
            type: "success",
            text: `You have been logged in correctly!`,
          });
          this.$emit("fetchAddress");
        })
        .catch(() => {
          this.$notify({
            group: "userNotification",
            type: "danger",
            text: `Your credentials are incorrect`,
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>