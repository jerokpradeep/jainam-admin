<template>
  <div class="flex flex-1 flex-col px-4 sm:px-6 lg:px-8 items-center justify-center h-full">
    <div class="relative flex flex-1 flex-col py-16 w-[380px] items-center justify-center h-full">
      <div class="">
        <img src="../../assets/menu/app_logo.svg" alt="logo" class="mx-auto w-[78%]" />
      </div>
      <form @submit.prevent="loginSubmit()" class="w-full">
        <div class="flex mt-8 w-full">
          <div class="w-full h-auto m-4">
            <div class="card p-4">
              <p>UserId</p>
              <input type="text" ref="userId" class="border w-full h-10 rounded focus:outline-0 px-4"
                @keydown="errorUserId = ''" v-model="userId" />
              <p class="text-sm text-red-500 pt-1">{{ errorUserId }}</p>
              <p class="mt-4">Password</p>
              <input type="text" class="border w-full h-10 rounded focus:outline-0 px-4" @keydown="errorPassword = ''"
                v-model="password" />
              <p class="text-sm text-red-500 pt-1">{{ errorPassword }}</p>
              <button type="submit" class="h-10 bg-blue-500 w-full text-white rounded mt-8">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  <!-- <div
    class="flex items-center justify-center"
    style="height: 100vh !important"
  >
    <div v-if="isParamAvailable">
      <img height="60" width="60" :src="spinnerGig" alt="loading" />
    </div>

    <div class="max-w-[400px] flex flex-col" v-if="$route.query.logout">
      <div class="text-base mb-2 text-center"><strong>Admin</strong></div>
      <div class="mb-4 flex justify-center">
        <img src="../../assets/app_logo.svg" alt="logo" class="mx-auto" />
      </div>
      <div class="flex text-sm justify-start">
        You have successfully logged out. If you wish to continue with login,
        please click below
      </div>
      <div v-if="error_message">{{ error_message }}</div>
      <button
        type="submit"
        class="h-10 bg-blue-500 text-white rounded mt-8"
        @click="
          login();
          error_message = null;
        "
      >
        Submit
      </button>
    </div>

    <div v-if="getErrorMsg != ''">{{ getErrorMsg }}</div>
  </div> -->
</template>

<script>
import spinnerGig from "../../assets/spinner.gif";
import { mapGetters } from "vuex";
import { env } from "../../env";
export default {
  data() {
    return {
      userId: "",
      password: "",
      errorUserId: "",
      errorPassword: "",
      active: false,
      spinnerGig,
      isParamAvailable: false,
      appcode: "hRnpoejBWrZSPeS",
    };
  },
  computed: {
    ...mapGetters("auth", ["getErrorMsg"]),
  },
  methods: {
    login() {
      window.location.href = `${env().SSOREDIRECTURL}?appcode=${env().APPCODE}`;
    },

    loginSubmit() {
      if (this.userId == "Admin") {
        if (this.password == "Jainum@123") {
          this.$router.push("dashboard")
        }
      }
    }
  },
  created() {
    if (this.$route.query.authCode) {
      this.isParamAvil = true;
      this.$store.dispatch("auth/getData", this.$route.query.authCode);
    } else if (this.$route.query.logout) {
    } else {
      // this.login();
    }
  },
};
</script>
