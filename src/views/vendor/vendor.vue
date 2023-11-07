<template>
    <div>
        <tab-menu />
        <div class="p-4">
            <div class="card p-4">
                <form @submit.prevent="getVendorData()"
                    class="gap-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-6">
                    <div>
                        <p class="primaryColor pb-1 text-sm">User ID</p>
                        <input type="text" v-model="userId" maxlength="10"
                            class="border w-full h-10 rounded focus:outline-0 px-4 text-xs">
                        <div class="h-4 mb-2 text-red-500 text-xs">
                            <span v-if="submitted && userId == ''">User ID is required</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <button class="bg-blue-500 text-white h-10 w-[120px] cursor-pointer rounded text-xs mt-1">
                            <p v-if="!getLoader">Submit</p>
                            <svg v-else class="animate-spin h-5 w-5 text-white flex mx-auto"
                                xmlns="http://www.w3.org/2000/svg" fill="#fffff" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#fffff" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </form>
                <div class="border rounded mt-2" v-if="getVendorList.length">
                    <table class="w-full">
                        <thead class="text-[13px]">
                            <tr class="border-b">
                                <th class="border-r text-center">Name</th>
                                <th class="border-r">Appcode</th>
                                <th class="border-r">Status</th>
                                <th class="">Action</th>
                            </tr>
                        </thead>
                        <tbody class="text-sm">
                            <tr v-for="(i, id) in getVendorList" :key="id" class="border-b">
                                <td class="border-r text-center">{{ i.appName }}</td>
                                <td class="border-r text-center ">{{ i.apiKey }}</td>
                                <td class="border-r text-center">
                                    <button class="px-4 py-1 text-xs rounded"
                                        :class="i.authorization_status == '1' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">{{
                                            i.authorization_status == '1' ? 'Active' : 'UnActive' }}</button>
                                </td>
                                <td class=" text-center">
                                    <button class="px-4 py-1 text-xs rounded bg-blue-500 text-white "
                                        @click="handleAuthorize(i)">{{ i.authorization_status == '1' ? 'Un Authorize' :
                                            'Authorize' }}</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <AuthorizeDialog v-if="getAuthorizeDialog" :cData="currentData" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'
import AuthorizeDialog from './authorize-dialog.vue'
export default defineComponent({
    setup() {
        const userId = ref('');
        const submitted = ref(false);
        const currentData = ref([])
        return { userId, submitted, currentData };
    },
    computed: {
        ...mapGetters('vendor', ['getVendorList', 'getLoader', 'getAuthorizeDialog'])
    },
    methods: {
        getVendorData() {
            this.submitted = true;
            if (this.userId != '') {
                let json = {
                    "client_id": this.userId
                };
                this.$store.dispatch('vendor/getVendors', json);
            }
        },
        handleAuthorize(i: any) {
            this.currentData = i
            this.$store.commit('vendor/setAuthorizeDialog', true)
        }
    },
    components: { AuthorizeDialog }
})
</script>