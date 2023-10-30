<template>
  <div class="p-4 h-full">
    <div class="card p-4">
      <div
        class="mb-6 gap-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-6"
      >
        <div>
          <p class="primaryColor pb-1 text-sm">From Date</p>
          <input
            type="date"
            v-model="fromDate"
            class="border w-full h-10 rounded focus:outline-0 px-4 text-xs"
            :max="new Date().toISOString().slice(0, 10)"
          />
        </div>
        <div>
          <p class="primaryColor pb-1 text-sm">To Date</p>
          <input
            type="date"
            v-model="toDate"
            :disabled="!fromDate"
            :max="new Date().toISOString().slice(0, 10)"
            :min="fromDate"
            class="border w-full h-10 rounded focus:outline-0 px-4 text-xs"
          />
        </div>
        <div class="flex items-end">
          <button
            class="bg-blue-500 text-white h-10 w-[120px] cursor-pointer rounded text-xs"
            :disabled="getLoader"
            @click="getDetails()"
          >
            <p v-if="!getLoader">Submit</p>
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
          <button
            class="bg-blue-500 text-white h-10 w-[120px] ml-6 cursor-pointer rounded text-xs"
            :disabled="downloadLoader"
            @click="
              $store.dispatch('accessLog/feedbackdownloadFile', {
                fromDate: fromDate,
                toDate: toDate,
              })
            "
            v-if="FeedbackDetails.length > 0"
          >
            <p v-if="!downloadLoader">Download</p>
            <svg
              v-if="downloadLoader"
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

      <div class="border rounded mt-2" v-if="FeedbackDetails.length">
        <table class="w-full">
          <thead class="text-[13px]">
            <tr class="border-b">
              <th class="border-r text-center">S.No</th>
              <th class="border-r">Date</th>
              <th class="border-r">Comments</th>
              <th class="border-r">Question</th>
              <th class="border-r">Suggestion</th>
              <th class="border-r">Ratings</th>
              <th class="border-r">Source</th>
              <th class="">Version</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr v-for="(i, id) in FeedbackDetails" :key="id" class="">
              <td class="truncate border-r text-center">{{ id + 1 }}</td>
              <td class="truncate border-r text-center">{{ i.date }}</td>

              <td class="truncate border-r text-center">{{ i.comments }}</td>
              <td class="truncate border-r text-center">{{ i.question }}</td>
              <td class="truncate border-r text-center">{{ i.suggestion }}</td>
              <td class="truncate border-r text-center">{{ i.ratings }}</td>
              <td class="truncate border-r text-center">{{ i.source }}</td>
              <td class="truncate text-center">{{ i.version }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters, mapState } from "vuex";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/20/solid";
export default defineComponent({
  name: "feedback",
  setup() {
    const fromDate = ref("");
    const toDate = ref("");
    const maxDateToDate = ref("");
    const page = ref(1);
    const pages = ref([]);
    return {
      fromDate,
      toDate,
      maxDateToDate,
      page,
      pages,
    };
  },
  components: {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
  },
  methods: {
    addDays(first: string) {
      if (first == "fromDate") {
        this.toDate = "";
      }
      this.maxDateToDate = this.fromDate;
    },
    getDetails() {
      if (this.fromDate && this.toDate) {
        let json: Object = {
          fromDate: this.fromDate,
          toDate: this.toDate,
        };

        this.$store.dispatch("accessLog/callFeedbackReport", json);
      } else {
        this.$notify({
          group: "auth",
          type: "error",
          title: `Select a from Date and To date`,
        });
      }
    },
  },
  computed: {
    ...mapState("accessLog", ["FeedbackDetails", "downloadLoader"]),
    ...mapGetters("accessLog", ["getLoader"]),
  },
  unmounted() {
    this.$store.commit("accessLog/setFeedbackDetails", "");
  },
});
</script>
