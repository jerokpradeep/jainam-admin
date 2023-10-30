<template>
  <div class="p-5">
    <div class="bg-white p-4">
      <div class="flex justify-end items-center">
        <button
          type="button"
          class="bg-blue-500 text-white h-10 w-[120px] cursor-pointer rounded text-xs"
          @click="addVersion()"
        >
          <span v-if="!getLoader">Add Version</span>
          <svg
            v-if="getLoader"
            class="animate-spin h-5 w-5 text-white flex mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fffff"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="#fffff"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </button>
      </div>

      <div class="border rounded mt-2" v-if="getVersionList.length">
        <table class="w-full">
          <thead class="text-[13px]">
            <tr class="border-b">
              <th class="border-r text-center">S.NO</th>
              <th class="border-r">Version</th>
              <th class="border-r">Device Type</th>
              <th class="border-r">OS</th>
              <th class="border-r">Update Available</th>
              <th class="border-r">Actions</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr v-for="(i, id) in getVersionList" :key="id" class="border-b">
              <td class="text-center border-r border-[#ededed]">
                {{ id + 1 }}
              </td>
              <td class="text-center border-r border-[#ededed]">
                {{ i.version }}
              </td>
              <td class="text-center border-r border-[#ededed]">
                {{ i.type }}
              </td>
              <td class="text-center border-r border-[#ededed]">
                {{ i.os }}
              </td>
              <td class="text-center border-r border-[#ededed]">
                <input
                  type="checkbox"
                  class="h-4 w-4 cursor-pointer"
                  :checked="i.updateAvailable"
                  @change="handleUpdate(i)"
                />
              </td>
              <td class="text-center border-r border-[#ededed]">
                <span v-html="deleteSvg" @click="deleteVersion(i)"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <AddVersion v-if="getIsAddVersionDialog" />
    <UpdateVersion v-if="getIsUpdateVersionDialog" :cData="currentData" />
    <DeleteVersion v-if="getIsDeleteVersionDialog" :cData="currentData" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import AddVersion from "./add-version.vue";
import UpdateVersion from "./update-dialog.vue";
import DeleteVersion from "./delete-version.vue";
const deleteSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mx-auto cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
`;
export default defineComponent({
  setup() {
    const validTab = ref("");
    const currentData = ref("");
    return { validTab, deleteSvg, currentData };
  },
  computed: {
    ...mapGetters("version", [
      "getVersionList",
      "getIsAddVersionDialog",
      "getIsUpdateVersionDialog",
      "getIsDeleteVersionDialog",
      "getLoader",
    ]),
  },
  mounted() {
    this.$store.dispatch("version/getMobileVersion");
  },
  methods: {
    addVersion() {
      this.$store.commit("version/setIsAddVersionDialog", true);
    },
    handleUpdate(data: any) {
      this.currentData = data;
      this.$store.commit("version/setIsUpdateVersionDialog", true);
    },
    deleteVersion(data: any) {
      this.currentData = data;
      this.$store.commit("version/setIsDeleteVersionDialog", true);
    },
  },
  components: { AddVersion, UpdateVersion, DeleteVersion },
});
</script>
