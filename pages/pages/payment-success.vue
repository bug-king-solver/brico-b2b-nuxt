<template>
  <main class="main about">
    <div
      class="page-header page-header-bg text-left"
      style="background: 50% / cover #d4e1ea"
      :style="{
        backgroundImage: `url(${require('~/static/images/thankyou_bg.png')})`,
      }"
    ></div>

    <nav aria-label="breadcrumb" class="breadcrumb-nav">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              <i class="icon-home"></i>
            </nuxt-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ $t("Checkout") }}
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ $t("Payment Success") }}
          </li>
        </ol>
      </div>
    </nav>

    <div class="about-section">
      <div class="container">
        <h2 class="text-center">{{ $t("Thank you!") }}</h2>
        <p class="text-dark">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>

        <div class="text-center">
          <button class="btn btn-primary text-yellow btn-sm">
            {{ $t("Back to shipping") }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";
import PvCarousel from "~/components/features/PvCarousel";
import PvCountTo from "~/components/features/PvCountTo";
import { baseSlider4 } from "~/utils/data/carousel";

export default {
  components: {
    PvCarousel,
    PvCountTo,
  },
  data: function () {
    return {
      baseSlider4: baseSlider4,
    };
  },
  mounted() {
    this.removeAllCart();
    this.removeOrderAddress();
  },
  methods: {
    ...mapActions("cart", ["removeAllCart"]),
    ...mapActions("order", ["removeOrderAddress"]),
  },
};
</script>