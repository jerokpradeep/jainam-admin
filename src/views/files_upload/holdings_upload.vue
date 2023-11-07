<template>
  <div class="w-full overflow-hidden">
    <div class="py-2 min-w-full sm:px-3 lg:px-4 grid grid-cols-12 w-[100%]">
      <div class="break-after-column col-span-3 bg-white">
        <div class="pl-[20px] mt-[20px]">
          <p class="text-sm font-large mb-4 primaryColor">
            Holdings File Upload
          </p>
        </div>
      </div>
      <div class="col-span-5 overflow-hidden h-[300px] bg-white pl-[20px]">
        <div class="overflow-hidden mt-[20px]">
          <div class="flex items-center">
            <p class="mb-1 primaryColor text-sm">DP Holdings</p>
            <spin-loader v-if="getDPLoader" />
          </div>
        </div>

        <div class="">
          <div class="border w-full h-10 rounded focus:outline-0 px-4">
            <form>
              <label>
                <div class="columns-2 flex justify-between align-top">
                  <span class="mt-2 text-xs font-light leading-normal h-[28px] break-after-column w-[90%]">{{ dpHoldFile
                  }}</span>
                  <svg v-if="dpHoldFile == 'Select a File'" class="w-8 h-9 svgColor" fill="fill-blue-500"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path
                      d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <svg v-on:click="resetFileValue('dp')" v-if="dpHoldFile != 'Select a File'"
                    class="w-8 h-9 stroke-blue-500 stroke-[2px] fill-none aria-hidden" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 22 20">
                    <path d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input v-if="dpHoldFile == 'Select a File'" accept=".txt"
                  v-on:change="handleFileChangeHoldings($event, 'DP')" type="file" class="hidden" />
              </label>
            </form>
          </div>
        </div>

        <div class="overflow-hidden mt-[20px]">
          <div class="flex items-center">
            <p class="mb-1 primaryColor text-sm">T1 Holdings</p>
            <spin-loader v-if="getT1Loader" />
          </div>
        </div>

        <div class="h-[50%]">
          <div class="border w-full h-10 rounded focus:outline-0 px-4">
            <form>
              <label>
                <div class="columns-2 flex justify-between align-top">
                  <span class="mt-2 text-xs font-light leading-normal h-[28px] break-after-column w-[90%]">{{ t1HoldFile
                  }}</span>
                  <svg v-if="t1HoldFile == 'Select a File'" class="w-8 h-9 svgColor" fill="fill-blue-500"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path
                      d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <svg v-on:click="resetFileValue('dp')" v-if="t1HoldFile != 'Select a File'"
                    class="w-8 h-9 stroke-blue-500 stroke-[2px] fill-none aria-hidden" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 22 20">
                    <path d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input v-if="t1HoldFile == 'Select a File'" accept=".txt"
                  v-on:change="handleFileChangeHoldings($event, 'T1')" type="file" class="hidden" />
              </label>
            </form>
          </div>
        </div>
      </div>

      <div class="col-span-4 bg-white"></div>
    </div>
    <div class="h-full flex items-top justify-end w-[100%]">
      <div class="mr-[60px] mt-[10px]">
        <button class="bg-blue-500 text-white h-10 w-[120px] cursor-pointer rounded text-xs" :disabled="getLoader"
          @click="submitHoldingFile()">
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
import { useToast } from "vue-toastification";
import handle_file_change from "../../mixins/handle_file_value";
import { mapGetters } from "vuex"

export default defineComponent({
  mixins: [handle_file_change],
  name: "holdings-upload",
  setup() {
    const dpHoldFile = ref("Select a File");
    const t1HoldFile = ref("Select a File");
    const toast = useToast();
    return {
      dpHoldFile,
      t1HoldFile,
      toast,
    };
  },
  computed: {
    ...mapGetters('fileupload', ['getDPLoader', 'getT1Loader', 'getLoader'])
  },
  methods: {
    validateFileValue() {
      if (this.priceAndQuantityValue == "Select a File") {
        this.toast.error("You must add File here to submit", {
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: false,
          closeButton: "button",
          icon: "fas fa-rocket",
          rtl: false,
        });
      }
    },

    // Clears file from input field.
    resetFileValue(type: string) {
      setTimeout(() => {
        if (type == 'dp') {
          this.dpHoldFile = "Select a File";
        } else if (type == 't1') {
          this.t1HoldFile = "Select a File";
        }
      });
    },
  },
});
</script>
<style>
.svgColor {
  fill: rgb(0, 150, 255);
}
</style>
