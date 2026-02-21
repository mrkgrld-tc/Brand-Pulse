<template>
    <v-container>
        <h3>Dashboard</h3>
        <v-row align="stretch" dense>
            <v-col lg="6" md="12" sm="12" cols="12" style="display: flex; flex-direction: column; gap: 8px;">
                <v-row dense style="flex: 1;">
                    <v-col cols="6" style="display: flex;">
                        <v-card style="flex: 1;">
                            <v-card-text>
                                <p class="text-caption summary-cards-title">Total Reviews</p>
                                <h1 class="text-blue summary-cards-stat">45</h1>
                                <!-- <p><v-icon color="success" icon="mdi-trending-up"/> 45% higher</p> -->
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="6" style="display: flex;">
                        <v-card style="flex: 1;">
                        <v-card-text>
                            <p class="text-caption summary-cards-title">Positive Reviews</p>
                            <h1 class="text-success summary-cards-stat">45</h1>
                        </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row dense style="flex: 1;">
                    <v-col cols="6" style="display: flex;">
                        <v-card style="flex: 1;">
                        <v-card-text>
                            <p class="text-caption summary-cards-title">Negative Reviews</p>
                            <h1 class="text-red summary-cards-stat">45</h1>
                        </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="6" style="display: flex;">
                        <v-card style="flex: 1;">
                        <v-card-text>
                            <p class="text-caption summary-cards-title">Overall Rating</p>
                            <h1 class="text-primary summary-cards-stat">45%</h1>
                        </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>

            <v-col lg="6" md="12" sm="12" cols="12" style="display: flex;">
                <v-card height="250" style="flex: 1;">
                    <LineChart/>
                </v-card>
            </v-col>
        </v-row>
        <v-row align="stretch" dense>
            <v-col lg="8" md="12" sm="12" cols="12">
                <v-card height="300" style="flex: 1;">
                    <BarChart/>
                </v-card>
            </v-col>
            <v-col lg="4" md="12" sm="12" cols="12">
                <v-card height="300" style="flex: 1;">
                    <GaugeChart/>
                </v-card>
            </v-col>
            <!-- <v-col lg="6" md="12" sm="12" cols="12">
                <v-card height="250" style="flex: 1;">
                    <RadarChart/>
                </v-card>
            </v-col> -->
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