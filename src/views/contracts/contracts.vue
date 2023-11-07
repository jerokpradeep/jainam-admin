<template>
    <div>
        <tab-menu @activeTab="changeTab" />
        <contractMaster v-if="validTab == 'Contract Master'" />
        <newSymbols v-if="validTab == 'Newly Added Symbols'" />
        <deactivatedSymbols v-if="validTab == 'Deactivated Symbols'" />
        <duplicateSymbols v-if="validTab == 'Duplicate Symbols'" />
        <addNewScrip v-if="validTab == 'Add New Scrip'" />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import contractMaster from './contract-master.vue'
import newSymbols from './new-symbols.vue'
import deactivatedSymbols from './deactivated-symbols.vue'
import duplicateSymbols from './duplicate-symbols.vue'
import addNewScrip from './add_new_scrip.vue'
export default defineComponent({
    components: { contractMaster, newSymbols, deactivatedSymbols, duplicateSymbols, addNewScrip },
    setup() {
        const validTab = ref('Contract Master')
        return { validTab }
    },
    methods: {
        changeTab(data: any) {
            this.validTab = data.name
            this.$store.dispatch('tabs/setActiveTab', { path: this.$route.path, id: data.id })
        }
    },
    created() {
        this.changeTab({ name: 'Contract Master', id: 0 },)
    },
})
</script>