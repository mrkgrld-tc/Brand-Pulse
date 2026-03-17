<template>
    <v-container>
        <v-row class="mx-3" dense>
            <v-col cols="6" sm="6" md="3" lg="3">
                <v-card class="d-flex">
                    <v-card-text>
                        <v-card-subtitle>Total</v-card-subtitle>
                        <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                            <p>{{ 23 }}</p>
                            <v-icon color="info">mdi-file-chart</v-icon>
                        </v-card-title>
                        <v-chip size="small" class="float-right">Confidence Ave: {{ 43 }}%</v-chip>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="6" sm="6" md="3" lg="3">
                <v-card class="d-flex">
                    <v-card-text>
                        <v-card-subtitle>Positive</v-card-subtitle>
                        <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                            <p>{{ 43 }}</p>
                            <v-icon color="success">mdi-trending-up</v-icon>
                        </v-card-title>
                        <v-chip size="small" class="float-right">{{34}}%</v-chip>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="6" sm="6" md="3" lg="3">
                <v-card class="d-flex">
                    <v-card-text>
                        <v-card-subtitle>Negative</v-card-subtitle>
                        <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                            <p>{{34 }}</p>
                            <v-icon color="red">mdi-trending-down</v-icon>
                        </v-card-title>
                        <v-chip size="small" class="float-right">{{34}}%</v-chip>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="6" sm="6" md="3" lg="3">
                <v-card class="d-flex">
                    <v-card-text>
                        <v-card-subtitle>Overall Satisfaction</v-card-subtitle>
                        <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                            <p>85</p>
                            <v-icon>mdi-gauge</v-icon>
                        </v-card-title>
                        <v-chip size="small" class="float-right">4% lower</v-chip>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12">
                <v-card>
                    <v-card-title><p>Sentiment Distribution</p></v-card-title>
                    <v-card-text>
                        <v-row dense>
                            <v-col cols="12" sm="12" md="6" lg="6">
                                <v-list-subtitle class="d-flex ga-2">
                                    <v-icon color="green">mdi-trending-up</v-icon>
                                    <p>Positive</p>
                                </v-list-subtitle>
                                <Loader :progress="45"></Loader>
                            </v-col>
                            <v-col cols="12" sm="12" md="6" lg="6">
                                <v-list-subtitle class="d-flex ga-2">
                                    <v-icon color="red">mdi-trending-down</v-icon>
                                    <p>Negative</p>
                                </v-list-subtitle>
                                <Loader :progress="45"></Loader>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>


            <v-col cols="12">
                <v-card>
                    <v-card-title><p>Sentiments Overtime</p></v-card-title>
                    <!-- <LineChart 
                        :date="Object.keys(dateCount)" 
                        :positive="Object.entries(dateCount).map(([key, value]) => (value.positive))"
                        :negative="Object.entries(dateCount).map(([key, value]) => (value.negative))"
                    ></LineChart> -->
                    <LineChart/>
                </v-card>
            </v-col>

            <v-col cols="12">
                <!-- <wordChart
                    :word-frequency="wordFrequency"
                    :keyword-frequency="keywordFrequency"
                    @search-keyword="handleSearchKeyword"
                />                         -->
                <wordChart/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import LineChart from '@/components/LineChart.vue';
    import BarChart from '@/components/BarChart.vue';
    import GaugeChart from '@/components/GaugeChart.vue';
    import RadarChart from '@/components/RadarChart.vue';
    import wordChart from '@/components/wordChart.vue';
    export default {
        data(){
            return{
                demoPrompt : true,
            }
        },
        components:{
            LineChart,
            BarChart,
            GaugeChart,
            RadarChart,
            wordChart
        }
    }
</script>

<style scoped>
    .summary-cards-stat{
        font-size: clamp(1.5rem, 2.5vw, 4rem)!important;
    }
    .summary-cards-title{
        font-size: clamp(0.5rem, 1vw, 1rem)!important;
    }
</style>