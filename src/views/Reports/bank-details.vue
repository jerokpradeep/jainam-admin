<template>
  <div class="p-4 h-full">
    <div class="card p-4">
      <form @submit.prevent="submitData()"
        class="mb-6 gap-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-6">
        <div>
          <p class="primaryColor pb-1">User ID</p>
          <input type="text" v-model="userId" maxlength="10" class="border w-full h-10 rounded focus:outline-0 px-4" />
          <div class="h-4 mb-2 text-red-500 text-xs">
            <span v-if="submitted && userId == ''">User ID is required</span>
          </div>
        </div>
        <div class="flex items-center h-24">
          <button type="submit" class="bg-blue-500 text-white h-10 w-[120px] cursor-pointer rounded text-xs">
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
      </form>
      <!-- table -->
      <div class="">
        <!-- table -->
        <div class="border-rounded-lg">
          <div class="border-top" id="tableData" v-if="getUserBankDetails?.length > 0">
            <table class="w-full rounded-lg text-sm">
              <thead>
                <tr class="tableRow border-2 border-y-lightgray border-y-lightgray bg-white">
                  <th class="text-center border-r text-uppercase tableHeader blue lighten-5">
                    S.No
                  </th>
                  <th class="text-center border-r text-uppercase tableHeader blue lighten-5">
                    Client Name
                  </th>
                  <th class="text-center border-r text-uppercase tableHeader teal lighten-5">
                    A/c No
                  </th>
                  <th class="text-center border-r text-uppercase tableHeader teal lighten-5">
                    Bank Name
                  </th>
                  <th class="text-center border-r text-uppercase tableHeader teal lighten-5">
                    IFSC Code
                  </th>

                  <th class="text-center border-r text-uppercase tableHeader teal lighten-5">
                    Default
                  </th>
                </tr>
              </thead>
              <!-- <thead>
              <tr class="tableRow border-2 border-y-stone-300 bg-gray-100">
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
            </thead> -->
              <tbody class="border-2 bg-white border-r border-y-stone-300">
                <tr v-for="(i, id) in getUserBankDetails" :key="id"
                  class="tableRow border-y-indigo-500 border-r text-center">
                  <td class="text-center border-r">{{ id + 1 }}</td>
                  <td class="tableContent border-r text-center">
                    {{ i.clientname ? i.clientname : 0 }}
                  </td>
                  <td class="tableContent border-r text-center">
                    {{ i.accNo ? i.accNo : 0 }}
                  </td>
                  <td class="tableContent border-r text-center">
                    {{ i.bankName ? i.bankName : 0 }}
                  </td>
                  <td class="tableContent border-r text-center">
                    {{ i.ifscode ? i.ifscode : 0 }}
                  </td>
                  <td class="tableContent border-r text-center">
                    {{ i.defaultAccBank ? "Primary" : "Secondary" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <noData v-else> </noData>
        </div>
        <!-- table end -->
      </div>
    </div>

    <!-- Coming soon -->
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import noData from "../../components/no-data.vue";
export default defineComponent({
  components: {
    noData,
  },
  setup() {
    const userId = ref("");
    const submitted = ref(false);
    return { userId, submitted };
  },
  methods: {
    getBankData() { },
    submitData() {
      if (!!this.userId) {
        this.$store.dispatch("reports/getUserBankDetails", this.userId);
      } else {
        this.submitted = true;
      }
    },
    getUserDetailsApi() {
      this.submitted = true;
      if (this.userId != "") {
        let json = {
          userId: this.userId,
        };
        this.$store.dispatch("user/getUserDetails", json);
      }
    },
  },
  computed: {
    ...mapGetters("reports", ["getUserBankDetails"]),
    ...mapGetters("user", ["getUserDetails", "getLoader"]),
  },
});
</script>
