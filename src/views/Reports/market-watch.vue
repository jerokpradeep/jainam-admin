<template>
  <div>
    <div class="p-4 h-full">
      <div class="card p-4">
        <form @submit.prevent="getWatchlistData()"
          class="mb-6 gap-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-6">
          <div>
            <p class="primaryColor pb-1">User ID</p>
            <input type="text" v-model="userId" maxlength="10" class="border w-full h-10 rounded focus:outline-0 px-4" />
          </div>
          <div class="flex items-end">
            <button @click="$store.dispatch('reports/getMarketWatchData', userId)" type="submit"
              class="bg-blue-500 text-white h-10 w-[120px] cursor-pointer rounded text-xs">
              <p>Submit</p>
            </button>
          </div>
        </form>
      </div>
      <!-- <div v-for="(item, index) in marketWatchData" :key="index">
        {{ item.token }}
      </div> -->
    </div>
    <div class="p-4" v-if="marketWatchData.length">
      <div class="bg-white p-4">
        <div class="flex justify-start items-center">
          <div class="flex flex-wrap" v-for="buttonTab in allTabs">
            <button v-on:click="changeActiveButtonTab(buttonTab)" class="inline-block px-3 pb-1 rounded-t-lg text-sm"
              type="button" :class="buttonTab == activeTab
                ? 'border-b-2 violet-color hover:violet-color dark:text-[#753ED7] dark:hover:text-[#753ED7] border-[#0081B8] dark:border-[#0081B8]'
                : 'secondary-color hover:text-gray-600 dark:text-[#94A3B8] border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300'
                ">
              <span>{{ buttonTab }}</span>
            </button>

            <div class="mx-2.5"></div>
          </div>
        </div>

        <div class="border rounded mt-5" v-if="marketWatchData.length">
          <table class="w-full">
            <thead class="text-[13px]">
              <tr class="border-b">
                <th class="border-r text-center">S.NO</th>
                <th class="border-r">Scrip Name</th>
                <th class="border-r">Exchange</th>
                <th class="border-r">PDC</th>
                <th class="border-r">Token</th>
              </tr>
            </thead>
            <tbody v-if="activeTab == 'Tab 1'" class="text-sm">
              <tr v-for="(i, id) in marketWatchData" :key="id" class="border-b">
                <td v-if="i.mwId == '1'" class="text-center border-r border-[#ededed]">
                  {{ id + 1 }}
                </td>
                <td v-if="i.mwId == '1'" class="text-center border-r border-[#ededed]">
                  {{ i.formattedInsName }}
                </td>
                <td v-if="i.mwId == '1'" class="text-center border-r border-[#ededed]">
                  {{ i.exch }}
                </td>
                <td v-if="i.mwId == '1'" class="text-center border-r border-[#ededed]">
                  {{ i.pdc }}
                </td>
                <td v-if="i.mwId == '1'" class="text-center border-r border-[#ededed]">
                  {{ i.token }}
                </td>
              </tr>
            </tbody>
            <tbody v-if="activeTab == 'Tab 2'" class="text-sm">
              <tr v-for="(i, id) in marketWatchData" :key="id" class="border-b">
                <td v-if="i.mwId == '2'" class="text-center border-r border-[#ededed]">
                  {{ id + 1 }}
                </td>
                <td v-if="i.mwId == '2'" class="text-center border-r border-[#ededed]">
                  {{ i.formattedInsName }}
                </td>
                <td v-if="i.mwId == '2'" class="text-center border-r border-[#ededed]">
                  {{ i.exch }}
                </td>
                <td v-if="i.mwId == '2'" class="text-center border-r border-[#ededed]">
                  {{ i.pdc }}
                </td>
                <td v-if="i.mwId == '2'" class="text-center border-r border-[#ededed]">
                  {{ i.token }}
                </td>
              </tr>
            </tbody>
            <tbody v-if="activeTab == 'Tab 3'" class="text-sm">
              <tr v-for="(i, id) in marketWatchData" :key="id" class="border-b">
                <td v-if="i.mwId == '3'" class="text-center border-r border-[#ededed]">
                  {{ id + 1 }}
                </td>
                <td v-if="i.mwId == '3'" class="text-center border-r border-[#ededed]">
                  {{ i.formattedInsName }}
                </td>
                <td v-if="i.mwId == '3'" class="text-center border-r border-[#ededed]">
                  {{ i.exch }}
                </td>
                <td v-if="i.mwId == '3'" class="text-center border-r border-[#ededed]">
                  {{ i.pdc }}
                </td>
                <td v-if="i.mwId == '3'" class="text-center border-r border-[#ededed]">
                  {{ i.token }}
                </td>
              </tr>
            </tbody>
            <tbody v-if="activeTab == 'Tab 4'" class="text-sm">
              <tr v-for="(i, id) in marketWatchData" :key="id" class="border-b">
                <td v-if="i.mwId == '4'" class="text-center border-r border-[#ededed]">
                  {{ id + 1 }}
                </td>
                <td v-if="i.mwId == '4'" class="text-center border-r border-[#ededed]">
                  {{ i.formattedInsName }}
                </td>
                <td v-if="i.mwId == '4'" class="text-center border-r border-[#ededed]">
                  {{ i.exch }}
                </td>
                <td v-if="i.mwId == '4'" class="text-center border-r border-[#ededed]">
                  {{ i.pdc }}
                </td>
                <td v-if="i.mwId == '4'" class="text-center border-r border-[#ededed]">
                  {{ i.token }}
                </td>
              </tr>
            </tbody>
            <tbody v-if="activeTab == 'Tab 5'" class="text-sm">
              <tr v-for="(i, id) in marketWatchData" :key="id" class="border-b">
                <td v-if="i.mwId == '5'" class="text-center border-r border-[#ededed]">
                  {{ id + 1 }}
                </td>
                <td v-if="i.mwId == '5'" class="text-center border-r border-[#ededed]">
                  {{ i.formattedInsName }}
                </td>
                <td v-if="i.mwId == '5'" class="text-center border-r border-[#ededed]">
                  {{ i.exch }}
                </td>
                <td v-if="i.mwId == '5'" class="text-center border-r border-[#ededed]">
                  {{ i.pdc }}
                </td>
                <td v-if="i.mwId == '5'" class="text-center border-r border-[#ededed]">
                  {{ i.token }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapState } from "vuex";
export default defineComponent({
  setup() {
    const userId = ref("");
    const activeTab = ref("Tab 1");
    const allTabs = ref(["Tab 1", "Tab 2", "Tab 3", "Tab 4", "Tab 5"]);
    return { userId, activeTab, allTabs };
  },
  computed: {
    ...mapState("reports", ["marketWatchData"]),
  },
  methods: {
    changeActiveButtonTab(el: any) {
      this.activeTab = el;
    },
    getWatchlistData() { },
  },
});
</script>
