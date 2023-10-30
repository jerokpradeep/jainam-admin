/// <reference types="vite/client" />
import store from './store/index.ts'
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store:store
    }
}