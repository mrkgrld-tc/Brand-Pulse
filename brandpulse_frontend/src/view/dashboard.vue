<template>
    <v-container>
        <v-row class="mx-3" dense>
            <v-col cols="12">
                <div class="d-flex justify-space-between align-center">
                    <h3>Dashboard</h3>
                    <div class="d-flex ga-2">
                        <v-btn id="analysisMenuActivator" append-icon="mdi-chevron-down">All</v-btn>
                        <v-menu persistent activator="#analysisMenuActivator" open-on-hover>
                            <v-card>
                                <v-radio label="Analysis #09232" value="value"></v-radio>
                            </v-card>
                        </v-menu>
                        <v-btn>Analyze</v-btn>
                    </div>
                </div>
            </v-col>
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

            <v-col cols="12">
                <v-card>
                    <v-card-title><p>Sentiments Overtime</p></v-card-title>
                    <v-card-text v-if="loading || !dateCount">
                        Loading...
                    </v-card-text>
                    <LineChart 
                        v-else
                        :date="Object.keys(dateCount)" 
                        :positive="Object.entries(dateCount).map(([key, value]) => (value.positive))"
                        :negative="Object.entries(dateCount).map(([key, value]) => (value.negative))"
                    />
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
                <v-card style="border-left: 4px solid green; height: 100%">
                    <v-card-title class="mt-2"><p>Strength</p></v-card-title>
                    <v-card-text>
                        <v-table class="rounded-lg">
                            <tbody>
                                <tr v-for="item in strengths">
                                    <td>{{ item }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
                <v-card style="border-left: 4px solid orange; height: 100%">
                    <v-card-title class="mt-2"><p>Weaknesses</p></v-card-title>
                    <v-card-text>
                        <v-table class="rounded-lg">
                            <tbody>
                                <tr v-for="item in weaknesses">
                                    <td>{{ item }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
                <v-card style="border-left: 4px solid blue; height: 100%">
                    <v-card-title class="mt-2"><p>Opportunities</p></v-card-title>
                    <v-card-text>
                        <v-table class="rounded-lg">
                            <tbody>
                                <tr v-for="item in opportunities">
                                    <td>{{ item }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
                <v-card style="border-left: 4px solid red; height: 100%">
                    <v-card-title class="mt-2"><p>Threats</p></v-card-title>
                    <v-card-text>
                        <v-table class="rounded-lg">
                            <tbody>
                                <tr v-for="item in threats">
                                    <td>{{ item }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12">
                <wordChart
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
    import LineChart from '@/components/LineChart.vue';
    import BarChart from '@/components/BarChart.vue';
    import GaugeChart from '@/components/GaugeChart.vue';
    import RadarChart from '@/components/RadarChart.vue';
    import wordChart from '@/components/wordChart.vue';
import { mapActions, mapState } from 'pinia';
    export default {
        data(){
            return{
                demoPrompt : true,
                dashboardData : null,
                rawDashboardData : null,
                overallCount : null,
                overAllSatisfaction : null,
                dateCount : null,
                strengths: [],
                opportunities: [],
                weaknesses: [],
                threats : [],
            }
        },
        components:{
            LineChart,
            BarChart,
            GaugeChart,
            RadarChart,
            wordChart
        },
        methods:{
            ...mapActions(useAnalysisStore, ['getdashBoardData']),
            async handleGetDashBoarData(){
                this.rawDashboardData = await this.getdashBoardData();  
                this.processData(this.rawDashboardData)
            },
            async processData(rawData) {
                // Calculate all metrics
                this.overallCount = this.calculateSentimentCounts(rawData);
                // this.confidence = this.calculateAverageConfidence(results, count);
                // this.wordFrequency = this.calculateThemeFrequency(results);
                // this.keywordFrequency = this.calculateKeywordFrequency(results);
                this.dateCount = this.calculateSentimentByDate(rawData);
                
                // // Set up insights
                // this.insights = this.result['insights'];
                
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
                
                results.forEach(item => {
                    const themes = Array.isArray(item.themes) ? item.themes : [];
                    
                    themes.forEach(theme => {
                        themeCount[theme] = (themeCount[theme] || 0) + 1;
                    });
                });
                
                return Object.entries(themeCount)
                    .map(([theme, count]) => ({ theme, count }))
                    .sort((a, b) => b.count - a.count);
            },
                        
            calculateKeywordFrequency(results) {
                const keywordCount = {};
                
                results.forEach(item => {
                    const keywords = Array.isArray(item.keywords) ? item.keywords : [];
                    
                    keywords.forEach(keyword => {
                        keywordCount[keyword] = (keywordCount[keyword] || 0) + 1;
                    });
                });
                
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
            ...mapState(useAnalysisStore, ['fetchedDashboard'])
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