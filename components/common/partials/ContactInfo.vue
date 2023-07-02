<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSubmit)">
      <table class="table table-totals">
        <tbody>
          <tr>
            <td>{{ $t("Subtotal") }}</td>
            <td>€{{ totalPrice | priceFormat }}</td>
          </tr>

          <tr>
            <td colspan="2" class="text-left">
              <ValidationProvider
                name="Name"
                :rules="{ required: true }"
                v-slot="{ errors }"
                class="mt-1"
                tag="div"
              >
                <label for="name">Name</label>
                <input
                  id="name"
                  v-model="contact_info.name"
                  type="text"
                  class="form-control form-control-sm"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                name="Email"
                :rules="{ required: true, email: true }"
                v-slot="{ errors }"
              >
                <label for="email">Email</label>
                <input
                  id="email"
                  v-model="contact_info.email_id"
                  type="text"
                  class="form-control form-control-sm"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                name="Phone"
                :rules="{ required: true }"
                v-slot="{ errors }"
                tag="div"
              >
                <label for="phone">phone</label>
                <input
                  id="phone"
                  v-model="contact_info.phone"
                  type="text"
                  class="form-control form-control-sm"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>

              <h5 class="mt-2">{{ $t("Shipping Address") }}</h5>
              <ValidationProvider
                name="Shipping Address1"
                :rules="{ required: true }"
                v-slot="{ errors }"
                tag="div"
              >
                <label for="shipping_address_address1">Address 1</label>
                <input
                  id="shipping_address_address1"
                  v-model="contact_info.shipping_address.address_line1"
                  type="text"
                  class="form-control form-control-sm"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <div>
                <label for="shipping_address_address2">Address 2</label>
                <input
                  id="shipping_address_address2"
                  v-model="contact_info.shipping_address.address_line2"
                  type="text"
                  class="form-control form-control-sm"
                />
              </div>
              <ValidationProvider
                name="Shipping City"
                :rules="{ required: true }"
                v-slot="{ errors }"
                tag="div"
              >
                <label for="shipping_address_city">City</label>
                <input
                  id="shipping_address_city"
                  v-model="contact_info.shipping_address.city"
                  type="text"
                  class="form-control form-control-sm"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                name="Shipping State"
                :rules="{ required: true }"
                v-slot="{ errors }"
                tag="div"
              >
                <label for="shipping_address_state">{{ $t("State") }}</label>
                <input
                  id="shipping_address_state"
                  v-model="contact_info.shipping_address.state"
                  type="text"
                  class="form-control form-control-sm"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                name="Shipping Pincode"
                :rules="{ required: true }"
                v-slot="{ errors }"
                tag="div"
              >
                <label for="shipping_address_pincode">Pincode</label>
                <input
                  id="shipping_address_pincode"
                  v-model="contact_info.shipping_address.pincode"
                  type="text"
                  class="form-control form-control-sm"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                name="Shipping Country"
                :rules="{ required: true }"
                v-slot="{ errors }"
                tag="div"
              >
                <label for="shipping_address_country">Country</label>
                <select
                  class="form-control form-control-sm"
                  v-model="contact_info.shipping_address.country"
                >
                  <option value="Italy">Italy</option>
                  <option value="Turkey">Turkey</option>
                  <option value="China">China</option>
                  <option value="Germany">Germany</option>
                </select>

                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>

              <template v-if="!isSame">
                <h5 class="mt-2">{{ $t("Billing address") }}</h5>
                <ValidationProvider
                  name="Shipping Address1"
                  :rules="{ required: true }"
                  v-slot="{ errors }"
                  tag="div"
                >
                  <label for="billing_address_address1">Address 1</label>
                  <input
                    id="billing_address_address1"
                    v-model="contact_info.billing_address.address_line1"
                    type="text"
                    class="form-control form-control-sm"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
                <div>
                  <label for="billing_address_address2">Address 2</label>
                  <input
                    id="billing_address_address2"
                    v-model="contact_info.billing_address.address_line2"
                    type="text"
                    class="form-control form-control-sm"
                  />
                </div>
                <ValidationProvider
                  name="Shipping City"
                  :rules="{ required: true }"
                  v-slot="{ errors }"
                  tag="div"
                >
                  <label for="billing_address_city">City</label>
                  <input
                    id="billing_address_city"
                    v-model="contact_info.billing_address.city"
                    type="text"
                    class="form-control form-control-sm"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider
                  name="Shipping State"
                  :rules="{ required: true }"
                  v-slot="{ errors }"
                  tag="div"
                >
                  <label for="billing_address_state">{{ $t("State") }}</label>
                  <input
                    id="billing_address_state"
                    v-model="contact_info.billing_address.state"
                    type="text"
                    class="form-control form-control-sm"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider
                  name="Shipping Pincode"
                  :rules="{ required: true }"
                  v-slot="{ errors }"
                  tag="div"
                >
                  <label for="billing_address_pincode">Pincode</label>
                  <input
                    id="billing_address_pincode"
                    v-model="contact_info.billing_address.pincode"
                    type="text"
                    class="form-control form-control-sm"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider
                  name="Shipping Country"
                  :rules="{ required: true }"
                  v-slot="{ errors }"
                  tag="div"
                >
                  <label for="billing_address_country">Country</label>
                  <select
                    class="form-control form-control-sm"
                    v-model="contact_info.billing_address.country"
                  >
                    <option value="Italy">Italy</option>
                    <option value="Turkey">Turkey</option>
                    <option value="China">China</option>
                    <option value="Germany">Germany</option>
                  </select>
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </template>
              <label for="">
                <input type="checkbox" v-model="isSame" />
                <span class="ml-3 pb-2"
                  >Shipping Address is same as Billing Address</span
                >
              </label>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td>{{ $t("Total") }}</td>
            <td>€{{ totalPrice | priceFormat }}</td>
          </tr>
        </tfoot>
      </table>

      <div class="checkout-methods">
        <button type="submit" class="btn btn-block btn-dark">
          Proceed to Checkout
          <i class="fa fa-cog fa-spin text-white" v-if="isLoading"></i>
          <i class="fa fa-arrow-right" v-else></i>
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { mapGetters } from "vuex";
import { Api } from "~/api";
import { apiSearch, orderUrl } from "~/api/cloud.axios";

export default {
  props: {
    totalPrice: Number,
    cartList: Array,
  },
  data: function () {
    return {
      isSame: true,
      isLoading: false,
      contact_info: {
        name: null,
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
    };
  },
  computed: {
    ...mapGetters("auth", ["auth"]),
  },
  methods: {
    onSubmit() {
      const items = this.getCartItems();
      let customer_id = "Guest";
      if (this.auth) {
        customer_id = this.auth.email;
      }

      if (items) {
        const payload = {
          items,
          customer_id,
          contact_info: this.contact_info,
          shipping_address_different: !this.isSame,
        };
        this.isLoading = true;
        Api.post(`${apiSearch}${orderUrl}`, payload)
          .then(({ data }) => {
            const quotation_name = data.message;

            this.$router.push({
              name: "pages-checkout___" + this.$i18n.locale,
              params: {
                quotation_name,
                contact_info: this.contact_info,
                isSame: this.isSame,
              },
            });
          })
          .finally(() => {
            this.isLoading = false;
          });
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