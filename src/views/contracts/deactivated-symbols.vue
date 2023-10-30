<template>
    <div class="p-5">
        <!-- <table class="bg-white w-full my-2">
            <thead class="border-b border-[#ededed]">
                <tr>
                    <th class="text-left">Exchange Segment</th>
                    <th class="text-left">Group Name</th>
                    <th class="text-left">Symbol</th>
                    <th class="text-left">Instrument Name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(i,id) in getDeactivatedSymbols" :key="id" class="border-b border-[#ededed] hover:bg-gray-50">
                    <td class="text-left">
                        {{ i?.exch_segment }}
                    </td>
                    <td class="text-left">
                        {{ i?.group_name }}
                    </td>
                    <td class="text-left">
                        {{ i?.symbol }}
                    </td>
                    <td class="text-left">
                        {{ i?.instrument_name }}
                    </td>
                </tr>
            </tbody>
        </table> -->
        Coming soon
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
export default defineComponent({
    setup() {
        return { }
    },
    methods: {
        
    },
    computed: {
        ...mapGetters('cMaster', ['getDeactivatedSymbols'])
    },
    created() {
        this.$store.dispatch('cMaster/getDeactivatedSymbols')
    },
})
</script>