<template>
    <v-col cols="12">
        <v-card>
            <v-card-title><p>Sentiments Overtime</p></v-card-title>
            <v-card-text v-if="!dateCount">
                Loading...
            </v-card-text>
            <LineChart 
                v-else
                :date="Object.keys(dateCount)" 
                :positive="Object.entries(dateCount).map(([key, value]) => (value.positive))"
                :negative="Object.entries(dateCount).map(([key, value]) => (value.negative))"
            />
        </v-card>
    </v-col>
</template>

<script>
import LineChart from '../LineChart.vue';
    export default {
        components : {
            LineChart,
        },
        props : {
            dateCount : { 
                type : Object
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>