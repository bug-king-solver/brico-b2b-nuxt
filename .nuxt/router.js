import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _19be86f0 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _75480f33 = () => interopDefault(import('../pages/shop/index.vue' /* webpackChunkName: "pages/shop/index" */))
const _f7386efa = () => interopDefault(import('../pages/pages/about-us.vue' /* webpackChunkName: "pages/pages/about-us" */))
const _7385c098 = () => interopDefault(import('../pages/pages/account.vue' /* webpackChunkName: "pages/pages/account" */))
const _2464d242 = () => interopDefault(import('../pages/pages/address.vue' /* webpackChunkName: "pages/pages/address" */))
const _69039072 = () => interopDefault(import('../pages/pages/blog.vue' /* webpackChunkName: "pages/pages/blog" */))
const _195ed776 = () => interopDefault(import('../pages/pages/cart.vue' /* webpackChunkName: "pages/pages/cart" */))
const _15f3d4eb = () => interopDefault(import('../pages/pages/checkout.vue' /* webpackChunkName: "pages/pages/checkout" */))
const _05368560 = () => interopDefault(import('../pages/pages/contact-us.vue' /* webpackChunkName: "pages/pages/contact-us" */))
const _6683b970 = () => interopDefault(import('../pages/pages/forgot-password.vue' /* webpackChunkName: "pages/pages/forgot-password" */))
const _0635a094 = () => interopDefault(import('../pages/pages/login.vue' /* webpackChunkName: "pages/pages/login" */))
const _596aa24a = () => interopDefault(import('../pages/pages/orders.vue' /* webpackChunkName: "pages/pages/orders" */))
const _6f5b59da = () => interopDefault(import('../pages/pages/pay.vue' /* webpackChunkName: "pages/pages/pay" */))
const _97b4b66e = () => interopDefault(import('../pages/pages/payment-failed.vue' /* webpackChunkName: "pages/pages/payment-failed" */))
const _72a80327 = () => interopDefault(import('../pages/pages/payment-success.vue' /* webpackChunkName: "pages/pages/payment-success" */))
const _4a7ca214 = () => interopDefault(import('../pages/pages/profile.vue' /* webpackChunkName: "pages/pages/profile" */))
const _58fabfc8 = () => interopDefault(import('../pages/pages/register.vue' /* webpackChunkName: "pages/pages/register" */))
const _a5b4342c = () => interopDefault(import('../pages/pages/wishlist.vue' /* webpackChunkName: "pages/pages/wishlist" */))
const _0a427bce = () => interopDefault(import('../pages/shop/boxed-image.vue' /* webpackChunkName: "pages/shop/boxed-image" */))
const _08f087da = () => interopDefault(import('../pages/shop/boxed-slider.vue' /* webpackChunkName: "pages/shop/boxed-slider" */))
const _0b9e63c6 = () => interopDefault(import('../pages/shop/horizontal-filter-1.vue' /* webpackChunkName: "pages/shop/horizontal-filter-1" */))
const _0bac7b47 = () => interopDefault(import('../pages/shop/horizontal-filter-2.vue' /* webpackChunkName: "pages/shop/horizontal-filter-2" */))
const _58325dc7 = () => interopDefault(import('../pages/shop/infinite-scroll.vue' /* webpackChunkName: "pages/shop/infinite-scroll" */))
const _0ab88b66 = () => interopDefault(import('../pages/shop/list.vue' /* webpackChunkName: "pages/shop/list" */))
const _50f7b7e5 = () => interopDefault(import('../pages/shop/off-canvas.vue' /* webpackChunkName: "pages/shop/off-canvas" */))
const _8b1d64e8 = () => interopDefault(import('../pages/shop/right-sidebar.vue' /* webpackChunkName: "pages/shop/right-sidebar" */))
const _2abdacb0 = () => interopDefault(import('../pages/pages/single/_slug.vue' /* webpackChunkName: "pages/pages/single/_slug" */))
const _3aa8232a = () => interopDefault(import('../pages/product/center/_slug.vue' /* webpackChunkName: "pages/product/center/_slug" */))
const _70032e8e = () => interopDefault(import('../pages/product/extended/_slug.vue' /* webpackChunkName: "pages/product/extended/_slug" */))
const _a32629b0 = () => interopDefault(import('../pages/product/fullwidth/_slug.vue' /* webpackChunkName: "pages/product/fullwidth/_slug" */))
const _0845915b = () => interopDefault(import('../pages/product/grid/_slug.vue' /* webpackChunkName: "pages/product/grid/_slug" */))
const _bbe8d0aa = () => interopDefault(import('../pages/product/left-sidebar/_slug.vue' /* webpackChunkName: "pages/product/left-sidebar/_slug" */))
const _3aa70988 = () => interopDefault(import('../pages/product/right-sidebar/_slug.vue' /* webpackChunkName: "pages/product/right-sidebar/_slug" */))
const _6cc3a276 = () => interopDefault(import('../pages/product/sticky-both/_slug.vue' /* webpackChunkName: "pages/product/sticky-both/_slug" */))
const _2ecc2755 = () => interopDefault(import('../pages/product/sticky-cart/_slug.vue' /* webpackChunkName: "pages/product/sticky-cart/_slug" */))
const _51daf763 = () => interopDefault(import('../pages/product/sticky-info/_slug.vue' /* webpackChunkName: "pages/product/sticky-info/_slug" */))
const _201726a3 = () => interopDefault(import('../pages/product/transparent/_slug.vue' /* webpackChunkName: "pages/product/transparent/_slug" */))
const _38834102 = () => interopDefault(import('../pages/shop/grid/_type.vue' /* webpackChunkName: "pages/shop/grid/_type" */))
const _6923c94e = () => interopDefault(import('../pages/det/_type/_slug.vue' /* webpackChunkName: "pages/det/_type/_slug" */))
const _54e75b2a = () => interopDefault(import('../pages/product/_type/_slug.vue' /* webpackChunkName: "pages/product/_type/_slug" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: '',
  linkExactActiveClass: 'active',
  scrollBehavior,

  routes: [{
    path: "/en",
    component: _19be86f0,
    name: "index___en"
  }, {
    path: "/shop",
    component: _75480f33,
    name: "shop___it"
  }, {
    path: "/en/shop",
    component: _75480f33,
    name: "shop___en"
  }, {
    path: "/pages/about-us",
    component: _f7386efa,
    name: "pages-about-us___it"
  }, {
    path: "/pages/account",
    component: _7385c098,
    name: "pages-account___it"
  }, {
    path: "/pages/address",
    component: _2464d242,
    name: "pages-address___it"
  }, {
    path: "/pages/blog",
    component: _69039072,
    name: "pages-blog___it"
  }, {
    path: "/pages/cart",
    component: _195ed776,
    name: "pages-cart___it"
  }, {
    path: "/pages/checkout",
    component: _15f3d4eb,
    name: "pages-checkout___it"
  }, {
    path: "/pages/contact-us",
    component: _05368560,
    name: "pages-contact-us___it"
  }, {
    path: "/pages/forgot-password",
    component: _6683b970,
    name: "pages-forgot-password___it"
  }, {
    path: "/pages/login",
    component: _0635a094,
    name: "pages-login___it"
  }, {
    path: "/pages/orders",
    component: _596aa24a,
    name: "pages-orders___it"
  }, {
    path: "/pages/pay",
    component: _6f5b59da,
    name: "pages-pay___it"
  }, {
    path: "/pages/payment-failed",
    component: _97b4b66e,
    name: "pages-payment-failed___it"
  }, {
    path: "/pages/payment-success",
    component: _72a80327,
    name: "pages-payment-success___it"
  }, {
    path: "/pages/profile",
    component: _4a7ca214,
    name: "pages-profile___it"
  }, {
    path: "/pages/register",
    component: _58fabfc8,
    name: "pages-register___it"
  }, {
    path: "/pages/wishlist",
    component: _a5b4342c,
    name: "pages-wishlist___it"
  }, {
    path: "/shop/boxed-image",
    component: _0a427bce,
    name: "shop-boxed-image___it"
  }, {
    path: "/shop/boxed-slider",
    component: _08f087da,
    name: "shop-boxed-slider___it"
  }, {
    path: "/shop/horizontal-filter-1",
    component: _0b9e63c6,
    name: "shop-horizontal-filter-1___it"
  }, {
    path: "/shop/horizontal-filter-2",
    component: _0bac7b47,
    name: "shop-horizontal-filter-2___it"
  }, {
    path: "/shop/infinite-scroll",
    component: _58325dc7,
    name: "shop-infinite-scroll___it"
  }, {
    path: "/shop/list",
    component: _0ab88b66,
    name: "shop-list___it"
  }, {
    path: "/shop/off-canvas",
    component: _50f7b7e5,
    name: "shop-off-canvas___it"
  }, {
    path: "/shop/right-sidebar",
    component: _8b1d64e8,
    name: "shop-right-sidebar___it"
  }, {
    path: "/en/pages/about-us",
    component: _f7386efa,
    name: "pages-about-us___en"
  }, {
    path: "/en/pages/account",
    component: _7385c098,
    name: "pages-account___en"
  }, {
    path: "/en/pages/address",
    component: _2464d242,
    name: "pages-address___en"
  }, {
    path: "/en/pages/blog",
    component: _69039072,
    name: "pages-blog___en"
  }, {
    path: "/en/pages/cart",
    component: _195ed776,
    name: "pages-cart___en"
  }, {
    path: "/en/pages/checkout",
    component: _15f3d4eb,
    name: "pages-checkout___en"
  }, {
    path: "/en/pages/contact-us",
    component: _05368560,
    name: "pages-contact-us___en"
  }, {
    path: "/en/pages/forgot-password",
    component: _6683b970,
    name: "pages-forgot-password___en"
  }, {
    path: "/en/pages/login",
    component: _0635a094,
    name: "pages-login___en"
  }, {
    path: "/en/pages/orders",
    component: _596aa24a,
    name: "pages-orders___en"
  }, {
    path: "/en/pages/pay",
    component: _6f5b59da,
    name: "pages-pay___en"
  }, {
    path: "/en/pages/payment-failed",
    component: _97b4b66e,
    name: "pages-payment-failed___en"
  }, {
    path: "/en/pages/payment-success",
    component: _72a80327,
    name: "pages-payment-success___en"
  }, {
    path: "/en/pages/profile",
    component: _4a7ca214,
    name: "pages-profile___en"
  }, {
    path: "/en/pages/register",
    component: _58fabfc8,
    name: "pages-register___en"
  }, {
    path: "/en/pages/wishlist",
    component: _a5b4342c,
    name: "pages-wishlist___en"
  }, {
    path: "/en/shop/boxed-image",
    component: _0a427bce,
    name: "shop-boxed-image___en"
  }, {
    path: "/en/shop/boxed-slider",
    component: _08f087da,
    name: "shop-boxed-slider___en"
  }, {
    path: "/en/shop/horizontal-filter-1",
    component: _0b9e63c6,
    name: "shop-horizontal-filter-1___en"
  }, {
    path: "/en/shop/horizontal-filter-2",
    component: _0bac7b47,
    name: "shop-horizontal-filter-2___en"
  }, {
    path: "/en/shop/infinite-scroll",
    component: _58325dc7,
    name: "shop-infinite-scroll___en"
  }, {
    path: "/en/shop/list",
    component: _0ab88b66,
    name: "shop-list___en"
  }, {
    path: "/en/shop/off-canvas",
    component: _50f7b7e5,
    name: "shop-off-canvas___en"
  }, {
    path: "/en/shop/right-sidebar",
    component: _8b1d64e8,
    name: "shop-right-sidebar___en"
  }, {
    path: "/",
    component: _19be86f0,
    name: "index___it"
  }, {
    path: "/en/pages/single/:slug?",
    component: _2abdacb0,
    name: "pages-single-slug___en"
  }, {
    path: "/en/product/center/:slug?",
    component: _3aa8232a,
    name: "product-center-slug___en"
  }, {
    path: "/en/product/extended/:slug?",
    component: _70032e8e,
    name: "product-extended-slug___en"
  }, {
    path: "/en/product/fullwidth/:slug?",
    component: _a32629b0,
    name: "product-fullwidth-slug___en"
  }, {
    path: "/en/product/grid/:slug?",
    component: _0845915b,
    name: "product-grid-slug___en"
  }, {
    path: "/en/product/left-sidebar/:slug?",
    component: _bbe8d0aa,
    name: "product-left-sidebar-slug___en"
  }, {
    path: "/en/product/right-sidebar/:slug?",
    component: _3aa70988,
    name: "product-right-sidebar-slug___en"
  }, {
    path: "/en/product/sticky-both/:slug?",
    component: _6cc3a276,
    name: "product-sticky-both-slug___en"
  }, {
    path: "/en/product/sticky-cart/:slug?",
    component: _2ecc2755,
    name: "product-sticky-cart-slug___en"
  }, {
    path: "/en/product/sticky-info/:slug?",
    component: _51daf763,
    name: "product-sticky-info-slug___en"
  }, {
    path: "/en/product/transparent/:slug?",
    component: _201726a3,
    name: "product-transparent-slug___en"
  }, {
    path: "/en/shop/grid/:type?",
    component: _38834102,
    name: "shop-grid-type___en"
  }, {
    path: "/pages/single/:slug?",
    component: _2abdacb0,
    name: "pages-single-slug___it"
  }, {
    path: "/product/center/:slug?",
    component: _3aa8232a,
    name: "product-center-slug___it"
  }, {
    path: "/product/extended/:slug?",
    component: _70032e8e,
    name: "product-extended-slug___it"
  }, {
    path: "/product/fullwidth/:slug?",
    component: _a32629b0,
    name: "product-fullwidth-slug___it"
  }, {
    path: "/product/grid/:slug?",
    component: _0845915b,
    name: "product-grid-slug___it"
  }, {
    path: "/product/left-sidebar/:slug?",
    component: _bbe8d0aa,
    name: "product-left-sidebar-slug___it"
  }, {
    path: "/product/right-sidebar/:slug?",
    component: _3aa70988,
    name: "product-right-sidebar-slug___it"
  }, {
    path: "/product/sticky-both/:slug?",
    component: _6cc3a276,
    name: "product-sticky-both-slug___it"
  }, {
    path: "/product/sticky-cart/:slug?",
    component: _2ecc2755,
    name: "product-sticky-cart-slug___it"
  }, {
    path: "/product/sticky-info/:slug?",
    component: _51daf763,
    name: "product-sticky-info-slug___it"
  }, {
    path: "/product/transparent/:slug?",
    component: _201726a3,
    name: "product-transparent-slug___it"
  }, {
    path: "/shop/grid/:type?",
    component: _38834102,
    name: "shop-grid-type___it"
  }, {
    path: "/en/det/:type?/:slug?",
    component: _6923c94e,
    name: "det-type-slug___en"
  }, {
    path: "/en/product/:type?/:slug?",
    component: _54e75b2a,
    name: "product-type-slug___en"
  }, {
    path: "/det/:type?/:slug?",
    component: _6923c94e,
    name: "det-type-slug___it"
  }, {
    path: "/product/:type?/:slug?",
    component: _54e75b2a,
    name: "product-type-slug___it"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
