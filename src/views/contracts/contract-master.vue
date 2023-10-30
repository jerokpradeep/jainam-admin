<template>
  <div>
    <div class="p-4 h-full">
      <div class="card p-4 h-full">
        <div
          class="mb-6 gap-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-6"
        >
          <div>
            <p class="primaryColor pb-1 text-sm">Symbol</p>
            <!-- @change="addDays(fromDate, 10, 'fromDate')" -->
            <input
              v-model="symbol"
              class="border w-full h-10 rounded focus:outline-0 px-4 text-xs"
            />
          </div>
          <div>
            <p class="primaryColor pb-1 text-sm">Exchange</p>
            <select
              v-model="selectedExchangeData"
              class="border w-full h-10 rounded focus:outline-0 px-4 text-xs"
            >
              <option
                :value="list"
                v-for="(list, index) in exchangeData"
                :key="index"
              >
                {{ list }}
              </option>
            </select>
          </div>
          <div>
            <p class="primaryColor pb-1 text-sm">Group</p>
            <!-- @change="addDays(fromDate, 10, 'fromDate')" -->
            <input
              v-model="group"
              class="border w-full h-10 rounded focus:outline-0 px-4 text-xs"
            />
          </div>
          <div>
            <p class="primaryColor pb-1 text-sm">From Date</p>
            <!-- @change="addDays(fromDate, 10, 'fromDate')" -->
            <input
              v-model="expiry"
              type="date"
              class="border w-full h-10 rounded focus:outline-0 px-4 text-xs"
              :max="new Date().toISOString().slice(0, 10)"
            />
          </div>

          <div class="flex items-end">
            <button
              @click="getContractMaster"
              class="bg-blue-500 text-white h-10 w-[120px] cursor-pointer rounded text-xs"
            >
              <p>Submit</p>
              <svg
                v-if="isLoading == true"
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
        </div>
        <div class="h-full">
          <div class="flex-grow overflow-auto h-[20px]"></div>
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
    const isLoading = ref(false);
    const symbol = ref("");
    const selectedExchangeData = ref("nse_fo");
    const group = ref("");
    const expiry = ref("");

    return {
      isLoading,
      symbol,
      group,
      expiry,
      selectedExchangeData,
    };
  },
  methods: {
    getContractMaster() {
      let json = {
        symbol: this.symbol,
        exch: this.selectedExchangeData,
        group: this.group,
        expiry: this.expiry,
      };
      this.$store.dispatch("cMaster/getContractMasterData", json);
    },
  },
  computed: {
    ...mapState("cMaster", ["exchangeData"]),
  },
});
</script>
