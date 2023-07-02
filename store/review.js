import { Api } from "~/api";
import { apiSearch, getReviewsUrl } from "~/api/cloud.axios";

export const STORE_REVIEW = "STORE_REVIEW";

export const state = () => ({
  reviews: [],
  totalReviews: 0,
});

export const getters = {
  reviews: (state) => {
    return state.reviews ?? [];
  },
  totalReviews: (state) => {
    return state.totalReviews ?? 0;
  },
};

export const actions = {
  getReviews({ commit }, payload) {
    const { sku } = payload;
    Api.post(`${apiSearch}${getReviewsUrl}?item_code=${sku}`).then(
      ({ data }) => {
        commit(STORE_REVIEW, data);
      }
    );
  },
};

export const mutations = {
  [STORE_REVIEW](state, payload) {
    const { message } = payload;
    state.reviews = message.reviews;
    state.totalReviews = message.total_reviews ?? 0;
  },
};
