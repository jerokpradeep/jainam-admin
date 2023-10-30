<template>
  <div class="mt-4">
    <ul
      class="flex flex-wrap -mb-px text-sm font-medium text-center mx-4 mt-4"
      id="myTab"
    >
      <li
        class="mr-2"
        role="presentation"
        v-for="(b, id) in getTabs()"
        :key="id"
        @click="changeActive(b)"
      >
        <button
          class="inline-block px-3 pb-2 rounded-t-lg"
          type="button"
          :class="
            b.active
              ? 'border-b-2 violet-color hover:violet-color dark:text-[#753ED7] dark:hover:text-[#753ED7] border-[#0081B8] dark:border-[#0081B8]'
              : 'secondary-color hover:text-gray-600 dark:text-[#94A3B8] border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300'
          "
        >
          {{ b.name }} <span v-if="b.count != '0'">{{ b.count }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent } from "vue";
export default defineComponent({
  name: "tab-menu",
  computed: {
    ...mapGetters("tabs", [
      "getLogsTabs",
      "getReportTabs",
      "getVendorTabs",
      "getContractTabs",
      "getSettingsTabs",
      "getDashboardTabs",
      "getNotifyTabs",
      "getFileUploadTabs",
      "getUserInfoTabs",
    ]),
  },
  methods: {
    getTabs() {
      if (this.$route.path == "/logs") {
        return this.getLogsTabs;
      } else if (this.$route.path == "/report") {
        return this.getReportTabs;
      } else if (this.$route.path == "/vendors") {
        return this.getVendorTabs;
      } else if (this.$route.path == "/contracts") {
        return this.getContractTabs;
      } else if (this.$route.path == "/settings") {
        return this.getSettingsTabs;
      } else if (this.$route.path == "/dashboard") {
        return this.getDashboardTabs;
      } else if (this.$route.path == "/notify") {
        return this.getNotifyTabs;
      } else if (this.$route.path == "/fileupload") {
        return this.getFileUploadTabs;
      } else if (this.$route.path == "/userInfo") {
        return this.getUserInfoTabs;
      }
    },
    async changeActive(data: any) {
      this.$store.dispatch("tabs/setActiveTab", {
        path: this.$route.path,
        id: data.id,
      });
      this.$emit("activeTab", data);
    },
  },
});
</script>
