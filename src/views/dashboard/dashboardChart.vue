<template>
    <div v-if="USERLOGSCHARTDATA?.length != []">
        <div id="echartsContainer" ref="echartsContainer" style="width: 100%; height: 400px" class="pt-2" autoresize
            :options="USERLOGSCHARTDATA">
        </div>
    </div>
    <noData v-else></noData>
</template>
<script>
import * as echarts from 'echarts';
import { mapGetters } from 'vuex';
import noData from "../../components/no-data.vue";
import { defineComponent } from "vue";
import commonFunc from "../../mixins/common";

export default defineComponent({
    components: {
        noData,
    },
    mixins: [commonFunc],
    computed: {
        ...mapGetters("dash", { USERLOGSCHARTDATA: "GETUSERLOGSCHARTDATA" }),
    },
    data() {
        return {
        };
    },
    mounted() {
        this.renderChart();
    },
    methods: {
        renderChart() {
            this.chart = echarts.init(this.$refs.echartsContainer);
            this.chart.setOption(this.USERLOGSCHARTDATA);
        },
    },
    created() {
        this.$store.dispatch('dash/getVisitorsPerDay');
    },
});
</script>