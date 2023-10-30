<template>
  <div class="p-5">
    <div class="border bg-white p-4">
      <table class="w-full border rounded" v-if="getproductlist.length">
        <thead class="text-[13px]">
          <tr class="border-b">
            <th class="border-r text-center">S.NO</th>
            <th class="border-r">Product</th>
            <th class="border-r">Actions</th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr v-for="(i, id) in getproductlist" :key="id" class="border-b">
            <td class="text-center border-r border-[#ededed]">{{ id + 1 }}</td>

            <td class="text-center border-r border-[#ededed]">
              {{ i.adminKey.toUpperCase() }}
            </td>
            <td class="text-center border-r border-[#ededed]">
              <div class="items-center my-4">
                <a
                  class="flex justify-center"
                  @click="handleEnabledSwitch(i.adminValue)"
                >
                  <span
                    class="text-sm pr-2"
                    :class="{
                      'secondary-color': i.adminValue == 0,
                      'text-[#3B82F6]': i.adminValue == 1,
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
                        i.adminValue == 0
                          ? 'bg-gray-200 dark:bg-gray-600'
                          : 'bg-[#3B82F6] dark:bg-gray-600',
                        'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out',
                      ]"
                    />
                    <span
                      aria-hidden="true"
                      :class="[
                        i.adminValue == 0 ? 'translate-x-0' : 'translate-x-5',
                        'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white dark:bg-zinc-800 shadow ring-0 transition-transform duration-200 ease-in-out',
                      ]"
                    />
                  </button>
                  <span
                    class="text-sm pl-2"
                    :class="{
                      'secondary-color': i.adminValue == 0,
                      'text-[#3B82F6]': i.adminValue == 1,
                    }"
                  ></span>
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <noData v-else></noData>
      <confirmation_dialogue v-if="confirmationdialogue == 'on' || confirmationdialogue == 'off'" ></confirmation_dialogue>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import confirmation_dialogue from "./confirmation_dialogue.vue";
import { mapState, mapGetters } from "vuex";
import noData from "../../components/no-data.vue";
export default defineComponent({
  name: "product",
  setup() {
    const currentData = ref("");

    return {
      currentData,
    };
  },
  components: {
    confirmation_dialogue,noData
  },
  computed: {
    ...mapState("settings", ["confirmationdialogue"]),
    ...mapGetters("settings", ["getproductlist"]),
  },
  methods: {
    handleEnabledSwitch(value: any) {
      if (value == 0) {
        this.$store.commit("settings/setconfirmationdialogue", "on");
      } else {
        this.$store.commit("settings/setconfirmationdialogue", "off");
      }
    },
  },
  created() {
    this.$store.dispatch("settings/getProductList");
  },
});
</script>
