<template>
    <v-col cols="6" sm="6" md="3" lg="3">
        <v-card class="d-flex">
            <v-card-text>
                <v-card-subtitle>Total</v-card-subtitle>
                <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                    <p class="text-info">{{ overallCount?.total }}</p>
                </v-card-title>
                <v-chip size="small" class="float-right">Confidence Ave: {{ overallCount?.confidenceAvg }}%</v-chip>
            </v-card-text>
        </v-card>
    </v-col>
    <v-col cols="6" sm="6" md="3" lg="3">
        <v-card class="d-flex">
            <v-card-text>
                <v-card-subtitle>Positive</v-card-subtitle>
                <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                    <p class="text-success">{{ overallCount?.positive }}</p>
                </v-card-title>
                <v-chip size="small" class="float-right">{{overallCount?.positivePercentage}}%</v-chip>
            </v-card-text>
        </v-card>
    </v-col>
    <v-col cols="6" sm="6" md="3" lg="3">
        <v-card class="d-flex">
            <v-card-text>
                <v-card-subtitle>Negative</v-card-subtitle>
                <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                    <p class="text-error">{{ overallCount?.negative }}</p>
                </v-card-title>
                <v-chip size="small" class="float-right">{{overallCount?.negativePercentage}}%</v-chip>
            </v-card-text>
        </v-card>
    </v-col>
    <v-col cols="6" sm="6" md="3" lg="3">
        <v-card class="d-flex">
            <v-card-text>
                <v-card-subtitle>Overall Satisfaction</v-card-subtitle>
                <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                    <p class="text-warning">{{overallCount?.satisfaction}}</p>
                </v-card-title>
                <v-chip 
                    size="small" 
                    class="float-right"
                    :color="overallCount?.satisfaction > 80 ? 'success' : 
                    overallCount?.satisfaction > 60 ? 'warning' : 'error'"
                    :text="overallCount?.satisfaction > 80 ? 'High' : 
                    overallCount?.satisfaction > 60 ? 'Average' : 'Low'"
                ></v-chip>
            </v-card-text>
        </v-card>
    </v-col>
</template>

<script>
    export default {
        props : {
            overallCount : {
                type : Object,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>