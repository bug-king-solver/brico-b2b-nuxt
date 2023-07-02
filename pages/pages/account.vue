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
              {{ $t("My Account") }}
            </li>
          </ol>
        </nav>

        <h1>{{ $t("My Account") }}</h1>
      </div>
    </div>

    <div class="container account-container custom-account-container">
      <div class="row">
        <div class="tab-content col-lg-12 order-1 order-lg-last mt-lg-0 mt-4">
          <div
            class="tab-pane fade show active"
            id="dashboard"
            role="tabpanel"
            aria-labelledby="dashboard-tab"
          >
            <div class="dashboard-content">
              <p>
                {{ $t("Hello") }}
                <strong class="text-dark"
                  >{{ auth.first_name }} {{ auth.last_name }}</strong
                >
                (not <strong class="text-dark">you</strong>?
                <a href="javascript:;" class="btn btn-link" @click="logout">{{
                  $t("Log out")
                }}</a
                >)
              </p>

              <p>
                {{ $t("From your account dashboard you can view your") }}
                <nuxt-link
                  class="btn btn-link link-to-tab"
                  to="/pages/orders"
                  data-toggle="order"
                  >{{ $t("recent orders") }}</nuxt-link
                >, {{ $t("manage your") }}
                <nuxt-link
                  class="btn btn-link link-to-tab"
                  to="/pages/address"
                  data-toggle="address"
                  >{{ $t("shipping and billing addresses") }}</nuxt-link
                >, {{ $t("and") }}
                <nuxt-link
                  class="btn btn-link link-to-tab"
                  to="/pages/profile"
                  data-toggle="edit"
                  >{{
                    $t("edit your password and account details.")
                  }}</nuxt-link
                >
              </p>

              <div class="mb-4"></div>

              <div class="row row-lg">
                <div class="col-6 col-md-4">
                  <div
                    class="feature-box text-center pb-4"
                    data-toggle="order"
                    @click.prevent="tabClicked($event)"
                  >
                    <nuxt-link to="/pages/orders" class="link-to-tab">
                      <i class="sicon-social-dropbox"></i>
                    </nuxt-link>
                    <div class="feature-box-content">
                      <h3>{{ $t("ORDERS") }}</h3>
                    </div>
                  </div>
                </div>

                <div class="col-6 col-md-4">
                  <div
                    class="feature-box text-center pb-4"
                    data-toggle="download"
                    @click.prevent="tabClicked($event)"
                  >
                    <a href="#download" class="link-to-tab">
                      <i class="sicon-cloud-download"></i>
                    </a>
                    <div class="feature-box-content">
                      <h3>{{ $t("DOWNLOADS") }}</h3>
                    </div>
                  </div>
                </div>

                <div class="col-6 col-md-4">
                  <div
                    class="feature-box text-center pb-4"
                    data-toggle="address"
                    @click.prevent="tabClicked($event)"
                  >
                    <nuxt-link to="/pages/address" class="link-to-tab">
                      <i class="sicon-location-pin"></i>
                    </nuxt-link>
                    <div class="feature-box-content">
                      <h3>{{ $t("Addresses") }}</h3>
                    </div>
                  </div>
                </div>

                <div class="col-6 col-md-4">
                  <div
                    class="feature-box text-center pb-4"
                    data-toggle="edit"
                    @click.prevent="tabClicked($event)"
                  >
                    <nuxt-link to="/pages/profile" class="link-to-tab">
                      <i class="icon-user-2"></i>
                    </nuxt-link>
                    <div class="feature-box-content p-0">
                      <h3>{{ $t("Account Details") }}</h3>
                    </div>
                  </div>
                </div>

                <div class="col-6 col-md-4">
                  <div class="feature-box text-center pb-4">
                    <nuxt-link to="/shop?wishlist=true">
                      <i class="sicon-heart"></i>
                    </nuxt-link>
                    <div class="feature-box-content">
                      <h3>{{ $t("WISHLIST") }}</h3>
                    </div>
                  </div>
                </div>

                <div class="col-6 col-md-4">
                  <div class="feature-box text-center pb-4">
                    <a href="javascript:;" @click="logout">
                      <i class="sicon-logout"></i>
                    </a>
                    <div class="feature-box-content">
                      <h3>{{ $t("LOGOUT") }}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="tab-pane fade"
            id="order"
            role="tabpanel"
            aria-labelledby="order-tab"
          >
            <div class="order-content">
              <h3 class="account-sub-title d-none d-md-block">
                <i class="sicon-social-dropbox align-middle mr-3"></i
                >{{ $t("Orders") }}
              </h3>
              <div class="order-table-container text-center">
                <table class="table table-order text-left">
                  <thead>
                    <tr>
                      <th class="order-id">{{ $t("Order") }}</th>
                      <th class="order-date">{{ $t("Date") }}</th>
                      <th class="order-status">{{ $t("Status") }}</th>
                      <th class="order-price">{{ $t("Total") }}</th>
                      <th class="order-action">{{ $t("Actions") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center p-0" colspan="5">
                        <p class="mb-5 mt-5">
                          {{ $t("No Order has been made yet.") }}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <hr class="mt-0 mb-3 pb-2" />

                <nuxt-link to="/shop" class="btn btn-dark">{{
                  $t("GO SHOP")
                }}</nuxt-link>
              </div>
            </div>
          </div>

          <div
            class="tab-pane fade"
            id="download"
            role="tabpanel"
            aria-labelledby="download-tab"
          >
            <div class="download-content">
              <h3 class="account-sub-title d-none d-md-block">
                <i class="sicon-cloud-download align-middle mr-3"></i
                >{{ $t("Downloads") }}
              </h3>
              <div class="download-table-container">
                <p>{{ $t("No downloads available yet.") }}</p>
                <nuxt-link
                  to="/shop"
                  class="btn btn-primary text-transform-none mb-2"
                  >{{ $t("GO SHOP") }}</nuxt-link
                >
              </div>
            </div>
          </div>

          <div
            class="tab-pane fade"
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

              <div class="row">
                <div class="address col-md-6">
                  <div class="heading d-flex">
                    <h4 class="text-dark mb-0">{{ $t("Billing address") }}</h4>
                  </div>

                  <div class="address-box">
                    {{ $t("You have not set up this type of address yet.") }}
                  </div>

                  <a
                    href="#address"
                    class="btn btn-default address-action link-to-tab"
                    data-toggle="billing"
                    @click.prevent="tabClicked($event), handler($event)"
                    >{{ $t("Add Address") }}</a
                  >
                </div>

                <div class="address col-md-6 mt-5 mt-md-0">
                  <div class="heading d-flex">
                    <h4 class="text-dark mb-0">{{ $t("Shipping Address") }}</h4>
                  </div>

                  <div class="address-box">
                    {{ $t("You have not set up this type of address yet.") }}
                  </div>

                  <a
                    href="#address"
                    class="btn btn-default address-action link-to-tab"
                    data-toggle="shipping"
                    @click.prevent="tabClicked($event), handler($event)"
                    >{{ $t("Add Address") }}</a
                  >
                </div>
              </div>
            </div>
          </div>

          <div
            class="tab-pane fade"
            id="edit"
            role="tabpanel"
            aria-labelledby="edit-tab"
          >
            <h3 class="account-sub-title d-none d-md-block mt-0 pt-1 ml-1">
              <i class="icon-user-2 align-middle mr-3 pr-1"></i
              >{{ $t("Account Details") }}
            </h3>
            <div class="account-content">
              <form action="#">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="acc-name">
                        {{ $t("First Name") }}
                        <span class="required">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Editor"
                        id="acc-name"
                        name="acc-name"
                        required
                      />
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="acc-lastname">
                        {{ $t("Last Name") }}
                        <span class="required">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="acc-lastname"
                        name="acc-lastname"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div class="form-group mb-2">
                  <label for="acc-text">
                    {{ $t("Display name") }}
                    <span class="required">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="acc-text"
                    name="acc-text"
                    placeholder="Editor"
                    required
                  />
                  <p>
                    {{
                      $t(
                        "This will be how your name will be displayed in the account section and in reviews"
                      )
                    }}
                  </p>
                </div>

                <div class="form-group mb-4">
                  <label for="acc-email">
                    {{ $t("Last Name") }}
                    <span class="required">*</span>
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="acc-email"
                    name="acc-email"
                    placeholder="editor@gmail.com"
                    required
                  />
                </div>

                <div class="change-password">
                  <h3 class="text-uppercase mb-2">
                    {{ $t("Password Change") }}
                  </h3>

                  <div class="form-group">
                    <label for="acc-password"
                      >{{ $t("Current Password") }} ({{
                        $t("leave blank to leave unchanged")
                      }})</label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="acc-password"
                      name="acc-password"
                    />
                  </div>

                  <div class="form-group">
                    <label for="acc-password"
                      >{{ $t("New Password") }} ({{
                        $t("leave blank to leave unchanged")
                      }})</label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="acc-new-password"
                      name="acc-new-password"
                    />
                  </div>

                  <div class="form-group">
                    <label for="acc-password">{{
                      $t("Confirm New Password")
                    }}</label>
                    <input
                      type="password"
                      class="form-control"
                      id="acc-confirm-password"
                      name="acc-confirm-password"
                    />
                  </div>
                </div>

                <div class="form-footer mt-3 mb-0">
                  <button type="submit" class="btn btn-dark mr-0">
                    {{ $t("Save changes") }}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div
            class="tab-pane fade"
            id="billing"
            role="tabpanel"
            aria-labelledby="billing-tab"
          >
            <div class="address account-content mt-0 pt-2">
              <h4 class="title">{{ $t("Billing address") }}</h4>

              <form class="mb-2" action="#">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>
                        {{ $t("First Name") }}
                        <span class="required">*</span>
                      </label>
                      <input type="text" class="form-control" required />
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label>
                        {{ $t("Last Name") }}
                        <span class="required">*</span>
                      </label>
                      <input type="text" class="form-control" required />
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label>{{ $t("Company") }}</label>
                  <input type="text" class="form-control" />
                </div>

                <div class="select-custom">
                  <label>
                    {{ $t("Country / Region") }}
                    <span class="required">*</span>
                  </label>
                  <select name="orderby" class="form-control">
                    <option value selected="selected">
                      British Indian Ocean Territory
                    </option>
                    <option value="1">Brunei</option>
                    <option value="2">Bulgaria</option>
                    <option value="3">Burkina Faso</option>
                    <option value="4">Burundi</option>
                    <option value="5">Cameroon</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>
                    {{ $t("Street address") }}
                    <span class="required">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="House number and street name"
                    required
                  />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    required
                  />
                </div>

                <div class="form-group">
                  <label>
                    {{ $t("Town / City") }}
                    <span class="required">*</span>
                  </label>
                  <input type="text" class="form-control" required />
                </div>

                <div class="form-group">
                  <label>
                    {{ $t("Country / Region") }}
                    <span class="required">*</span>
                  </label>
                  <input type="text" class="form-control" required />
                </div>

                <div class="form-group">
                  <label>
                    {{ $t("Postcode / Zip") }}
                    <span class="required">*</span>
                  </label>
                  <input type="text" class="form-control" required />
                </div>

                <div class="form-group mb-3">
                  <label>
                    {{ $t("Phone") }}
                    <span class="required">*</span>
                  </label>
                  <input type="number" class="form-control" required />
                </div>

                <div class="form-group mb-3">
                  <label>
                    {{ $t("Last Name") }}
                    <span class="required">*</span>
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="editor@gmail.com"
                    required
                  />
                </div>

                <div class="form-footer mb-0">
                  <div class="form-footer-right">
                    <button type="submit" class="btn btn-dark py-4">
                      {{ $t("Save Address") }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div
            class="tab-pane fade"
            id="shipping"
            role="tabpanel"
            aria-labelledby="shipping-tab"
          >
            <div class="address account-content mt-0 pt-2">
              <h4 class="title mb-3">{{ $t("Shipping Address") }}</h4>

              <form class="mb-2" action="#">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>
                        {{ $t("First Name") }}
                        <span class="required">*</span>
                      </label>
                      <input type="text" class="form-control" required />
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label>
                        {{ $t("Last Name") }}
                        <span class="required">*</span>
                      </label>
                      <input type="text" class="form-control" required />
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label>{{ $t("Company") }}</label>
                  <input type="text" class="form-control" />
                </div>

                <div class="select-custom">
                  <label>
                    {{ $t("Country / Region") }}
                    <span class="required">*</span>
                  </label>
                  <select name="orderby" class="form-control">
                    <option value selected="selected">
                      British Indian Ocean Territory
                    </option>
                    <option value="1">Brunei</option>
                    <option value="2">Bulgaria</option>
                    <option value="3">Burkina Faso</option>
                    <option value="4">Burundi</option>
                    <option value="5">Cameroon</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>
                    {{ $t("Address") }}
                    <span class="required">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="House number and street name"
                    required
                  />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    required
                  />
                </div>

                <div class="form-group">
                  <label>
                    {{ $t("Town / City") }}
                    <span class="required">*</span>
                  </label>
                  <input type="text" class="form-control" required />
                </div>

                <div class="form-group">
                  <label>
                    {{ $t("Country / Region") }}
                    <span class="required">*</span>
                  </label>
                  <input type="text" class="form-control" required />
                </div>

                <div class="form-group">
                  <label>
                    {{ $t("Postcode / Zip") }}
                    <span class="required">*</span>
                  </label>
                  <input type="text" class="form-control" required />
                </div>

                <div class="form-footer mb-0">
                  <div class="form-footer-right">
                    <button type="submit" class="btn btn-dark py-4">
                      {{ $t("Save Address") }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Sticky from "vue-sticky-directive";
import { mapActions, mapGetters } from "vuex";
import PvTabs from "~/components/features/PvTabs";

export default {
  directives: {
    Sticky,
  },
  components: {
    PvTabs,
  },
  data: function () {
    return {
      isSticky: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["auth"]),
  },
  mounted: function () {
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler, {
      passive: true,
    });
  },
  destroyed: function () {
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods: {
    ...mapActions("auth", ["removeAuth"]),
    tabClicked: function (e) {
      let linkId = e.target.getAttribute("data-toggle");
      if (!linkId)
        linkId = e.target.parentNode.parentNode.getAttribute("data-toggle");
      if (document.getElementById(linkId + "-tab"))
        document.getElementById(linkId + "-tab").click();
    },
    handler: function (e) {
      let linkId = e.target.getAttribute("href");
      if (document.querySelector(linkId + "-tab")) {
        document.querySelector(linkId + "-tab").classList.add("active");
      }
    },
    resizeHandler: function () {
      this.isSticky = window.innerWidth > 991 ? true : false;
    },
    logout() {
      this.removeAuth();
      this.$router.push("/");
    },
  },
};
</script>