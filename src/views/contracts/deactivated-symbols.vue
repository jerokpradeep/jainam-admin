<template>
    <div class="p-5">
        <table class="bg-white w-full my-2" v-if="getDeactivatedSymbols?.length > 0">
            <thead class="border-b border-[#ededed] text-sm">
                <tr>
                    <th class="text-left">Exchange Segment</th>
                    <th class="text-left">Group Name</th>
                    <th class="text-left">Symbol</th>
                    <th class="text-left">Instrument Name</th>
                    <th class="text-left">Token</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(i, id) in getDeactivatedSymbols" :key="id"
                    class="border-b text-sm border-[#ededed] hover:bg-gray-100">
                    <td class="text-left">
                        {{ i?.exchSegment.toUpperCase() ? i?.exchSegment.toUpperCase() : '-' }}
                    </td>
                    <td class="text-left">
                        {{ i?.groupName.toUpperCase() ? i?.groupName.toUpperCase() : '-' }}
                    </td>
                    <td class="text-left">
                        {{ i?.symbol.toUpperCase() ? i?.symbol.toUpperCase() : '-' }}
                    </td>
                    <td class="text-left">
                        {{ i?.instrumentName.toUpperCase() ? i?.instrumentName.toUpperCase() : '-' }}
                    </td>
                    <td class="text-left">
                        {{ i?.token ? i?.token : '-' }}
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Coming soon -->
        <noData v-else></noData>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import noData from "../../components/no-data.vue";
export default defineComponent({
    setup() {
        return {}
    },
    methods: {

    },
    computed: {
        ...mapGetters('cMaster', ['getDeactivatedSymbols'])
    },
    components: {
        noData
    },
    created() {
        this.$store.dispatch('cMaster/getDeactivatedSymbols')
    },
})
</script>