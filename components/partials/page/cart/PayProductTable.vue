<template>
  <table class="table table-mini-cart">
    <thead>
      <tr>
        <th colspan="2">Product</th>
      </tr>
    </thead>
    <tbody v-if="cartList.length > 0">
      <tr v-for="(product, index) in cartList" :key="'cart-product-' + index">
        <td class="product-col">
          <img :src="product.small_pictures[0].url" alt="" srcset="" />
        </td>
        <td class="product-col">
          <h2 class="product-title">
            {{ product.name }} ×
            <span class="product-qty">{{ product.qty }}</span>
          </h2>
        </td>

        <td class="price-col">
          <span>€{{ product.price | priceFormat }}</span>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <p class="cart-empty-text ml-3">No products in the cart.</p>
    </tbody>
    <tfoot>
      <tr class="cart-subtotal">
        <td>
          <h4>{{ $t("Subtotal") }}</h4>
        </td>

        <td class="price-col">
          <span>€{{ totalPrice | priceFormat }}</span>
        </td>
      </tr>
      <tr class="order-shipping">
        <td class="text-left" colspan="2">
          <h4 class="m-b-sm">Shipping</h4>

          <div class="form-group form-group-custom-control">
            <div class="custom-control custom-radio d-flex">
              <input
                type="radio"
                class="custom-control-input"
                name="radio"
                checked
              />
              <label class="custom-control-label">Local Pickup</label>
            </div>
          </div>

          <div class="form-group form-group-custom-control mb-0">
            <div class="custom-control custom-radio d-flex mb-0">
              <input type="radio" name="radio" class="custom-control-input" />
              <label class="custom-control-label">Flat Rate</label>
            </div>
          </div>
        </td>
      </tr>

      <tr class="order-total">
        <td>
          <h4>{{ $t("Total") }}</h4>
        </td>
        <td>
          <b class="total-price">
            <span>€{{ totalPrice | priceFormat }}</span>
          </b>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("cart", ["cartList", "totalPrice"]),
  },
};
</script>