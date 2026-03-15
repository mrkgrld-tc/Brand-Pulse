<template>
    <v-container>
        <h1 class="text-h6 mb-2">Competitor Benchmarking</h1>
        <v-row dense>   
            <v-col cols="12">
                <v-card>
                    <v-card-text class="d-flex justify-space-around">
                        <div class="d-flex ga-2 align-center flex-column">
                            <v-card-subtitle>Your Industry</v-card-subtitle>
                            <v-chip density="compact" color="primary">Technology</v-chip>
                        </div>
                        <v-divider vertical class="border-opacity-25"></v-divider>  
                        <div class="d-flex ga-2 align-center flex-column">
                            <v-card-subtitle>Your Rank</v-card-subtitle>
                            <p><v-chip density="compact" color="primary">top 4</v-chip> out of 45</p>
                        </div>
                        <v-divider vertical class="border-opacity-25"></v-divider>  
                        <div class="d-flex ga-2 align-center flex-column">
                            <v-card-subtitle>Competitors</v-card-subtitle>
                            <v-btn color="secondary" append-icon="mdi-plus">Add</v-btn>
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
                                    <p>85</p>
                                    <v-icon color="primary">mdi-account-box</v-icon>
                                </v-card-title>
                                <v-chip size="small" class="float-right">4% lower</v-chip>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="6" lg="3" md="3" sm="6">
                        <v-card class="d-flex">
                            <v-card-text>
                                <v-card-subtitle>Industry Average</v-card-subtitle>
                                <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                                    <p>70</p>
                                    <v-icon color="warning">mdi-chart-box</v-icon>
                                </v-card-title>
                                <v-chip size="small" class="float-right" color="success">+15% vs avg</v-chip>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="6" lg="3" md="3" sm="6">
                        <v-card class="d-flex">
                            <v-card-text>
                                <v-card-subtitle>Top Performer</v-card-subtitle>
                                <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                                    <p>90</p>
                                    <v-icon color="success">mdi-trophy</v-icon>
                                </v-card-title>
                                <v-chip size="small" class="float-right" color="secondary">Gap : 5%</v-chip>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="6" lg="3" md="3" sm="6">
                        <v-card class="d-flex">
                            <v-card-text>
                                <v-card-subtitle>Competitors</v-card-subtitle>
                                <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                                    <p>85</p>
                                    <v-icon color="info">mdi-target</v-icon>
                                </v-card-title>
                                <v-chip size="small" class="float-right">Active Competitor</v-chip>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12">
                <v-card>
                    <v-card-title><p>Sentiment Distribution</p></v-card-title>
                    <v-card-text>
                        <div class="d-flex flex-column ga-1 mt-3">
                            <v-list-subtitle class="d-flex ga-2">
                                <v-icon color="primary">mdi-account-box</v-icon>
                                <p>Your Sentiment Distribution</p>
                            </v-list-subtitle>
                            <Loader progress="30"></Loader>
                        </div>
                        <div class="d-flex flex-column ga-1 mt-3">
                            <v-list-subtitle class="d-flex ga-2">
                                <v-icon color="warning">mdi-chart-box</v-icon>
                                <p>Industry Average Distribution</p>
                            </v-list-subtitle>
                            <Loader progress="30"></Loader>
                        </div>
                        <div class="d-flex flex-column ga-1 mt-3">
                            <v-list-subtitle class="d-flex ga-2"><v-icon color="success">mdi-trophy</v-icon><p>Top Performer Distribution</p></v-list-subtitle>
                            <Loader progress="30"></Loader>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card>
                    <v-card-title><p>Top Theme Comparison</p></v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" lg="4" md="4" sm="12">
                                <v-card-subtitle><p>Your Top Themes</p></v-card-subtitle>
                                <fieldset class="rounded-xl pa-1">
                                    <v-chip color="primary" class="ma-1">Food Quality (45)</v-chip>
                                    <v-chip color="primary" class="ma-1">Service Speed (32)</v-chip>
                                    <v-chip color="primary" class="ma-1">Taste (28)</v-chip>
                                    <v-chip color="primary" class="ma-1">Cleanliness (25)</v-chip>
                                    <v-chip color="primary" class="ma-1">Price (20)</v-chip>
                                </fieldset>
                            </v-col>
                            <v-col cols="12" lg="4" md="4" sm="12">
                                <v-card-subtitle><p>Industry Top Themes</p></v-card-subtitle>
                                <fieldset class="rounded-xl pa-1">
                                    <v-chip color="warning" class="ma-1">Food Quality (45)</v-chip>
                                    <v-chip color="warning" class="ma-1">Service Speed (32)</v-chip>
                                    <v-chip color="warning" class="ma-1">Taste (28)</v-chip>
                                    <v-chip color="warning" class="ma-1">Cleanliness (25)</v-chip>
                                    <v-chip color="warning" class="ma-1">Price (20)</v-chip>
                                </fieldset>
                            </v-col>
                            <v-col cols="12" lg="4" md="4" sm="12">
                                <v-card-subtitle><p>Top Competitors Themes</p></v-card-subtitle>
                                <fieldset class="rounded-xl pa-1">
                                    <v-chip color="success" class="ma-1">Food Quality (45)</v-chip>
                                    <v-chip color="success" class="ma-1">Service Speed (32)</v-chip>
                                    <v-chip color="success" class="ma-1">Taste (28)</v-chip>
                                    <v-chip color="success" class="ma-1">Cleanliness (25)</v-chip>
                                    <v-chip color="success" class="ma-1">Price (20)</v-chip>
                                </fieldset>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card>
                    <v-card-title><p>Competitor List</p></v-card-title>
                    <v-card-subtitle><p>Private</p></v-card-subtitle>
                    <v-card-text>
                        <v-row dense>
                            <v-col cols="6" sm="6" md="4" lg="3">
                                <v-card>
                                    <v-card-title><p>Competitor A</p></v-card-title>
                                    <v-card-text><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sed blanditiis, quas debitis corporis architecto obcaecati explicabo nam iste atque commodi earum minus, expedita sint totam. Quibusdam, laboriosam recusandae! Voluptas?</p></v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="6" sm="6" md="4" lg="3">
                                <v-card>
                                    <v-card-title><p>Competitor A</p></v-card-title>
                                    <v-card-text><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sed blanditiis, quas debitis corporis architecto obcaecati explicabo nam iste atque commodi earum minus, expedita sint totam. Quibusdam, laboriosam recusandae! Voluptas?</p></v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="6" sm="6" md="4" lg="3">
                                <v-card>
                                    <v-card-title><p>Competitor A</p></v-card-title>
                                    <v-card-text><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sed blanditiis, quas debitis corporis architecto obcaecati explicabo nam iste atque commodi earum minus, expedita sint totam. Quibusdam, laboriosam recusandae! Voluptas?</p></v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="6" sm="6" md="4" lg="3">
                                <v-card>
                                    <v-card-title><p>Competitor A</p></v-card-title>
                                    <v-card-text><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sed blanditiis, quas debitis corporis architecto obcaecati explicabo nam iste atque commodi earum minus, expedita sint totam. Quibusdam, laboriosam recusandae! Voluptas?</p></v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-subtitle><p>Public</p></v-card-subtitle>
                    <v-card-text>
                        <v-row dense>
                            <v-col cols="6" sm="6" md="4" lg="3">
                                <v-card>
                                    <v-card-title><p>Competitor A</p></v-card-title>
                                    <v-card-text><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sed blanditiis, quas debitis corporis architecto obcaecati explicabo nam iste atque commodi earum minus, expedita sint totam. Quibusdam, laboriosam recusandae! Voluptas?</p></v-card-text>
                                    <v-card-actions>
                                        <v-btn color="primary" variant="tonal">Compare</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                            <v-col cols="6" sm="6" md="4" lg="3">
                                <v-card>
                                    <v-card-title><p>Competitor A</p></v-card-title>
                                    <v-card-text><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sed blanditiis, quas debitis corporis architecto obcaecati explicabo nam iste atque commodi earum minus, expedita sint totam. Quibusdam, laboriosam recusandae! Voluptas?</p></v-card-text>
                                    <v-card-actions>
                                        <v-btn color="primary" variant="tonal">Compare</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                            <v-col cols="6" sm="6" md="4" lg="3">
                                <v-card>
                                    <v-card-title><p>Competitor A</p></v-card-title>
                                    <v-card-text><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sed blanditiis, quas debitis corporis architecto obcaecati explicabo nam iste atque commodi earum minus, expedita sint totam. Quibusdam, laboriosam recusandae! Voluptas?</p></v-card-text>
                                    <v-card-actions>
                                        <v-btn color="primary" variant="tonal">Compare</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                            <v-col cols="6" sm="6" md="4" lg="3">
                                <v-card>
                                    <v-card-title><p>Competitor A</p></v-card-title>
                                    <v-card-text><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sed blanditiis, quas debitis corporis architecto obcaecati explicabo nam iste atque commodi earum minus, expedita sint totam. Quibusdam, laboriosam recusandae! Voluptas?</p></v-card-text>
                                    <v-card-actions>
                                        <v-btn color="primary" variant="tonal">Compare</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>