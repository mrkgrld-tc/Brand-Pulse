<template>
    <v-col cols="12">
        <v-card>
            <v-card-title><p>Top Theme Comparison</p></v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" lg="4" md="4" sm="12">
                        <v-card-subtitle><p>Your Top Themes</p></v-card-subtitle>
                        <fieldset class="rounded-xl pa-1">
                            <template v-for="(item, i) in yourTopThemes?.slice(0, 10)" :key="i">
                                <v-chip color="primary" class="ma-1">{{item.theme}} ({{item.count}})</v-chip>
                            </template>
                        </fieldset>
                    </v-col>
                    <v-col cols="12" lg="4" md="4" sm="12">
                        <v-card-subtitle><p>Industry Top Themes</p></v-card-subtitle>
                        <fieldset class="rounded-xl pa-1">
                            <template v-for="(item, i) in industryTopThemes?.slice(0, 10)" :key="i">
                                <v-chip color="warning" class="ma-1">{{item.theme}} ({{item.count}})</v-chip>
                            </template>
                        </fieldset>
                    </v-col>
                    <v-col cols="12" lg="4" md="4" sm="12">
                        <v-card-subtitle><p>Top Competitors Themes</p></v-card-subtitle>
                        <fieldset class="rounded-xl pa-1">
                            <template v-for="(item, i) in topPerformerTopThemes?.slice(0, 10)" :key="i">
                                <v-chip color="success" class="ma-1">{{item.theme}} ({{item.count}})</v-chip>
                            </template>
                        </fieldset>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-col>
</template>

<script>
    export default {
        props : {
            yourTopThemes : {
                type : Array,
                default : []
            },
            industryTopThemes : {
                type : Array,
                default : []
            },
            topPerformerTopThemes : {
                type : Array,
                default : []
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>