<template>
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
                        <Loader color="green" :progress="overallCount?.positivePercentage"></Loader>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" lg="6">
                        <v-list-subtitle class="d-flex ga-2">
                            <v-icon color="red">mdi-trending-down</v-icon>
                            <p>Negative</p>
                        </v-list-subtitle>
                        <Loader color="red" :progress="overallCount?.negativePercentage"></Loader>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-col>
</template>

<script>
    export default {
        props:{
            overallCount : {
                type : Object,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>