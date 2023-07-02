<template>
  <div class="container">
    <ul class="checkout-progress-bar d-flex justify-content-center flex-wrap">
      <li>
        <nuxt-link to="/pages/cart">{{ $t("Shopping Cart") }}</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/pages/pay">{{ $t("Checkout") }}</nuxt-link>
      </li>
      <li class="active">
        <nuxt-link to="/pages/checkout">{{ $t("Order Complete") }}</nuxt-link>
      </li>
    </ul>

    <div class="row" v-if="cartList.length > 0" key="noEmpty">
      <div class="col-lg-8">
        <div class="cart-table-container">
          <table class="table table-cart">
            <thead>
              <tr>
                <th class="thumbnail-col"></th>
                <th>{{ $t("Product") }}</th>
                <th>{{ $t("Product Code") }}</th>
                <th class="price-col">{{ $t("Price") }}</th>
                <th class="qty-col">{{ $t("Quantity") }}</th>
                <th class="text-right">{{ $t("Subtotal") }}</th>
              </tr>
            </thead>

            <tbody>
              <tr
                class="product-row"
                v-for="(product, index) in cartItems"
                :key="'cart-product-' + index"
              >
                <td>
                  <figure class="product-image-container">
                    <nuxt-link :to="'/' + product.slug" class="product-image">
                      <nuxt-img
                        :src="`${product.small_pictures[0].url}`"
                        :width="product.small_pictures[0].width"
                        :height="product.small_pictures[0].height"
                        alt="product"
                      />
                    </nuxt-link>
                  </figure>
                </td>

                <td>
                  <h5 class="product-title">
                    <nuxt-link :to="'/' + product.slug">{{
                      product.name
                    }}</nuxt-link>
                  </h5>
                </td>
                <td>
                  {{ product.sku }}
                </td>

                <td>€{{ product.price | priceFormat }}</td>

                <td>
                  {{ product.qty }}
                </td>

                <td class="text-right">
                  <span class="subtotal-price"
                    >€{{ (product.price * product.qty) | priceFormat }}</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="cart-summary" v-if="contact_info">
          <h3>{{ $t("Payment Details") }}</h3>
          <div class="text-dark">
            {{
              $t(
                "Complete your purchase Iteme by providing your payment detail order."
              )
            }}
          </div>
          <table class="table table-totals">
            <tbody>
              <tr>
                <td>{{ $t("Subtotal") }}</td>
                <td>{{ totalPrice | priceFormat }}€</td>
              </tr>
              <tr>
                <td>Vat (20%)</td>
                <td>{{ totalPrice | priceFormat }}€</td>
              </tr>
              <tr>
                <td>{{ $t("Total") }}</td>
                <td>{{ totalPrice | priceFormat }}€</td>
              </tr>
            </tbody>
          </table>

          <button
            type="button"
            class="btn btn-block btn-dark"
            @click="handlePayment"
          >
            <i class="fa fa-cog fa-spin text-white" v-if="isLoading"></i>
            <span v-else>Pay €{{ totalPrice | priceFormat }}</span>
          </button>
        </div>
        <div class="card" v-if="contact_info && contact_info.shipping_address">
          <div class="card-header d-flex">
            <h5 class="mb-0">{{ $t("Shipping Address") }}</h5>
            <!-- <h5 class="mb-0">{{ item.address_line1 }}, {{ item.city }}</h5> -->
          </div>
          <div class="card-body">
            <p>{{ contact_info.shipping_address.address_line1 }}</p>
            <p class="card-text">
              {{ contact_info.shipping_address.state }},
              {{ contact_info.shipping_address.country }},
              {{ contact_info.shipping_address.pincode }}
            </p>
            <p>{{ contact_info.first_name }} {{ contact_info.last_name }}</p>
            <p>{{ contact_info.email_id }}</p>
            <p>{{ contact_info.phone }}</p>
          </div>
        </div>
        <div class="card" v-if="contact_info && isSame">
          <div class="card-header d-flex">
            <h5 class="mb-0">{{ $t("Billing address") }}</h5>
          </div>
          <div class="card-body">
            <p>{{ contact_info.billing_address.address_line1 }}</p>
            <p class="card-text">
              {{ contact_info.billing_address.state }},
              {{ contact_info.billing_address.country }},
              {{ contact_info.billing_address.pincode }}
            </p>
            <p>{{ contact_info.first_name }} {{ contact_info.last_name }}</p>
            <p>{{ contact_info.email_id }}</p>
            <p>{{ contact_info.phone }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="box-content" v-else>
      <table
        class="table-cart"
        data-pagination="no"
        data-per-page="5"
        data-page="1"
        data-id
        data-token
      >
        <thead class="d-none">
          <tr>
            <th class="product-thumbnail"></th>

            <th class="product-name">
              <span class="nobr">{{ $t("Product") }}</span>
            </th>

            <th class="product-price">
              <span class="nobr">{{ $t("Price") }}</span>
            </th>

            <th class="product-stock-status">
              <span class="nobr">{{ $t("Stock status") }}</span>
            </th>

            <th class="product-add-to-cart">
              <span class="nobr">{{ $t("Actions") }}</span>
            </th>
          </tr>
        </thead>

        <tbody class="cart-items-wrapper">
          <tr class="border-0 py-0">
            <td colspan="6" class="px-3 py-2 text-center">
              <i class="icon-bag-2 cart-empty"></i>
            </td>
          </tr>
          <tr class="border-0 py-0">
            <td colspan="6" class="px-3 py-2 text-center cart-empty">
              {{ $t("No products added to the cart") }}
            </td>
          </tr>
          <tr class="border-0 py-0">
            <td colspan="6" class="px-3 text-center">
              <nuxt-link to="/shop" class="btn btn-go-shop">{{
                $t("GO SHOP")
              }}</nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mb-6"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Api } from "~/api";
import { apiSearch, paymentUrl } from "~/api/cloud.axios";
import PvQuantityInput from "~/components/features/PvQuantityInput";

export default {
  name: "Checkout",
  components: {
    PvQuantityInput,
  },
  data: function () {
    return {
      isLoading: false,
      cartItems: [],
      isSame: true,
      quotation_name: null,
      contact_info: null,
    };
  },
  computed: {
    ...mapGetters("cart", ["cartList", "totalPrice"]),
  },
  mounted() {
    this.contact_info = this.$route.params.contact_info;
    this.quotation_name = this.$route.params.quotation_name;
    this.isSame = this.$route.params.isSame;
  },
  created: function () {
    this.cartItems = [...this.cartList];
  },
  methods: {
    handlePayment() {
      this.isLoading = true;
      Api.post(`${apiSearch}${paymentUrl}`, {
        quotation_name: this.quotation_name,
      })
        .then((paymentRes) => {
          window.location.replace(paymentRes.data.message.paypal_url);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },

  watch: {
    cartList: function () {
      this.cartItems = [...this.cartList];
    },
  },
};
</script>