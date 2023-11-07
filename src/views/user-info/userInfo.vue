<template>
  <div>
    <div class="">
      <tab-menu @activeTab="changeTab" />
    </div>
    <div class="p-4">
      <div class="card p-4 h-full">
        <form @submit.prevent="getUserDetailsApi()"
          class="mb-6 gap-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-6">
          <div>
            <p class="primaryColor pb-1 text-sm">User ID</p>
            <input type="text" v-model="userID" maxlength="10"
              class="border w-full h-10 rounded focus:outline-0 px-4 text-xs" />

            <div class="h-4 mb-2 text-red-500 text-xs">
              <span v-if="submitted && userID == ''">User ID is required</span>
            </div>
          </div>
          <div class="flex items-center">
            <button class="bg-blue-500 text-white h-10 w-[120px] cursor-pointer rounded text-xs">
              <p v-if="!getLoader">Submit</p>
              <svg v-if="getLoader" class="animate-spin h-5 w-5 text-white flex mx-auto"
                xmlns="http://www.w3.org/2000/svg" fill="#fffff" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#fffff" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
            </button>
            <button type="button" class="bg-blue-500 text-white h-10 w-[120px] cursor-pointer rounded text-xs ml-10"
              @click="addUser()">
              + Add User
            </button>
          </div>
        </form>

        <div class="border rounded" v-if="getUserDetails.length > 0">
          <table class="w-full">
            <thead class="text-[13px]">
              <tr class="border-b">
                <th class="border-r">User Name</th>
                <th class="border-r">E-Mail</th>
                <th class="border-r">Enabled</th>
                <th class="border-r">Email Verified</th>
                <th class="border-r">First Name</th>
                <th class="border-r">Last Name</th>
                <th class="border-r">Mobile</th>
                <th class="border-r">PAN</th>
                <th class="border-r">Action</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr v-for="(i, id) in getUserDetails" :key="id">
                <td class="border-r text-center">{{ i.username }}</td>
                <td class="border-r text-center">{{ i.email }}</td>
                <td class="border-r text-center">{{ i.enabled }}</td>
                <td class="border-r text-center">{{ i.emailVerified }}</td>
                <td class="border-r text-center">{{ i.firstName }}</td>
                <td class="border-r text-center">{{ i.lastName }}</td>
                <td class="border-r text-center">
                  {{ i.attributes.mobile }}
                </td>
                <td class="border-r text-center">{{ i.attributes.pan[0] }}</td>
                <td class="border-r">
                  <a class="text-blue-400 cursor-pointer" @click="updateUser(i)" v-html="editSvg"></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <style>
.snoWidth {
  width: 25%;
}
.dateWidth {
  width: 75%;
}

</style> -->
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
const editSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-auto">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>
`;
export default defineComponent({
  setup() {
    const tabs = ref(["Login Based", "User Based"]);
    const userID = ref("");
    const submitted = ref(false);
    return {
      tabs,
      userID,
      editSvg,
      submitted,
    };
  },
  name: "test-table",
  computed: {
    ...mapGetters("user", ["getUserDetails", "getLoader"]),
  },
  methods: {
    changeTab() { },
    getUserDetailsApi() {
      this.submitted = true;
      if (this.userID != "") {
        let json = {
          userId: this.userID,
        };
        this.$store.dispatch("user/getUserDetails", json);
      }
    },
    addUser() {
      this.$router.push("/addOrEditUser");
    },
    updateUser(data: any) {
      localStorage.setItem("currentEditData", JSON.stringify(data));
      this.$router.push("/addOrEditUser?edit=true");
    },
  },
  created() {
    this.$store.commit("user/setUserDetails", []);
  },
});
</script>
