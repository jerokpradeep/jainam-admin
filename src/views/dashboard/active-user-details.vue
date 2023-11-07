<template>
  <div class="p-5" v-if="tabCondition == false && activeUserLoginCondition == false">
    <ul role="list" class="grid gap-6 grid-cols-2 sm:grid-cols-4 max-w-[1152px]">
      <li @click="getUserRecordDataFunc(i.source, id)"
        class="col-span-1 rounded-xl bg-white shadow h-[170px] p-4 cursor-pointer flex flex-col justify-center items-center"
        v-for="(i, id) in getUserTabs" :key="id" :class="{ 'bg-[#F9FDFF] border-[0.1px] border-[#c4daff]': i.active }">

        <div class="mb-2 text-lg text-center" :class="{ 'text-[#174EA6]': i.active, primaryColor: !i.active }">
          {{ i.type }}
        </div>
        <div class="font-black text-3xl" :class="{ 'text-[#174EA6]': i.active, secondaryColor: !i.active }">
          {{ i.count }}
        </div>
      </li>
    </ul>
    <!-- Coming soon -->
  </div>

  <div v-if="tabCondition == true && activeUserLoginCondition == false">
    <div class="p-5">
      <button v-on:click="tabCondition = false" type="button"
        class="bg-white-500 text-black border border-black h-10 w-[100px] cursor-pointer rounded">
        <div class="flex flex-row align-middle">
          <svg class="w-5 ml-2" fill="currentColor" viewBox="0 0 15 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clip-rule="evenodd"></path>
          </svg>
          <p class="ml-2 pl-1">Back</p>
        </div>
      </button>
    </div>
    <div class="flex align-center justify-center mt-[200px]">
      <h2>Uh..Oh...No data found!</h2>
    </div>
  </div>
  <activeUserLoginCondition v-if="activeUserLoginCondition == true"></activeUserLoginCondition>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import activeUserLoginCondition from "./activeUserLoginCondition.vue";
export default defineComponent({
  components: { activeUserLoginCondition },
  setup() {
    const tabCondition = ref(false);
    return { tabCondition };
  },

  methods: {
    // getCurrentData(data: any) {
    // this.data.forEach((el: any) => {
    //   el.active = el.type == data.type;
    //   if (el.active) {
    //     this.tabCondition = true;
    //   }
    // });
    // },
    // changeTab() {
    //   this.tabCondition = true;
    // },
    getUserCount() {
      this.$store.dispatch("dash/getSeperateUserCount");
    },
    getUserRecordDataFunc(source: any, index: any) {
      this.$store.commit('dash/setActiveTab', index);

      this.$store.commit('dash/activeUserLoginCondition', true);
      if (source != '') {
        this.$store.dispatch("dash/getUserRecordData", source);

      }


    }
  },
  computed: {
    ...mapGetters("dash", ["getUserTabs"]),
    ...mapGetters("dash", ["getTotalCount"]),
    ...mapGetters("dash", ["getUserRecordData"]),
    ...mapGetters("dash", ["activeUserLoginCondition"]),
  },

  async created() {

    await this.$store.dispatch("dash/getSeperateUserCount");

  },
});
</script>
