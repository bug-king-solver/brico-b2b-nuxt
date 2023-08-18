<template>
  <div class="product-attribute">
    <div>
      <div class="d-flex">
        <div class="attr-title">Modello:</div>
        <div class="attr-value fw-700">710 W</div>
      </div>
      <div class="d-flex">
        <div class="attr-title">Peso:</div>
        <div class="attr-value fw-700">2.396 KG</div>
      </div>
      <div class="d-flex">
        <div class="attr-title">Volume:</div>
        <div class="attr-value fw-700">6913.6 CM3</div>
      </div>

      <hr class="mt-1 mb-2" />
      <div class="d-flex">
        <div class="attr-title">Codice Prodotto:</div>
        <div class="attr-value fw-600">107744</div>
      </div>
      <div class="d-flex">
        <div class="attr-title">Codice Figura:</div>
        <div class="attr-value fw-600">AG0595</div>
      </div>
    </div>
    <div>
      <nuxt-img src="/images/brand1.png" class="brand-image" alt="" srcset="" />
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   brandImage: String,
  //   extraInfo: Object,
  // },
  // computed: {
  //   peso: function() {
  //     if (this.extraInfo.product.peso) {
  //       return (
  //         this.extraInfo.product.peso.value +
  //         ' ' +
  //         this.extraInfo.product.peso.um
  //       );
  //     }
  //     return null;
  //   },
  //   volume: function() {
  //     if (this.extraInfo.product.volume) {
  //       return (
  //         this.extraInfo.product.volume.value +
  //         ' ' +
  //         this.extraInfo.product.volume.um
  //       );
  //     }
  //     return null;
  //   },
  // },
};
</script>
