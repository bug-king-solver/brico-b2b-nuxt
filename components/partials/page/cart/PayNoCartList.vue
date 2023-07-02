<template>
  <div class="box-content">
    <table
      class="table-cart"
      data-pagination="no"
      data-per-page="5"
      data-page="1"
      data-id
      data-token
    >
      <tbody class="cart-items-wrapper">
        <tr class="border-0 py-0">
          <td colspan="6" class="px-3 py-2 text-center">
            <p class="noproduct-msg mb-2">
              {{ $t("Checkout is not available while your cart is empty.") }}
            </p>
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
            <nuxt-link to="/shop" class="btn btn-go-shop">
              {{ $t("RETURN TO SHOP") }}
            </nuxt-link>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mb-6"></div>
  </div>
</template>

<script>
export default {};
</script>