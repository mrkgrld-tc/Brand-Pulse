<template>
    <v-container>
        <v-row>
            <div class="w-100 d-flex align-center mb-2 justify-space-between">
                <h3>DashBoard</h3>
                <div class="d-flex ga-1">
                    <v-btn color="primary" size="small">Analyze</v-btn>
                    <v-btn color="primary" size="small">Compare</v-btn>
                </div>
            </div>
        </v-row>
        <v-row align="stretch" dense>
            <!-- summary cards -->
            <v-col lg="5" md="5" sm="5" cols="12" style="display: flex; flex-direction: column; gap: 2px;">
                <v-row dense style="flex: 1;">
                    <v-col cols="6" style="display: flex;">
                        <v-card style="flex: 1;" class="summary-card">
                            <v-card-text>
                                <p class="text-caption summary-cards-title">Total Reviews</p>
                                <h1 class="text-blue summary-cards-stat">45</h1>
                                <!-- <p><v-icon color="success" icon="mdi-trending-up"/> 45% higher</p> -->
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="6" style="display: flex;">
                        <v-card style="flex: 1;" class="summary-card">
                        <v-card-text>
                            <p class="text-caption summary-cards-title">Positive Reviews</p>
                            <h1 class="text-success summary-cards-stat">45</h1>
                        </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row dense style="flex: 1;">
                    <v-col cols="6" style="display: flex;">
                        <v-card style="flex: 1;" class="summary-card">
                        <v-card-text>
                            <p class="text-caption summary-cards-title">Negative Reviews</p>
                            <h1 class="text-red summary-cards-stat">45</h1>
                        </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="6" style="display: flex;">
                        <v-card style="flex: 1;" class="summary-card">
                        <v-card-text>
                            <p class="text-caption summary-cards-title">Overall Rating</p>
                            <h1 class="text-primary summary-cards-stat">45%</h1>
                        </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row dense style="flex: 1;">
                    <v-col cols="12">
                        <v-card class="chart-card" height="300" style="flex: 1;">
                            <GaugeChart :value="80"/>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>

            <v-col lg="7" md="7" sm="7" cols="12">
                <v-card class="chart-card mb-2" height="250" style="flex: 1;">
                    <BarChart/>
                </v-card>
                <v-card class="chart-card" height="300" style="flex: 1;">
                    <RadarChart/>
                </v-card>
            </v-col>
        </v-row>
        <v-row align="stretch" dense>
            <v-col cols="12">
                <v-card class="chart-card" height="300" style="flex: 1;">
                    <LineChart/>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import LineChart from '@/components/LineChart.vue';
    import BarChart from '@/components/BarChart.vue';
    import GaugeChart from '@/components/GaugeChart.vue';
    import RadarChart from '@/components/RadarChart.vue';
    export default {
        data(){
            return{

            }
        },
        components:{
            LineChart,
            BarChart,
            GaugeChart,
            RadarChart
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