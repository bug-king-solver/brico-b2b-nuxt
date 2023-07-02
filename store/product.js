import Vue from "vue";
// import { Api } from "~/api";
import { Api } from "~/api";
import { apiSearch, currentDemo, searchUrl } from "~/api/cloud.axios";
import { SHOP_SHOW_TYPES } from "~/utils/data/constants";

export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_PRODUCT_LIST = "ADD_PRODUCT_LIST";
export const SET_LOADMORE_PRODUCT = "SET_LOADMORE_PRODUCT";
export const SET_NEW_SEARCH = "SET_NEW_SEARCH";
export const SET_SHOW_TYPE = "SET_SHOW_TYPE";
export const SET_ACTIVE_INDEX = "SET_ACTIVE_INDEX";
export const REMOVE_KEY_PRODUCT = "REMOVE_KEY_PRODUCT";
export const SET_FILTER_SEARCH = "SET_FILTER_SEARCH";

export function state() {
  return {
    tab_lists: [],
    active_index: null,
    filterSearch: "",
  };
}

export const getters = {
  products: (state) => {
    return state.tab_lists[state.active_index]?.data?.products;
  },
  current_page: (state) => {
    return state.tab_lists[state.active_index]?.data?.current_page;
  },
  totalCount: (state) => {
    return state.tab_lists[state.active_index]?.data?.totalCount;
  },
  featureList: (state) => {
    if (state.filterSearch === "") {
      return state.tab_lists[state.active_index]?.data?.features;
    }
    const result = state.tab_lists[state.active_index]?.data?.features.map(
      (item) => {
        const facet_results = item.facet_results.filter((facet) =>
          facet.value.toLowerCase().includes(state.filterSearch.toLowerCase())
        );
        if (facet_results.length > 0) {
          return { ...item, facet_results };
        }
        return false;
      }
    );
    return result;
  },
  categoryList: (state) => {
    if (state.tab_lists[state.active_index]?.data?.category) {
      return state.tab_lists[state.active_index].data.category
        .map((item) => {
          if (state.filterSearch) {
            if (item.label.includes(state.filterSearch))
              return {
                id: item.url,
                name: item.label,
                slug: item.url,
                counts: item.count,
                disabled: true,
              };
            return false;
          } else {
            return {
              id: item.url,
              name: item.label,
              slug: item.url,
              counts: item.count,
              disabled: true,
            };
          }
        })
        .filter((item) => item);
    }
    return [];
  },
  categoryDetail: (state) => {
    if (state.tab_lists[state.active_index]?.data?.menu_category_detail) {
      return state.tab_lists[state.active_index].data.menu_category_detail;
    }
    return null;
  },
  max_price_all: (state) => {
    return state.tab_lists[state.active_index]?.data?.max_price_all;
  },
  min_price_all: (state) => {
    return state.tab_lists[state.active_index]?.data?.min_price_all;
  },
  pages: (state) => {
    return state.tab_lists[state.active_index]?.data?.pages;
  },
  type: (state) => {
    return state.tab_lists[state.active_index]?.type;
  },
  is_new_search: (state) => {
    return state.tab_lists[state.active_index]?.is_new_search;
  },
  route: (state) => {
    return state.tab_lists[state.active_index]?.route;
  },
  tab_lists: (state) => {
    return state.tab_lists;
  },
  categories: (state) => {
    return state.tab_lists.map((item) => item.key);
  },
  active_index: (state) => {
    return state.active_index;
  },
};

export const actions = {
  getProductList: function ({ commit, state }, payload) {
    const { route, params } = payload;

    let itemIndex = state.tab_lists.findIndex((item) => {
      if (item.route && item.route == route) return true;
      return false;
    });
    if (itemIndex > -1) {
      commit(SET_ACTIVE_INDEX, itemIndex);
    } else {
      return new Promise((resolve, reject) => {
        Api.get(`${apiSearch}${searchUrl}shop`, {
          params: {
            ...params,
            demo: currentDemo,
          },
        })
          .then(({ data }) => {
            commit(ADD_PRODUCT_LIST, { params: payload, data: data.message });
            resolve();
          })
          .catch((error) => reject(error));
      });
    }
  },
  getMoreProductList: function ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      Api.get(`${apiSearch}${searchUrl}shop`, {
        params: {
          ...payload,
          demo: currentDemo,
        },
      })
        .then(({ data }) => {
          commit(SET_LOADMORE_PRODUCT, { params: payload, data: data.message });
          resolve();
        })
        .catch((error) => reject(error));
    });
  },
  setNewSearch: function ({ commit }) {
    commit(SET_NEW_SEARCH);
  },
  setShowType: function ({ commit }, payload) {
    commit(SET_SHOW_TYPE, payload);
  },
  setActiveKey: function ({ commit }, payload) {
    commit(SET_ACTIVE_INDEX, payload);
  },
  removeKeyProduct: function ({ commit }, payload) {
    commit(REMOVE_KEY_PRODUCT, payload);
  },
  setFilterSearch: function ({ commit }, payload) {
    commit(SET_FILTER_SEARCH, payload);
  },
};

export const mutations = {
  [ADD_PRODUCT_LIST](state, { params, data }) {
    Vue.set(state.tab_lists, state.active_index, {
      ...state.tab_lists[state.active_index],
      key: params.params?.search_term ?? "All",
      data,
      route: params.route,
      type: SHOP_SHOW_TYPES.GRID,
      is_new_search: false,
    });
  },
  [SET_LOADMORE_PRODUCT](state, { params, data }) {
    let productArr = state.tab_lists[state.active_index].data.products;
    productArr = [...productArr, ...data.products];
    let productData = data;
    productData.products = productArr;

    Vue.set(state.tab_lists, state.active_index, {
      ...state.tab_lists[state.active_index],
      key: params?.search_term ?? "All",
      data: productData,
      route: params.route,
      is_new_search: false,
    });
  },
  [SET_NEW_SEARCH](state) {
    state.tab_lists = [
      ...state.tab_lists,
      {
        key: "New",
        data: null,
        type: SHOP_SHOW_TYPES.GRID,
        route: "/shop?",
        is_new_search: true,
      },
    ];
    state.active_index = state.tab_lists.length - 1;
  },
  [SET_SHOW_TYPE](state, payload) {
    Vue.set(state.tab_lists, state.active_index, {
      ...state.tab_lists[state.active_index],
      type: payload,
    });
  },
  [SET_ACTIVE_INDEX](state, payload) {
    state.active_index = payload;
  },
  [SET_FILTER_SEARCH](state, payload) {
    state.filterSearch = payload;
  },
  [REMOVE_KEY_PRODUCT](state, payload) {
    state.tab_lists = state.tab_lists.filter(
      (item, index) => index !== payload
    );
  },
};
