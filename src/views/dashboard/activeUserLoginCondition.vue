<template>
    <!-- <div>helllo userr!!!</div> -->
    <div class="p-4">
        <div class="card p-4 h-full">
            <!-- <button type="button"
                class="mt-2 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                ref="cancelButtonRef" @click="
                    $store.commit('dash/activeUserLoginCondition', false);
                ">
                Back
            </button>
            <form class="flex justify-end">
                <div>
                    <input type="text" placeholder="Search" maxlength="10"
                        class="border font-light w-10% h-8 rounded px-4 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />

                    <div class="h-4 text-red-500 text-xs">
                    </div>
                </div>
                <div class="flex pl-4 items-start">
                    <button class="bg-blue-500 text-white h-8 w-[120px] cursor-pointer rounded text-xs">
                        <p>Download</p>

                    </button>

                </div>
            </form> -->
            <form class="flex justify-between mb-2">
                <div>
                    <button type="button"
                        class="my-2 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        ref="cancelButtonRef" @click="$store.commit('dash/activeUserLoginCondition', false)">
                        Back
                    </button>
                </div>
                <div class="flex gap-2">
                    <!-- <div>
                        <input type="text" placeholder="Search" maxlength="10"
                            class="border font-light w-10% h-8 rounded px-4 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />

                        <div class="h-4 text-red-500 text-xs">
                        </div>
                    </div>
                    <div class="flex pl-4 items-start">
                        <button class="bg-blue-500 text-white h-8 w-[120px] cursor-pointer rounded text-xs">
                            <p>Download</p>
                        </button>
                    </div> -->
                </div>
            </form>

            <div class="border rounded">
                <table class="w-full" v-if="getUserRecordData?.length > 0">

                    <thead class="text-[13px]">
                        <tr class="border-b">
                            <th class="border-r">S.NO</th>
                            <th class="border-r">UserID</th>
                            <th class="border-r">Source</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        <tr v-for="(i, id) in getUserRecordData" :key="id">
                            <td class="border-r border-b text-center">{{ id + 1 }}</td>
                            <td class="border-r border-b text-center">{{ i.userId }}</td>
                            <td class=" border-r border-b text-center">{{ i.source || 'Unique' }}</td>


                        </tr>
                    </tbody>
                </table>
                <noData v-else></noData>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import noData from "../../components/no-data.vue";

export default defineComponent({
    name: "activeUserLoginCondition",
    components: { noData },
    computed: {
        ...mapGetters("dash", ['activeUserLoginCondition', 'getUserRecordData']),
    },
    unmounted() {
        this.$store.commit('dash/activeUserLoginCondition', false);
    }
})
</script>
<style></style>