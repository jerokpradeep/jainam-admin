<template>
    <div class="p-4">
        <div class="card p-4 h-full">
            <form class="flex justify-between pb-4">
                <div>
                    <!-- <button type="button"
                        class="my-2 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        ref="cancelButtonRef" @click="$store.commit('dash/activeUserLoginCondition', false)">
                        Back
                    </button> -->
                </div>
                <div class="flex gap-2">
                    <!-- <div>
                        <input type="search" v-model="search" placeholder="Search" maxlength="10"
                            class="border font-light w-10% h-8 rounded px-4 focus:outline-none focus:border-blue-500 hover:border-black focus:caret-blue-500" />

                        <div class="h-4 text-red-500 text-xs">
                        </div>
                    </div> -->
                    <div class="flex pl-4 items-start">
                        <button class="bg-blue-500 text-white h-8 w-[120px] cursor-pointer rounded text-xs"
                            @click="downloadUnicodeCSV(getUserRecordData, downloadValue)">
                            <p>Download</p>
                        </button>
                    </div>
                </div>
            </form>
            <div class="border rounded ">
                <table class="w-full" :search="search" v-if="(getUserRecordData?.length > 0)">
                    <thead class="text-[13px]">
                        <tr class="border-b">
                            <th v-for="(header, i) in tableHeaders[activepagetab as keyof typeof tableHeaders]" :key="i"
                                class="border-r">{{ header }}
                            </th>
                            <!-- <th class="border-r">S.NO</th>
                            <th class="border-r">UserID</th>
                            <th class="border-r">Time</th>
                            <th class="border-r">Device Type</th>
                            'api' || 'mob' || 'web'
                        -->
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        <tr v-for="(i, id) in getUserRecordData" :key="id" :search="search">
                            <td class="border-r border-b text-center">{{ id + 1 }}</td>
                            <td class="border-r border-b text-center">{{ i.userId }}</td>
                            <td v-if="downloadValue == 'UniqueUser'" class="border-r border-b text-center">{{ i.deviceType
                                || 'Unique' }}</td>
                            <td v-if="downloadValue != 'UniqueUser'" class=" border-r border-b text-center">{{ i.createdOn
                                || '' }}</td>
                            <td v-if="downloadValue == 'mob'" class=" border-r border-b text-center">{{ i.deviceType || ''
                            }}</td>
                        </tr>
                    </tbody>
                </table>
                <noData v-else></noData>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters, mapState } from "vuex";
import noData from "../../components/no-data.vue";
import commonFunc from "../../mixins/common";


export default defineComponent({
    name: "activeUserLoginCondition",
    mixins: [commonFunc],
    components: { noData },
    data() {
        const search = ref('');
        let tableHeaders = ref({
            UniqueUser: ['S.NO', 'UserID', 'Source'],
            web: ['S.NO', 'UserID', 'Time'],
            mob: ['S.NO', 'UserID', 'Time', 'Device Type'],
            api: ['S.NO', 'UserID', 'Time'],
        });
        let Selectedtab = ref('UniqueUser' || 'web' || 'mob' || 'api');
        return {
            search, tableHeaders, Selectedtab
        }
    },
    methods: {



    },
    computed: {

        ...mapGetters("dash", ['activeUserLoginCondition', 'getUserRecordData', 'setUserCount']),
        ...mapState("dash", ['tab', 'downloadValue', 'activepagetab']),
        // filteredUserRecordData() {
        //     return this.getUserRecordData.filter((item: String) =>
        //         Object.values(item).some(
        //             (value) =>
        //                 typeof value === "string" &&
        //                 value.toLowerCase().includes(this.search.toLowerCase())
        //         )
        //     );
        // },



    },


    unmounted() {
        this.$store.commit('dash/activeUserLoginCondition', false);
    }
})
</script>
<style></style>