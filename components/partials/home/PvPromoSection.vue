<template>
  <section
    class="promo-section bg-dark"
    data-parallax="{'speed': 1.8, 'enableOnMobile': true}"
    :src:background-image="promoDeal.img.url"
    v-parallax
    v-if="promoDeal"
  >
    <div class="promo-banner banner container text-uppercase">
      <div class="banner-content row align-items-center text-center">
        <div
          class="col-md-4 ml-xl-auto text-md-right appear-animate"
          v-animate
          data-animation-name="fadeInRightShorter"
          data-animation-delay="600"
        >
          <h2 class="mb-md-0 text-white">
            {{ promoDeal.testo_desta_1 }}
            <br />{{ promoDeal.testo_desta_2 }}
          </h2>
        </div>
        <div
          class="col-md-4 col-xl-3 pb-4 pb-md-0 appear-animate"
          v-animate
          data-animation-name="fadeIn"
          data-animation-delay="300"
        >
          <nuxt-link
            :to="promoDeal.button_top_deal.link"
            class="btn btn-dark btn-black ls-10"
            >{{ promoDeal.button_top_deal.label }}</nuxt-link
          >
        </div>
        <div
          class="col-md-4 mr-xl-auto text-md-left appear-animate"
          v-animate
          data-animation-name="fadeInLeftShorter"
          data-animation-delay="600"
        >
          <h4
            class="mb-1 mt-1 font1 coupon-sale-text p-0 d-block ls-n-10 text-transform-none"
          >
            <b> {{ promoDeal.testo_sinistra_1 }} </b>
          </h4>
          <h5 class="mb-1 coupon-sale-text text-white ls-10 p-0">
            <i class="ls-0">{{ promoDeal.testo_sinistra_2 }}</i>
            <b class="text-white bg-secondary ls-n-10">$100</b> OFF
          </h5>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    promoDeal: Object,
  },
};
</script>