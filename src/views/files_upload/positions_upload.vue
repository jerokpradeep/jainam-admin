<template>
  <div class="w-full overflow-hidden">
    <div class="py-2 inline-block min-w-full sm:px-3 lg:px-4 grid grid-cols-12 w-[100%]">
      <div class="break-after-column col-span-3 bg-white">
        <div class="pl-[20px] mt-[20px]">
          <p class="text-sm font-large mb-4 primaryColor">
            Positions File Upload
          </p>
        </div>
      </div>
      <div class="col-span-5 overflow-hidden h-[300px] bg-white pl-[20px]">
        <div class="mt-[20px] flex items-center gap-2">
          <p class="pb-1 primaryColor text-sm">NSE Futures & Options</p>
          <spin-loader v-if="getNfoLoader" />
        </div>
        <div class="border w-full h-10 rounded focus:outline-0 px-4">
          <label>
            <div class="columns-2 flex justify-between items-center">
              <span class=" text-xs font-light leading-normal h-[28px] break-after-column w-[90%] flex items-center">{{
                fandoValue }}</span>

              <svg v-if="fandoValue == 'Select a File'" class="w-8 h-9 svgColor" fill="fill-blue-500"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                  d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <svg @click="resetFileValue('NFO')" v-if="fandoValue != 'Select a File'"
                class="w-8 h-9 stroke-blue-500 stroke-[2px] fill-none aria-hidden" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 20">
                <path d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <input v-if="fandoValue == 'Select a File'" type="file" class="hidden" accept=".xls"
              @change="handleFileChangePosition($event, 'NFO')" />
          </label>
        </div>
        <div class="mt-[15px]">
          <div class="flex items-center">
            <p class="mb-1 primaryColor text-sm">NSE CDS</p>
            <spin-loader v-if="getCdsLoader" />
          </div>
        </div>
        <div class="border w-full h-10 rounded focus:outline-0 px-4">
          <label>
            <div class="columns-2 flex justify-between items-center align-top">
              <span class=" font-light text-xs leading-normal h-[28px] flex items-center break-after-column w-[90%]">{{
                cdsValue }}</span>
              <svg v-if="cdsValue == 'Select a File'" class="w-8 h-9 svgColor" fill="fill-blue-500"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                  d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <svg @click="resetFileValue('CDS')" v-if="cdsValue != 'Select a File'"
                class="w-8 h-9 stroke-blue-500 stroke-[2px] fill-none aria-hidden" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 20">
                <path d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <input v-if="cdsValue == 'Select a File'" type="file" class="hidden" accept=".xls"
              @change="handleFileChangePosition($event, 'CDS')" />
          </label>
        </div>
        <div class="mt-[15px]">
          <div class="flex items-center">
            <p class="pb-1 primaryColor text-sm">MCX</p>
            <spin-loader v-if="getMcxLoader" />
          </div>
        </div>
        <div class="border w-full h-10 rounded focus:outline-0 px-4">
          <label>
            <div class="columns-2 flex justify-between items-center align-top">
              <span class=" text-xs font-light leading-normal h-[28px] flex items-center break-after-column w-[90%]">{{
                mcxValue }}</span>

              <svg v-if="mcxValue == 'Select a File'" class="w-8 h-9 svgColor" fill="fill-blue-500"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                  d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <svg @click="resetFileValue('MCX')" v-if="mcxValue != 'Select a File'"
                class="w-8 h-9 stroke-blue-500 stroke-[2px] fill-none aria-hidden" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 20">
                <path d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <input v-if="mcxValue == 'Select a File'" accept=".xls" @change="handleFileChangePosition($event, 'MCX')"
              ref="fileInput" type="file" class="hidden" />
            <h2>{{ errorMessage }}</h2>
          </label>
        </div>
      </div>
      <div class="col-span-4 bg-white"></div>
    </div>
    <div class="h-full flex items-top justify-end w-[100%]">
      <div class="mr-[60px] mt-[10px]">
        <!-- <input class="bg-blue-500 text-white h-10 w-[120px] cursor-pointer rounded text-xs" v-on:click="submitPositionsFile()"
          type="submit" value="Submit" /> -->

        <button class="bg-blue-500 text-white h-10 w-[120px] cursor-pointer rounded text-xs" :disabled="getLoader"
          @click="submitPositionsFile()">
          <p v-if="!getLoader">Submit</p>
          <svg v-if="getLoader" class="animate-spin h-5 w-5 text-white flex mx-auto" xmlns="http://www.w3.org/2000/svg"
            fill="#fffff" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#fffff" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import handle_file_change from "../../mixins/handle_file_value";
import { useToast } from "vue-toastification";
import { mapGetters } from "vuex"

export default defineComponent({
  name: "positions-upload",
  mixins: [handle_file_change],
  setup() {
    // const fileValue = ref("Select a File");

    const errorMessage = ref("");
    const toast = useToast();
    const path = ref(
      "M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
    );
    const fandoValue = ref("Select a File");
    const cdsValue = ref("Select a File");
    const mcxValue = ref("Select a File");

    return {
      fandoValue,
      errorMessage,
      cdsValue,
      mcxValue,
      path,
      toast,
    };
  },
  getNfoLoader: (state: any) => state.nfoLoader,
  getCdsLoader: (state: any) => state.cdsLoader,
  getMcxLoader: (state: any) => state.mcxLoader,
  getPoaLoader: (state: any) => state.poaLoader,
  getDPLoader: (state: any) => state.DPLoader,
  getT1Loader: (state: any) => state.T1Loader,

  computed: {
    ...mapGetters('fileupload', ['getNfoLoader', 'getCdsLoader', 'getMcxLoader', 'getDPLoader', 'getT1Loader', 'getLoader'])
  },

  methods: {
    ///Check if all the input fields are filled.
    // validateFileValue() {
    //   if (
    //     this.fandoValue == "Select a File" ||
    //     this.cdsValue == "Select a File" ||
    //     this.mcxValue == "Select a File"
    //   ) {
    //     this.toast.error("You must add all the files submit", {
    //       timeout: 5000,
    //       closeOnClick: true,
    //       pauseOnFocusLoss: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       draggablePercent: 0.6,
    //       showCloseButtonOnHover: false,
    //       hideProgressBar: false,
    //       closeButton: "button",
    //       icon: "fas fa-rocket",
    //       rtl: false,
    //     });
    //   }
    // },

    //Reset FileValue conditionally
    resetFileValue(type: string) {
      setTimeout(() => {
        // if (this.fandoValue != "Select a File") {
        //   this.fandoValue = "Select a File";
        // }
        // if (this.cdsValue != "Select a File") {
        //   this.cdsValue = "Select a File";
        // }
        // if (this.mcxValue != "Select a File") {
        //   this.mcxValue = "Select a File";
        // }

        if (type == 'NFO') {
          this.fandoValue = "Select a File";
        } else if (type == 'CDS') {
          this.cdsValue = "Select a File";
        } else if (type == 'MCX') {
          this.mcxValue = "Select a File";
        }
      }, 1);
    },
  },
});
</script>
