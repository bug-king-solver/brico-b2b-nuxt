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
          <div class="heading mb-1 d-flex">
            <h2 class="title">{{ $t("Register") }}</h2>
            <div class="pl-3 pt-3">
              <span>({{ $t("Or") }} </span>
              <nuxt-link
                to="/pages/register"
                class="forget-password text-primary"
              >
                {{ $t("Login") }}
              </nuxt-link>
              <span>)</span>
            </div>
          </div>

          <form @submit.prevent="handleSubmit">
            <label for="register-email">
              {{ $t("Last Name") }}
              <span class="required">*</span>
            </label>
            <input
              type="email"
              class="form-input form-wide"
              id="register-email"
              v-model="form.email"
              required
            />
            <label for="first-name">
              {{ $t("First Name") }}
              <span class="required">*</span>
            </label>
            <input
              type="text"
              class="form-input form-wide"
              id="first-name"
              v-model="form.first_name"
              required
            />
            <label for="last-name">
              {{ $t("Last Name") }}
              <span class="required">*</span>
            </label>
            <input
              type="text"
              class="form-input form-wide"
              id="last-name"
              v-model="form.last_name"
              required
            />

            <label for="register-password">
              {{ $t("Password") }}
              <span class="required">*</span>
            </label>
            <input
              type="password"
              class="form-input form-wide"
              id="register-password"
              v-model="form.password"
              required
            />

            <div class="form-footer mb-2">
              <button type="submit" class="btn btn-dark btn-md w-100 mr-0">
                <i class="fa fa-cog fa-spin text-white" v-if="isLoading"></i>
                <span v-else>{{ $t("Register") }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { Api } from "~/api";
import { apiSearch, registerUrl } from "~/api/cloud.axios";

export default {
  data: function () {
    return {
      isLoading: false,
      form: {
        email: null,
        first_name: null,
        last_name: null,
        password: null,
      },
    };
  },
  methods: {
    handleSubmit() {
      this.isLoading = true;

      Api.post(`${apiSearch}${registerUrl}`, this.form)
        .then(({ data }) => {
          this.$notify({
            group: "userNotification",
            type: "success",
            text: `${data.message.customer} has been added correctly!`,
          });

          setTimeout(() => {
            this.$router.push("/pages/login");
          }, 500);
        })
        .catch(() => {
          this.$notify({
            group: "userNotification",
            type: "danger",
            text: `The user wasn't registered correctly`,
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>