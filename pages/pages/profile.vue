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

        <h1>{{ $t("My Profile") }}</h1>
      </div>
    </div>

    <div class="container account-container custom-account-container">
      <div class="row">
        <div
          class="tab-pane fade active show col-12"
          id="edit"
          role="tabpanel"
          aria-labelledby="edit-tab"
        >
          <h3 class="account-sub-title d-none d-md-block mt-0 pt-1 ml-1">
            <i class="icon-user-2 align-middle mr-3 pr-1"></i
            >{{ $t("Account Details") }}
          </h3>
          <div class="row">
            <profile-update></profile-update>
            <password-update></password-update>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import PasswordUpdate from "~/components/partials/page/account/PasswordUpdate.vue";
import ProfileUpdate from "~/components/partials/page/account/ProfileUpdate.vue";

export default {
  components: { ProfileUpdate, PasswordUpdate },
};
</script>