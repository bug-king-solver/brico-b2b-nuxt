<template>
  <div class="category-tab__container">
    <div class="d-flex justify-content-between w-100">
      <div class="d-flex pt-1">
        <div v-for="(item, index) in tab_lists" :key="index" class="category-item d-flex justify-content-between"
          :class="{ 'active': active_index == index }" @click="navigate(item.route, index)">
          {{ limitedText(item.key) }}
          <div class="close-btn" @click="removeKeyProduct(index)">
            <a href="javascript:;"><i class="fa fa-times mr-4" aria-hidden="true"></i></a>
          </div>
        </div>
        <div @click="onSetNewSearch" v-if="categories.length < 7">
          <a href="javascript:;" class="text-light-gray">
            <i class="fa fa-plus p-3" aria-hidden="true"></i>
          </a>
        </div>
      </div>

      <div>
        <div class="header-dropdown font2 category-dropdown">
          <a href="javascript:;" class="m-1 text-black display-5"></a>
          <div class="header-menu">
            <ul>
              <li v-for="(item, index) in categories" :key="index">
                <a href="javascript:;">{{ item }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MyComponent',
  computed: {
    ...mapGetters('product', ['categories', 'active_index', 'tab_lists']),
  },
  methods: {
    ...mapActions('product', [
      'setActiveKey',
      'removeKeyProduct',
      'setNewSearch',
      'setTabRoute'
    ]),
    limitedText(text) {
      if (text && text.length > 18) {
        return text.slice(0, 14) + "...";
      }
      return text;
    },
    navigate(route, index) {
      this.setActiveKey(index);
      this.$router.push(route);
    },
    onSetNewSearch() {
      this.setNewSearch();
    }
  },
};
</script>
