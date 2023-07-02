<template>
  <li :class="{ open: categoryOpened }">
    <a
      @click="navigate(collection.link_url, collection.id)"
      href="javascript:;"
      class="sub-menu-link menu-with-ul"
    >
      {{ collection.title }}
    </a>
    <span
      class="mmenu-btn"
      @click.prevent="categoryOpened = !categoryOpened"
    ></span>

    <vue-slide-toggle :open="categoryOpened">
      <ul
        :class="{ open: subOpened == menu }"
        v-for="menu in menuList"
        :key="menu.id_menu"
      >
        <li
          class="sub-menu-link menu-with-ul"
          :class="{ open: subOpened == menu }"
        >
          <a
            href="javascript:;"
            @click="
              navigate(
                '/shop?category=' +
                  getParentMenu(menu) +
                  '&collection=' +
                  collection.id,
                collection.id
              )
            "
          >
            {{ translateKey(menu, 'label') }}
          </a>
          <span class="mmenu-btn" @click="handleOpenClick(menu)"></span>
        </li>

        <li class="border-0">
          <vue-slide-toggle tag="ul" :open="subOpened == menu" class="ml-4">
            <li v-for="subMenu in menu.submenu" :key="subMenu.id_menu">
              <a
                @click="
                  navigate(
                    '/shop?category=' +
                      subMenu.id_menu +
                      '&collection=' +
                      collection.id,
                    collection.id
                  )
                "
                href="javascript:;"
              >
                {{ translateKey(subMenu, 'labe') }}
              </a>
            </li>
          </vue-slide-toggle>
        </li>
      </ul>
    </vue-slide-toggle>
  </li>
</template>

<script>
import { VueSlideToggle } from 'vue-slide-toggle';
import { mapActions, mapGetters } from 'vuex';
import translateMixin from '~/mixins/translateMixin';

export default {
  mixins: [translateMixin],
  props: ['collection'],
  components: {
    VueSlideToggle,
  },
  data: function () {
    return {
      categoryOpened: false,
      subOpened: '',
    };
  },
  computed: {
    ...mapGetters('auth', ['selected_collection', 'mainMenu']),
    menuList: function () {
      if (this.selected_collection && this.mainMenu) {
        const menuArr = this.mainMenu.filter(
          (item) => item.id == this.collection.id
        );
        if (menuArr.length > 0) {
          return menuArr[0].menu;
        }
        return [];
      } else return [];
    },
  },
  methods: {
    ...mapActions('auth', ['setSelectedCollection']),
    handleOpenClick(menuName) {
      if (this.subOpened == menuName) this.subOpened = '';
      else this.subOpened = menuName;
    },
    navigate(url, id) {
      this.setSelectedCollection(id);
      this.$router.push(this.localeLocation(url));
    },
    getParentMenu(menu) {
      let menuStr = '';
      if (menu && menu.submenu) {
        menu.submenu.map((item) => {
          menuStr += item.id_menu + ',';
        });
        menuStr = menuStr.slice(0, -1);
      }
      return menuStr;
    },
  },
};
</script>