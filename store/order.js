import { getStoreItem, setStoreItem } from "~/services/localstorage.service";

export const SET_ORDER_ADDRESS = "SET_ORDER_ADDRESS";
export const REMOVE_ORDER_ADDRESS = "REMOVE_ORDER_ADDRESS";

export function state() {
  return {
    address: getStoreItem("address") ?? null,
  };
}

export const getters = {
  storedAddress: (state) => {
    return state.address;
  },
};

export const actions = {
  setOrderAddress: function ({ commit }, payload) {
    commit(SET_ORDER_ADDRESS, payload);
  },
  removeOrderAddress: function ({ commit }, payload) {
    commit(REMOVE_ORDER_ADDRESS, payload);
  },
};

export const mutations = {
  [SET_ORDER_ADDRESS](state, payload) {
    state.address = payload;
    setStoreItem("address", state.address);
  },
  [REMOVE_ORDER_ADDRESS](state) {
    state.address = null;
    setStoreItem("address", null);
  },
};
