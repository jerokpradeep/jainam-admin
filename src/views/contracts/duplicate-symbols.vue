<template>
    <div class="p-5">
        <!-- <table class="bg-white w-full my-2">
            <thead class="border-b border-[#ededed]">
                <tr>
                    <th class="text-left">Exchange Segment</th>
                    <th class="text-left">Duplicate Symbols</th>
                    <th class="text-left">Count</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(i,id) in getDuplicateSymbols" :key="id" class="border-b border-[#ededed] hover:bg-gray-50">
                    <td class="text-left">
                        {{ i?.exch_segment }}
                    </td>
                    <td class="text-left">
                        {{ i?.duplicate_symbols }}
                    </td>
                    <td class="text-left">
                        {{ i?.count }}
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
        ...mapGetters('cMaster', ['getDuplicateSymbols'])
    },
    created() {
        this.$store.dispatch('cMaster/getDuplicateSymbols')
    },
})
</script>