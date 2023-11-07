<template>
  <div class="w-full">
    <div class="py-2 min-w-full sm:px-3 lg:px-4 grid grid-cols-12 w-[100%]">
      <div class="break-after-column col-span-3 bg-white">
        <div class="pl-[20px] mt-[20px]">
          <p class="text-lg font-large mb-4 primaryColor">Add New Scrip</p>
        </div>
      </div>
      <div class="col-span-5 bg-white pl-[20px]">
        <div class="h-[80%] mt-[20px]">
          <form id="form" @submit.prevent="summitradio()">
            <div class="pb-1 pt-4">
              <label class="primaryColor" for="">Symbol Name</label>
            </div>

            <input type="text" ref="userID" id="logsId" v-model="symbolName" autocomplete="off"
              placeholder="Enter Symbol Name"
              class="border font-light w-full h-10 rounded px-4 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
            <div class="h-[15px]">
              <p v-if="symbolName == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                Symbol Name is required*
              </p>
            </div>

            <!--  -->
            <div class="columns-2 pb pt-4">
              <label class="primaryColor flex justify-start" for="">Token</label>
              <label class="primaryColor flex justify-start" for="">
                <div class="pl-2">Select Exchange</div>
              </label>
            </div>
            <div class="columns-2 flex justify-between pb-1">
              <input type="number" ref="userID" id="logsId" v-model="tokenValue" autocomplete="off"
                placeholder="Enter Token"
                class="border font-light w-[47%] h-10 rounded focus:outline-0 px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
              <select v-model="selectExchange"
                class="border w-[47%] h-10 rounded px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500">
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
                <p v-if="tokenValue == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                  Token is required*
                </p>
              </div>
              <div class="h-[15px] pl-[15px]">
                <p v-if="selectExchange == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                  Exchange is required*
                </p>
              </div>
            </div>
            <!--  -->

            <div class="columns-2 pb pt-4">
              <label class="text-md font-small mb-1 primaryColor flex justify-start" for="">Strike Price</label>
              <label class="text-md font-small mb-1 primaryColor flex justify-start" for="">
                <div class="pl-2">Previous Day Close</div>
              </label>
            </div>
            <div class="columns-2 flex justify-between pb-1">
              <input type="number" ref="userID" id="logsId" autocomplete="off" v-model="strikeprizeFrom"
                placeholder="Enter strike price"
                class="border font-light w-[47%] h-10 rounded focus:outline-0 px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
              <input type="number" ref="userID" id="logsId" autocomplete="off" v-model="pdc"
                placeholder="Enter Previous Day Close"
                class="border font-light w-[47%] h-10 rounded focus:outline-0 px-4 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
            </div>
            <div class="grid grid-cols-2 justify-left pb-1">
              <div class="h-[15px] col-span-1">
                <p v-if="strikeprizeFrom == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                  Strike price is required*
                </p>
              </div>
              <div class="h-[15px] pl-[15px]">
                <p v-if="pdc == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                  PDC is required*
                </p>
              </div>
            </div>


            <div class="h-[14px]"></div>
            <div class="columns-2 pb pt-2">
              <label class="text-md font-small mb-1 primaryColor flex justify-start" for="">Lot Size</label>
              <label class="text-md font-small mb-1 primaryColor flex justify-start" for="">
                <div class="pl-2">Tick Size</div>
              </label>
            </div>
            <div class="columns-2 flex justify-between pb-1">
              <input type="number" ref="userID" id="logsId" v-model="lotSize" autocomplete="off"
                placeholder="Enter Lot Size"
                class="border font-light w-[47%] h-10 rounded focus:outline-0 px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
              <input type="number" ref="userID" id="logsId" v-model="tickSize" autocomplete="off"
                placeholder="Enter Tick Size"
                class="border font-light w-[47%] h-10 rounded focus:outline-0 px-4 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
            </div>
            <div class="grid grid-cols-2 justify-left pb-1">
              <div class="h-[15px] col-span-1">
                <p v-if="lotSize == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                  Lot Size is required*
                </p>
              </div>
              <div class="h-[15px] pl-[15px]">
                <p v-if="tickSize == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                  Tick Size is required*
                </p>
              </div>
            </div>
            <!--  -->
            <div class="h-[14px]"></div>
            <div class="columns-2 pb pt-2">
              <label class="text-md font-small mb-1 primaryColor flex justify-start" for="">Freeze Quantity</label>
              <label class="text-md font-small mb-1 primaryColor flex justify-start" for="">
                <div class="pl-2"> Instrument Name</div>
              </label>
            </div>
            <div class="columns-2 flex justify-between pb-1">
              <input type="number" ref="userID" id="logsId" v-model="freezequantity" autocomplete="off"
                placeholder="Enter Freeze Quantity"
                class="border font-light w-[47%] h-10 rounded focus:outline-0 px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
              <input type="text" ref="userID" id="logsId" v-model="instrumentname" autocomplete="off"
                placeholder="Enter Instrument Name"
                class="border font-light w-[47%] h-10 rounded focus:outline-0 px-4 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
            </div>
            <div class="grid grid-cols-2 justify-left pb-1">
              <div class="h-[15px] col-span-1">
                <p v-if="freezequantity == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                  freeze Quantity is required*
                </p>
              </div>
              <div class="h-[15px] pl-[15px]">
                <p v-if="instrumentname == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                  Instrument Name is required*
                </p>
              </div>
            </div>

            <!-- 1 -->
            <!--  2-->
            <div class="columns-2 pb pt-4">
              <label class="primaryColor flex justify-start" for="">Token</label>
              <label class="primaryColor flex justify-start" for="">
                <div class="pl-2">Select Option Type</div>
              </label>
            </div>
            <div class="columns-2 flex justify-between pb-1">
              <input type="number" ref="userID" id="logsId" v-model="tokenValue" autocomplete="off"
                placeholder="Enter Token"
                class="border font-light w-[47%] h-10 rounded focus:outline-0 px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
              <select v-model="optiontype"
                class="border w-[47%] h-10 rounded px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500">
                <option class="selectExchangeColor" value="CE" selected>
                  CE
                </option>

                <option value="pe">PE</option>

              </select>
            </div>
            <div class="grid grid-cols-2 justify-left pb-1">
              <div class="h-[15px] col-span-1">
                <p v-if="tokenValue == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                  Token is required*
                </p>
              </div>
              <div class="h-[15px] pl-[15px]">
                <p v-if="optiontype == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                  Optiontype is required*
                </p>
              </div>
            </div>

            <!--2  -->
            <!--  -->
            <div class="columns-2 pb pt-4">
              <label class="primaryColor flex justify-start" for="">Alter Token</label>
              <label class="primaryColor flex justify-start" for="">
                <div class="pl-2">Select Instrument Type</div>
              </label>
            </div>
            <div class="columns-2 flex justify-between pb-1">
              <input type="number" ref="userID" id="logsId" v-model="altertoken" autocomplete="off"
                placeholder="Enter Alter Token"
                class="border font-light w-[47%] h-10 rounded focus:outline-0 px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
              <select v-model="instrumenttype"
                class="border w-[47%] h-10 rounded px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500">
                <option class="selectExchangeColor" value="OPTIDX" selected>
                  OPTIDX
                </option>
                <option value="futcur">FUTCUR</option>
                <option value="futcom">FUTCOM</option>
                <option value="optcom">OPTCOM</option>
                <option value="optcur">OPTCUR</option>
                <option value="optstk">OPTSTK</option>
                <option value="futstk">FUTSTK</option>
                <option value="futidx">FUTIDX</option>


              </select>
            </div>
            <div class="grid grid-cols-2 justify-left pb-1">
              <div class="h-[15px] col-span-1">
                <p v-if="altertoken == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                  Alter Token is required*
                </p>
              </div>
              <div class="h-[15px] pl-[15px]">
                <p v-if="instrumenttype == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                  Instrument type is required*
                </p>
              </div>
            </div>
            <!--  -->

            <div class="h-[14px]"></div>
            <div class="columns-2 pb pt-2">
              <label class="text-md font-small mb-1 primaryColor flex justify-start" for="">Formatted instrument
                Name</label>
              <label class="text-md font-small mb-1 primaryColor flex justify-start" for="">
                <div class="pl-2"> ISIN</div>
              </label>
            </div>
            <div class="columns-2 flex justify-between pb-1">
              <input type="text" ref="userID" id="logsId" v-model="formattedinsname" autocomplete="off"
                placeholder="Enter Formatted Instrument Name"
                class="border font-light w-[47%] h-10 rounded focus:outline-0 px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
              <input type="text" ref="userID" id="logsId" v-model="ISIN" autocomplete="off" placeholder="Enter ISIN"
                class="border font-light w-[47%] h-10 rounded focus:outline-0 px-4 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
            </div>
            <div class="grid grid-cols-2 justify-left pb-1">
              <div class="h-[15px] col-span-1">
                <p v-if="formattedinsname == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                  Formatted Instrument Name is required*
                </p>
              </div>
              <div class="h-[15px] pl-[15px]">
                <p v-if="ISIN == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                  ISIN is required*
                </p>
              </div>
            </div>
            <!--  -->

            <div class="columns-2 pb pt-2">
              <label class="text-md font-small mb-1 primaryColor flex justify-start" for="">Trading Symbol</label>
              <label class="text-md font-small mb-1 primaryColor flex justify-start" for="">
                <div class="pl-2">Company Name</div>
              </label>
            </div>
            <div class="columns-2 flex justify-between pb-1">
              <input type="text" ref="userID" id="logsId" autocomplete="off" v-model="tradingsymbol"
                placeholder="Enter Trading Symbol"
                class="border font-light h-10 w-[47%] rounded focus:outline-0 px-4 pb focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
              <input type="text" ref="userID" id="logsId" v-model="companyName" autocomplete="off"
                placeholder="Enter Company Name"
                class="border font-light h-10 w-[47%] rounded focus:outline-0 px-4 pb focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />
            </div>
            <div class="grid grid-cols-2 justify-left pb-1">
              <div class=" h-[15px] col-span-1">
                <p v-if="tradingsymbol == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                  Trading symbol is required*
                </p>
              </div>
              <div class="h-[15px] pl-[15px]">
                <p v-if="companyName == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                  Company Name is required*
                </p>
              </div>
            </div>
            <!--  -->

            <div class="columns-2 pb pt-4">
              <label class="primaryColor flex justify-start" for="">Expiry Date</label>
              <label class="primaryColor flex justify-start" for="">
                <div class="pl-2">Select Exchange Segment</div>
              </label>
            </div>
            <div class="columns-2 flex justify-between pb-1">
              <input :type="validTab == 'Accesslog' ? 'datetime-local' : 'date'" v-model="expirydate"
                class="border w-[47%] justify-start h-10 rounded focus:outline-0 px-4 text-xs  h-10 rounded px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
                :max="new Date().toISOString().slice(0, 10)" />

              <select v-model="exchangesegment"
                class="border w-[47%] h-10 rounded px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500">
                <option class="selectExchangeColor" value="nse_fo" selected>
                  nse_fo
                </option>


                <option value="cde_fo">cde_fo</option>

              </select>
            </div>
            <div class="grid grid-cols-2 justify-left pb-1">
              <div class="h-[15px] col-span-1">
                <!-- <p v-if="altertoken == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                  Alter Token is  required*
                </p> -->
              </div>
              <div class="h-[15px] pl-[15px]">
                <p v-if="instrumenttype == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                  Exchange Segment is required*
                </p>
              </div>
            </div>
            <div class="columns-2 pb pt-2">
              <!-- <label class="text-md font-small mb-1 primaryColor flex justify-start" for=""></label> -->
              <label class="text-md font-small mb-1 primaryColor flex justify-start" for="">
                <div class="pl-2">Week Tag</div>
              </label>
            </div>
            <div class=" columns-2 flex justify-start gap-x-5 pb-1">
              <!-- <input :type="validTab == 'Accesslog' ? 'datetime-local' : 'date'" v-model="expirydate"
                class="border w-[47%] justify-start h-10 rounded focus:outline-0 px-4 text-xs  h-10 rounded px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
                :max="new Date().toISOString().slice(0, 10)" /> -->

              <label class="w-[10%] pt-2 align-center">
                <input type="radio" name="weektag" v-model="weektag" value="W"
                  class="display-block w-[30px] p-3">W</label>
              <label class="w-[10%] pt-2 align-center">
                <input type="radio" name="weektag" v-model="weektag" value="M"
                  class="display-block w-[30px] p-3">M</label>
              <label class="w-[10%] pt-2 align-center">
                <input type="radio" name="weektag" v-model="weektag" value="Y" class="display-block w-[30px] p-3">




                Y</label>


            </div>
            <!-- <div class="grid grid-cols-2  pb-1 ">
              <div class=" h-[15px] col-span-1 ">
                 <p v-if="expirydate == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                  Expiry date is required*
                </p> 
                <div class="h-[15px] pl-[15px]">
                  <p v-if="weektag == ''" :hidden="hiddenValue" class="text-[12px] text-red-500">
                    weektag is required*
                  </p>
                </div>
              </div>
            </div> -->

            <!--  -->
            <!--  -->
            <!--  -->


            <!-- <p class=" flex justify-start primaryColor pb-1 text-sm"> </p>
              <div class="columns-2 flex justify-between pb-1"> 
                <div class="columns-2 flex justify-between pb-1">
                  <input
                  :type="validTab == 'Accesslog' ? 'datetime-local' : 'date'"
                  v-model="expirydate"
                   class="border w-[47%] justify-start h-10 rounded focus:outline-0 px-4 text-xs  h-10 rounded px-4 col-span-1 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500"
                    :max="new Date().toISOString().slice(0, 10)"
                                 />
                    </div> 
                  </div>
               </div>
               <div class="grid grid-cols-2 justify-left pb-1">
                  <div class="h-[15px] col-span-1">
                  <p
                    v-if="expirydate == ''"
                    :hidden="hiddenValue"
                    class="text-[12px] text-red-500"
                      >
                  expiry date is required*
                 </p>
              </div>
              </div> -->






            <!-- reset enableing  -->
            <div class="h-[8px]"></div>
            <div class="grid grid-cols-4 pb-4 pt-4">
              <div>
                <div class="flex items-center justify-end pb-4 pt-4 pr-4">
                  <input v-model="buttonCondition" id="default-radio-1" type="checkbox" value="" autocomplete="off"
                    name="default-radio"
                    class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                </div>
              </div>
              <div class="col-span-2">
                <label for="default-radio-1" class="text-left text-sm text-red-500 dark:text-gray-300">USE WITH
                  CAUTION-Reload Contract/Script Cache</label>
              </div>
              <div class="flex justify-end">
                <button :disabled="!buttonCondition" :class="!buttonCondition ? '' : 'bg-blue-600 hover:bg-blue-500'"
                  class="h-10 w-[120px] border rounded" @click="reset_confirmation()">
                  Reset
                </button>
              </div>
            </div>
          </form>
          <div class="h-[14px]"></div>
        </div>
      </div>
      <div class="break-before-column col-span-4 bg-white flex align-top justify-end">
        <!-- side button -->
        <p class="pr-[10px] mt-[20px]">
          <button class="text-blue-500" @click="resetFormData">Reset</button>
        </p>
      </div>
    </div>
    <div class="h-full flex items-top justify-end p-4 w-[100%]">
      <div class="mr-[20px] mt-[5px]">
        <input v-on:click="resetFormData"
          class="bg-white-500 hover:bg-black-700 text-black border border-black  h-10 w-[120px] cursor-pointer rounded"
          type="submit" autocomplete="off" value="Cancel" />
      </div>
      <div class="mr-[60px] mt-[5px]">
        <input v-on:click="validateFileValue()" autocomplete="off"
          class="bg-blue-600 hover:bg-blue-500 text-white h-10 w-[120px] cursor-pointer rounded" type="submit"
          value="Submit" />
      </div>
    </div>

    <reset_confirmation v-if="resetdialogue == true"></reset_confirmation>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapState } from "vuex";
import reset_confirmation from "../contracts/reset_confirmation.vue";
export default defineComponent({
  name: "add-new-scrip",

  setup() {
    const symbolName = ref("");
    const tokenValue = ref("");
    const selectExchange = ref("nse");
    const strikeprizeFrom = ref("");
    const pdc = ref("");
    const expirydate = ref();
    const freezequantity = ref("");
    const formattedinsname = ref("");
    const optiontype = ref('CE');
    const instrumenttype = ref('OPTIDX');
    const exchangesegment = ref('nse_fo');
    const altertoken = ref('');
    const lotSize = ref("");
    const tickSize = ref("");
    const ISIN = ref("");
    const instrumentname = ref("");
    const tradingsymbol = ref("");
    const companyName = ref("");
    const buttonCondition = ref(false);
    const buttonColor = ref("green");
    const errorMessage = ref("");
    const hiddenValue = ref(true);
    const validTab = ref("");
    const weektag = ref('');
    const weektagvalid = ref('');



    return {
      buttonCondition,
      buttonColor,
      symbolName,
      tokenValue,
      selectExchange,
      strikeprizeFrom,
      pdc,
      lotSize,
      freezequantity,
      optiontype,
      formattedinsname,
      instrumentname,
      instrumenttype,
      exchangesegment,
      altertoken,
      ISIN,
      tickSize,
      tradingsymbol,
      companyName,
      errorMessage,
      hiddenValue,
      expirydate,
      validTab,
      weektag,
      weektagvalid,


    };

  },
  components: {
    reset_confirmation,
  },
  methods: {
    ///Check if all the input fields are filled.
    async submitHandle() {
      this.hiddenValue = true;

      let json = {
        symbol: this.symbolName.toUpperCase(),
        token: this.tokenValue,
        exch: this.selectExchange.toUpperCase(),
        strike_price: this.strikeprizeFrom,
        trading_symbol: this.tradingsymbol.toUpperCase(),
        pdc: this.pdc,
        freeze_qty: this.freezequantity,
        instrument_name: this.instrumentname.toUpperCase(),
        formatted_ins_name: this.formattedinsname.toUpperCase(),
        isin: this.ISIN,
        instrument_type: this.instrumenttype.toUpperCase(),
        alter_token: this.altertoken,
        exchange_segment: this.exchangesegment,
        expiry_date: this.expirydate?.replace("T", " "),
        week_tag: this.weektag,

        option_type: this.optiontype.toUpperCase(),
        lot_size: this.lotSize,
        tick_size: this.tickSize,

        company_name: this.companyName.toUpperCase(),
      };
      await this.$store.dispatch("accessLog/sendNewScript", json).then((res: any) => {
        if (res) {
          this.resetFormData();
        }
      });

    },
    validateFileValue() {

      this.hiddenValue = false;

      if (
        this.symbolName == "" ||
        this.tokenValue == "" ||
        this.selectExchange == "" ||
        this.exchangesegment == "" ||
        this.strikeprizeFrom == "" ||
        this.pdc == "" ||
        this.lotSize == "" ||
        this.freezequantity == "" ||
        this.tickSize == "" ||
        this.formattedinsname == "" ||
        this.ISIN == "" ||
        this.optiontype == "" ||
        this.instrumentname == "" ||
        this.companyName == "" ||
        this.tradingsymbol == ""
      ) {
        this.errorMessage = "You must add File here to submit";
      } else {
        this.errorMessage = "All files added";
        this.submitHandle();
      }
    },
    summitradio() {
      if (this.weektag) {
        this.weektagvalid = this.weektag;
        this.submitHandle();

      }
    },
    reset_confirmation() {
      this.$store.commit("cMaster/setresetdialogue", true);

    },



    resetFormData() {
      (this.symbolName = ""),
        (this.tokenValue = ""),
        (this.selectExchange = ""),
        (this.exchangesegment = ""),
        (this.strikeprizeFrom = ""),
        (this.pdc = ""),
        (this.lotSize = ""),
        (this.freezequantity = ""),
        (this.formattedinsname = ""),
        (this.expirydate = ""),
        (this.ISIN = ""),
        (this.weektag = ""),
        (this.optiontype = ""),
        (this.instrumentname = ""),
        (this.tickSize = ""),
        (this.companyName = ""),
        (this.tradingsymbol = "")
    },
  },
  computed: {
    ...mapState("cMaster", ["resetdialogue"]),
  },
  // created() {
  //   this.$store.dispatch(this);
  // },
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
