<template>
  <div>
    <tab-menu @activeTab="changeTab" />
    <holdings v-if="validTab == 'Holdings'" />
    <positions v-if="validTab == 'Positions'" />
    <payoutReport v-if="validTab == 'Payout'" />
    <edis v-if="validTab == 'EDIS'" />
    <marketWatch v-if="validTab == 'Market watch'" />
    <bankDetails v-if="validTab == 'Bank Details'" />
    <Feedback v-if="validTab == 'User Feedback'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import payoutReport from "./payout.vue";
import holdings from "./holdings.vue";
import positions from "./positions.vue";
import edis from "./edis.vue";
import marketWatch from "./market-watch.vue";
import bankDetails from "./bank-details.vue";
import Feedback from "../Reports/feedback.vue";
export default defineComponent({
  setup() {
    const validTab = ref("Holdings");
    return { validTab };
  },
  components: {
    payoutReport,
    holdings,
    positions,
    edis,
    marketWatch,
    bankDetails,
    Feedback,
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
    this.changeTab({ name: "Payout", id: 0 });
  },
});
</script>
