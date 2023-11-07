<template>
    <div class="p-5">
        <table class="bg-white w-full my-2" v-if="getDuplicateSymbols?.length > 0">
            <thead class="border-b text-sm border-[#ededed]">
                <tr>
                    <th class="text-left">Exchange Segment</th>
                    <th class="text-left">Duplicate Symbols</th>
                    <th class="text-left">Count</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(i, id) in getDuplicateSymbols" :key="id"
                    class="border-b text-sm border-[#ededed] hover:bg-gray-100">
                    <td class="text-left">
                        {{ i?.exch_segment ? i?.exch_segment : '-' }}
                    </td>
                    <td class="text-left">
                        {{ i?.duplicate_symbols ? i?.duplicate_symbols : '-' }}
                    </td>
                    <td class="text-left">
                        {{ i?.count ? i?.count : '-' }}
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
        ...mapGetters('cMaster', ['getDuplicateSymbols'])
    },
    components: {
        noData
    },
    created() {
        this.$store.dispatch('cMaster/getDuplicateSymbols')
    },
})
</script>