<template>
    <v-card class="comparison-dialog">
        <!-- Header -->
        <v-card-title class="d-flex justify-space-between align-center pa-4">
            <div class="d-flex align-center ga-5">
                <v-icon size="32">mdi-sword-cross</v-icon>
                <div>
                    <h2 class="text-h5">Brand Comparison</h2>
                    <p class="text-caption text-medium-emphasis mb-0">
                        {{ yourCompanyName }} vs {{ competitor.companyName }}
                    </p>
                </div>
            </div>
            <v-btn 
                icon 
                variant="text" 
                @click="$emit('close')"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <!-- Loading State -->
        <v-card-text v-if="loading" class="text-center pa-8">
            <v-progress-circular
                indeterminate
                color="primary"
                size="64"
            ></v-progress-circular>
            <p class="text-body-1 mt-4">Loading comparison data...</p>
        </v-card-text>

        <!-- Main Content -->
        <v-card-text v-else class="pa-6" style="max-height: 80vh; overflow-y: auto;">
            <!-- Company Cards -->
            <v-row class="mb-6">
                <v-col cols="12" md="5">
                    <v-card color="primary" variant="tonal">
                        <v-card-text>
                            <div class="d-flex align-center ga-3">
                                <v-avatar color="primary" size="48">
                                    <v-icon>mdi-domain</v-icon>
                                </v-avatar>
                                <div>
                                    <h3 class="text-h6">{{ yourCompanyName }}</h3>
                                    <p class="text-caption mb-0">Your Business</p>
                                </div>
                            </div>
                            <v-chip size="small" class="mt-3" color="primary">
                                {{ yourStats.total }} reviews
                            </v-chip>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" md="2" class="d-flex align-center justify-center">
                    <v-icon size="48" color="primary">mdi-sword-cross</v-icon>
                </v-col>

                <v-col cols="12" md="5">
                    <v-card color="warning" variant="tonal">
                        <v-card-text>
                            <div class="d-flex align-center ga-3">
                                <v-avatar color="warning" size="48">
                                    <v-icon>mdi-domain</v-icon>
                                </v-avatar>
                                <div>
                                    <h3 class="text-h6">{{ competitor.companyName }}</h3>
                                    <p class="text-caption mb-0">Competitor</p>
                                </div>
                            </div>
                            <v-chip size="small" class="mt-3" color="warning">
                                {{ competitorStats.total }} reviews
                            </v-chip>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Quick Stats -->
            <v-row class="mb-6">
                <v-col cols="12" md="3" v-for="metric in quickMetrics" :key="metric.name">
                    <v-card variant="outlined">
                        <v-card-text class="text-center pa-4">
                            <p class="text-caption text-medium-emphasis mb-2">{{ metric.name }}</p>
                            <div class="d-flex justify-space-around align-center mb-2">
                                <div>
                                    <h3 
                                        :class="[
                                            'text-h5',
                                            metric.yourWins ? 'text-success' : ''
                                        ]"
                                    >
                                        {{ metric.yourValue }}
                                    </h3>
                                    <p class="text-caption mb-0">You</p>
                                </div>
                                <v-divider vertical></v-divider>
                                <div>
                                    <h3 
                                        :class="[
                                            'text-h5',
                                            !metric.yourWins ? 'text-warning' : ''
                                        ]"
                                    >
                                        {{ metric.competitorValue }}
                                    </h3>
                                    <p class="text-caption mb-0">Them</p>
                                </div>
                            </div>
                            <v-chip 
                                size="x-small" 
                                :color="metric.yourWins ? 'success' : 'error'"
                            >
                                {{ metric.difference > 0 ? '+' : '' }}{{ metric.difference }}{{ metric.suffix }}
                            </v-chip>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Sentiment Comparison -->
            <v-row class="mb-6">
                <v-col cols="12">
                    <v-card variant="outlined">
                        <v-card-title>Sentiment Distribution</v-card-title>
                        <v-card-text>
                            <v-row>
                                <!-- Your Company -->
                                <v-col cols="12" md="6">
                                    <h4 class="text-center mb-4">{{ yourCompanyName }}</h4>
                                    <div class="text-center mb-4">
                                        <v-progress-circular
                                            :model-value="yourStats.positivePercentage"
                                            :size="150"
                                            :width="15"
                                            color="success"
                                        >
                                            <div>
                                                <h3>{{ yourStats.positivePercentage }}%</h3>
                                                <p class="text-caption mb-0">Positive</p>
                                            </div>
                                        </v-progress-circular>
                                    </div>
                                    <div class="sentiment-bars">
                                        <div class="mb-2">
                                            <div class="d-flex justify-space-between mb-1">
                                                <span class="text-caption">Positive</span>
                                                <span class="text-caption font-weight-bold">{{ yourStats.positive }}</span>
                                            </div>
                                            <v-progress-linear
                                                :model-value="yourStats.positivePercentage"
                                                color="success"
                                                height="8"
                                                rounded
                                            ></v-progress-linear>
                                        </div>
                                        <div>
                                            <div class="d-flex justify-space-between mb-1">
                                                <span class="text-caption">Negative</span>
                                                <span class="text-caption font-weight-bold">{{ yourStats.negative }}</span>
                                            </div>
                                            <v-progress-linear
                                                :model-value="yourStats.negativePercentage"
                                                color="error"
                                                height="8"
                                                rounded
                                            ></v-progress-linear>
                                        </div>
                                    </div>
                                </v-col>

                                <!-- Competitor -->
                                <v-col cols="12" md="6">
                                    <h4 class="text-center mb-4">{{ competitor.companyName }}</h4>
                                    <div class="text-center mb-4">
                                        <v-progress-circular
                                            :model-value="competitorStats.positivePercentage"
                                            :size="150"
                                            :width="15"
                                            color="warning"
                                        >
                                            <div>
                                                <h3>{{ competitorStats.positivePercentage }}%</h3>
                                                <p class="text-caption mb-0">Positive</p>
                                            </div>
                                        </v-progress-circular>
                                    </div>
                                    <div class="sentiment-bars">
                                        <div class="mb-2">
                                            <div class="d-flex justify-space-between mb-1">
                                                <span class="text-caption">Positive</span>
                                                <span class="text-caption font-weight-bold">{{ competitorStats.positive }}</span>
                                            </div>
                                            <v-progress-linear
                                                :model-value="competitorStats.positivePercentage"
                                                color="warning"
                                                height="8"
                                                rounded
                                            ></v-progress-linear>
                                        </div>
                                        <div>
                                            <div class="d-flex justify-space-between mb-1">
                                                <span class="text-caption">Negative</span>
                                                <span class="text-caption font-weight-bold">{{ competitorStats.negative }}</span>
                                            </div>
                                            <v-progress-linear
                                                :model-value="competitorStats.negativePercentage"
                                                color="error"
                                                height="8"
                                                rounded
                                            ></v-progress-linear>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <!-- SWOT Comparison -->
            <v-row class="mb-6">
                <v-col cols="12">
                    <v-card variant="outlined">
                        <v-card-title>Strengths & Weaknesses</v-card-title>
                        <v-card-text>
                            <v-row>
                                <!-- Your Strengths -->
                                <v-col cols="12" md="6">
                                    <h4 class="mb-3">
                                        <v-icon color="success" class="mr-2">mdi-check-circle</v-icon>
                                        {{ yourCompanyName }} - Strengths
                                    </h4>
                                    <v-list density="compact">
                                        <v-list-item
                                            v-for="(strength, index) in yourSWOT.strengths.slice(0, 5)"
                                            :key="index"
                                        >
                                            <template v-slot:prepend>
                                                <v-icon color="success" size="small">mdi-plus</v-icon>
                                            </template>
                                            <v-list-item-title class="text-wrap text-caption">
                                                {{ strength }}
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-col>
                                <!-- Competitor Strengths -->
                                <v-col cols="12" md="6">
                                    <h4 class="mb-3">
                                        <v-icon color="warning" class="mr-2">mdi-check-circle</v-icon>
                                        {{ competitor.companyName }} - Strengths
                                    </h4>
                                    <v-list density="compact">
                                        <v-list-item
                                            v-for="(strength, index) in competitorSWOT.strengths.slice(0, 5)"
                                            :key="index"
                                        >
                                            <template v-slot:prepend>
                                                <v-icon color="warning" size="small">mdi-plus</v-icon>
                                            </template>
                                            <v-list-item-title class="text-wrap text-caption">
                                                {{ strength }}
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-col>

                                <v-divider class="my-4"></v-divider>

                                <!-- Your Weaknesses -->
                                <v-col cols="12" md="6">
                                    <h4 class="mb-3">
                                        <v-icon color="error" class="mr-2">mdi-alert-circle</v-icon>
                                        {{ yourCompanyName }} - Weaknesses
                                    </h4>
                                    <v-list density="compact">
                                        <v-list-item
                                            v-for="(weakness, index) in yourSWOT.weaknesses.slice(0, 5)"
                                            :key="index"
                                        >
                                            <template v-slot:prepend>
                                                <v-icon color="error" size="small">mdi-minus</v-icon>
                                            </template>
                                            <v-list-item-title class="text-wrap text-caption">
                                                {{ weakness }}
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-col>

                                <!-- Competitor Weaknesses -->
                                <v-col cols="12" md="6">
                                    <h4 class="mb-3">
                                        <v-icon color="error" class="mr-2">mdi-alert-circle</v-icon>
                                        {{ competitor.companyName }} - Weaknesses
                                    </h4>
                                    <v-list density="compact">
                                        <v-list-item
                                            v-for="(weakness, index) in competitorSWOT.weaknesses.slice(0, 5)"
                                            :key="index"
                                        >
                                            <template v-slot:prepend>
                                                <v-icon color="error" size="small">mdi-minus</v-icon>
                                            </template>
                                            <v-list-item-title class="text-wrap text-caption">
                                                {{ weakness }}
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Keywords Comparison -->
            <v-row class="mb-6">
                <v-col cols="12" md="6">
                    <v-card variant="outlined">
                        <v-card-title>{{ yourCompanyName }} - Top Keywords</v-card-title>
                        <v-card-text>
                            <div 
                                v-for="(keyword, index) in yourKeywords.slice(0, 8)"
                                :key="index"
                                class="mb-3"
                            >
                                <div class="d-flex justify-space-between mb-1">
                                    <span class="text-body-2">{{ keyword.keyword }}</span>
                                    <span class="text-caption">{{ keyword.count }}x</span>
                                </div>
                                <v-progress-linear
                                    :model-value="(keyword.count / maxYourKeyword) * 100"
                                    color="primary"
                                    height="8"
                                    rounded
                                ></v-progress-linear>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" md="6">
                    <v-card variant="outlined">
                        <v-card-title>{{ competitor.companyName }} - Top Keywords</v-card-title>
                        <v-card-text>
                            <div 
                                v-for="(keyword, index) in competitorKeywords.slice(0, 8)"
                                :key="index"
                                class="mb-3"
                            >
                                <div class="d-flex justify-space-between mb-1">
                                    <span class="text-body-2">{{ keyword.keyword }}</span>
                                    <span class="text-caption">{{ keyword.count }}x</span>
                                </div>
                                <v-progress-linear
                                    :model-value="(keyword.count / maxCompetitorKeyword) * 100"
                                    color="warning"
                                    height="8"
                                    rounded
                                ></v-progress-linear>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Competitive Advantages -->
            <v-row class="mb-6">
                <v-col cols="12">
                    <v-card variant="outlined">
                        <v-card-title>Competitive Positioning</v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <h4 class="text-success mb-3">✓ Where You Lead</h4>
                                    <v-list density="compact">
                                        <v-list-item
                                            v-for="(advantage, index) in yourAdvantages"
                                            :key="index"
                                        >
                                            <template v-slot:prepend>
                                                <v-icon color="success">mdi-arrow-up-bold</v-icon>
                                            </template>
                                            <v-list-item-title class="text-wrap">
                                                {{ advantage.text }}
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                +{{ advantage.difference }}{{ advantage.unit }}
                                            </v-list-item-subtitle>
                                        </v-list-item>
                                    </v-list>
                                </v-col>

                                <v-col cols="12" md="6">
                                    <h4 class="text-error mb-3">⚠ Where You Trail</h4>
                                    <v-list density="compact">
                                        <v-list-item
                                            v-for="(gap, index) in competitorAdvantages"
                                            :key="index"
                                        >
                                            <template v-slot:prepend>
                                                <v-icon color="error">mdi-arrow-down-bold</v-icon>
                                            </template>
                                            <v-list-item-title class="text-wrap">
                                                {{ gap.text }}
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                -{{ gap.difference }}{{ gap.unit }}
                                            </v-list-item-subtitle>
                                        </v-list-item>
                                    </v-list>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Summary -->
            <v-row>
                <v-col cols="12">
                    <v-alert 
                        :type="yourStats.positivePercentage > competitorStats.positivePercentage ? 'success' : 'warning'"
                        variant="tonal"
                        prominent
                    >
                        <v-alert-title>Analysis Summary</v-alert-title>
                        <p class="mb-0">{{ comparisonSummary }}</p>
                    </v-alert>
                </v-col>
            </v-row>
        </v-card-text>

        <!-- Footer Actions -->
        <v-divider></v-divider>
        <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn variant="outlined" @click="$emit('close')">
                Close
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { useDashboardStore } from '@/stores/dashboardStore';
import { useBenchStore } from '@/stores/benchmarkStore';
import { useUserStore } from '@/stores/userStore';

export default {
    props: {
        competitor: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            loading: true,
            dashboardStore: null,
            benchStore: null,
            userStore: null,
            
            // Your company data
            yourCompanyName: '',
            yourStats: {
                total: 0,
                positive: 0,
                negative: 0,
                neutral: 0,
                positivePercentage: 0,
                negativePercentage: 0,
                neutralPercentage: 0,
                satisfaction: 0,
                confidence: 0
            },
            yourSWOT: {
                strengths: [],
                weaknesses: [],
                opportunities: [],
                threats: []
            },
            yourKeywords: [],
            yourThemes: [],
            
            // Competitor data
            competitorStats: {
                total: 0,
                positive: 0,
                negative: 0,
                neutral: 0,
                positivePercentage: 0,
                negativePercentage: 0,
                neutralPercentage: 0,
                satisfaction: 0,
                confidence: 0
            },
            competitorSWOT: {
                strengths: [],
                weaknesses: [],
                opportunities: [],
                threats: []
            },
            competitorKeywords: [],
            competitorThemes: []
        }
    },
    computed: {
        quickMetrics() {
            return [
                {
                    name: 'Positive Sentiment',
                    yourValue: this.yourStats.positivePercentage + '%',
                    competitorValue: this.competitorStats.positivePercentage + '%',
                    difference: (this.yourStats.positivePercentage - this.competitorStats.positivePercentage).toFixed(1),
                    suffix: '%',
                    yourWins: this.yourStats.positivePercentage > this.competitorStats.positivePercentage
                },
                {
                    name: 'Avg Satisfaction',
                    yourValue: this.yourStats.satisfaction,
                    competitorValue: this.competitorStats.satisfaction,
                    difference: (this.yourStats.satisfaction - this.competitorStats.satisfaction).toFixed(1),
                    suffix: '/100',
                    yourWins: this.yourStats.satisfaction > this.competitorStats.satisfaction
                },
                {
                    name: 'Negative Sentiment',
                    yourValue: this.yourStats.negativePercentage + '%',
                    competitorValue: this.competitorStats.negativePercentage + '%',
                    difference: (this.yourStats.negativePercentage - this.competitorStats.negativePercentage).toFixed(1),
                    suffix: '%',
                    yourWins: this.yourStats.negativePercentage < this.competitorStats.negativePercentage
                },
                {
                    name: 'Confidence',
                    yourValue: this.yourStats.confidence + '%',
                    competitorValue: this.competitorStats.confidence + '%',
                    difference: (this.yourStats.confidence - this.competitorStats.confidence).toFixed(1),
                    suffix: '%',
                    yourWins: this.yourStats.confidence > this.competitorStats.confidence
                }
            ];
        },
        
        maxYourKeyword() {
            return this.yourKeywords.length > 0 ? this.yourKeywords[0].count : 1;
        },
        
        maxCompetitorKeyword() {
            return this.competitorKeywords.length > 0 ? this.competitorKeywords[0].count : 1;
        },
        
        yourAdvantages() {
            const advantages = [];
            
            if (this.yourStats.positivePercentage > this.competitorStats.positivePercentage) {
                advantages.push({
                    text: 'Higher positive sentiment rate',
                    difference: (this.yourStats.positivePercentage - this.competitorStats.positivePercentage).toFixed(1),
                    unit: '%'
                });
            }
            
            if (this.yourStats.satisfaction > this.competitorStats.satisfaction) {
                advantages.push({
                    text: 'Better customer satisfaction score',
                    difference: (this.yourStats.satisfaction - this.competitorStats.satisfaction).toFixed(1),
                    unit: '/100'
                });
            }
            
            if (this.yourStats.negativePercentage < this.competitorStats.negativePercentage) {
                advantages.push({
                    text: 'Lower negative feedback rate',
                    difference: (this.competitorStats.negativePercentage - this.yourStats.negativePercentage).toFixed(1),
                    unit: '%'
                });
            }
            
            return advantages;
        },
        
        competitorAdvantages() {
            const gaps = [];
            
            if (this.competitorStats.positivePercentage > this.yourStats.positivePercentage) {
                gaps.push({
                    text: 'Positive sentiment gap',
                    difference: (this.competitorStats.positivePercentage - this.yourStats.positivePercentage).toFixed(1),
                    unit: '%'
                });
            }
            
            if (this.competitorStats.satisfaction > this.yourStats.satisfaction) {
                gaps.push({
                    text: 'Customer satisfaction gap',
                    difference: (this.competitorStats.satisfaction - this.yourStats.satisfaction).toFixed(1),
                    unit: '/100'
                });
            }
            
            if (this.yourStats.negativePercentage > this.competitorStats.negativePercentage) {
                gaps.push({
                    text: 'Higher negative feedback rate',
                    difference: (this.yourStats.negativePercentage - this.competitorStats.negativePercentage).toFixed(1),
                    unit: '%'
                });
            }
            
            return gaps;
        },
        
        comparisonSummary() {
            const yourScore = parseFloat(this.yourStats.satisfaction);
            const compScore = parseFloat(this.competitorStats.satisfaction);
            
            if (yourScore > compScore) {
                const diff = (yourScore - compScore).toFixed(1);
                return `Your business is outperforming ${this.competitor.companyName} with ${yourScore}/100 satisfaction score (${diff} points higher). You lead in ${this.yourAdvantages.length} key metrics. Focus on maintaining your strengths while addressing remaining weaknesses.`;
            } else {
                const diff = (compScore - yourScore).toFixed(1);
                return `${this.competitor.companyName} currently leads with ${compScore}/100 satisfaction score (${diff} points higher). You trail in ${this.competitorAdvantages.length} key metrics. Priority areas: ${this.yourSWOT.weaknesses[0] || 'Continue improving service quality'}. Leverage your strengths in: ${this.yourSWOT.strengths[0] || 'your core competencies'}.`;
            }
        }
    },
    methods: {
        async loadComparisonData() {
            this.loading = true;
            
            try {
                // Get stores
                this.dashboardStore = useDashboardStore();
                this.benchStore = useBenchStore();
                this.userStore = useUserStore();
                
                // Get your company name
                this.yourCompanyName = this.userStore.companyData?.companyName || 'Your Company';
                
                // Process your company data
                this.processYourCompanyData();
                
                // Process competitor data
                this.processCompetitorData();
                
            } catch (error) {
                console.error('Error loading comparison data:', error);
            } finally {
                this.loading = false;
            }
        },
        
        processYourCompanyData() {
            // Get stats from dashboard store (already processed)
            this.yourStats = {
                total: this.dashboardStore.overallCount?.total || 0,
                positive: this.dashboardStore.overallCount?.positive || 0,
                negative: this.dashboardStore.overallCount?.negative || 0,
                neutral: this.dashboardStore.overallCount?.neutral || 0,
                positivePercentage: parseFloat(this.dashboardStore.overallCount?.positivePercentage || 0),
                negativePercentage: parseFloat(this.dashboardStore.overallCount?.negativePercentage || 0),
                neutralPercentage: parseFloat(this.dashboardStore.overallCount?.neutralPercentage || 0),
                satisfaction: parseFloat(this.dashboardStore.overallCount?.satisfaction || 0),
                confidence: parseFloat(this.dashboardStore.overallCount?.confidenceAvg || 0)
            };
            
            // Get SWOT
            this.yourSWOT = {
                strengths: this.dashboardStore.strengths || [],
                weaknesses: this.dashboardStore.weaknesses || [],
                opportunities: this.dashboardStore.opportunities || [],
                threats: this.dashboardStore.threats || []
            };
            
            // Get keywords and themes
            this.yourKeywords = this.dashboardStore.keywordFrequency || [];
            this.yourThemes = this.dashboardStore.wordFrequency || [];
        },
        
        processCompetitorData() {
            // Get competitor raw data from bench store
            const competitorId = this.competitor.companyId;
            const competitorRawData = this.benchStore.competitorsRawData[competitorId];
            
            console.log('Processing competitor data for:', competitorRawData);
            if (!competitorRawData) {
                console.error('Competitor data not found');
                return;
            }
            
            // Create a temporary object with competitor data
            const tempData = {
                [competitorId]: competitorRawData
            };
            
            // Use dashboard store methods to process competitor data
            this.competitorStats = this.dashboardStore.calculateSentimentCounts(tempData);
            
            // Parse competitor stats to numbers
            this.competitorStats = {
                total: this.competitorStats.total || 0,
                positive: this.competitorStats.positive || 0,
                negative: this.competitorStats.negative || 0,
                neutral: this.competitorStats.neutral || 0,
                positivePercentage: parseFloat(this.competitorStats.positivePercentage || 0),
                negativePercentage: parseFloat(this.competitorStats.negativePercentage || 0),
                neutralPercentage: parseFloat(this.competitorStats.neutralPercentage || 0),
                satisfaction: parseFloat(this.competitorStats.satisfaction || 0),
                confidence: parseFloat(this.competitorStats.confidenceAvg || 0)
            };
            
            // Get competitor keywords and themes
            this.competitorKeywords = this.dashboardStore.calculateKeywordFrequency(tempData);
            this.competitorThemes = this.dashboardStore.calculateThemeFrequency(tempData);
            
            // Get competitor SWOT
            const swot = competitorRawData.swot || {};
            swot.forEach(item => {
                this.competitorSWOT.strengths.push(...(item.strength ? JSON.parse(item.strength) : []));
                this.competitorSWOT.weaknesses.push(...(item.weaknesses ? JSON.parse(item.weaknesses) : []));
                this.competitorSWOT.opportunities.push(...(item.opportunities ? JSON.parse(item.opportunities) : []));
                this.competitorSWOT.threats.push(...(item.threats ? JSON.parse(item.threats) : []));
            })
        }
    },
    mounted() {
        this.loadComparisonData();
    }
}
</script>

<style scoped>
.comparison-dialog {
    max-width: 1400px;
}

.sentiment-bars {
    padding: 16px;
}
</style>