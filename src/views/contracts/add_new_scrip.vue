<template>
  <div class="w-full">
    <!-- <div class="py-2 min-w-full sm:px-3 lg:px-4 grid grid-cols-12 w-[100%]">
      <div class="break-after-column col-span-3 bg-white">
        <div class="pl-[20px] mt-[20px]">
          <p class="text-lg font-large mb-4 primaryColor">Add New Scrip</p>
        </div>
      </div>
      <div class="col-span-5 bg-white pl-[20px]">
        <div class="h-[80%] mt-[20px]">
          <form @submit.prevent="submitHandle()">
            <div class="pb-1 pt-4">
              <label class="primaryColor" for="">Symbol Name</label>
            </div>

            <input
              type="text"
              ref="userID"
              id="logsId"
              v-model="symbolName"
              placeholder="Enter Symbol Name"
              v-on:click="symbolName = ''"
              class="border font-light w-full h-10 rounded px-4 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
            />
            <div class="h-[15px]">
              <p
                v-if="symbolName == ''"
                :hidden="hiddenValue"
                class="text-[12px] text-red-500"
              >
                Symbol Name is required*
              </p>
            </div>
            <div class="columns-2 pb pt-4">
              <label class="primaryColor flex justify-start" for=""
                >Token</label
              >
              <label class="primaryColor flex justify-start" for="">
                <div class="pl-2">Select Exchange</div>
              </label>
            </div>
            <div class="columns-2 flex justify-between pb-1">
              <input
                type="number"
                ref="userID"
                id="logsId"
                v-model="tokenValue"
                placeholder="Enter Token"
                class="border font-light w-[47%] h-10 rounded focus:outline-0 px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
              />
              <select
                v-model="selectExchange"
                class="border w-[47%] h-10 rounded px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
              >
                <option class="selectExchangeColor" value="nse" selected>
                  NSE
                </option>

                <option value="bse">BSE</option>
                <option value="nfo">NFO</option>
                <option value="bfo">BFO</option>
                <option value="cds">CDS</option>
                <option value="bcd">BCD</option>
              </select>
            </div>
            <div class="grid grid-cols-2 justify-left pb-1">
              <div class="h-[15px] col-span-1">
                <p
                  v-if="tokenValue == ''"
                  :hidden="hiddenValue"
                  class="text-[12px] text-red-500"
                >
                  Token is required*
                </p>
              </div>
              <div class="h-[15px] pl-[15px]">
                <p
                  v-if="selectExchange == ''"
                  :hidden="hiddenValue"
                  class="text-[12px] text-red-500"
                >
                  Exchange is required*
                </p>
              </div>
            </div>

            <div class="columns-2 pb pt-4">
              <label
                class="text-md font-small mb-1 primaryColor flex justify-start"
                for=""
                >Price Range From</label
              >
              <label
                class="text-md font-small mb-1 primaryColor flex justify-start"
                for=""
              >
                <div class="pl-2">Price Range To</div>
              </label>
            </div>
            <div class="columns-2 flex justify-between pb-1">
              <input
                type="number"
                ref="userID"
                id="logsId"
                v-model="priceRangeFrom"
                placeholder="Enter Price Range From"
                class="border font-light w-[47%] h-10 rounded focus:outline-0 px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
              />
              <input
                type="number"
                ref="userID"
                id="logsId"
                v-model="priceRangeTo"
                placeholder="Price Range To"
                class="border font-light w-[47%] h-10 rounded focus:outline-0 px-4 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
              />
            </div>
            <div class="grid grid-cols-2 justify-left pb-1">
              <div class="h-[15px] col-span-1">
                <p
                  v-if="priceRangeFrom == ''"
                  :hidden="hiddenValue"
                  class="text-[12px] text-red-500"
                >
                  Price Range is required*
                </p>
              </div>
              <div class="h-[15px] pl-[15px]">
                <p
                  v-if="priceRangeTo == ''"
                  :hidden="hiddenValue"
                  class="text-[12px] text-red-500"
                >
                  Price Range is required*
                </p>
              </div>
            </div>
            <div class="h-[14px]"></div>
            <div class="columns-2 pb pt-2">
              <label
                class="text-md font-small mb-1 primaryColor flex justify-start"
                for=""
                >Lot Size</label
              >
              <label
                class="text-md font-small mb-1 primaryColor flex justify-start"
                for=""
              >
                <div class="pl-2">Tick Size</div>
              </label>
            </div>
            <div class="columns-2 flex justify-between pb-1">
              <input
                type="number"
                ref="userID"
                id="logsId"
                v-model="lotSize"
                placeholder="Enter Lot Size"
                class="border font-light w-[47%] h-10 rounded focus:outline-0 px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
              />
              <input
                type="number"
                ref="userID"
                id="logsId"
                v-model="tickSize"
                placeholder="Enter Tick Size"
                class="border font-light w-[47%] h-10 rounded focus:outline-0 px-4 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
              />
            </div>
            <div class="grid grid-cols-2 justify-left pb-1">
              <div class="h-[15px] col-span-1">
                <p
                  v-if="lotSize == ''"
                  :hidden="hiddenValue"
                  class="text-[12px] text-red-500"
                >
                  Lot Size is required*
                </p>
              </div>
              <div class="h-[15px] pl-[15px]">
                <p
                  v-if="tickSize == ''"
                  :hidden="hiddenValue"
                  class="text-[12px] text-red-500"
                >
                  Tick Size is required*
                </p>
              </div>
            </div>

            <div class="pb pt-4">
              <label class="text-md font-small mb-1 primaryColor" for=""
                >Group Name</label
              >
            </div>

            <input
              type="text"
              ref="userID"
              id="logsId"
              v-model="groupName"
              placeholder="Enter Group Name"
              class="border font-light h-10 w-full rounded focus:outline-0 px-4 pb focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
            />
            <div class="h-[15px]">
              <p
                v-if="groupName == ''"
                :hidden="hiddenValue"
                class="text-[12px] text-red-500"
              >
                Group Name is required*
              </p>
            </div>
            <div class="pb pt-4">
              <label class="text-md font-small mb-1 primaryColor" for=""
                >Company Name</label
              >
            </div>

            <input
              type="text"
              ref="userID"
              id="logsId"
              v-model="companyName"
              placeholder="Enter Company Name"
              class="border font-light h-10 w-full rounded focus:outline-0 px-4 pb focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
            />
            <div class="h-[15px]">
              <p
                v-if="companyName == ''"
                :hidden="hiddenValue"
                class="text-[12px] text-red-500"
              >
                Company Name is required*
              </p>
            </div>
            <div class="h-[8px]"></div>
            <div class="grid grid-cols-4 pb-4 pt-4">
              <div>
                <div class="flex items-center justify-end pb-4 pt-4 pr-4">
                  <input
                    v-model="buttonCondition"
                    id="default-radio-1"
                    type="checkbox"
                    value=""
                    name="default-radio"
                    class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
              <div class="col-span-2">
                <label
                  for="default-radio-1"
                  class="text-left text-sm text-red-500 dark:text-gray-300"
                  >USE WITH CAUTION-Reload Contract/Script Cache</label
                >
              </div>
              <div class="flex justify-end">
                <button
                  :disabled="!buttonCondition"
                  :class="!buttonCondition ? '' : 'bg-blue-500'"
                  class="h-10 w-[120px] border rounded"
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
          <div class="h-[14px]"></div>
        </div>
      </div>
      <div
        class="break-before-column col-span-4 bg-white flex align-top justify-end"
      >
        <p class="pr-[10px] mt-[20px]">
          <button class="text-blue-500">Reset</button>
        </p>
      </div>
    </div>
    <div class="h-full flex items-top justify-end p-4 w-[100%]">
      <div class="mr-[20px] mt-[5px]">
        <input
          v-on:click="resetFormData"
          class="bg-white-500 text-black border border-black h-10 w-[120px] cursor-pointer rounded"
          type="submit"
          value="Cancel"
        />
      </div>
      <div class="mr-[60px] mt-[5px]">
        <input
          v-on:click="submitHandle"
          class="bg-blue-500 text-white h-10 w-[120px] cursor-pointer rounded"
          type="submit"
          value="Submit"
        />
      </div>
    </div> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "add-new-scrip",

  setup() {
    const symbolName = ref("");
    const tokenValue = ref("");
    const selectExchange = ref("nse");
    const priceRangeFrom = ref("");
    const priceRangeTo = ref("");
    const lotSize = ref("");
    const tickSize = ref("");
    const groupName = ref("");
    const companyName = ref("");
    const buttonCondition = ref(false);
    const buttonColor = ref("green");
    const errorMessage = ref("");
    const hiddenValue = ref(true);

    return {
      buttonCondition,
      buttonColor,
      symbolName,
      tokenValue,
      selectExchange,
      priceRangeFrom,
      priceRangeTo,
      lotSize,
      tickSize,
      groupName,
      companyName,
      errorMessage,
      hiddenValue,
    };
  },
  methods: {
    ///Check if all the input fields are filled.
    async submitHandle() {
      this.hiddenValue = true;
      let json = {
        symbol: this.symbolName.toUpperCase(),
        token: this.tokenValue,
        exch: this.selectExchange.toUpperCase(),

        lot_size: this.lotSize,
        tick_size: this.tickSize,

        company_name: this.companyName.toUpperCase(),
      };
      await this.$store.dispatch("accessLog/sendNewScript", json);
    },
    validateFileValue() {
      this.hiddenValue = false;

      if (
        this.symbolName == "" ||
        this.tokenValue == "" ||
        this.selectExchange == "" ||
        this.priceRangeFrom == "" ||
        this.priceRangeTo == "" ||
        this.lotSize == "" ||
        this.tickSize == "" ||
        this.companyName == "" ||
        this.groupName == ""
      ) {
        this.errorMessage = "You must add File here to submit";
      } else {
        this.errorMessage = "All files added";
      }
    },
    resetFormData() {
      (this.symbolName = ""),
        (this.tokenValue = ""),
        (this.selectExchange = ""),
        (this.priceRangeFrom = ""),
        (this.priceRangeTo = ""),
        (this.lotSize = ""),
        (this.tickSize = ""),
        (this.companyName = ""),
        (this.groupName = "");
    },
  },
});
</script>
<style>
.svgColor {
  fill: rgb(0, 150, 255);
}

.selectExchangeColor {
  color: #7f7f7f;
}
</style>
