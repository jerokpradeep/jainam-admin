<template>
    <div>
        <tab-menu @activeTab="changeTab" />
        <adminMsg v-if="validTab == 'Admin Message'" />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import adminMsg from './admin-message.vue'
export default defineComponent({
    components: { adminMsg },
    setup() {
        const validTab = ref('')
        return { validTab }
    },
    methods: {
        changeTab(data: any) {
            this.validTab = data.name
            this.$store.dispatch('tabs/setActiveTab', { path: this.$route.path, id: data.id })
        }
    },
    created() {
        this.changeTab({ name: 'Admin Message', id: 0 })
    },
})
</script>