<template>
    <!--CARD -->
    <v-col cols="6" sm="6" md="3" lg="3">
        <v-card class="d-flex">
            <v-card-text>
                <v-card-subtitle>Strengths</v-card-subtitle>
                <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                    <p class="text-success">{{ strengths.length }}</p>
                </v-card-title>
                <v-btn size="small" class="float-right" @click="strengthsDialog = true">view</v-btn>
            </v-card-text>
        </v-card>
    </v-col>
    <v-col cols="6" sm="6" md="3" lg="3">
        <v-card class="d-flex">
            <v-card-text>
                <v-card-subtitle>Weakneses</v-card-subtitle>
                <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                    <p class="text-warning">{{ weaknesses.length }}</p>
                </v-card-title>
                <v-btn size="small" class="float-right" @click="weaknessesDialog = true">view</v-btn>
            </v-card-text>
        </v-card>
    </v-col>
    <v-col cols="6" sm="6" md="3" lg="3">
        <v-card class="d-flex">
            <v-card-text>
                <v-card-subtitle>Opportunities</v-card-subtitle>
                <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                    <p class="text-info">{{ opportunities.length }}</p>
                </v-card-title>
                <v-btn size="small" class="float-right" @click="opportunitiesDialog = true">view</v-btn>
            </v-card-text>
        </v-card>
    </v-col>
    <v-col cols="6" sm="6" md="3" lg="3">
        <v-card class="d-flex">
            <v-card-text>
                <v-card-subtitle>Threats</v-card-subtitle>
                <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                    <p class="text-error">{{ threats.length }}</p>
                </v-card-title>
                <v-btn size="small" class="float-right" @click="threatsDialog = true">view</v-btn>
            </v-card-text>
        </v-card>
    </v-col>


    <v-dialog v-model="strengthsDialog" max-width="900px" style="max-height: 80vh">
        <v-card style="border-left: 4px solid green; height: 100%">
            <v-card-title class="mt-2 d-flex justify-space-between align-center">
                <p>Strength</p>
                <v-btn icon="mdi-window-close" variant="text" @click="strengthsDialog = false"></v-btn>
            </v-card-title>
            <v-card-text>
                <v-table class="rounded-lg" max-height="80px">
                    <tbody>
                        <tr v-for="item in strengths">
                            <td>{{ item }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>
    </v-dialog>
    <v-dialog v-model="weaknessesDialog" max-width="900px" style="max-height: 80vh">
        <v-card style="border-left: 4px solid orange; height: 100%">
            <v-card-title class="mt-2 d-flex justify-space-between align-center">
                <p>Weaknesses</p>
                <v-btn icon="mdi-window-close" variant="text" @click="weaknessesDialog = false"></v-btn>
            </v-card-title>
            <v-card-text>
                <v-table class="rounded-lg" max-height="80px">
                    <tbody>
                        <tr v-for="item in weaknesses">
                            <td>{{ item }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>
    </v-dialog>
    <v-dialog v-model="opportunitiesDialog" max-width="900px" style="max-height: 80vh">
        <v-card style="border-left: 4px solid blue; height: 100%">
            <v-card-title class="mt-2 d-flex justify-space-between align-center">
                <p>Opportunities</p>
                <v-btn icon="mdi-window-close" variant="text" @click="opportunitiesDialog = false"></v-btn>
            </v-card-title>
            <v-card-text>
                <v-table class="rounded-lg" max-height="80px">
                    <tbody>
                        <tr v-for="item in opportunities">
                            <td>{{ item }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>
    </v-dialog>
    <v-dialog v-model="threatsDialog" max-width="900px" style="max-height: 80vh">
        <v-card style="border-left: 4px solid red; height: 100%">
            <v-card-title class="mt-2 d-flex justify-space-between align-center">
                <p>Threats</p>
                <v-btn icon="mdi-window-close" variant="text" @click="threatsDialog = false"></v-btn>
            </v-card-title>
            <v-card-text>
                <v-table class="rounded-lg" max-height="80px">
                    <tbody>
                        <tr v-for="item in threats">
                            <td>{{ item }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props : {
            strengths : {
                type : Array,
            },
            weaknesses : {
                type : Array,
            },
            opportunities : {
                type : Array,
            },
            threats : {
                type : Array,
            },
        },
        data(){
            return{
                strengthsDialog : false,
                weaknessesDialog : false,
                opportunitiesDialog : false,
                threatsDialog : false,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>