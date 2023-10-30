<template>
  <div>
    <Header />
    <div>
      <div
        class="flex flex-col lg:flex-row bg-[#f7f5f5]"
        style="height: calc(100vh - 72px)"
      >
        <div
          class="border-r w-[80px] hidden lg:block lg:h-[calc(100vh-83px)] h-[calc(100vh-98px)] overflow-y-auto overflow-x-hidden"
        >
          <nav aria-label="Progress" class="">
            <ol role="list" class="space-y-2">
              <li
                v-for="(step, index) in steps"
                :key="index"
                class="md:flex-1 py-2 hover:bg-[#f9fdff] border-l-4"
                @click="activeTab(step)"
                :class="{ ' border-[#0081B8] bg-[#f9fdff]': step.active }"
              >
                <div class="cursor-pointer">
                  <div
                    class="flex flex-col items-center justify-center cursor-pointer min-h-[32px]"
                  >
                    <!-- <span class="relative flex h-7 w-6 flex-shrink-0 items-center justify-center">
                                          <commonIcon :name="step.icon" :width="'16'" :height="'16'" :stroke="'#1d4380'" class="self-center px-2"/>
                                      </span> -->
                    <!-- <span><img :src="`../assets/menu/orders.svg`" :alt="step.svg"></span> -->
                    <span
                      ><img
                        :class="{ activeImg: step.active }"
                        class="max-w-[76%] h-auto mx-auto"
                        :src="getImageSrc(step)"
                        :alt="step.svg"
                    /></span>
                    <span
                      class="font-medium text-xs text-center"
                      :class="{
                        'text-[#0081B8]': step.active,
                        primaryColor: !step.active,
                      }"
                      >{{ step.name }}</span
                    >
                  </div>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div
          class="w-full lg:h-[calc(100vh-83px)] h-[calc(100vh-98px)] overflow-y-auto"
        >
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from "../components/header.vue";
import { CheckCircleIcon } from "@heroicons/vue/20/solid";
import router from "../router";
import commonIcon from "../components/commonicon.vue";
export default {
  data() {
    return {
      steps: [
        {
          name: "Dashboard",
          route: "/dashboard",
          icon: "Reports",
          status: "active",
          active: true,
          svg: "home",
        },
        {
          name: "User Info",
          route: "/userInfo",
          icon: "Reports",
          status: "active",
          active: false,
          svg: "orders",
        },
        {
          name: "Logs",
          route: "/logs",
          icon: "Reports",
          status: "active",
          active: false,
          svg: "orders",
        },
        {
          name: "File Upload",
          route: "/fileupload",
          icon: "Reports",
          status: "active",
          active: false,
          svg: "upload",
        },
        {
          name: "Notify",
          route: "/notify",
          icon: "Reports",
          status: "active",
          active: false,
          svg: "newsIcon",
        },
        {
          name: "Contracts",
          route: "/contracts",
          icon: "Reports",
          status: "active",
          active: false,
          svg: "holdings",
        },
        {
          name: "Reports",
          route: "/report",
          icon: "Reports",
          status: "active",
          active: false,
          svg: "funds",
        },
        {
          name: "Vendors",
          route: "/vendors",
          icon: "Reports",
          status: "active",
          active: false,
          svg: "user",
        },
        {
          name: "Settings",
          route: "/settings",
          icon: "Reports",
          status: "active",
          active: false,
          svg: "settings",
        },
      ],
    };
  },
  methods: {
    activeTab(val: any) {
      router.push(val.route);
      this.setActiveTab(val);
      localStorage.setItem("sidebarTab", val.name);
    },
    setActiveTab(val: any) {
      this.steps.forEach((el) => {
        if (el.name == val.name) {
          el.active = true;
        } else {
          el.active = false;
        }
      });
    },
    retainCurrentTab() {
      let tab = localStorage.getItem("sidebarTab");
      if (tab) {
        this.steps.forEach((el: any) => {
          el.active = el.name == tab;
        });
      }
    },
    getImageSrc(step: any) {
      const imgUrl = new URL(`../assets/menu/${step.svg}.svg`, import.meta.url)
        .href;
      return imgUrl;
    },
  },
  components: {
    Header,
    CheckCircleIcon,
    commonIcon,
  },
  mounted() {
    this.retainCurrentTab();
  },
};
</script>
