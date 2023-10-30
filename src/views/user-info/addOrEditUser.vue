<template>
  <div class="w-full overflow-hidden p-4">
    <form @submit.prevent="handleSubmit()">
      <div class="min-w-full sm:p-3 lg:p-4 grid grid-cols-12 w-[100%] bg-white">
        <div class="break-after-column col-span-3">
          <div class="">
            <p class="text-sm font-bold mb-4 primaryColor">
              {{ isEdit ? "Edit User" : "Add New User" }}
            </p>
          </div>
        </div>
        <div class="col-span-5 bg-white pl-[20px]">
          <div class="mb-5 flex flex-col">
            <div class="flex flex-col gap-2">
              <label class="text-sm">User ID</label>
              <input
                type="text"
                class="border w-full h-10 rounded focus:outline-0 px-4 text-xs"
                v-model="userID"
                maxlength="15"
              />

              <div class="h-4 mb-2 text-red-500 text-xs">
                <span v-if="submitted && userID == ''"
                  >User ID is required</span
                >
              </div>
            </div>

            <div class="flex gap-2 justify-between">
              <div class="flex flex-col gap-2 w-1/2">
                <label class="text-sm">First Name</label>
                <input
                  type="text"
                  class="border w-full h-10 rounded focus:outline-0 px-4 text-xs"
                  v-model="firstName"
                  maxlength="50"
                />

                <div class="h-4 mb-2 text-red-500 text-xs">
                  <span v-if="submitted && firstName == ''"
                    >First Name is required</span
                  >
                </div>
              </div>
              <div class="flex flex-col gap-2 w-1/2">
                <label class="text-sm">Last Name</label>
                <input
                  type="text"
                  class="border w-full h-10 rounded focus:outline-0 px-4 text-xs"
                  v-model="lastName"
                  maxlength="50"
                />

                <div class="h-4 mb-2 text-red-500 text-xs"></div>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm">E-Mail ID</label>
              <input
                type="text"
                class="border w-full h-10 rounded focus:outline-0 px-4 text-xs"
                v-model="emailID"
                maxlength="50"
              />
              <div class="h-4 mb-2 text-red-500 text-xs"></div>
            </div>

            <div class="flex gap-2 justify-between">
              <div class="flex flex-col gap-2 w-1/2">
                <label class="text-sm">PAN Number</label>
                <input
                  type="text"
                  maxlength="10"
                  class="border w-full h-10 rounded focus:outline-0 px-4 text-xs"
                  v-model="pan"
                  @input="pan ? (pan = pan.toUpperCase()) : ''"
                  @keypress="keyPressAlphaNumeric($event)"
                />
                <div class="h-4 mb-2 text-red-500 text-xs"></div>
              </div>
              <div class="flex flex-col gap-2 w-1/2">
                <label class="text-sm">Mobile No</label>
                <input
                  type="text"
                  maxlength="10"
                  class="border w-full h-10 rounded focus:outline-0 px-4 text-xs"
                  v-model="mobile"
                  @input="digitKeyOnly($event)"
                />
                <div class="h-4 mb-2 text-red-500 text-xs"></div>
              </div>
            </div>

            <div class="flex gap-2 justify-between" v-if="!isEdit">
              <div class="flex flex-col gap-2 w-1/2">
                <label class="text-sm">Marital Status</label>
                <select
                  v-model="maritalStatus"
                  class="border w-full h-10 rounded focus:outline-0 px-4 text-sm"
                >
                  <option disabled selected value="options">Select</option>
                  <option value="SINGLE">Single</option>
                  <option value="MARRIED">Married</option>
                </select>
                <div class="h-4 mb-2 text-red-500 text-xs">
                  <span
                    v-if="submitted && maritalStatus == 'options' && !isEdit"
                    >Marital Status is required</span
                  >
                </div>
              </div>
              <div class="flex flex-col gap-2 w-1/2">
                <label class="text-sm">Gender</label>
                <select
                  v-model="gender"
                  class="border w-full h-10 rounded focus:outline-0 px-4 text-sm"
                >
                  <option disabled selected value="options">Select</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
                <div class="h-4 mb-2 text-red-500 text-xs">
                  <span v-if="submitted && gender == 'options' && !isEdit"
                    >Gender is required</span
                  >
                </div>
              </div>
            </div>

            <div class="flex items-center my-4">
              <p class="deatailsHead whitespace-nowrap min-w-[100px] text-sm">
                Enabled
              </p>
              <a
                class="px-[68px] min-w-[160px] flex justify-end"
                @click="handleEnabledSwitch()"
              >
                <span
                  class="text-sm pr-2"
                  :class="{
                    'secondary-color': !enabledSwitch,
                    'text-[#3B82F6]': enabledSwitch,
                  }"
                ></span>
                <button
                  type="button"
                  class="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:ring-[#753ED7] focus:ring-offset-2"
                >
                  <span
                    aria-hidden="true"
                    class="pointer-events-none absolute h-full w-full rounded-md bg-white dark:bg-[#181818]"
                  />
                  <span
                    aria-hidden="true"
                    :class="[
                      !enabledSwitch
                        ? 'bg-gray-200 dark:bg-gray-600'
                        : 'bg-[#3B82F6] dark:bg-gray-600',
                      'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out',
                    ]"
                  />
                  <span
                    aria-hidden="true"
                    :class="[
                      !enabledSwitch ? 'translate-x-0' : 'translate-x-5',
                      'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white dark:bg-zinc-800 shadow ring-0 transition-transform duration-200 ease-in-out',
                    ]"
                  />
                </button>
                <span
                  class="text-sm pl-2"
                  :class="{
                    'secondary-color': !enabledSwitch,
                    'text-[#3B82F6]': enabledSwitch,
                  }"
                ></span>
              </a>
            </div>

            <div class="flex items-center my-4">
              <p class="deatailsHead whitespace-nowrap min-w-[100px] text-sm">
                Email Verified
              </p>
              <a
                class="px-[68px] min-w-[160px] flex justify-end"
                @click="handleEmailVerifiedSwitch()"
              >
                <span
                  class="text-sm pr-2"
                  :class="{
                    'secondary-color': !emailVerifiedSwitch,
                    'text-[#3B82F6]': emailVerifiedSwitch,
                  }"
                ></span>
                <button
                  type="button"
                  class="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:ring-[#753ED7] focus:ring-offset-2"
                >
                  <span
                    aria-hidden="true"
                    class="pointer-events-none absolute h-full w-full rounded-md bg-white dark:bg-[#181818]"
                  />
                  <span
                    aria-hidden="true"
                    :class="[
                      !emailVerifiedSwitch
                        ? 'bg-gray-200 dark:bg-gray-600'
                        : 'bg-[#3B82F6] dark:bg-gray-600',
                      'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out',
                    ]"
                  />
                  <span
                    aria-hidden="true"
                    :class="[
                      !emailVerifiedSwitch ? 'translate-x-0' : 'translate-x-5',
                      'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white dark:bg-zinc-800 shadow ring-0 transition-transform duration-200 ease-in-out',
                    ]"
                  />
                </button>
                <span
                  class="text-sm pl-2"
                  :class="{
                    'secondary-color': !emailVerifiedSwitch,
                    'text-[#3B82F6]': emailVerifiedSwitch,
                  }"
                ></span>
              </a>
            </div>
          </div>
        </div>
        <div class="col-span-4 bg-white"></div>
      </div>
      <div class="h-full flex items-top justify-end w-[100%] gap-4">
        <div class="mt-[10px]">
          <input
            class="bg-white-500 text-black border border-black h-10 w-[120px] cursor-pointer rounded text-xs"
            type="button"
            value="Cancel"
            @click="goBack()"
          />
        </div>
        <div class="mt-[10px]">
          <input
            class="bg-blue-500 text-white h-10 w-[120px] cursor-pointer rounded text-xs"
            type="submit"
            value="Submit"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// import { mapGetters } from "vuex"
import commonjs from "../../mixins/common";
export default defineComponent({
  mixins: [commonjs],
  setup() {
    const firstName: any = ref("");
    const lastName: any = ref("");
    const userID: any = ref("");
    const emailID: any = ref("");
    // const enabled = ref(false)
    // const emailVerified = ref(false)
    const mobile: any = ref("");
    const pan: any = ref("");
    const maritalStatus: any = ref("options");
    const gender: any = ref("options");
    const submitted: any = ref(false);
    const currentData: any = ref("");
    const enabledSwitch: any = ref(false);
    const emailVerifiedSwitch: any = ref(false);
    const isEdit: any = ref(false);
    return {
      firstName,
      lastName,
      userID,
      emailID,
      mobile,
      pan,
      maritalStatus,
      gender,
      submitted,
      currentData,
      enabledSwitch,
      emailVerifiedSwitch,
      isEdit,
    };
  },
  methods: {
    async handleSubmit() {
      this.submitted = true;
      if (this.validateForm() && this.isEdit) {
        let json = {
          username: this.userID,
          enabled: this.enabledSwitch,
          emailVerified: this.emailVerifiedSwitch,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.emailID,
          attributes: {
            mobile: this.mobile,
            pan: this.pan,
          },
        };
        await this.$store.dispatch("user/updateUserDetails", json);
      } else if (this.validateForm() && !this.isEdit) {
        let json = {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.userID,
          email: this.emailID,
          enabled: true,
          emailVerified: true,
          attributes: {
            ucc: this.userID,
            mobile: this.mobile,
            pan: this.pan,
            maritalStatus: this.maritalStatus,
            gender: this.gender,
          },
        };
        await this.$store.dispatch("user/addUserKeyCloak", json);
      }
    },
    goBack() {
      this.$store.commit("user/setUserDetails", []);
      this.$router.push("/userInfo");
    },
    setEditData() {
      if (this.currentData) {
        this.userID = this.currentData["username"] || undefined;
        this.firstName = this.currentData["firstName"] || undefined;
        this.lastName = this.currentData["lastName"] || undefined;
        this.emailID = this.currentData["email"] || undefined;
        this.enabledSwitch = this.currentData["enabled"] || undefined;
        this.emailVerifiedSwitch =
          this.currentData["emailVerified"] || undefined;
        this.mobile = this.currentData["attributes"]["mobile"][0] || undefined;
        this.pan = this.currentData["attributes"]["pan"][0] || undefined;
      }
    },
    handleEnabledSwitch() {
      this.enabledSwitch = !this.enabledSwitch;
    },
    handleEmailVerifiedSwitch() {
      this.emailVerifiedSwitch = !this.emailVerifiedSwitch;
    },
    validateForm() {
      if (this.isEdit) {
        return this.userID != "" && this.firstName != "";
      } else {
        return (
          this.userID != "" &&
          this.firstName != "" &&
          this.maritalStatus != "options" &&
          this.gender != "options"
        );
      }
    },
    digitKeyOnly(event: Event) {
      // Allow only numeric values in the input field
      let value: any = (event.target as HTMLInputElement).value
        ?.toString()
        ?.replace(/[^0-9]/g, "");
      if (value) this.mobile = value;
    },
  },
  created() {
    let currentEditData = JSON.parse(
      localStorage.getItem("currentEditData") || ""
    );
    if (
      currentEditData &&
      this.$route.query.edit == "true" &&
      currentEditData != ""
    ) {
      this.isEdit = true;
      this.currentData = currentEditData;
      this.setEditData();
    }
  },
});
</script>
