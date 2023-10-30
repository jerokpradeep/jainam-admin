<template>
  <div>
    <tab-menu @activeTab="changeTab" />
  </div>
  <userStatus v-if="validTab == 'User Status'" />
  <activeUserDetails v-else />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import userStatus from "./user-status.vue";
import activeUserDetails from "./active-user-details.vue";
export default defineComponent({
  components: { userStatus, activeUserDetails },
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
  created() {
    this.changeTab({ name: "User Status", id: 0 });
  },
});
</script>
