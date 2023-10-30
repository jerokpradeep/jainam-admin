<template>
  <div class="w-full overflow-hidden">
    <div
      class="py-2 inline-block min-w-full sm:px-3 lg:px-4 grid grid-cols-12 w-[100%]"
    >
      <div class="break-after-column col-span-3 bg-white">
        <div class="pl-[20px] mt-[20px]">
          <p class="text-lg font-large mb-4 primaryColor">
            Positions File Upload
          </p>
        </div>
      </div>
      <div class="col-span-5 overflow-hidden h-[300px] bg-white pl-[20px]">
        <div class="mt-[20px]">
          <p class="pb-1 primaryColor">NSE Futures & Options</p>
        </div>
        <div class="border w-full h-10 rounded focus:outline-0 px-4">
          <label>
            <div class="columns-2 flex justify-between align-top">
              <span
                class="mt-2 text-base font-light leading-normal h-[28px] break-after-column w-[90%]"
                >{{ fandoValue }}</span
              >

              <svg
                v-if="fandoValue == 'Select a File'"
                class="w-8 h-9 svgColor"
                fill="fill-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
                />
              </svg>
              <svg
                v-on:click="resetFileValue"
                v-if="fandoValue != 'Select a File'"
                class="w-8 h-9 stroke-blue-500 stroke-[2px] fill-none aria-hidden"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 20"
              >
                <path
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <input
              v-if="fandoValue == 'Select a File'"
              type="file"
              class="hidden"
              @change="handleFileChange($event, 'FandO')"
            />
          </label>
        </div>
        <div class="mt-[15px]">
          <div class="">
            <p class="mb-1 primaryColor">NSE CDS</p>
          </div>
        </div>
        <div class="border w-full h-10 rounded focus:outline-0 px-4">
          <label>
            <div class="columns-2 flex justify-between align-top">
              <span
                class="mt-2 font-light text-base leading-normal h-[28px] flex align-top break-after-column w-[90%]"
                >{{ cdsValue }}</span
              >

              <svg
                v-if="cdsValue == 'Select a File'"
                class="w-8 h-9 svgColor"
                fill="fill-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
                />
              </svg>
              <svg
                v-on:click="resetFileValue"
                v-if="cdsValue != 'Select a File'"
                class="w-8 h-9 stroke-blue-500 stroke-[2px] fill-none aria-hidden"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 20"
              >
                <path
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <input
              v-if="cdsValue == 'Select a File'"
              type="file"
              class="hidden"
              @change="handleFileChange($event, 'cds')"
            />
          </label>
        </div>
        <div class="mt-[15px]">
          <div class="">
            <p class="pb-1 primaryColor">MCX</p>
          </div>
        </div>
        <div class="border w-full h-10 rounded focus:outline-0 px-4">
          <label>
            <div class="columns-2 flex justify-between align-top">
              <span
                class="mt-2 text-base font-light leading-normal h-[28px] flex align-top break-after-column w-[90%]"
                >{{ mcxValue }}</span
              >

              <svg
                v-if="mcxValue == 'Select a File'"
                class="w-8 h-9 svgColor"
                fill="fill-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
                />
              </svg>
              <svg
                v-if="mcxValue != 'Select a File'"
                class="w-8 h-9 stroke-blue-500 stroke-[2px] fill-none aria-hidden"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 20"
              >
                <path
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <input
              v-if="mcxValue == 'Select a File'"
              @change="handleFileChange($event, 'mcx')"
              ref="fileInput"
              type="file"
              class="hidden"
            />
            <h2>{{ errorMessage }}</h2>
          </label>
        </div>
      </div>
      <div class="col-span-4 bg-white"></div>
    </div>
    <div class="h-full flex items-top justify-end w-[100%]">
      <div class="mr-[20px] mt-[10px]">
        <input
          class="bg-white-500 text-black border border-black h-10 w-[120px] cursor-pointer rounded"
          type="submit"
          value="Cancel"
        />
      </div>
      <div class="mr-[60px] mt-[10px]">
        <input
          class="bg-blue-500 text-white h-10 w-[120px] cursor-pointer rounded text-xs"
          v-on:click="validateFileValue"
          type="submit"
          value="Submit"
        />
      </div>
    </div>
    <!-- <div class="p-5">
      Coming soon
    </div> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import handle_file_change from "../../mixins/handle_file_value";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "positions-upload",
  mixins: [handle_file_change],
  setup() {
    // const fileValue = ref("Select a File");
    const fandoValue = ref("Select a File");
    const errorMessage = ref("");
    const toast = useToast();
    const path = ref(
      "M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
    );
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

  methods: {
    ///Check if all the input fields are filled.
    validateFileValue() {
      if (
        this.fandoValue == "Select a File" ||
        this.cdsValue == "Select a File" ||
        this.mcxValue == "Select a File"
      ) {
        this.toast.error("You must add all the files submit", {
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

    //Reset FileValue conditionally
    resetFileValue() {
      setTimeout(() => {
        if (this.fandoValue != "Select a File") {
          this.fandoValue = "Select a File";
        }
        if (this.cdsValue != "Select a File") {
          this.cdsValue = "Select a File";
        }
        if (this.mcxValue != "Select a File") {
          this.mcxValue = "Select a File";
        }
      }, 1);
      // if (this.fandoValue != "Select a File") {
      //   this.fandoValue = "Select a File";
      // }
    },
  },
});
</script>
