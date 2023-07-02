import { getStoreItem, setStoreItem } from "~/services/localstorage.service";
// Cart
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const REMOVE_ALL_CART = "REMOVE_ALL_CART";
export const UPDATE_CART = "UPDATE_CART";

export function state() {
  return {
    data: getStoreItem("cart-list") ?? [],
  };
}

export const getters = {
  cartList: (state) => {
    return state.data;
  },
  totalPrice: (state) => {
    return state.data.reduce((acc, cur) => {
      return acc + cur.price * cur.qty;
    }, 0);
  },
  totalCount: (state) => {
    return state.data.reduce((acc, cur) => {
      return acc + parseInt(cur.qty, 10);
    }, 0);
  },
};

export const actions = {
  addToCart: function ({ commit }, payload) {
    commit(ADD_TO_CART, payload);

    this._vm.$notify({
      group: "addCartSuccess",
      text: `has been added to your cart!`,
      data: payload.product,
    });
  },
  removeFromCart: function ({ commit }, payload) {
    commit(REMOVE_FROM_CART, payload);
  },
  removeAllCart: function ({ commit }) {
    commit(REMOVE_ALL_CART);
  },
  updateCart: function ({ commit }, payload) {
    commit(UPDATE_CART, payload);
  },
};

export const mutations = {
  [ADD_TO_CART](state, payload) {
    let isAdded =
      state.data.findIndex((item) => item.name === payload.product.name) > -1;
    let qty = payload.product.qty ? payload.product.qty : 1;
    payload.product.qty = qty;

    if (isAdded) {
      state.data = state.data.reduce((acc, cur) => {
        if (cur.name === payload.product.name) {
          acc.push({
            ...cur,
            qty: parseInt(cur.qty) + parseInt(qty),
          });
        } else {
          acc.push(cur);
        }

        return acc;
      }, []);
    } else {
      state.data.push(payload.product);
    }
    setStoreItem("cart-list", state.data);
  },
  [REMOVE_FROM_CART](state, payload) {
    let index = state.data.findIndex((item) => item.name === payload.name);
    state.data.splice(index, 1);
    setStoreItem("cart-list", state.data);
  },
  [REMOVE_ALL_CART](state) {
    state.data = [];
    setStoreItem("cart-list", []);
  },
  [UPDATE_CART](state, payload) {
    state.data = payload.cartItems;
    setStoreItem("cart-list", state.data);
  },
};
