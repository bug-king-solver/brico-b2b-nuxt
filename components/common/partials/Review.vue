<template>
  <div>
    <div class="product-reviews-content">
      <template v-if="totalReviews == 0">
        <h3 class="reviews-title">Reviews</h3>

        <p>There are no reviews yet.</p>
      </template>
      <template v-else>
        <h3 class="reviews-title" v-if="totalReviews === 1" key="singleReview">
          {{ totalReviews }} review for {{ product.name }}
        </h3>
        <h3 class="reviews-title" v-else>
          {{ totalReviews }} reviews for {{ product.name }}
        </h3>

        <div class="comment-list">
          <div
            class="comments"
            v-for="(item, index) in reviews"
            :key="'reviews-' + index"
          >
            <figure class="img-thumbnail">
              <nuxt-img
                :src="'./images/blog/author.jpg'"
                alt="author"
                width="80"
                height="80"
              />
            </figure>

            <div class="comment-block mt-2">
              <div class="comment-header">
                <div class="comment-arrow"></div>

                <div class="ratings-container float-sm-right">
                  <div class="product-ratings">
                    <span
                      class="ratings"
                      :style="{ width: item.rating * 20 + '%' }"
                    ></span>

                    <span class="tooltiptext tooltip-top">{{
                      item.rating | priceFormat
                    }}</span>
                  </div>
                </div>

                <span class="comment-by">
                  <strong>{{ item.title }}</strong>
                </span>
              </div>

              <div class="comment-content">
                <p>{{ item.comment }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div class="divider"></div>

      <div class="add-product-review">
        <h3 class="review-title">
          Be the first to review “{{ product.name }}”
        </h3>

        <form @submit.prevent="onSubmit" class="comment-form m-0">
          <div class="rating-form">
            <label for="rating">
              Your rating
              <span class="required">*</span>
            </label>
            <span class="rating-stars">
              <a
                v-for="number in [1, 2, 3, 4, 5]"
                :key="'rating' + number"
                href="javascript:;"
                :class="{
                  [`star-${number}`]: true,
                  active: number == form.number,
                }"
                @click="setRating(number)"
              >
                {{ number }}
              </a>
            </span>

            <select name="rating" id="rating" style="display: none">
              <option value>Rate…</option>
              <option value="5">Perfect</option>
              <option value="4">Good</option>
              <option value="3">Average</option>
              <option value="2">Not that bad</option>
              <option value="1">Very poor</option>
            </select>
          </div>
          <div class="form-group">
            <label>
              Your review title
              <span class="required">*</span>
            </label>
            <input
              type="text"
              class="form-control form-control-sm"
              v-model="form.title"
              required
            />
          </div>

          <div class="form-group">
            <label>
              Your review comment
              <span class="required">*</span>
            </label>
            <textarea
              cols="5"
              rows="6"
              class="form-control form-control-sm"
              v-model="form.content"
              required
            ></textarea>
          </div>

          <div class="row" v-if="!auth">
            <div class="col-md-6 col-xl-12" v-if="!isLogin">
              <div class="form-group">
                <label>
                  {{ $t("First Name") }}
                  <span class="required">*</span>
                </label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  v-model="form.first_name"
                  required
                />
              </div>
            </div>

            <div class="col-md-6 col-xl-12" v-if="!isLogin">
              <div class="form-group">
                <label>
                  {{ $t("Last Name") }}
                  <span class="required">*</span>
                </label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  v-model="form.last_name"
                  required
                />
              </div>
            </div>

            <div class="col-md-6 col-xl-12">
              <div class="form-group">
                <label>
                  Email
                  <span class="required">*</span>
                </label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  v-model="form.email"
                  required
                />
              </div>
            </div>

            <div class="col-md-6 col-xl-12">
              <div class="form-group">
                <label>
                  {{ $t("Password") }}
                  <span class="required">*</span>
                </label>
                <input
                  type="password"
                  class="form-control form-control-sm"
                  v-model="form.password"
                  required
                />
              </div>
            </div>

            <div class="col-xl-12">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="save-name"
                />
                <label class="custom-control-label mb-0" for="save-name">
                  Save my name, email, and website in this browser for the next
                  time I comment.
                  <span>
                    <a
                      href="javascript:;"
                      @click="toogleLogin"
                      class="forget-password text-primary"
                    >
                      <span v-if="isLogin">or Register?</span>
                      <span v-else>or Login?</span>
                    </a>
                  </span>
                </label>
              </div>
            </div>
          </div>

          <input type="submit" class="btn btn-primary" value="Submit" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Api } from "~/api";
import {
  addReviewUrl,
  apiSearch,
  loginUrl,
  registerUrl,
} from "~/api/cloud.axios";

export default {
  props: {
    product: Object,
  },
  computed: {
    ...mapGetters("auth", ["auth"]),
    ...mapGetters("review", ["reviews", "totalReviews"]),
  },
  data: () => {
    return {
      isLogin: false,
      form: {
        first_name: null,
        last_name: null,
        email: null,
        title: null,
        password: null,
        number: 0,
        content: null,
      },
    };
  },
  mounted() {
    this.getReviews({ sku: this.product.sku });
  },
  methods: {
    ...mapActions("auth", ["setAuth"]),
    ...mapActions("review", ["getReviews"]),
    clearForm() {
      this.form = {
        first_name: null,
        last_name: null,
        email: null,
        title: null,
        password: null,
        number: 0,
        content: null,
      };
    },
    setRating: function (number) {
      this.form.number = number;
    },
    onSubmit() {
      if (!this.auth) {
        if (this.isLogin)
          this.handleLogin().then(() => {
            this.addReview();
          });
        else
          this.handleRegister().then(() => {
            this.addReview();
          });
      } else {
        this.addReview();
      }
    },

    handleRegister() {
      return new Promise((resolve) => {
        Api.post(`${apiSearch}${registerUrl}`, this.form).then(({ data }) => {
          this.setAuth({
            ...data.message,
            email: this.form.email,
            first_name: this.form.first_name,
            last_name: this.form.last_name,
          });
          resolve();
        });
      });
    },
    handleLogin() {
      return new Promise((resolve) => {
        Api.post(`${apiSearch}${loginUrl}`, {
          usr: this.form.email,
          pwd: this.form.password,
        }).then(({ data }) => {
          this.setAuth({
            ...data.message,
            email: this.form.email,
            first_name: this.form.first_name,
            last_name: this.form.last_name,
          });
          resolve();
        });
      });
    },
    addReview() {
      Api.post(`${apiSearch}${addReviewUrl}`, {
        item_code: this.product.sku,
        title: this.form.title,
        rating: this.form.number,
        comment: this.form.content,
      }).then(() => {
        this.getReviews({ sku: this.product.sku });
        this.clearForm();
      });
    },

    toogleLogin() {
      this.isLogin = !this.isLogin;
    },
  },
};
</script>