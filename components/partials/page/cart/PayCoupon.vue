<template>
  <div class="checkout-discount">
    <h4>
      {{ $t("Have a coupon?") }}
      <button
        data-toggle="collapse"
        data-target="#collapseTwo"
        aria-expanded="true"
        aria-controls="collapseOne"
        class="btn btn-link btn-toggle"
        @click="codeOpened = !codeOpened"
      >
        {{ $t("ENTER YOUR CODE") }}
      </button>
    </h4>

    <vue-slide-toggle :open="codeOpened">
      <div class="feature-box">
        <div class="feature-box-content">
          <p>{{ $t("If you have a coupon code, please apply it below.") }}</p>

          <form action="#">
            <div class="input-group">
              <input
                type="text"
                class="form-control form-control-sm w-auto"
                placeholder="Coupon code"
                required
              />
              <div class="input-group-append">
                <button class="btn btn-sm mt-0" type="submit">
                  {{ $t("Apply Coupon") }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </vue-slide-toggle>
  </div>
</template>

<script>
import { VueSlideToggle } from "vue-slide-toggle";

export default {
  components: {
    VueSlideToggle,
  },
  data: () => {
    return {
      codeOpened: false,
    };
  },
};
</script>