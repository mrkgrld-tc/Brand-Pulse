<template>
    <v-col cols="12">
        <v-card>
            <v-card-title><p>Sentiments Overtime</p></v-card-title>
            <v-card-text v-if="!dateCount">
                Loading...
            </v-card-text>
            <LineChart
                v-if="dateCount"
                :date="dates"
                :positive="positiveData"
                :negative="negativeData"
            />
        </v-card>
    </v-col>
</template>

<script>
import LineChart from '../LineChart.vue';
import { useDashboardStore } from '@/stores/dashboardStore';
import { mapState } from 'pinia';
    export default {
        components : {
            LineChart,
        },
        props : {
            // dateCount : { 
            //     type : Object
            // }
        },
        computed: {
            ...mapState(useDashboardStore, ['dateCount']),

            dates() {
                return Object.keys(this.dateCount ?? {});
            },
            positiveData() {
                return Object.values(this.dateCount ?? {}).map(v => v.positive);
            },
            negativeData() {
                return Object.values(this.dateCount ?? {}).map(v => v.negative);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>