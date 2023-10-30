<template>
    <div class="p-5">
    <div class="bg-white">
        <div class="p-5">
            <div class="primaryColor font-bold">Holdings</div>

            <div class="my-4 flex gap-3 items-end">
                <div>
                    <p class="primaryColor pb-1">User ID</p>
                    <input type="text" v-model="holdingsUserId" maxlength="10" class="border max-w-[300px] h-10 rounded focus:outline-0 px-4">
                </div>
                <button type="button" class="bg-blue-500 disabled:opacity-70 disabled:cursor-not-allowed text-white h-10 w-[120px] cursor-pointer rounded" :disabled="!holdingsUserId">Reload</button>
                <button type="button" class="bg-blue-500 text-white h-10 w-[120px] cursor-pointer rounded text-xs" >Reload All</button>
            </div>
        </div>

        <div class="p-5">
            <div class="primaryColor font-bold">Positions</div>

            <div class="my-4 flex gap-3 items-end">
                <div>
                    <p class="primaryColor pb-1">User ID</p>
                    <input type="text" v-model="positionUserId" maxlength="10" class="border max-w-[300px] h-10 rounded focus:outline-0 px-4">
                </div>
                <button type="button" class="bg-blue-500 disabled:opacity-70 disabled:cursor-not-allowed text-white h-10 w-[120px] cursor-pointer rounded" :disabled="!positionUserId">Reload</button>
                <button type="button" class="bg-blue-500 text-white h-10 w-[120px] cursor-pointer rounded text-xs" >Reload All</button>
            </div>
        </div>
    </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
    setup() {
        const holdingsUserId = ref('')
        const positionUserId = ref('')
        return { holdingsUserId, positionUserId }
    },
    methods: {
        
    },
})
</script>