<template>
  <div class="col-md-6">
    <form class="p-4 row" @submit.prevent="updateProfile">
      <div class="form-group mb-2 col-md-6">
        <label for="acc-text">
          {{ $t("First Name") }}
          <span class="required">*</span>
        </label>
        <input
          type="text"
          class="form-control"
          id="acc-text"
          name="acc-text"
          v-model="form.first_name"
          required
        />
      </div>
      <div class="form-group mb-2 col-md-6">
        <label for="acc-text">
          {{ $t("Last Name") }}
          <span class="required">*</span>
        </label>
        <input
          type="text"
          class="form-control"
          id="acc-text"
          name="acc-text"
          v-model="form.last_name"
          required
        />
      </div>

      <div class="form-group mb-4 col-md-12">
        <label for="acc-email"> {{ $t("Last Name") }} </label>
        <input
          type="email"
          class="form-control"
          id="acc-email"
          name="acc-email"
          v-model="auth.email"
          readonly
        />
      </div>

      <div class="col-md-12">
        <button type="submit" class="btn btn-dark mr-0">
          <span v-if="isLoading">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </span>
          <span v-else>Update Profile</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Api } from "~/api";
import { apiSearch, updateProfileUrl } from "~/api/cloud.axios";

export default {
  data: () => {
    return {
      form: {
        first_name: null,
        last_name: null,
      },
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["auth"]),
  },
  mounted() {
    this.form.first_name = this.auth.first_name;
    this.form.last_name = this.auth.last_name;
  },
  methods: {
    ...mapActions("auth", ["getUserInfo"]),
    updateProfile() {
      this.isLoading = true;
      Api.put(`${apiSearch}${updateProfileUrl}`, this.form)
        .then(({ data }) => {
          this.$notify({
            group: "userNotification",
            type: "success",
            text: data.message.message,
          });
          this.getUserInfo();
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>