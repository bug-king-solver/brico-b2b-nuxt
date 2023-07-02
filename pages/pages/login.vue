<template>
  <main class="main">
    <div class="page-header">
      <div class="container d-flex flex-column align-items-center">
        <nav aria-label="breadcrumb" class="breadcrumb-nav">
          <div class="container">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link to="/">
                  <i class="icon-home"></i>
                </nuxt-link>
              </li>
              <li class="breadcrumb-item">
                <nuxt-link to="/shop">{{ $t("Shop") }}</nuxt-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ $t("My Account") }}
              </li>
            </ol>
          </div>
        </nav>

        <h1>{{ $t("My Account") }}</h1>
      </div>
    </div>

    <div class="container login-container">
      <div class="row">
        <div class="col-lg-6 mx-auto">
          <div class="heading mb-1">
            <h2 class="title">{{ $t("Login") }}</h2>
          </div>

          <form @submit.prevent="handleSubmit">
            <label for="login-email">
              {{ $t("Last Name") }}
              <span class="required">*</span>
            </label>
            <input
              type="email"
              class="form-input form-wide"
              id="login-email"
              v-model="form.usr"
              required
            />

            <label for="login-password">
              {{ $t("Password") }}
              <span class="required">*</span>
            </label>
            <input
              type="password"
              class="form-input form-wide"
              id="login-password"
              v-model="form.pwd"
              required
            />

            <div class="form-footer">
              <nuxt-link
                to="/pages/register"
                class="forget-password text-primary"
              >
                {{ $t("Create new account?") }}
              </nuxt-link>

              <nuxt-link
                to="/pages/forgot-password"
                class="forget-password text-dark form-footer-right"
              >
                {{ $t("Forgot Password?") }}
              </nuxt-link>
            </div>
            <button type="submit" class="btn btn-dark btn-md w-100">
              <i class="fa fa-cog fa-spin text-white" v-if="isLoading"></i>
              <span v-else>{{ $t("Login") }}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";
import { Api } from "~/api";
import { apiSearch, loginUrl } from "~/api/cloud.axios";
import { getStoreItem } from "~/services/localstorage.service";
import { LOCALSTORAGE_KEYS } from "~/utils/data/constants";

export default {
  data: function () {
    return {
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

          setTimeout(() => {
            const lastCachedRoute = getStoreItem(
              LOCALSTORAGE_KEYS.LAST_ROUTE_BEFORE_LOGIN
            );
            if (lastCachedRoute) {
              this.$router.push(lastCachedRoute);
            } else {
              this.$router.push("/");
            }
          }, 500);
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