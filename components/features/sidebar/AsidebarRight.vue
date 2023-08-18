<template>
  <div class="text-white p-3 aside-right_container">
    <div class="text-center pt-3 pb-4 font-weight-bold">
      <FilterSearch />
    </div>
    <div class="h-100 pl-1">
      <div v-for="(item, index) in categories" :key="index" class="border-top">
        <div class="my-4">
          <h5>
            <span>
              <i class="fa fa-chevron-right mr-1" aria-hidden="true"> </i>
            </span>
            {{ item.text }}
          </h5>
          <div
            class="py-2 pl-4"
            v-for="(nav, navIndex) in item.items"
            :key="navIndex"
          >
            <a href="javascript:;" target="_blank" rel="noopener noreferrer">
              {{ nav }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import FilterSearch from "~/components/features/sidebar/FilterSearch";

  export default {
    components: {
      FilterSearch,
    },
    computed: {
      ...mapGetters("sidebar", ["sidebar_data"]),
    },
    data: function () {
      return {
        categories: [
          {
            id: "collegamenti",
            text: "Collegamenti",
            items: [
              "Accessori",
              "Barcode",
              "Correlati",
              "Foto/Video",
              "Scheda Tecnica",
            ],
          },
          {
            id: "RICHIESTE",
            text: "RICHIESTE",
            items: ["Assistenza", "Commerciali", "Documenti", "Reso"],
          },
          {
            id: "Segnalazioni",
            text: "Segnalazioni",
            items: ["Suggerimenti", "Anagrafiche", "Varie"],
          },
        ],
      };
    },
  };
</script>
