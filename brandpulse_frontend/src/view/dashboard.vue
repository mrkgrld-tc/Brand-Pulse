<template>
    <v-container>
        <h4>Dashboard</h4>
        <section class="d-flex align-center justify-center ga-1">
            <v-card class="flex-grow-1 glass-card">
                <v-card-text class="text-center">
                    <p class="text-h4 summary-cards-stat">142</p>
                    <p class="text-caption summary-cards-title">Total Reviews Analyzed</p>
                </v-card-text>
            </v-card>
            <v-card class="flex-grow-1 glass-card">
                <v-card-text class="text-center">
                    <p class="text-h4 text-green summary-cards-stat">68%</p>
                    <p class="text-caption summary-cards-title">Positive Sentiment</p>
                </v-card-text>
            </v-card>
            <v-card class="flex-grow-1 glass-card">
                <v-card-text class="text-center">
                    <p class="text-h4 text-orange summary-cards-stat ">22%</p>
                    <p class="text-caption summary-cards-title ">Neutral Sentiment</p>
                </v-card-text>
            </v-card>
            <v-card class="flex-grow-1 glass-card">
                <v-card-text class="text-center">
                    <p class="text-h4 text-red summary-cards-stat">10%</p>
                    <p class="text-caption summary-cards-title">Negative Sentiment</p>
                </v-card-text>
            </v-card>
        </section>
        <v-card>
        <RadarChart></RadarChart>   
        </v-card>
    </v-container>
</template>

<script>
    import RadarChart from '@/components/RadarChart.vue';
    export default {
        components:{
            RadarChart
        }
    }
</script>

<style scoped>
    .summary-cards-stat{
        font-size: clamp(1.5rem, 2vw, 4rem)!important;
    }
    .summary-cards-title{
        font-size: clamp(0.5rem, 0.7vw, 1rem)!important;
    }
</style>