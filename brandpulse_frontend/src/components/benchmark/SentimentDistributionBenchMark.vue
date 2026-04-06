<template>
    <v-col cols="12">
        <v-card>
            <v-card-title><p>Sentiment Distribution</p></v-card-title>
            <v-card-text>
                <div class="d-flex flex-column ga-1 mt-3">
                    <div class="d-flex ga-2">
                        <v-icon color="primary">mdi-account-box</v-icon>
                        <p>Your Sentiment Distribution</p>
                    </div>
                    <Loader :progress="yourAverage"></Loader>
                </div>
                <div class="d-flex flex-column ga-1 mt-3">
                    <div class="d-flex ga-2">
                        <v-icon color="warning">mdi-chart-box</v-icon>
                        <p>Industry Average Distribution</p>
                    </div>
                    <Loader :progress="industryAverage"></Loader>
                </div>
                <div class="d-flex flex-column ga-1 mt-3">
                    <div class="d-flex ga-2"><v-icon color="success">mdi-trophy</v-icon><p>Top Performer Distribution</p></div>
                    <Loader :progress="topAverage"></Loader>
                </div>
            </v-card-text>
        </v-card>
    </v-col>
</template>

<script>
    export default {
        props : {
            yourAverage : {
                type : String,
                default : '0'
            },
            industryAverage : {
                type : String,
                default : '0'
            },
            topAverage : {
                type : String,
                default : '0'
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>