<template>
  <main class="main main-test">
    <div class="container checkout-container">
      <ul class="checkout-progress-bar d-flex justify-content-center flex-wrap">
        <li>
          <nuxt-link to="/pages/cart">{{ $t("Shopping Cart") }}</nuxt-link>
        </li>
        <li class="active">
          <nuxt-link to="/pages/pay">{{ $t("Checkout") }}</nuxt-link>
        </li>
        <li class="disabled">
          <a href="javascript:;">{{ $t("Order Complete") }}</a>
        </li>
      </ul>

      <template v-if="cartList.length > 0">
        <PayLogin v-if="!auth" @fetchAddress="getPreviousAddress" />
        <PayCoupon />
        <div class="row">
          <div class="col-lg-7">
            <ul class="checkout-steps">
              <li>
                <h2 class="step-title">{{ $t("Shipping details") }}</h2>
                <form @submit.prevent="handleSubmit" id="checkout-form">
                  <div class="row" v-if="isLoadedAddress && previousAddress">
                    <div
                      class="col-md-6"
                      v-for="(item, index) in previousAddress"
                      :key="index"
                    >
                      <div class="card">
                        <div class="card-header d-flex">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              :value="item.name"
                              v-model="selectedShippingAddress"
                            />
                            <label
                              class="form-check-label h5 ml-2"
                              for="exampleRadios1"
                            >
                              {{ item.address_line1 }}, {{ item.city }}
                            </label>
                          </div>
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
                  <div class="row">
                    <div class="col-md-12">
                      <div class="card">
                        <h5 class="card-header">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              value="new"
                              v-model="selectedShippingAddress"
                            />
                            <label
                              class="form-check-label h5 ml-2"
                              for="exampleRadios1"
                            >
                              {{ $t("Create New Address") }}
                            </label>
                          </div>
                        </h5>
                        <div
                          class="card-body"
                          v-if="selectedShippingAddress == 'new'"
                        >
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label>
                                  {{ $t("First Name") }}
                                  <abbr class="required" title="required"
                                    >*</abbr
                                  >
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="contact_info.first_name"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label>
                                  {{ $t("Last Name") }}
                                  <abbr class="required" title="required"
                                    >*</abbr
                                  >
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="contact_info.last_name"
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label>
                                  {{ $t("Last Name") }}
                                  <abbr class="required" title="required"
                                    >*</abbr
                                  >
                                </label>
                                <input
                                  type="email"
                                  class="form-control"
                                  v-model="contact_info.email_id"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div class="form-group mb-1" v-if="!auth">
                            <div class="custom-control custom-checkbox mt-0">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="create-account"
                              />
                              <label
                                class="custom-control-label"
                                data-toggle="collapse"
                                data-target="#collapseThree"
                                aria-controls="collapseThree"
                                for="create-account"
                                @click="accountOpened = !accountOpened"
                                >{{ $t("Remember my data?") }}</label
                              >
                            </div>
                          </div>

                          <vue-slide-toggle :open="accountOpened" v-if="!auth">
                            <div class="form-group">
                              <label>
                                {{ $t("Create password") }}
                                <abbr class="required" title="required">*</abbr>
                              </label>
                              <input
                                type="password"
                                placeholder="Password"
                                class="form-control"
                                v-model="create_password"
                                required
                              />
                            </div>
                          </vue-slide-toggle>

                          <div class="form-group">
                            <label>
                              {{ $t("Phone") }}
                              <abbr class="required" title="required">*</abbr>
                            </label>
                            <input
                              type="tel"
                              class="form-control"
                              v-model="contact_info.phone"
                              required
                            />
                          </div>
                          <div class="select-custom">
                            <label>
                              {{ $t("Country / Region") }}
                              <abbr class="required" title="required">*</abbr>
                            </label>
                            <select
                              name="orderby"
                              class="form-control"
                              v-model="contact_info.shipping_address.country"
                            >
                              <option value="Italy" selected="selected">
                                Italy
                              </option>
                            </select>
                          </div>

                          <div class="form-group mb-1 pb-2">
                            <label>
                              {{ $t("Address") }}1
                              <abbr class="required" title="required">*</abbr>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="House number and street name"
                              v-model="
                                contact_info.shipping_address.address_line1
                              "
                              required
                            />
                          </div>
                          <div class="form-group mb-1 pb-2">
                            <label>
                              {{ $t("Address") }}2
                              <abbr class="required" title="required">*</abbr>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="House number and street name"
                              v-model="
                                contact_info.shipping_address.address_line2
                              "
                            />
                          </div>
                          <div class="form-group">
                            <label>
                              {{ $t("Town / City") }}
                              <abbr class="required" title="required">*</abbr>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="contact_info.shipping_address.city"
                              required
                            />
                          </div>

                          <div class="form-group">
                            <label>
                              {{ $t("State") }}
                              <abbr class="required" title="required">*</abbr>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="contact_info.shipping_address.state"
                              required
                            />
                          </div>

                          <div class="form-group">
                            <label>
                              {{ $t("Postcode / Zip") }}
                              <abbr class="required" title="required">*</abbr>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="contact_info.shipping_address.pincode"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="custom-control custom-checkbox mt-0">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="different-shipping"
                        name="different-shipping"
                        v-model="isAddressDifferent"
                      />
                      <label
                        class="custom-control-label"
                        data-toggle="collapse"
                        data-target="#collapseFour"
                        aria-controls="collapseFour"
                        for="different-shipping"
                      >
                        {{ $t("Bill to a different address?") }}
                      </label>
                    </div>
                  </div>

                  <vue-slide-toggle
                    :open="isAddressDifferent"
                    v-if="isAddressDifferent"
                  >
                    <div class="billing-info">
                      <div
                        class="row"
                        v-if="isLoadedAddress && previousAddress"
                      >
                        <div
                          class="col-md-6"
                          v-for="(item, index) in previousAddress"
                          :key="index"
                        >
                          <div class="card">
                            <div class="card-header d-flex">
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="billingRadios"
                                  :value="item.name"
                                  v-model="selectedBillingAddress"
                                />
                                <label
                                  class="form-check-label h5 ml-2"
                                  for="exampleRadios1"
                                >
                                  {{ item.address_line1 }}, {{ item.city }}
                                </label>
                              </div>
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
                      <div class="row">
                        <div class="col-md-12">
                          <div class="card">
                            <h5 class="card-header">
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="exampleRadios"
                                  value="new"
                                  v-model="selectedBillingAddress"
                                />
                                <label
                                  class="form-check-label h5 ml-2"
                                  for="exampleRadios1"
                                >
                                  {{ $t("Create New Address") }}
                                </label>
                              </div>
                            </h5>
                            <div
                              class="card-body"
                              v-if="selectedBillingAddress == 'new'"
                            >
                              <div class="select-custom">
                                <label>
                                  {{ $t("Country / Region") }}
                                  <abbr class="required" title="required"
                                    >*</abbr
                                  >
                                </label>
                                <select
                                  name="orderby"
                                  class="form-control"
                                  v-model="contact_info.billing_address.country"
                                >
                                  <option value="Italy" selected="selected">
                                    Italy
                                  </option>
                                </select>
                              </div>

                              <div class="form-group mb-1 pb-2">
                                <label>
                                  {{ $t("Address") }}1
                                  <abbr class="required" title="required"
                                    >*</abbr
                                  >
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="House number and street name"
                                  v-model="
                                    contact_info.billing_address.address_line1
                                  "
                                  required
                                />
                              </div>
                              <div class="form-group mb-1 pb-2">
                                <label>
                                  {{ $t("Address") }}2
                                  <abbr class="required" title="required"
                                    >*</abbr
                                  >
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="House number and street name"
                                  v-model="
                                    contact_info.billing_address.address_line2
                                  "
                                />
                              </div>
                              <div class="form-group">
                                <label>
                                  {{ $t("Town / City") }}
                                  <abbr class="required" title="required"
                                    >*</abbr
                                  >
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="contact_info.billing_address.city"
                                  required
                                />
                              </div>

                              <div class="form-group">
                                <label>
                                  {{ $t("State") }}
                                  <abbr class="required" title="required"
                                    >*</abbr
                                  >
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="contact_info.billing_address.state"
                                  required
                                />
                              </div>

                              <div class="form-group">
                                <label>
                                  {{ $t("Postcode / Zip") }}
                                  <abbr class="required" title="required"
                                    >*</abbr
                                  >
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="contact_info.billing_address.pincode"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </vue-slide-toggle>

                  <div class="form-group">
                    <div class="custom-control custom-checkbox mt-0">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="invoice-info"
                        v-model="invoice"
                      />
                      <label
                        class="custom-control-label"
                        data-toggle="collapse"
                        data-target="#collapseFour"
                        aria-controls="collapseFour"
                        for="invoice-info"
                      >
                        {{ $t("Need invoice?") }}
                      </label>
                    </div>
                  </div>

                  <vue-slide-toggle :open="invoice" v-if="invoice">
                    <div class="invoice-info">
                      <h4>
                        <button
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-expanded="true"
                          aria-controls="collapseThree"
                          class="btn btn-link btn-toggle"
                          @click="customer_type = 'Company'"
                        >
                          {{ $t("REQUEST INVOICE FOR COMPANY") }}
                        </button>
                      </h4>
                      <vue-slide-toggle
                        :open="customer_type == 'Company'"
                        v-if="customer_type == 'Company'"
                      >
                        <div class="invoice-company">
                          <div class="row">
                            <div class="col-md-8">
                              <div class="form-group">
                                <label>
                                  {{ $t("Company name") }}
                                  <abbr class="required" title="required"
                                    >*</abbr
                                  >
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="business_info.company_name"
                                  required
                                />
                              </div>
                            </div>

                            <div class="col-md-4">
                              <div class="form-group">
                                <label>
                                  {{ $t("Vat Number") }}
                                  <abbr class="required" title="required"
                                    >*</abbr
                                  >
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="business_info.vat_number"
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-8">
                              <div class="form-group">
                                <label>
                                  {{ $t("Pec") }}
                                  <abbr class="required" title="required"
                                    >*</abbr
                                  >
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="business_info.pec"
                                  required
                                />
                              </div>
                            </div>

                            <div class="col-md-4">
                              <div class="form-group">
                                <label>
                                  {{ $t("Recipient Code") }}
                                  <abbr class="required" title="required"
                                    >*</abbr
                                  >
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="business_info.recipient_code"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </vue-slide-toggle>
                      <h4>
                        <button
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseFour"
                          aria-expanded="true"
                          aria-controls="collapseFour"
                          class="btn btn-link btn-toggle"
                          @click="customer_type = 'Individual'"
                        >
                          {{ $t("REQUEST INVOICE FOR PRIVATE") }}
                        </button>
                      </h4>
                      <vue-slide-toggle
                        :open="customer_type == 'Individual'"
                        v-if="customer_type == 'Individual'"
                      >
                        <div class="invoice-company">
                          <div class="form-group">
                            <label>
                              {{ $t("Tax Code") }}
                              <abbr class="required" title="required">*</abbr>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="business_info.tax_code"
                              required
                            />
                          </div>
                        </div>
                      </vue-slide-toggle>
                    </div>
                  </vue-slide-toggle>

                  <div class="form-group">
                    <label class="order-comments">{{
                      $t("Order notes (optional)")
                    }}</label>
                    <textarea
                      class="form-control"
                      placeholder="Notes about your order, e.g. special notes for delivery."
                    ></textarea>
                  </div>
                </form>
              </li>
            </ul>
          </div>

          <div class="col-lg-5">
            <div v-sticky="isSticky" sticky-offset="{top: 152}">
              <div class="order-summary">
                <h3>{{ $t("YOUR ORDER") }}</h3>
                <PayProductTable />

                <div class="payment-methods">
                  <h4 class>{{ $t("Payment methods") }}</h4>
                  <div class="info-box with-icon p-0">
                    <p>
                      {{
                        $t(
                          "Sorry, it seems that there are no available payment methods for your state. Please contact us if you require assistance or wish to make alternate arrangements."
                        )
                      }}
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  class="btn btn-dark btn-place-order"
                  form="checkout-form"
                >
                  {{ $t("Place order") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>

      <PayNoCartList v-else />
    </div>
  </main>
</template>

<script>
import { VueSlideToggle } from "vue-slide-toggle";
import Sticky from "vue-sticky-directive";
import { mapActions, mapGetters } from "vuex";
import { Api } from "~/api";
import { apiSearch, getAddressUrl, orderUrl } from "~/api/cloud.axios";
import PayCoupon from "~/components/partials/page/cart/PayCoupon.vue";
import PayLogin from "~/components/partials/page/cart/PayLogin.vue";
import PayNoCartList from "~/components/partials/page/cart/PayNoCartList.vue";
import PayProductTable from "~/components/partials/page/cart/PayProductTable.vue";

export default {
  components: {
    VueSlideToggle,
    PayLogin,
    PayCoupon,
    PayProductTable,
    PayNoCartList,
  },
  directives: {
    Sticky,
  },
  data: function () {
    return {
      isSticky: false,
      accountOpened: false,
      selectedShippingAddress: "new",
      selectedBillingAddress: "new",
      isAddressDifferent: false,
      invoice: false,
      isLoadedAddress: false,
      customer_type: "Individual",
      previousAddress: null,
      create_password: null,
      contact_info: {
        first_name: null,
        last_name: null,
        email_id: null,
        phone: null,
        billing_address: {
          address_line1: null,
          address_line2: null,
          city: null,
          state: null,
          pincode: null,
          country: "Italy",
        },
        shipping_address: {
          address_line1: null,
          address_line2: null,
          city: null,
          state: null,
          pincode: null,
          country: "Italy",
        },
      },
      business_info: {
        tax_code: null,
        vat_number: null,
        company_name: null,
        pec: null,
        client_id: null,
        recipient_code: null,
      },
    };
  },
  computed: {
    ...mapGetters("cart", ["cartList", "totalCount", "totalPrice"]),
    ...mapGetters("auth", ["auth"]),
    ...mapGetters("order", ["storedAddress"]),
  },
  mounted() {
    this.useStoredAddress();
    this.getPreviousAddress();
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler, {
      passive: true,
    });
  },
  destroyed: function () {
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods: {
    ...mapActions("auth", ["setAuth"]),
    ...mapActions("order", ["setOrderAddress"]),
    useStoredAddress() {
      if (this.storedAddress) {
        const {
          contact_info,
          customer_type,
          invoice,
          shipping_address_different,
          ...rest
        } = this.storedAddress;
        this.customer_type = customer_type;

        if (contact_info.shipping_address?.name) {
          this.selectedShippingAddress = contact_info.shipping_address.name;
        }

        if (contact_info.billing_address?.name) {
          this.selectedBillingAddress = contact_info.billing_address.name;
        }
        this.contact_info = { ...contact_info };

        this.invoice = invoice;
        this.isAddressDifferent = shipping_address_different;

        if ((invoice, rest?.business_info)) {
          this.business_info = { ...rest.business_info };
        }
      }
    },
    getPreviousAddress() {
      if (this.auth) {
        Api.get(`${apiSearch}${getAddressUrl}`)
          .then(({ data }) => {
            this.previousAddress = data.message;
          })
          .finally(() => {
            this.isLoadedAddress = true;
          });
      }
    },
    usePreviousAddress() {
      this.contact_info.first_name = this.previousAddress.name;
      this.contact_info.last_name = this.previousAddress.name;
      this.contact_info.email_id = this.previousAddress.email_id;
      this.contact_info.phone = this.previousAddress.phone;
      this.contact_info.billing_address.address_line1 =
        this.previousAddress.address_line1;
      this.contact_info.billing_address.address_line2 =
        this.previousAddress.address_line2;
      this.contact_info.billing_address.city = this.previousAddress.city;
      this.contact_info.billing_address.state = this.previousAddress.state;
      this.contact_info.billing_address.country = this.previousAddress.country;
      this.contact_info.billing_address.pincode = this.previousAddress.pincode;
    },
    handleSubmit() {
      if (this.accountOpened && !this.auth) {
        this.isLoading = true;

        Api.post(`${apiSearch}${registerUrl}`, {
          email: this.contact_info.email_id,
          first_name: this.contact_info.first_name,
          last_name: this.contact_info.last_name,
          password: this.create_password,
        })
          .then(({ data }) => {
            this.setAuth({
              ...data.message,
              email: this.contact_info.email_id,
            });
            this.submitQuotation();
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
      } else {
        if (this.selectedShippingAddress == "new") {
          this.submitQuotation();
        } else {
          this.submitQuotationWithPrevious();
        }
      }
    },

    resizeHandler: function () {
      this.isSticky = window.innerWidth > 991 ? true : false;
    },

    getBusinessInfo() {
      let business_info;

      if (this.customer_type == "Individual") {
        business_info = {
          tax_code: this.business_info.tax_code,
        };
      } else {
        business_info = {
          company_name: this.business_info.company_name,
          vat_number: this.business_info.vat_number,
          pec: this.business_info.pec,
          client_id: this.business_info.client_id,
          recipient_code: this.business_info.recipient_code,
        };
      }

      return business_info;
    },
    submitQuotationWithPrevious() {
      let customer_id = "Guest";
      const items = this.getCartItems();
      if (this.auth) {
        customer_id = this.auth.email;
      }
      if (items) {
        const address = this.previousAddress.filter(
          (item) => item.name === this.selectedShippingAddress
        )[0];

        const shipping_address = {
          name: address.name,
          address_line1: address.address_line1,
          address_line2: address.address_line2,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          country: address.country,
        };

        let billing_address = {};
        if (this.isAddressDifferent) {
          if (this.selectedBillingAddress == "new") {
            billing_address = this.contact_info.billing_address;
          } else {
            const billAddress = this.previousAddress.filter(
              (item) => item.name === this.selectedBillingAddress
            )[0];
            billing_address = {
              name: billAddress.name,
              address_line1: billAddress.address_line1,
              address_line2: billAddress.address_line2,
              city: billAddress.city,
              state: billAddress.state,
              pincode: billAddress.pincode,
              country: billAddress.country,
            };
          }
        }
        const contact_info = {
          first_name: this.auth.first_name,
          last_name: this.auth.last_name,
          email_id: address.email_id,
          phone: address.phone,
          shipping_address,
          billing_address,
        };
        let payload = {
          items,
          customer_id,
          channel: "B2C",
          customer_type: this.customer_type,
          contact_info,
          shipping_address_different: this.isAddressDifferent,
          invoice: this.invoice,
        };
        this.sendQuoationRequest(payload);
      }
    },
    sendQuoationRequest(prevPayload) {
      let payload = { ...prevPayload };
      if (this.invoice) {
        const business_info = this.getBusinessInfo();
        payload = {
          ...payload,
          business_info,
        };
      }
      this.isLoading = true;
      this.setOrderAddress(payload);
      Api.post(`${apiSearch}${orderUrl}`, payload)
        .then(({ data }) => {
          const quotation_name = data.message;

          this.$router.push({
            name: "pages-checkout___" + this.$i18n.locale,
            params: {
              quotation_name,
              contact_info: payload.contact_info,
              isSame: this.isAddressDifferent,
            },
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    submitQuotation() {
      let customer_id = "Guest";
      const items = this.getCartItems();
      if (this.auth) {
        customer_id = this.auth.email;
      }
      if (items) {
        let payload = {
          items,
          customer_id,
          channel: "B2C",
          customer_type: this.customer_type,
          contact_info: this.contact_info,
          shipping_address_different: this.isAddressDifferent,
          invoice: this.invoice,
        };
        this.sendQuoationRequest(payload);
      }
    },
    getCartItems() {
      if (this.cartList) {
        return this.cartList.map((item) => {
          return {
            item_code: item.sku,
            qty: item.qty,
            rate: item.price,
          };
        });
      }

      return null;
    },
  },
};
</script>