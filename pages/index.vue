<template>
  <main class="main home-page">
    <pv-intro-section :slider-top="sliderTop"></pv-intro-section>

    <pv-service-section :promo-box-list="promoBoxList"></pv-service-section>

    <pv-featured-collection
      :products="featuredProducts"
    ></pv-featured-collection>

    <pv-new-collection
      :products="newProducts"
      :category-list="categoryList"
      :small-banner="smallBanner"
    ></pv-new-collection>

    <pv-feature-section></pv-feature-section>

    <!-- <pv-promo-section :promo-deal="promoDeal"></pv-promo-section> -->

    <pv-blog-section :posts="posts" :brand-list="brandList"></pv-blog-section>

    <div class="container">
      <pv-small-collection
        :featured-products="featuredProducts.slice(0, 3)"
        :best-products="bestProducts.slice(0, 3)"
        :latest-products="newProducts.slice(0, 3)"
        :top-rated-products="topRatedProducts.slice(0, 3)"
      ></pv-small-collection>
    </div>
  </main>
</template>

<script>
import PvFeaturedCollection from "~/components/partials/home/PvFeaturedCollection";
import PvFeatureSection from "~/components/partials/home/PvFeatureSection";
import PvIntroSection from "~/components/partials/home_oc/PvIntroSection";
import PvNewCollection from "~/components/partials/home_oc/PvNewCollection";
import PvServiceSection from "~/components/partials/home_oc/PvServiceSection";
// import PvPromoSection from "~/components/partials/home/PvPromoSection";
import { Api, CmsApi } from "~/api";
import { apiSearch, searchUrl } from "~/api/cloud.axios";
import { baseUrl } from "~/api/cms.axios";
import PvBlogSection from "~/components/partials/home_oc/PvBlogSection";
import PvSmallCollection from "~/components/partials/product/PvSmallCollection";
import { getCookie } from "~/utils";
import {
  getProductsByAttri,
  getTopRatedProducts,
  getTopSellingProducts,
} from "~/utils/service";

export default {
  components: {
    PvIntroSection,
    PvServiceSection,
    PvFeatureSection,
    PvNewCollection,
    PvFeaturedCollection,
    // PvPromoSection,
    PvBlogSection,
    PvSmallCollection,
  },
  data: function () {
    return {
      products: [],
      posts: [
        {
          id: 11,
          author: "John Doe",
          comments: "0",
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.",
          date: "2021-04-07",
          slug: "right-choices",
          title: "Right Choices",
          type: "image",
          blog_categories: [
            {
              Name: "Fashion",
              slug: "fashion",
              pivot: {
                blog_id: "11",
                "blog-category_id": "4",
              },
            },
            {
              Name: "Model",
              slug: "model",
              pivot: {
                blog_id: "11",
                "blog-category_id": "2",
              },
            },
          ],
          video: null,
          picture: [
            {
              width: "265",
              height: "198",
              url: "/uploads/post2_2aeb5c0866.jpg",
              pivot: {
                related_id: "11",
                upload_file_id: "46",
              },
            },
          ],
          small_picture: [],
        },
        {
          id: 12,
          author: "John Doe",
          comments: "0",
          content:
            "Leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages more recently with desktop publishing software like Aldus.",
          date: "2021-04-07",
          slug: "perfect-accessories",
          title: "Perfect Accessories",
          type: "image",
          blog_categories: [
            {
              Name: "Traveling",
              slug: "traveling",
              pivot: {
                blog_id: "12",
                "blog-category_id": "6",
              },
            },
            {
              Name: "Bag",
              slug: "bag",
              pivot: {
                blog_id: "12",
                "blog-category_id": "5",
              },
            },
          ],
          video: null,
          picture: [
            {
              width: "265",
              height: "198",
              url: "/uploads/post3_022029890a.jpg",
              pivot: {
                related_id: "12",
                upload_file_id: "50",
              },
            },
          ],
          small_picture: [],
        },
        {
          id: 10,
          author: "John Doe",
          comments: "0",
          content:
            "Leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages more recently with desktop publishing software like Aldus.",
          date: "2021-03-16",
          slug: "fashion-trends-collection",
          title: "Fashion Trends Collection",
          type: "image",
          blog_categories: [
            {
              Name: "Bag",
              slug: "bag",
              pivot: {
                blog_id: "10",
                "blog-category_id": "5",
              },
            },
            {
              Name: "Traveling",
              slug: "traveling",
              pivot: {
                blog_id: "10",
                "blog-category_id": "6",
              },
            },
          ],
          video: null,
          picture: [
            {
              width: "265",
              height: "198",
              url: "/uploads/post2_ac46a3d724.jpg",
              pivot: {
                related_id: "10",
                upload_file_id: "49",
              },
            },
          ],
          small_picture: [],
        },
        {
          id: 9,
          author: "John Doe",
          comments: "0",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non placerat mi. Etiam non tellus sem. Aenean pretium convallis lorem, sit amet dapibus ante mollis a. Integer bibendum interdum sem, eget volutpat purus pulvinar in. Sed tristique augue vitae sagittis porta. Phasellus ullamcorper, dolor suscipit mattis viverra,",
          date: "2021-03-11",
          slug: "top-new-collection",
          title: "Top New Collection",
          type: "image",
          blog_categories: [
            {
              Name: "Fashion",
              slug: "fashion",
              pivot: {
                blog_id: "9",
                "blog-category_id": "4",
              },
            },
            {
              Name: "Model",
              slug: "model",
              pivot: {
                blog_id: "9",
                "blog-category_id": "2",
              },
            },
          ],
          video: null,
          picture: [
            {
              width: "265",
              height: "198",
              url: "/uploads/post1_3b51e2fd18.jpg",
              pivot: {
                related_id: "9",
                upload_file_id: "47",
              },
            },
          ],
          small_picture: [],
        },
      ],
      featuredProducts: [],
      newProducts: [],
      bestProducts: [],
      topRatedProducts: [],
      timerId: 0,

      // Custom
      sliderTop: [],
      promoBoxList: [],
      promoDeal: null,
      brandList: [],
      categoryList: [],
      smallBanner: null,
    };
  },
  mounted: function () {
    
    CmsApi.get(`${baseUrl}/api/method/omnicommerce_cms.omnicommerce_cms.home.get_home`)
      .then((response) => {
        // Custom
        response.data = response.data.message

        this.sliderTop = response.data.slider_top;
        this.promoBoxList = response.data.promo_banner;
        this.promoDeal = response.data.banner_top_deal;
        this.brandList = response.data.home_brand;
        this.categoryList = response.data.home_category;
        this.smallBanner = response.data.banner_piccolo;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    Api.get(`${apiSearch}${searchUrl}shop?home=true`)
      .then((response) => {
        // Custom

        this.products = response.data.message.products;
        // this.posts = response.data.posts;
        this.featuredProducts = getProductsByAttri(
          response.data.message.products
        );
        this.newProducts = getProductsByAttri(
          response.data.message.products,
          "is_new"
        );
        this.bestProducts = getTopSellingProducts(
          response.data.message.products
        );
        this.topRatedProducts = getTopRatedProducts(
          response.data.message.products
        );
      })
      .catch((error) => ({ error: JSON.stringify(error) }));

    this.timerId = setTimeout(() => {
      if (this.$route.path === "/" && getCookie("newsletter") !== "false") {
        this.$modal.show(
          () => import("~/components/features/modal/PvNewsletterModal"),
          {},
          {
            width: "740",
            height: "auto",
            adaptive: true,
            class: "newsletter-modal",
          }
        );
      }
    }, 10000);
  },
  destroyed: function () {
    clearTimeout(this.timerId);
  },
};
</script>
