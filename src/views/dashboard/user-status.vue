<template>
  <div class="p-5 h-full">
    <ul role="list" class="grid gap-6 grid-cols-3 sm:grid-cols-5">
      <li class="col-span-1 divide-y divide-gray-200 rounded-xl bg-white shadow">
        <div class="p-4 h-full">
          <div class="mb-2 flex gap-4 items-center">
            <span class="text-base primaryColor">Today's Total Visitors</span>
            <span v-html="reloadSvg" class="cursor-pointer" @click="getUserCount()"></span>
          </div>
          <!-- counts -->
          <div class="h-[72%] flex justify-center items-center">
            <span class="text-green-600 font-black text-[48px]">{{
              getTotalCount
            }}</span>
            <!-- coming Soon -->
          </div>
        </div>
      </li>
      <li class="col-span-2 divide-y divide-gray-200 rounded-xl bg-white shadow">
        <div class="p-4 ">
          <div class="mb-2 flex gap-4 items-center">
            <span class="text-base primaryColor">Current Active Users by Device Type</span>
            <span v-html="reloadSvg" class="cursor-pointer"></span>
          </div>
          <div>
            <div class="d-flex align-center justify-center h-[50%]">
              <!-- {{ getUserCountDetails }} ---- -->
              <currentActiveUsersChart v-if="loader == true"></currentActiveUsersChart>
            </div>
          </div>
        </div>
      </li>
      <li class="col-span-2 row-span-2 divide-y divide-gray-200 rounded-xl bg-white shadow">
        <div class="p-4 h-full">
          <div class="mb-2 flex gap-4 items-center">
            <span class="text-base primaryColor">Top Viewed Pages (last one hour)</span>
            <span v-html="reloadSvg" class="cursor-pointer" @click="getTopViewedPages()"></span>
          </div>
          <topViewedPages />
        </div>
      </li>
      <li class="col-span-3 divide-y divide-gray-200 rounded-xl bg-white shadow">
        <div class="p-4 w-full">
          <div class="mb-2 gap-4 grid grid-cols-2 justify space-between">
            <div class="grid justify-start text-base primaryColor">
              <div class=" gap-3 flex flex-wrap">
                <span class="text-base primaryColor">Visitors Per Day</span>
                <span v-html="reloadSvg" @click="sampledata()" class="cursor-pointer pt-1"></span>
              </div>
            </div>



            <div class="grid justify-end">
              <div class=" gap-3 flex flex-wrap text-sm">
                Chart View
                <Switch v-model="enabled" :class="enabled ? 'bg-[#3B82F6]' : 'bg-gray-200'"
                  class="relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                  <!-- <span class="sr-only">Use setting</span> -->
                  <span aria-hidden="true" :class="enabled ? 'translate-x-6' : 'translate-x-0'" class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white
                     shadow-lg ring-0 transition duration-200 ease-in-out" />
                </Switch>
              </div>
            </div>
          </div>
          <!--  -->

          <!-- <Switch v-model="enabled" :class="enabled ? 'bg-teal-900' : 'bg-teal-700'"
              class="relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
              <span class="sr-only">Use setting</span>
              <span aria-hidden="true" :class="enabled ? 'translate-x-9' : 'translate-x-0'"
                class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out" />
            </Switch> -->



          <!--  -->
          <div v-if="enabled == false">
            <div class="" v-if="getVisitorsPerDay?.length > 0">
              <!-- table -->
              <div class="border-rounded-lg border-rounded-lg overflow-auto h-[300px]">
                <div class="border-top " id="tableData">
                  <table class="w-full rounded-lg relative text-sm h-[30px] overflow-auto">
                    <thead>
                      <tr class="tableRow border-2 border-y-lightgray sticky top-0 bg-emerald-100">
                        <th colspan="2" class="text-center text-uppercase tableHeader blue lighten-5">
                          Date &amp; Time
                        </th>
                        <th colspan="4" class="text-center text-uppercase tableHeader blue lighten-5">
                          Unique users
                        </th>
                        <th colspan="3" class="text-center text-uppercase tableHeader teal lighten-5">
                          Total users
                        </th>
                      </tr>
                    </thead>
                    <thead>
                      <tr class="tableRow border-2 border-y-stone-300 sticky top-9 bg-gray-100">
                        <th class="tableHeader">S.No</th>
                        <th class="tableHeader">Date</th>
                        <th class="tableHeader text-right">Mobile</th>
                        <th class="tableHeader text-right">Web</th>
                        <th class="tableHeader text-right">API</th>
                        <th class="tableHeader text-right">Total</th>
                        <th class="tableHeader text-right">Mobile</th>
                        <th class="tableHeader text-right">Web</th>
                        <th class="tableHeader text-right">API</th>
                      </tr>
                    </thead>
                    <tbody class="border-2 bg-white border-y-stone-300">
                      <tr v-for="(i, id) in getVisitorsPerDay" :key="id"
                        class="tableRow hover:bg-gray-200 border-y-indigo-500">
                        <td class="tableContent bg-gray-100">{{ id + 1 }}</td>
                        <td class="tableContent bg-gray-100">
                          {{ i.date }}
                          <small class="text-gray-600">({{ get_Day(i.date) }})</small>
                        </td>
                        <td class="tableContent text-right">
                          {{ i.uniqueMob ? i.uniqueMob : 0 }}
                        </td>
                        <td class="tableContent text-right">
                          {{ i.uniqueWeb ? i.uniqueWeb : 0 }}
                        </td>
                        <td class="tableContent text-right">
                          {{ Number(i.uniqueApi) }}
                        </td>
                        <td class="tableContent text-right">
                          {{
                            Number(i.uniqueMob) +
                            Number(i.uniqueWeb) +
                            Number(i.uniqueApi)
                          }}
                        </td>
                        <td class="tableContent text-right">
                          {{ Number(i.totalMobile) }}
                        </td>
                        <td class="tableContent text-right">
                          {{ Number(i.totalWeb) }}
                        </td>
                        <td class="tableContent text-right">
                          {{ Number(i.totalApi) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>


                </div>
              </div>
              <!--table end  -->
              <!-- <v-chart class="chart" :option="option" autoresize /> -->


            </div>
            <noData v-else></noData>
          </div>

          <dashBoardChart v-else></dashBoardChart>


        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import "../../plugins/echart";
import { Switch } from '@headlessui/vue'


import dashBoardChart from './dashboardChart.vue'
import currentActiveUsersChart from "./currentActiveUsersChart.vue";
import commonFunc from "../../mixins/common";
import { defineComponent, ref } from "vue";
import { mapGetters, mapState } from "vuex";
import noData from "../../components/no-data.vue";
import topViewedPages from "./top-viewed-pages.vue";
const reloadSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
`

import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';



use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);


export default defineComponent({
  components: { topViewedPages, noData, dashBoardChart, Switch, currentActiveUsersChart, },
  mixins: [commonFunc],
  setup() {
    const count = 0;
    const enabled = ref(false);


    const option = ref({

    });

    return { reloadSvg, count, option, enabled };
  },

  computed: {
    ...mapGetters("dash", ['getTotalCount', 'getVisitorsPerDay', 'GETUSERLOGSCHARTDATA', 'getUserCountDetails']),
    // ...mapGetters("dash", ["getVisitorsPerDay"]),
    ...mapGetters("dash", {
      last12hrActiveUsersCount: "getLast12hrActiveUsersCount",
    }),
    ...mapState("dash", ["loader"]),
  },

  methods: {
    renderChart() {
      //   this.chart = echarts.init(this.$refs.echartsContainer);
      //   this.chart.setOption(this.$store.option);
    },
    sampledata() {
    },
    getTopViewedPages() {
      this.$store.dispatch("dash/getTopViewedPages");
    },
    getUserCount() {
      this.$store.dispatch("dash/getSeperateUserCount");
    },
    get_Day(val: any) {
      let date = val.split("-").reverse().join("-");
      let d = new Date(date);
      let day = d.getDay();

      let daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let dayName = daysOfWeek[day];

      return dayName;
    },
  },

  async created() {
    this.$store.dispatch("dash/getSeperateUserCount");
    this.$store.dispatch("dash/getVisitorsPerDay");
    this.$store.dispatch('dash/getUserCountDetails');
  },
});
</script>
<style  scoped>
.chart {
  height: 100vh;
}
</style>
