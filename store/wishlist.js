import { Api } from "~/api";
import {
  addWishList,
  apiSearch,
  getWishlistUrl,
  removeWishList,
} from "~/api/cloud.axios";

export const STORE_WISHLIST = "STORE_WISHLIST";

export const state = () => ({
  data: [],
});

export const getters = {
  wishList: (state) => {
    return state.data ?? [];
  },
};

export const actions = {
  getWishList({ commit }) {
    Api.post(`${apiSearch}${getWishlistUrl}`).then(({ data }) => {
      commit(STORE_WISHLIST, data.message);
    });
  },
  addToWishlist: function ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Api.post(`${apiSearch}${addWishList}`, {
        item_code: payload.sku,
      })
        .then(() => {
          Api.post(`${apiSearch}${getWishlistUrl}`).then(({ data }) => {
            commit(STORE_WISHLIST, data.message);
            resolve();
          });
        })
        .catch(() => {
          reject();
        });
    });
  },
  removeFromWishlist: function ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Api.post(`${apiSearch}${removeWishList}`, {
        item_code: payload.sku,
      })
        .then(() => {
          Api.post(`${apiSearch}${getWishlistUrl}`).then(({ data }) => {
            commit(STORE_WISHLIST, data.message);
            resolve();
          });
        })
        .catch(() => {
          reject();
        });
    });
  },
};

export const mutations = {
  [STORE_WISHLIST](state, payload) {
    state.data = payload;
  },
};
