<style scoped>
.menu-wrapper {
  width: 28px;
  height: auto;
  cursor: pointer;
  position: relative;
}

.menu-bar {
  position: absolute;
  width: 100%;
  height: 2px;
  background: #a2a2a2;
  left: 0%;
}

.menu-wrapper:hover .menu-bar {
  /*animation-duration: 1s;
  animation-name: slideOut;
  animation-direction: alternate;
  animation-timing-function: ease-out;*/
}

.one {
  top: 0px;
  animation-delay: 0.1s;
  transition: all 0.3s;
}

.two {
  top: 8px;
  transition: all 0.3s;
}

.three {
  top: 16px;
  transition: all 0.3s;
}

@keyframes slideOut {
  0% {
    width: 100%;
    left: 0%;
    right: auto;
  }

  50% {
    width: 0%;
    left: 0%;
    right: auto;
  }
  51% {
    width: 0%;
    right: 0%;
    left: auto;
  }

  100% {
    width: 100%;
    right: 0%;
    left: auto;
  }
}

/**/

.menu-wrapper:hover .menu-bar.active {
  animation: none;
}
.active .one {
  top: 50%;
  left: 0%;
  transform: rotate(45deg);
}
.active .two {
  top: 50%;
  left: 0%;
  transform: rotate(-45deg);
}
.active .three {
  top: 50%;
  left: 0%;
  transform: rotate(-45deg);
}
</style>

<template>
  <div>
    <div
      v-if="!openMenu"
      class="menu-wrapper z-[9999]"
      @click="openMenu = !openMenu"
      :class="{ active: openMenu }"
    >
      <div class="menu-bar one"></div>
      <div class="menu-bar two"></div>
      <div class="menu-bar three"></div>
    </div>
    <div v-if="openMenu">
      <div
        class="min-h-full bg-white px-4 sm:px-6 lg:px-8 shadow-2xl ring-1 ring-black/10 translate-x-0 w-[275px] top-0 fixed left-0 z-[999]"
      >
        <div class="h-16 flex justify-end items-center">
          <div
            class="menu-wrapper z-[9999]"
            @click="openMenu = !openMenu"
            :class="{ active: openMenu }"
          >
            <div class="menu-bar one"></div>
            <div class="menu-bar two"></div>
            <div class="menu-bar three"></div>
          </div>
        </div>

        <div class="w-[150px] px-2">
          <nav aria-label="Progress" class="py-6">
            <ol role="list" class="space-y-8">
              <li v-for="(step, index) in steps" :key="index" class="md:flex-1">
                <div
                  class="flex align-middle items-start justify-between cursor-pointer"
                  @click="activeTab(step, index)"
                >
                  <div class="flex items-start cursor-pointer">
                    <span
                      class="relative flex h-7 w-6 flex-shrink-0 items-center justify-center"
                    >
                      <commonIcon
                        :name="step.icon"
                        :width="'24'"
                        :height="'24'"
                        :stroke="'#1d4380'"
                        class="self-center px-2"
                      />
                    </span>
                    <span class="ml-3 font-medium text-[20px] primaryColor">{{
                      step.name
                    }}</span>
                  </div>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon } from "@heroicons/vue/20/solid";
import router from "../router";
import commonIcon from "../components/commonicon.vue";
export default {
  data() {
    return {
      steps: [
        {
          name: "Logs",
          route: "/logs",
          icon: "Reports",
          status: "active",
          active: false,
        },
        {
          name: "Reports",
          route: "/report",
          icon: "Reports",
          status: "active",
          active: false,
        },
        {
          name: "User Info",
          route: "/userInfo",
          icon: "Reports",
          status: "active",
          active: false,
        },
        {
          name: "Vendors",
          route: "/vendors",
          icon: "Reports",
          status: "active",
          active: false,
        },
        {
          name: "Contracts",
          route: "/contracts",
          icon: "Reports",
          status: "active",
          active: false,
        },
        {
          name: "Settings",
          route: "/settings",
          icon: "Reports",
          status: "active",
          active: false,
        },
        {
          name: "File Upload",
          route: "/fileupload",
          icon: "File Upload",
          status: "active",
          active: false,
        },
        {
          name: "Dashboard",
          route: "/dashboard",
          icon: "Dashboard",
          status: "active",
          active: true,
        },
      ],
      openMenu: false,
    };
  },
  methods: {
    activeTab(val, id) {
      router.push(val.route);
      this.openMenu = false;
    },
  },
  components: {
    CheckCircleIcon,
    commonIcon,
  },
};
</script>
