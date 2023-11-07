<style>
/* tr,
td,
th {
    @apply border border-collapse p-2
} */
</style>

<template>
  <div>
    <tab-menu @activeTab="changeTab" />
    <div class="p-4 h-full">
      <div class="card p-4 h-full">
        <div class="mb-6 gap-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-6">
          <div v-if="validTab == 'Accesslog'">
            <p class="primaryColor pb-1 text-sm">UserId</p>
            <input type="text" ref="userID" v-model="userId" maxlength="10" id="logsId"
              class="border w-full h-10 rounded focus:outline-0 px-4 text-xs" />
          </div>

          <div v-if="validTab == 'Accesslog'">
            <p class="primaryColor pb-1 text-sm">Log Type</p>
            <select v-model="accessLogType" @change="
              $store.commit(
                'accessLog/setAccessLogType',              //
                accessLogType == 'accessLog'
              )
              " class="border w-full h-10 rounded focus:outline-0 px-4 text-xs">
              <option value="accessLog">Access Log</option>
              <option value="restLog">Rest Log</option>
            </select>
          </div>

          <div v-if="validTab == 'Accesslog' && distinctUrl.length">
            <p class="primaryColor pb-1 text-sm">URI</p>
            <select v-model="uri" v-for="(list, index) in distinctUrl" :key="index" @change="
              $store.commit(
                'accessLog/setAccessLogType',
                accessLogType == 'accessLog'
              )
              " class="border w-full h-10 rounded focus:outline-0 px-4 text-xs">
              <option value="accessLog">{{ list }}</option>
            </select>
          </div>

          <div v-else>
            <p class="primaryColor pb-1 text-sm">URI</p>
            <input type="text" ref="userID" v-model="uri" id="logsId"
              class="border w-full h-10 rounded focus:outline-0 px-4 text-xs" />
          </div>
          <div>
            <p class="primaryColor pb-1 text-sm">From Date</p>
            <!-- @change="addDays(fromDate, 10, 'fromDate')" -->
            <input :type="validTab == 'Accesslog' ? 'datetime-local' : 'date'" v-model="fromDate"
              class="border w-full h-10 rounded focus:outline-0 px-4 text-xs"
              :max="new Date().toISOString().slice(0, 10)" />
          </div>
          <div>
            <p class="primaryColor pb-1 text-sm">To Date</p>
            <input :type="validTab == 'Accesslog' ? 'datetime-local' : 'date'" v-model="toDate" :disabled="!fromDate"
              :max="maxDateToDate" :min="fromDate" class="border w-full h-10 rounded focus:outline-0 px-4 text-xs" />
          </div>
          <div class="flex items-end">
            <button class="bg-blue-500 text-white h-10 w-[120px] cursor-pointer rounded text-xs" :disabled="getLoader"
              @click="getReports('table')">
              <p v-if="!getLoader">Submit</p>
              <svg v-if="getLoader" class="animate-spin h-5 w-5 text-white flex mx-auto"
                xmlns="http://www.w3.org/2000/svg" fill="#fffff" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#fffff" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
            </button>
          </div>
        </div>
        <div class="h-full" v-if="getLogDeatails && validTab == 'Accesslog' && !getLoader">
          <div class="flex-grow overflow-auto h-[20px]"></div>

          <table class="w-full border table-fixed h-full cursor-pointer">
            <thead>
              <tr class="border-b border-[#ededed] text-[13px]">
                <th class="border-r">URL</th>
                <th class="border-r">CreatedOn</th>
                <th class="border-r">Method</th>
                <th class="border-r">Request</th>
                <th>Response</th>
              </tr>
            </thead>
            <tbody class="h-[100px]">
              <tr class="border-b border-[#ededed] text-sm" v-for="(item, index) in getLogDeatails" :key="index"
                @click="getRsponseBody(item)">
                <td class="truncate text-center border-r">
                  {{ item.uri || item.url }}
                </td>
                <td class="truncate text-center border-r">
                  {{ item.created_on || item.createdOn }}
                </td>
                <td class="truncate text-center border-r">{{ item.method }}</td>
                <td class="truncate border-r">
                  {{ item.req_body || item.reqBody }}
                </td>
                <td class="truncate">{{ item.res_body || item.resBody }}</td>
              </tr>
            </tbody>
          </table>

          <div class="flex justify-end mt-4" v-if="getLogDeatails.length != 0">
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <a @click="goBack()"
                class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                :class="page == 1 ? 'cursor-not-allowed' : ''">
                <!-- class="sr-only" -->
                <span>Previous</span>
                <!-- <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" /> -->
              </a>
              <a class="relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 cursor-pointer"
                :class="page == cpage
                  ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                  " v-for="(cpage, id) in pages" :key="id" @click="changePage(cpage)">{{ cpage }}</a>
              <a @click="forward()"
                class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <!-- class="sr-only" -->
                <span>Next</span>
                <!-- <ChevronRightIcon class="h-5 w-5" aria-hidden="true" /> -->
              </a>
            </nav>
          </div>
        </div>
        <maillogs v-if="validTab == 'Mail/SMS'" />
      </div>
    </div>
    <accesslog v-if="validTab == 'Accesslog'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters, mapState } from "vuex";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/20/solid";
import accesslog from "../components/dialog/responseLog.vue";
import maillogs from "./mail-logs.vue";
import noData from "../components/no-data.vue";
export default defineComponent({
  setup() {
    const fromDate = ref();
    const maxDateToDate = ref("");
    const toDate = ref();
    const userId = ref("");
    const fromTime = ref("");
    const toTime = ref("");
    const page = ref(1);
    const perPage = ref(20);
    const pages = ref(2);
    const tabs = ref(["Accesslog", "Mail/SMS"]);
    const validTab = ref("Accesslog");
    const logType = ref("EMAIL");
    const value = ref("");
    const uri = ref("");
    const accessLogType = ref("accessLog");
    return {
      fromDate,
      maxDateToDate,
      toDate,
      userId,
      fromTime,
      toTime,
      page,
      perPage,
      pages,
      tabs,
      validTab,
      logType,
      value,
      uri,
      accessLogType,
    };
  },
  methods: {
    addDays(date: string | number | Date, days: number, first: string) {
      if (first == "fromDate") {
        this.toDate = "";
      }
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      if (
        result.toISOString().slice(0, 10) <=
        new Date().toISOString().slice(0, 10) &&
        this.validTab == "Accesslog"
      ) {
        this.maxDateToDate = result.toISOString().slice(0, 10);
      } else {
        this.maxDateToDate = new Date().toISOString().slice(0, 10);
      }
    },
    async getReports(from: String) {
      if (this.validTab == "Accesslog") {
        if (from != "paginate") this.resetPagination();
        if (this.fromDate && this.toDate) {
          if (this.accessLogType == "accessLog") {
            let json = {
              fromDate: this.fromDate.replace("T", " "),
              toDate: this.toDate.replace("T", " "),
              userId: this.userId,
              uri: this.uri,
              pageNo: this.page,
              pageSize: 50,
            };
            await this.$store.dispatch("accessLog/getAccessLogDetails", json);
          } else {
            let json = {
              userId: this.userId,
              fromDate: this.fromDate.replace("T", " "),
              toDate: this.toDate?.replace("T", " "),
              pageNo: this.page,
              pageSize: 50,
            };

            await this.$store.dispatch("accessLog/getResponseLog", json);
          }
        } else {
          this.userId
            ? ""
            : this.$notify({
              group: "auth",
              type: "error",
              title: `Enter your User Id`,
            });
          if (!this.fromDate || !this.toDate) {
            this.$notify({
              group: "auth",
              type: "error",
              title: `Select a from Date and To date`,
            });
          }
        }
      } else if (this.validTab == "Mail/SMS") {
        if (
          this.fromDate &&
          this.toDate &&
          ((this.value && this.validateRegex(this.value)) || !this.value)
        ) {
          let json: any = {
            limit: 20,
            offset: 0,
            type: this.logType,
            fromDate: this.fromDate,
            toDate: this.toDate,
          };
          this.value ? (json.value = this.value) : "";
          await this.$store.dispatch("accessLog/getMailLogData", json);
        } else {
          if (!this.fromDate || !this.toDate) {
            this.$notify({
              group: "auth",
              type: "error",
              title: `Select a from Date and To date`,
            });
          }
          this.value && !this.validateRegex(this.value)
            ? this.$notify({
              group: "auth",
              type: "error",
              title: `Enter Vaild Email on Mobile Number`,
            })
            : "";
        }
      }
    },

    formattedDate(val: string) {
      const dateParts = val.split("-");
      const day = dateParts[2];
      const month = dateParts[1];
      const year = dateParts[0];
      return `${day}${month}${year}`;
    },

    getRsponseBody(val: any) {
      this.$store.commit("accessLog/setIsAccessLog", {
        isOpen: true,
        data: val,
      });
    },

    userIdInput(event: { target: { value: string } }) {
      const newValue = (event.target as HTMLInputElement).value.replace(
        /[^0-9]/g,
        ""
      );
      this.userId = newValue.replace(/\s+/g, "");
    },

    resetFields(val: any) {
      this.fromDate = this.toDate = this.userId = "";
      this.logType = "EMAIL";
      this.value = "";
      if (val == "Mail/SMS") {
        this.toDate = new Date().toISOString().slice(0, 10);
        var date = new Date();
        date.setDate(date.getDate() - 1);
        this.fromDate = date.toISOString().slice(0, 10);
        this.getReports("mail");
      }

      this.$store.commit("accessLog/setAccessLogDetails", "");
    },

    validateRegex(val: string) {
      let email = new RegExp("^([a-z0-9_\.-]+\@[\da-z\.-]+.[a-z\.]{2,6})$");
      let mobile = new RegExp("^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$");
      if (val) {
        return email.test(val) || (val.length > 6 && mobile.test(val));
      }

      return false;
    },

    changePage(cpage: any) {
      if (cpage == this.pages) {
        this.pages += 1;
      }
      this.page = cpage;
      this.getReports("paginate");
    },

    resetPagination() {
      this.page = 1;
      this.pages = 2;
    },

    goBack() {
      if (this.page == 1) return;
      this.page -= 1;
      this.getReports("paginate");
    },

    forward() {
      if (this.page == this.pages) {
        this.pages += 1;
      }
      this.page += 1;
      this.getReports("paginate");
    },

    changeTab(data: any) {
      this.validTab = data.name;
      this.$store.dispatch("tabs/setActiveTab", {
        path: this.$route.path,
        id: data.id,
      });
      this.resetFields(data.name);
    },
  },
  computed: {
    getTime() {
      let arr = [];
      for (let i = 1; i <= 24; i++) {
        arr.push(i);
      }
      return arr;
    },
    ...mapGetters("accessLog", ["getLogDeatails", "getLoader", "getMailLogs"]),
    ...mapState("accessLog", ["distinctUrl"]),
  },
  components: {
    accesslog,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    maillogs,
    noData,
  },
  created() {
    this.$nextTick(() => {
      let check = document.getElementById("logsId") as HTMLElement;
      if (check) {
        check.focus();
      }
    });
    this.$store.commit("accessLog/setAccessLogDetails", "");
    this.$store.dispatch("accessLog/getDistinctUrl");
    // this.resetPages()
    this.resetFields("Accesslog");
    this.changeTab({ name: "Accesslog", id: 0 });
  },
  unmounted() {
    this.$store.commit("accessLog/setAccessLogDetails", "");
  },
});
</script>
