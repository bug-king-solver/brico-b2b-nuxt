<template>
  <div class="container">
    <ul class="checkout-progress-bar d-flex justify-content-center flex-wrap">
      <li class="active">
        <a href="javascript:;">{{ $t("Shopping Cart") }}</a>
      </li>
      <li>
        <nuxt-link to="/pages/pay">{{ $t("Checkout") }}</nuxt-link>
      </li>
      <li class="disabled">
        <a href="javascript:;">{{ $t("Order Complete") }}</a>
      </li>
    </ul>

    <div class="row" v-if="cartList.length > 0" key="noEmpty">
      <div class="col-lg-8">
        <div class="cart-table-container">
          <table class="table table-cart">
            <thead>
              <tr>
                <th class="thumbnail-col"></th>
                <th class="product-col">{{ $t("Product") }}</th>
                <th class="product-col">{{ $t("Product Code") }}</th>
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

                    <a
                      href="javascript:;"
                      class="btn-remove icon-cancel"
                      title="Remove Product"
                      @click="removeCart(product.name)"
                    ></a>
                  </figure>
                </td>

                <td class="product-col">
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
                  <pv-quantity-input
                    :qty="product.qty"
                    :product="product"
                    @changeQty="changeQty"
                  ></pv-quantity-input>
                </td>

                <td class="text-right">
                  <span class="subtotal-price"
                    >€{{ (product.price * product.qty) | priceFormat }}</span
                  >
                </td>
              </tr>
            </tbody>

            <tfoot>
              <tr>
                <td colspan="5" class="clearfix">
                  <div class="float-left">
                    <div class="cart-discount">
                      <form action="#">
                        <div class="input-group">
                          <input
                            type="text"
                            class="form-control form-control-sm"
                            placeholder="Coupon Code"
                            required
                          />
                          <div class="input-group-append">
                            <button
                              class="btn btn-sm btn-black text-white"
                              type="submit"
                            >
                              {{ $t("Apply Coupon") }}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div class="float-right">
                    <button
                      type="submit"
                      class="btn btn-shop btn-update-cart btn-primary"
                      @click="updateCart({ cartItems: cartItems })"
                    >
                      {{ $t("Update Cart") }}
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="cart-summary">
          <h3>{{ $t("CART TOTALS") }}</h3>

          <table class="table table-totals">
            <tbody>
              <tr>
                <td>{{ $t("Subtotal") }}</td>
                <td>€{{ totalPrice | priceFormat }}</td>
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
            <nuxt-link to="/pages/pay" class="btn btn-block btn-dark">
              {{ $t("Proceed to Checkout") }}
              <i class="fa fa-arrow-right"></i>
            </nuxt-link>
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
import { mapActions, mapGetters } from "vuex";
import { baseUrl } from "~/api/cms.axios";
import ContactInfo from "~/components/common/partials/ContactInfo.vue";
import PvQuantityInput from "~/components/features/PvQuantityInput";

export default {
  components: {
    PvQuantityInput,
    ContactInfo,
  },
  data: function () {
    return {
      baseUrl: baseUrl,
      cartItems: [],
    };
  },
  computed: {
    ...mapGetters("cart", ["cartList", "totalPrice"]),
  },
  created: function () {
    this.cartItems = [...this.cartList];
  },
  watch: {
    cartList: function () {
      this.cartItems = [...this.cartList];
    },
  },
  methods: {
    ...mapActions("cart", ["updateCart", "removeFromCart"]),
    changeQty: function (value, product) {
      this.cartItems = this.cartItems.reduce((acc, cur) => {
        if (cur.name === product.name) {
          return [
            ...acc,
            {
              ...cur,
              qty: value,
            },
          ];
        } else {
          return [...acc, cur];
        }
      }, []);

      this.updateCart({ cartItems: this.cartItems });
    },
    removeCart: function (name) {
      this.removeFromCart({ name: name });
      this.cartItems = this.cartItems.reduce((acc, cur) => {
        if (cur.name !== name) {
          return [...acc, cur];
        } else {
          return acc;
        }
      }, []);
    },
  },
};
</script>