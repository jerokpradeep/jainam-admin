<template>
  <div>
    <TransitionRoot appear :show="getIsAccessLog" as="template">
      <Dialog as="div" class="relative z-10" @close="closeDialog()">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden radius p-6 text-left align-middle bg-white rounded max-h-[500px] overflow-y-auto"
              >
                <DialogTitle
                  as="h3"
                  class="text-base pb-2 font-medium leading-6 primaryColor"
                >
                  <div>
                    <div class="flex border-b pb-4">
                      <p>JSON</p>
                    </div>
                    <div class="flex justify-between mt-4">
                      <p>Request Body:</p>
                      <button
                        class="border px-4 h-8 rounded"
                        @click="copyRequestBody()"
                      >
                        {{ copyText ? "Copy" : "Copied" }}
                      </button>
                    </div>
                    <JsonViewer :value="getValue('req')" />

                    <div class="flex justify-between mt-6">
                      <p>Response Body:</p>
                    </div>
                    <JsonViewer :value="getValue('res')" />
                    <button
                      class="border px-4 h-8 rounded flex ml-auto"
                      @click="copyResponseBody()"
                    >
                      {{ copyTextRes ? "Copy" : "Copied" }}
                    </button>
                    <!-- <JsonViewer :value="getAccessRow?.resBody" v-if="getIsAccessLog && getAccessRow?.resBody"/> -->
                  </div>
                </DialogTitle>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { JsonViewer } from "vue3-json-viewer";
import "vue3-json-viewer/dist/index.css";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
export default {
  data() {
    return {
      formateJSON: false,
      copyText: true,
      copyTextRes: true,
    };
  },
  methods: {
    closeDialog() {
      this.$store.commit("accessLog/setIsAccessLog", {
        isOpen: false,
        data: this.getAccessRow,
      });
    },
    copyRequestBody() {
      this.copyText = false;
      navigator.clipboard.writeText(this.getAccessRow.reqBody);
      var textarea = document.getElementById("jsonData");
      var ok = document.execCommand("copy");
      setInterval(() => {
        this.copyText = true; // Hide the text after 2 seconds
      }, 2000);
    },
    copyResponseBody() {
      this.copyTextRes = false;
      navigator.clipboard.writeText(this.getAccessRow.resBody);
      var textarea = document.getElementById("jsonDataRes");
      var ok = document.execCommand("copy");
      setInterval(() => {
        this.copyTextRes = true; // Hide the text after 2 seconds
      }, 2000);
    },

    getValue(type) {
      if (type == "req") {
        return this.getAccessLogType
          ? this.isJsonString(this.getAccessRow?.req_body)
          : this.isJsonString(this.getAccessRow?.reqBody);
      } else {
        return this.getAccessLogType
          ? this.isJsonString(this.getAccessRow?.res_body)
          : this.isJsonString(this.getAccessRow?.resBody);
      }
    },

    isJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return str;
      }
      return JSON.parse(str);
    },
  },
  computed: {
    ...mapGetters("accessLog", [
      "getIsAccessLog",
      "getLogDeatails",
      "getAccessRow",
      "getAccessLogType",
    ]),
  },

  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
    JsonViewer,
  },
};
</script>
