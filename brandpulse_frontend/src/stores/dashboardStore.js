import { defineStore } from "pinia";

export const useDashboardStore = defineStore('useDashboardStore',{
    state : () => ({
        rawDashboardData : {},
        overallCount : null,
        dateCount : null,
        strengths: [],
        opportunities: [],
        weaknesses: [],
        threats : [],
        wordFrequency : null,
        keywordFrequency : null,
        insights : null,
    }),

    actions : {
        setRawData(newData){
            this.rawDashboardData = newData;
        },
        
        async processData() {
            this.strengths = [];
            this.weaknesses = [];
            this.opportunities = [];
            this.threats = [];
            // Calculate all metrics
            this.overallCount = this.calculateSentimentCounts(this.rawDashboardData);
            // this.confidence = this.calculateAverageConfidence(results, count);
            this.wordFrequency = this.calculateThemeFrequency(this.rawDashboardData);
            this.keywordFrequency = this.calculateKeywordFrequency(this.rawDashboardData);
            this.dateCount = this.calculateSentimentByDate(this.rawDashboardData);
            
            // // Set up insights
            this.insights = this.setUpInsights(this.rawDashboardData);
            
            // // Populate feedback list
            // this.results = this.mapFeedbackList(results);
            
            // // Set up SWOT
            this.setupSWOT(this.rawDashboardData);
        },

        processDataFilter(data){
            this.strengths = [];
            this.weaknesses = [];
            this.opportunities = [];
            this.threats = [];
            // Calculate all metrics
            this.overallCount = this.calculateSentimentCounts(data);
            // this.confidence = this.calculateAverageConfidence(results, count);
            this.wordFrequency = this.calculateThemeFrequency(data);
            this.keywordFrequency = this.calculateKeywordFrequency(data);
            this.dateCount = this.calculateSentimentByDate(data);
            
            // // Set up insights
            this.insights = this.setUpInsights(data);
            
            // // Populate feedback list
            // this.results = this.mapFeedbackList(results);
            
            // // Set up SWOT
            this.setupSWOT(data);
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
    }
})