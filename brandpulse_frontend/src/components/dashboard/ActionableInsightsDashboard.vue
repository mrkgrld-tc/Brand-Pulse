<template>
    <v-card>
        <v-card-title class="mt-2"><p>Actionable Insights & Recommendations</p></v-card-title>
        <v-card-text>
            <template v-for="(insight, i) in insights" :key="i">
                <v-card 
                    :style="`border-left: 4px solid ${colorLib[insight.sentiment_type]}`" 
                    class="pa-4 mb-2 rounded-lg d-flex flex-column ga-1 overflow-visible">
                    <p style="font-size: 1.05rem">{{ insight.title }}</p>
                    <p>{{ insight.description }}</p>
                    <v-chip 
                            size="small" 
                            :color="colorLib[insight.priority]"
                            class="position-absolute right-0 top-0"
                            style="margin-top: -8px; margin-right: -8px"
                            variant="tonal"
                        >
                            {{ insight.priority }} priority
                        </v-chip>
                </v-card>
            </template>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        props:{
            insights : {
                type : Array,
            }
        },
        data(){
            return{
                colorLib : {
                    error: 'rgba(237, 66, 69, 0.5)',      
                    info: 'rgba(0, 168, 252, 0.5)',       
                    success: 'rgba(59, 165, 93, 0.5)',    
                    warning: 'rgba(250, 168, 26, 0.5)',
                    low : 'info',
                    medium : 'warning',
                    high : 'error',
                    negative : 'red',
                    positive : 'green',
                    neutral : 'blue'
                },
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>