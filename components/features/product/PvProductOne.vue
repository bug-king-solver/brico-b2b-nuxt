<template>
  <div class="product-default">
    <figure>
      <nuxt-link :to="`/${product.slug}`">
        <nuxt-img
          v-for="(item, index) in product.gallery_pictures.slice(0, 2)"
          :key="`related-large-${index}`"
          :src="`${item.url}`"
          :alt="product.name"
          :width="item.width"
          :height="item.height"
          :class="{ 'last-image': index === 1 }"
        />
      </nuxt-link>

      <div class="label-group">
        <div class="product-label label-hot" v-if="product.is_hot">HOT</div>
        <div class="product-label label-sale" v-if="product.stock <= 0">
          {{ $t("Out Stock") }}
        </div>
        <div
          class="product-label label-sale"
          v-if="product.is_sale && !product.price"
        >
          Sale
        </div>
        <div
          class="product-label label-sale"
          v-if="product.is_sale && product.price"
        >
          {{ discount }}%
        </div>
      </div>
    </figure>

    <div class="product-details">
      <!-- <div class="category-list">
        <span
          v-for="(cat, index) in product.product_categories"
          :key="`product-category-${index}`"
        >
          <nuxt-link :to="{ path: '/shop', query: { category: cat.slug } }">{{
            cat.name
          }}</nuxt-link>
          <template v-if="index < product.product_categories.length - 1"
            >,</template
          >
        </span>
      </div> -->

      <h3 class="product-title">
        <nuxt-link :to="`/${product.slug}`">{{ product.name }}</nuxt-link>
      </h3>

      <div class="ratings-container">
        <div class="product-ratings">
          <span
            class="ratings"
            :style="{ width: product.ratings * 20 + '%' }"
          ></span>
          <span class="tooltiptext tooltip-top">{{
            product.ratings | priceFormat
          }}</span>
        </div>
      </div>

      <div class="price-box" v-if="product.price" key="singlePrice">
        <template v-if="!product.is_sale">
          <span class="product-price">€{{ product.price | priceFormat }}</span>
        </template>

        <template v-else>
          <span class="product-price"
            >€{{ product.sale_price | priceFormat }}</span
          >
          <span class="old-price">€{{ product.price | priceFormat }}</span>
        </template>
      </div>

      <div class="price-box" v-else>
        <template v-if="minPrice !== maxPrice">
          <span class="product-price"
            >€{{ minPrice | priceFormat }} &ndash; €{{
              maxPrice | priceFormat
            }}</span
          >
        </template>

        <template v-else>
          <span class="product-price">€{{ minPrice | priceFormat }}</span>
        </template>
      </div>

      <div class="product-action" v-if="isActions">
        <a
          href="javascript:;"
          class="btn-icon-wish added-wishlist"
          :title="$t('Go to Wishlist')"
          @click="removeWishlist($event)"
          v-if="isWishlisted"
        >
          <i class="icon-wishlist-2"></i>
        </a>

        <a
          href="javascript:;"
          class="btn-icon-wish"
          :title="
            auth ? $t('Add to Wishlist') : $t('To add wishlist, please login')
          "
          @click="addWishlist($event)"
          v-if="!isWishlisted"
        >
          <i class="icon-wishlist-2"></i>
        </a>

        <nuxt-link
          :to="product.slug"
          class="btn-icon btn-add-cart"
          v-if="product.variants.length > 0"
          key="variantProduct"
        >
          <i class="fa fa-arrow-right"></i>
          <span>{{ $t("SELECT OPTION") }}</span>
        </nuxt-link>

        <button
          class="btn-icon btn-add-cart product-type-simple"
          :class="{ disabled: product.stock <= 0 }"
          v-else
          :disable="product.stock <= 0"
          @click="addCart"
        >
          <i class="icon-shopping-cart"></i>
          <span>{{ $t("ADD TO CART") }}</span>
        </button>

        <a
          href="javascript:;"
          class="btn-quickview"
          title="Quick View"
          @click="openQuickview"
        >
          <i class="fas fa-external-link-alt"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { baseUrl } from "~/api/cms.axios";
import wishlistMixin from "~/mixins/wishlistMixin";

export default {
  mixins: [wishlistMixin],
  props: {
    product: Object,
    adClass: String,
    isActions: {
      type: Boolean,
      default: true,
    },
  },
  data: function () {
    return {
      baseUrl: baseUrl,
      minPrice: 0,
      maxPrice: 0,
      discount: 0,
    };
  },
  mounted: function () {
    if (this.product.is_sale && this.product.price) {
      this.discount =
        ((this.product.price - this.product.sale_price) / this.product.price) *
        100;
      this.discount = parseInt(this.discount);
    }

    if (!this.product.price) {
      this.minPrice = this.product.variants[0].price;
      this.product.variants.forEach((item) => {
        let itemPrice = item.is_sale ? item.sale_price : item.price;
        if (this.minPrice > itemPrice) this.minPrice = itemPrice;
        if (this.maxPrice < itemPrice) this.maxPrice = itemPrice;
      });
    }
  },
  methods: {
    ...mapActions("cart", ["addToCart"]),
    openQuickview: function () {
      this.$modal.show(
        () => import("~/components/features/product/PvQuickview"),
        { slug: this.product.slug },
        {
          width: "931",
          height: "auto",
          adaptive: true,
          class: "quickview-modal",
        }
      );
    },
    addCart: function () {
      if (this.product.stock > 0) {
        let saledProduct = { ...this.product };
        if (this.product.is_sale) {
          saledProduct.price = this.product.sale_price;
        }

        this.addToCart({ product: saledProduct });
      }
    },
  },
};
</script>