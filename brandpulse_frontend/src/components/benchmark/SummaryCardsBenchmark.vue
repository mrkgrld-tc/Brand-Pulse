<template>
    <v-col cols="12">
        <v-card>
            <v-card-text class="d-flex justify-space-around">
                <div class="d-flex ga-2 align-center flex-column">
                    <v-card-subtitle>Your Industry</v-card-subtitle>
                    <v-chip density="compact" color="primary">{{yourIndustry}}</v-chip>
                </div>
                <v-divider vertical class="border-opacity-25"></v-divider>  
                <div class="d-flex ga-2 align-center flex-column">
                    <v-card-subtitle>Your Rank</v-card-subtitle>
                    <p><v-chip density="compact" color="primary">top {{yourRanking}}</v-chip> out of {{totalCompetitors}}</p>
                </div>
                <v-divider vertical class="border-opacity-25"></v-divider>  
                <div class="d-flex ga-2 align-center flex-column">
                    <v-card-subtitle>Competitors</v-card-subtitle>
                    <v-btn to="/analyze" color="secondary" append-icon="mdi-plus">Add</v-btn>
                </div>  
            </v-card-text>
        </v-card>
    </v-col>
    <v-col cols="12">
        <v-row dense>
            <v-col cols="6" lg="3" md="3" sm="6">
                <v-card class="d-flex">
                    <v-card-text>
                        <v-card-subtitle>Your Score</v-card-subtitle>
                        <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                            <p>{{score}}</p>
                            <v-icon color="primary">mdi-account-box</v-icon>
                        </v-card-title>
                        <v-chip size="small" class="float-right">Satisfaction Average</v-chip>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="6" lg="3" md="3" sm="6">
                <v-card class="d-flex">
                    <v-card-text>
                        <v-card-subtitle>Industry Average</v-card-subtitle>
                        <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                            <p>{{industryAve}}</p>
                            <v-icon color="warning">mdi-chart-box</v-icon>
                        </v-card-title>
                        <v-chip size="small" class="float-right" :color="(score - industryAve) > 0 ? 'success':'error'">{{(score - industryAve).toFixed(2)}}% vs avg</v-chip>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="6" lg="3" md="3" sm="6">
                <v-card class="d-flex">
                    <v-card-text>
                        <v-card-subtitle>Top Performer</v-card-subtitle>
                        <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                            <p>{{topPerformer}}</p>
                            <v-icon color="success">mdi-trophy</v-icon>
                        </v-card-title>
                        <v-chip size="small" class="float-right" color="secondary">Gap : {{(topPerformer - score).toFixed(2)}}%</v-chip>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="6" lg="3" md="3" sm="6">
                <v-card class="d-flex">
                    <v-card-text>
                        <v-card-subtitle>Competitors</v-card-subtitle>
                        <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                            <p>{{totalCompetitors}}</p>
                            <v-icon color="info">mdi-target</v-icon>
                        </v-card-title>
                        <v-chip size="small" class="float-right">Active Competitor</v-chip>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
    export default {
        props : {
            score : {
                type : String,
                default : '0'
            },
            industryAve : {
                type : String,
                default : '0'
            },
            topPerformer : {
                type : String,
                default : '0'
            },
            yourRanking : {
                type : Number,
                default : 0
            },
            totalCompetitors : {
                type : Number,
                default : 0
            },
            yourIndustry : { 
                type : String,
                default : 'N/A'
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>