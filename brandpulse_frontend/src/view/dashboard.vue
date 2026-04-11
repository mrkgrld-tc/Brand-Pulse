<template>
    <v-container>
        <v-system-bar v-if="Object.keys(rawDashboardData).length == 0" class="bg-red d-flex justify-center">
            <p>Go to Analyze page to start analyzing feedbacks</p>
        </v-system-bar>
        <v-row v-else class="mx-3" dense>
            <v-col cols="12">
                <div class="d-flex justify-space-between align-center">
                    <h3>Dashboard</h3>
                    <div class="d-flex align-center flex-grow-1 justify-end ga-4">
                        <v-select 
                            max-width="40vw"
                            density="compact" 
                            variant="outlined"
                            hide-details
                            label="Filter"
                            v-if="analysisList"
                            v-model="filter"
                            :items="analysisList"
                            item-title="text"
                            item-value="value"
                        ></v-select>
                        <v-btn to="/analyze">Analyze</v-btn>
                    </div>
                </div>
            </v-col>
            <SummaryCards :overallCount="overallCount"/>

            <SentimentDistrubution :overallCount="overallCount"/>

            <SwotDashboard
                :strengths="strengths"
                :weaknesses="weaknesses"
                :opportunities="opportunities"
                :threats="threats"
            />

            <SentimentOvertime/>

            <v-col cols=12>
                <div v-if="!insights"></div>
                <ActionableInsightsDashboard v-else :insights="insights"/>
            </v-col>
            
            <v-col cols="12">
                <div v-if="!wordFrequency && !keywordFrequency">Loading</div>
                <wordChart
                    v-else
                    :word-frequency="wordFrequency"
                    :keyword-frequency="keywordFrequency"
                />                        
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { useAnalysisStore } from '@/stores/analysisStore';
    import { useUserStore } from '@/stores/userStore';
    import SummaryCards from '@/components/dashboard/SummaryCards.vue';
    import SentimentDistrubution from '@/components/dashboard/SentimentDistrubution.vue';
    import SentimentOvertime from '@/components/dashboard/SentimentOvertime.vue';
    import SwotDashboard from '@/components/dashboard/SwotDashboard.vue';
    import wordChart from '@/components/wordChart.vue';
    import ActionableInsightsDashboard from '@/components/dashboard/ActionableInsightsDashboard.vue';
    import { mapActions, mapState } from 'pinia';
import { useDashboardStore } from '@/stores/dashboardStore';
    export default {
        data(){
            return{
                demoPrompt : true,
                filter : 0,
            }
        },
        components:{    
            wordChart,
            SummaryCards,
            SentimentDistrubution,
            SentimentOvertime,
            SwotDashboard,
            ActionableInsightsDashboard
        },
        methods:{
            ...mapActions(useAnalysisStore, ['getdashBoardData']),
            ...mapActions(useDashboardStore, ['processData', 'setRawData', 'processDataFilter']),
            async handleGetDashBoarData(){
                const result = await this.getdashBoardData(this.userData.userId, this.companyData.companyId);  
                this.setRawData(result);
                this.processData()
            },
        },
        computed : {
            ...mapState(useAnalysisStore, ['fetchedDashboard']),
            ...mapState(useUserStore, ['userData', 'companyData']),
            ...mapState(useDashboardStore, ['rawDashboardData', 'overallCount', 'dateCount', 'strengths', 'opportunities', 'weaknesses', 'threats', 'wordFrequency', 'keywordFrequency', 'insights']),
            analysisList(){
                if(this.rawDashboardData){
                    const temp = Object.entries(this.rawDashboardData).map(([key, value]) => {
                        return{
                            value : key,
                            text : `#${key}-${value.analysisDate}`
                        }
                    })
                    temp.unshift({
                        value : 0,
                        text : 'All',
                    })
                    return temp;
                }
                return null;
            },
        },
        watch : {
            filter(newVal){
                if(newVal == 0){
                    this.processDataFilter(this.rawDashboardData)
                }else{
                    const temp = {};
                    temp[newVal] = {...this.rawDashboardData[newVal]};
                    console.log(temp)
                    this.processDataFilter(temp);
                }
            }
        },  
        async mounted(){
            if(!this.fetchedDashboard){
                this.handleGetDashBoarData();
            }
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
    .swot-text {
        font-size: clamp(1rem, 1.1vw, 1.05rem) !important; 
        line-height: 1.5;                                  
        word-spacing: 1px;                                 
        font-weight: 400 !important;                       
    }

</style>