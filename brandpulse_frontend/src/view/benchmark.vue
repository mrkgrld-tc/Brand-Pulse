<template>
    <v-container>
        <h1 class="text-h6 mb-2">Competitor Benchmarking</h1>
        <v-row dense>   
            <SummaryCardsBenchmark 
                :score="overallCount?.satisfaction" 
                :industryAve="industry?.average" 
                :topPerformer="topCompetitor?.average" 
                :totalCompetitors="totalCompetitors" 
                :yourRanking="yourRanking"
                :yourIndustry="companyData.industry"
            />
            
            <SentimentDistributionBenchMark
                :yourAverage = "overallCount?.positivePercentage"
                :industryAverage = "industry?.positive"
                :topAverage = "topCompetitor?.positive"
            />

            <ThemesBenchmark
                :yourTopThemes="wordFrequency"
                :industryTopThemes="industry?.themes"
                :topPerformerTopThemes="topCompetitor?.themes"
            />
            
            <AllCompetitorList 
            :competitorList="Array.isArray(allCompetitors) 
                ? allCompetitors.filter(c => c.companyId !== companyData.companyId) 
                : []"
            />
        </v-row>
    </v-container>
</template>

<script>
import { useDashboardStore } from '@/stores/dashboardStore';
import { mapActions, mapState } from 'pinia';
import SummaryCardsBenchmark from '@/components/benchmark/SummaryCardsBenchmark.vue';
import SentimentDistributionBenchMark from '@/components/benchmark/SentimentDistributionBenchMark.vue';
import ThemesBenchmark from '@/components/benchmark/ThemesBenchmark.vue';
import AllCompetitorList from '@/components/benchmark/AllCompetitorList.vue';
import { useBenchStore } from '@/stores/benchmarkStore';
import { useUserStore } from '@/stores/userStore';
import { useAnalysisStore } from '@/stores/analysisStore';
    export default {
        components : {
            SummaryCardsBenchmark,
            SentimentDistributionBenchMark,
            ThemesBenchmark,
            AllCompetitorList,
        },
        data(){
            return{

            }
        },
        methods : { 
            ...mapActions(useBenchStore, ['getCompetitorsData']),
            ...mapActions(useAnalysisStore, ['getdashBoardData']),
            ...mapActions(useDashboardStore, ['processData', 'setRawData']),
        },
        computed : {
            ...mapState(useDashboardStore, ['overallCount', 'wordFrequency']),
            ...mapState(useUserStore, ['companyData', 'userData']),
            ...mapState(useBenchStore, ['industry', 'topCompetitor', 'totalCompetitors', 'yourRanking', 'allCompetitors']),
            ...mapState(useAnalysisStore, ['fetchedDashboard'])
        },
        async mounted(){
            if(!this.fetchedDashboard){
                const result = await this.getdashBoardData(this.userData.userId, this.companyData.companyId);  
                this.setRawData(result);
            }
            await this.processData()
            await this.getCompetitorsData(this.companyData['companyId'], this.companyData['category']);
        }
    }
</script>

<style lang="scss" scoped>

</style>