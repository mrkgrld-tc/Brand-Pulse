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
                            max-width="300px"
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

            <SentimentOvertime :dateCount="dateCount"/>


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
                    @search-keyword="handleSearchKeyword"
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
    export default {
        data(){
            return{
                demoPrompt : true,
                rawDashboardData : {},
                overallCount : null,
                overAllSatisfaction : null,
                dateCount : null,
                strengths: [],
                opportunities: [],
                weaknesses: [],
                threats : [],
                wordFrequency : null,
                keywordFrequency : null,
                insights : null,
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
            async handleGetDashBoarData(){
                this.rawDashboardData = await this.getdashBoardData(this.userData.userId, this.companyData.companyId);  
                this.processData(this.rawDashboardData)
            },
            async processData(rawData) {
                this.strengths = [];
                this.weaknesses = [];
                this.opportunities = [];
                this.threats = [];
                // Calculate all metrics
                this.overallCount = this.calculateSentimentCounts(rawData);
                // this.confidence = this.calculateAverageConfidence(results, count);
                this.wordFrequency = this.calculateThemeFrequency(rawData);
                this.keywordFrequency = this.calculateKeywordFrequency(rawData);
                this.dateCount = this.calculateSentimentByDate(rawData);
                
                // // Set up insights
                this.insights = this.setUpInsights(rawData);
                
                // // Populate feedback list
                // this.results = this.mapFeedbackList(results);
                
                // // Set up SWOT
                this.setupSWOT(rawData);
            },

            calculateSentimentCounts(results) {
                const counts = {
                    positive: 0,
                    negative: 0,
                    total: 0,
                };
                let confidence = 0;
                let satisfaction = 0;
                Object.entries(results).forEach(([key, value]) => {
                    value.results.forEach(item => {
                        const sentiment = item.sentiment?.toLowerCase();
                        const confidenceDb = Number(item.confidence);
                        const satisfactionDb = Number(item.satisfaction);
                        counts.total++;
                        confidence += confidenceDb;
                        satisfaction += satisfactionDb;
                        if (sentiment === 'positive') counts.positive++;
                        else if (sentiment === 'negative') counts.negative++;
                        else if (sentiment === 'neutral') counts.neutral++;
                    })
                })
                console.log(confidence / counts.total)
                return {
                    ...counts,
                    positivePercentage: ((counts.positive / counts.total) * 100).toFixed(2),
                    negativePercentage: ((counts.negative / counts.total) * 100).toFixed(2),
                    confidenceAvg: (confidence / counts.total).toFixed(2),
                    satisfaction : (satisfaction / counts.total).toFixed(2),
                };
            },

            calculateAverageSatisfaction(results, total) {
                const satisfactionTotal = results.reduce((sum, item) => {
                    return sum + (item.satisfaction || 0);
                }, 0);
                
                return Math.round(satisfactionTotal / total);
            },

            calculateAverageConfidence(results, total) {
                const confidenceTotal = results.reduce((sum, item) => {
                    return sum + (item.confidence || 0);
                }, 0);
                
                return Math.round(confidenceTotal / total);
            },

            calculateThemeFrequency(results) {
                const themeCount = {};
                Object.entries(results).forEach(([key, value]) => {
                    value['results'].forEach(item => {
                        const themes = item.themes ? JSON.parse(item.themes) : [];
                        
                        themes.forEach(theme => {
                            themeCount[theme] = (themeCount[theme] || 0) + 1;
                        });
                    });
                })
                return Object.entries(themeCount)
                    .map(([theme, count]) => ({ theme, count }))
                    .sort((a, b) => b.count - a.count);
            },
                        
            calculateKeywordFrequency(results) {
                const keywordCount = {};
                Object.entries(results).forEach(([key, value]) => {
                    value['results'].forEach(item => {
                        const keywords = item.keywords ? JSON.parse(item.keywords) : [];
                        keywords.forEach(keyword => {
                            keywordCount[keyword] = (keywordCount[keyword] || 0) + 1;
                        });
                    });
                })
                
                return Object.entries(keywordCount)
                    .map(([keyword, count]) => ({ keyword, count }))
                    .sort((a, b) => b.count - a.count);
            },

            calculateSentimentByDate(rawData) {
                const dateCount = {};
                Object.entries(rawData).forEach(([key, value]) => {
                    value.results.forEach(item => {
                        const date = item.date || 'Unknown';
                        const sentiment = item.sentiment?.toLowerCase() || 'neutral';
                        
                        if (!dateCount[date]) {
                            dateCount[date] = {
                                positive: 0,
                                negative: 0,
                                neutral: 0
                            };
                        }
                        
                        dateCount[date][sentiment] = (dateCount[date][sentiment] || 0) + 1;
                    });
                })
                
                return dateCount;
            },

            mapFeedbackList(results) {
                return results.map(item => ({
                    date: item.date || 'N/A',
                    type: item.sentiment || 'neutral',
                    score: item.satisfaction || 0,
                    feedback: item.text || item.feedback || '',
                    keywords: item.keywords || [],
                    themes: item.themes || [],
                    summary: item.summary || '',
                    confidence: item.confidence || 0
                }));
            },
            setUpInsights(results){
                const temp = [];
                Object.entries(results).forEach(([key, value]) => {
                    value['insights'].forEach(item => {
                        temp.push(item);
                    })
                })

                return temp;
            },
            setupSWOT(rawData) {
                Object.entries(rawData).forEach(([key, value]) => {
                    const swot = value['swot'] || {};
                                        
                    // Parse each stringified array safely
                    const strengths = swot.strength ? JSON.parse(swot.strength) : [];
                    const weaknesses = swot.weaknesses ? JSON.parse(swot.weaknesses) : [];
                    const opportunities = swot.opportunities ? JSON.parse(swot.opportunities) : [];
                    const threats = swot.threats ? JSON.parse(swot.threats) : [];

                    // Push into existing arrays
                    this.strengths.push(...strengths);
                    this.weaknesses.push(...weaknesses);
                    this.opportunities.push(...opportunities);
                    this.threats.push(...threats);
                })
            }
        },
        computed : {
            ...mapState(useAnalysisStore, ['fetchedDashboard']),
            ...mapState(useUserStore, ['userData', 'companyData']),
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
                    this.processData(this.rawDashboardData)
                }else{
                    const temp = {};
                    temp[newVal] = {...this.rawDashboardData[newVal]};
                    console.log(temp)
                    this.processData(temp);
                }
            }
        },  
        async mounted(){
            this.handleGetDashBoarData();
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