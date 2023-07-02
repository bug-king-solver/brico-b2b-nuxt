<template>
  <div class="col-md-6">
    <form class="p-4 row" @submit.prevent="updatePassword">
      <div class="form-group mb-2 col-md-12">
        <label for="acc-text">
          Current Password
          <span class="required">*</span>
        </label>
        <input
          type="password"
          class="form-control"
          id="acc-text"
          name="acc-text"
          v-model="form.old_password"
          required
        />
      </div>
      <div class="form-group mb-2 col-md-12">
        <label for="acc-text">
          New Password
          <span class="required">*</span>
        </label>
        <input
          type="password"
          class="form-control"
          id="acc-text"
          name="acc-text"
          v-model="form.new_password"
          required
        />
      </div>

      <div class="form-group mb-2 col-md-12">
        <label for="acc-text">
          Confirm New Password
          <span class="required">*</span>
        </label>
        <input
          type="password"
          class="form-control"
          id="acc-text"
          name="acc-text"
          v-model="form.new_password_confirmation"
          required
        />
      </div>

      <div class="col-md-12">
        <button type="submit" class="btn btn-dark mr-0">
          <span v-if="isLoading">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </span>
          <span v-else>Update Password</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Api } from "~/api";
import { apiSearch, updatePasswordUrl } from "~/api/cloud.axios";

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
  methods: {
    updatePassword() {
      if (this.form.new_password === this.form.new_password_confirmation) {
        const payload = {
          user_email: this.auth.email,
          old_password: this.form.old_password,
          new_password: this.form.new_password,
        };
        this.isLoading = true;
        Api.put(`${apiSearch}${updatePasswordUrl}`, payload)
          .then(({ data }) => {
            this.$notify({
              group: "userNotification",
              type: "success",
              text: data.message.message,
            });
          })
          .catch(() => {
            this.$notify({
              group: "userNotification",
              type: "danger",
              text: "The current message is incorrect!",
            });
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        this.$notify({
          group: "userNotification",
          type: "danger",
          text: "New password and confirm password should be matched!",
        });
      }
    },
  },
};
</script>