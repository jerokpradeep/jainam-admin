<style scoped>
.imgHeight {
  @apply h-[72px] border-b;
}
</style>

<template>
  <div class="w-full">
    <div class="imgHeight flex items-center justify-between p-4">
      <div class="flex">
        <div class="lg:hidden block mt-4">
          <burgerMenu />
        </div>
        <div>
          <img src="../assets/menu/app_logo.svg" alt="" class="max-w-[80%] h-10" />
        </div>
      </div>
      <div class="">
        {{ getUserId }}
        <p class="text-blue-500 cursor-pointer" @click="logout()">Logout</p>
      </div>
    </div>
  </div>
</template>

<script>
import burgerMenu from "../components/hamburgerMenu.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    burgerMenu,
  },
  computed: {
    ...mapGetters(["getUserId"]),
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/?logout=true");
    },
  },
  created() { },
};
</script>
