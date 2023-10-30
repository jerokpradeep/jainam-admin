<template>
  <div>
    <tab-menu @activeTab="changeTab" />
    <version v-if="validTab == 'Version'" />
    <cache v-if="validTab == 'Cache'" />
    <product v-if="validTab == 'product'" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import version from "./version.vue";
import cache from "./cache.vue";
import product from "./product.vue";
export default defineComponent({
  components: { version, cache, product },
  setup() {
    const validTab = ref("");
    return { validTab };
  },
  methods: {
    changeTab(data: any) {
      this.validTab = data.name;
      this.$store.dispatch("tabs/setActiveTab", {
        path: this.$route.path,
        id: data.id,
      });
    },
  },
  mounted() {
    this.changeTab({ name: "Version", id: "0" });
  },
});
</script>
