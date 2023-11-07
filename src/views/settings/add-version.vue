<template>
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div
                    class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <form @submit.prevent="handleSubmit()">
                        <div>
                            <div class="">
                                <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Add version
                                </h3>
                                <div class="mt-2">
                                    <label for="Version ID">Version ID</label>
                                    <input placeholder="Enter version number" type="text" v-model="versionID"
                                        class="border w-full h-10 rounded focus:outline-0 px-4">

                                    <div class="h-4 mb-2 text-red-500 text-xs">
                                        <span v-if="versionID == ''">Version number should be Eg. 1.0.1</span>
                                    </div>
                                </div>

                                <div class="">
                                    <label for="OS">OS</label>
                                    <div>
                                        <select v-model="os" class="border w-full h-10 rounded focus:outline-0 px-4">
                                            <option value="Android">Android</option>
                                            <option value="IOS">IOS</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="mt-4">
                                    <label for="OS">Device Type</label>
                                    <div>
                                        <select v-model="deviceType"
                                            class="border w-full h-10 rounded focus:outline-0 px-4">
                                            <option value="MOB">Mobile</option>
                                            <option value="WEB">Web</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-6 flex gap-2">
                            <button type="button"
                                class="inline-flex w-full justify-center rounded-md border px-3 py-2 text-sm font-semibold primaryColor shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                @click="handleCancel()">Cancel</button>
                            <button type="submit"
                                class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                :disabled="versionID == ''">Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
    setup() {
        const versionID = ref('')
        const os = ref('Android')
        const deviceType = ref('MOB')
        return { versionID, os, deviceType }
    },
    props: ['cData'],
    methods: {
        handleCancel() {
            this.$store.commit('version/setIsAddVersionDialog', false)
        },
        async handleSubmit() {
            let json = {
                "version": this.versionID,
                "type": 'MOB',
                "os": this.os,
                "updateAvailable": "0"
            }
            await this.$store.dispatch('version/addMobileVersion', json)
            this.handleCancel();
        }
    },
})
</script>

