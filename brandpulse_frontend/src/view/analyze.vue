<template>
    <v-container>
        <v-row>
            <v-card class="w-100 d-flex flex-column">
                <v-card-title><p>Analyze</p></v-card-title>
                <v-divider class="border-opacity-25"></v-divider>
                <div class="pa-2 d-flex align-center justify-center ga-2">
                    <v-btn 
                        :color="step == 1 ? 'primary' : ''" 
                        variant="text" 
                        append-icon="mdi-tray-arrow-up"
                    >Upload</v-btn>

                    <v-divider 
                        color="primary" 
                        :class="step == 2 ? 'border-opacity-75' : 'border-opacity-25'" 
                        thickness="1">
                    </v-divider>
                    <v-btn 
                        :color="step == 2 ? 'primary' : ''"
                        variant="text" 
                        append-icon="mdi-file-search-outline"
                    >Review</v-btn>

                    <v-divider 
                        color="primary" 
                        :class="step == 3 ? 'border-opacity-75' : 'border-opacity-25'" 
                        thickness="1">
                    </v-divider>
                    <v-btn 
                        variant="text" 
                        append-icon="mdi-file-document-outline"
                        :color="step == 3 ? 'primary' : ''"
                    >Results</v-btn>    
                </div>

                <!-- Step 1 -->
                <template v-if="step == 1">
                    <v-card-subtitle><p>Step 1: Upload Feedbacks</p></v-card-subtitle>
                    <v-divider class="border-opacity-25 my-1 mx-4"></v-divider>
                    <div class="d-flex ga-2 mx-4">
                        <div class="d-flex flex-column">
                            <v-btn variant="plain" @click="uploadMethod = 'csv'">CSV</v-btn>
                            <v-divider v-show="uploadMethod == 'csv'" color="primary" thickness="2" class="rounded-lg"></v-divider>
                        </div>
                        <v-divider vertical class="ma-1 border-opacity-50"></v-divider>
                        <div class="d-flex flex-column">
                            <v-btn variant="plain" @click="uploadMethod = 'manual'">Manual</v-btn>
                            <v-divider v-show="uploadMethod == 'manual'" color="primary" thickness="2" class="rounded-lg"></v-divider>
                        </div>
                    </div>
                    <v-card-text v-if="uploadMethod == 'csv'" class="d-flex flex-column ga-1">
                        <!-- <v-file-upload clearable density="compact" variant="compact"></v-file-upload> -->
                        <v-file-input 
                            variant="solo" 
                            prepend-icon="mdi-file" 
                            density="compact" 
                            label="Feedback Data"
                            @change="handleFileUpload" 
                        ></v-file-input>
                        <div class="d-flex ga-2 align-center">
                            <v-btn 
                                append-icon="mdi-tray-arrow-down" 
                                color="primary" 
                                variant="outlined" 
                                size="small"
                                @click="handleDownloadCsv"
                            >download csv format</v-btn>
                        </div>
                    </v-card-text>
                    <v-card-text v-else>
                        <template v-for="item in inputs">
                            <v-date-input 
                                prepend-icon="" 
                                prepend-inner-icon="$calendar" 
                                label="Date" 
                                variant="solo"
                                hide-details=""
                                v-model="item.date"
                                autocomplete = "suppress"
                                density="compact"
                                class="mt-1"
                            ></v-date-input>
                            <v-divider class="border-opacity-25"></v-divider>
                            <v-textarea 
                                v-model="item.reviews"
                                variant="solo"
                                :placeholder = placeholder
                                hide-details
                            ></v-textarea>
                        </template>
                        <div class="d-flex ga-2 mt-2">
                            <v-btn variant="outlined" size="small" color="primary" append-icon="mdi-plus" @click="inputs.push({id : inputs.length})">add</v-btn>
                            <v-btn variant="outlined" size="small" color="blue" append-icon="mdi-tray-arrow-up" @click="processReviewData(inputs)">upload</v-btn>
                        </div>
                    </v-card-text>
                </template>
                <!-- Step 2 -->
                <template v-if="step == 2">
                    <v-card-subtitle><p>Step 2: Review feedback data</p></v-card-subtitle>
                    <v-divider class="border-opacity-25 my-1 mx-4"></v-divider>
                    <div class="flex-grow-1 overflow-y-auto">
                        <v-table fixed-header height="70vh" class="ma-2" striped="even">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Feedback</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(feedback, i) in feedbacks" :key="i">
                                    <td>{{feedback.Date}}</td>
                                    <td>{{feedback.Feedback}}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
                </template>
                <!-- Step 3 -->
                <template v-if="step == 3">
                    <v-card-subtitle class="d-flex align-center justify-space-between">
                        <p>Step 3: Display Analysis Result</p>
                        <v-btn to="/compare">Compare</v-btn>
                    </v-card-subtitle>
                    <v-divider class="border-opacity-25 my-1 mx-4"></v-divider>
                    <v-row class="mx-3" dense>
                        <v-col cols="6" sm="6" md="3" lg="3">
                            <v-card class="d-flex">
                                <v-card-text>
                                    <v-card-subtitle>Total</v-card-subtitle>
                                    <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                                        <p>{{ overallCount.total }}</p>
                                        <v-icon color="info">mdi-file-chart</v-icon>
                                    </v-card-title>
                                    <v-chip size="small" class="float-right">Confidence Ave: {{ confidence.toFixed(2) }}%</v-chip>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="6" sm="6" md="3" lg="3">
                            <v-card class="d-flex">
                                <v-card-text>
                                    <v-card-subtitle>Positive</v-card-subtitle>
                                    <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                                        <p>{{ overallCount.positive }}</p>
                                        <v-icon color="success">mdi-trending-up</v-icon>
                                    </v-card-title>
                                    <v-chip size="small" class="float-right">{{overallCount.positivePercentage.toFixed(2)}}%</v-chip>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="6" sm="6" md="3" lg="3">
                            <v-card class="d-flex">
                                <v-card-text>
                                    <v-card-subtitle>Negative</v-card-subtitle>
                                    <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                                        <p>{{ overallCount.negative }}</p>
                                        <v-icon color="red">mdi-trending-down</v-icon>
                                    </v-card-title>
                                    <v-chip size="small" class="float-right">{{overallCount.negativePercentage.toFixed(2)}}%</v-chip>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="6" sm="6" md="3" lg="3">
                            <v-card class="d-flex">
                                <v-card-text>
                                    <v-card-subtitle>Overall Satisfaction</v-card-subtitle>
                                    <v-card-title class="d-flex justify-space-between align-center" style="font-size:2rem">
                                        <p>85</p>
                                        <v-icon>mdi-gauge</v-icon>
                                    </v-card-title>
                                    <v-chip size="small" class="float-right">4% lower</v-chip>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row class="mx-3" dense>
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
                                            <Loader :progress="overallCount.positivePercentage.toFixed(2)"></Loader>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="6" lg="6">
                                            <v-list-subtitle class="d-flex ga-2">
                                                <v-icon color="red">mdi-trending-down</v-icon>
                                                <p>Negative</p>
                                            </v-list-subtitle>
                                            <Loader :progress="overallCount.negativePercentage.toFixed(2)"></Loader>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <v-card>
                                <v-card-title><p>Sentiments Overtime</p></v-card-title>
                                <LineChart 
                                    :date="Object.keys(dateCount)" 
                                    :positive="Object.entries(dateCount).map(([key, value]) => (value.positive))"
                                    :negative="Object.entries(dateCount).map(([key, value]) => (value.negative))"
                                ></LineChart>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" md="3" lg="3">
                            <v-card style="border-left: 4px solid green">
                                <v-card-title class="mt-2"><p>Strength</p></v-card-title>
                                <v-card-text>
                                    <p v-for="item in strengths">-{{ item }}</p>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" md="3" lg="3">
                            <v-card style="border-left: 4px solid orange">
                                <v-card-title class="mt-2"><p>Weaknesses</p></v-card-title>
                                <v-card-text>
                                    <p v-for="item in weaknesses">-{{ item }}</p>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" md="3" lg="3">
                            <v-card style="border-left: 4px solid blue">
                                <v-card-title class="mt-2"><p>Opportunities</p></v-card-title>
                                <v-card-text>
                                    <p v-for="item in opportunities">-{{ item }}</p>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" md="3" lg="3">
                            <v-card style="border-left: 4px solid red">
                                <v-card-title class="mt-2"><p>Threats</p></v-card-title>
                                <v-card-text>
                                    <p v-for="item in threats">-{{ item }}</p>
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
                        <v-col cols="12">
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
                        </v-col>
                        <v-col cols="12">
                            <v-card>
                                <v-card-title class="mt-2 d-flex justify-space-between align-center">
                                    <p>Feedback List</p>
                                    <div class="d-flex ga-1-align-center w-50">
                                        <v-text-field 
                                            label="Search"
                                            density="compact"
                                            hide-details
                                            v-model="resultSearch"
                                            class="rounded-xl"
                                        ></v-text-field>
                                    </div>
                                </v-card-title>
                                <v-card-text>
                                    <v-row dense>
                                        <v-col class="d-flex flex-column" cols="12" sm="12" md="4" lg="4" v-for="(result, i) in paginatedResults" :key="1">
                                            <v-card @click="feedbackDetaildata = result, feedbackDetailModel = true" class="flex-grow-1" :style="`border-left: 4px solid ${colorLib[result.type]}`" >
                                                <v-card-title style="font-size: 0.9rem" class="d-flex align-center justify-space-between">
                                                    <p>{{ result.date }}</p>
                                                    <p>Score: {{ result.score }}</p>
                                                </v-card-title>
                                                <v-card-text><p>{{ result.feedback }}</p></v-card-text>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                                <v-card-actions class="d-flex ga-2 justify-end">
                                    <v-btn :disabled="page<=1" @click="page--" icon="mdi-chevron-left"></v-btn>
                                    <p>Page {{page}} of {{pageCount}}</p>
                                    <v-btn :disabled="page>=pageCount" @click="page++" icon="mdi-chevron-right"></v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </template>
                
                <v-card-actions class="d-flex justify-end">
                    <v-btn :disabled="step <= 1" @click="step--" class="rounded-0" prepend-icon="mdi-arrow-left" variant="tonal">previous</v-btn>
                    <v-btn v-if="step < 2" :disabled="step >= 3" @click="step++" class="rounded-0" append-icon="mdi-arrow-right" variant="tonal">next</v-btn>
                    <v-btn v-else variant="tonal" @click="handleAnalisys" :disabled="step >= 3">analyze</v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
        <v-dialog v-model="feedbackDetailModel" width="500px">
            <v-card class="tonal" style="background-color: rgb(42, 35, 51)!important">
                <v-card-text>
                    <p style="font-size: 1.1rem">{{ feedbackDetaildata.date }}</p>
                    <p class="mt-2">{{ feedbackDetaildata.summary }}</p>

                    <p class="mt-2">Customer Talk About:</p>
                    <v-chip v-for="theme in feedbackDetaildata.themes" class="mr-1">{{ theme }}</v-chip>

                    <p class="mt-2">Sentiment: </p>
                    <v-chip>{{ feedbackDetaildata.type }}</v-chip>
                    <p class="mt-2">Confidence Level:</p>
                    <v-chip>{{ feedbackDetaildata.confidence }}%</v-chip>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="warning" variant="tonal" @click="feedbackDetailModel = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { VFileUpload } from 'vuetify/labs/VFileUpload'
import { VDateInput } from 'vuetify/labs/VDateInput'
import PieChart from '@/components/PieChart.vue';
import GaugeChart from '@/components/GaugeChart.vue';
import BarChart from '@/components/BarChart.vue';
import { generateCsv } from '@/utilities/generateCsv';
import { readCsv } from '@/utilities/readCsv';
import { mapActions, mapState } from 'pinia';
import { useNotifStore } from '@/utilities/notifStore';
import { useAnalysisStore } from '@/stores/analysisStore';
import { useUserStore } from '@/stores/userStore';
import LineChart from '@/components/LineChart.vue';
import wordChart from '@/components/wordChart.vue';
    export default {
        components: {
            VFileUpload,
            VDateInput,
            PieChart,
            GaugeChart,
            BarChart,
            LineChart,
            wordChart
        },
        data(){
            return{
                uploadMethod : 'csv',
                placeholder : 'Note: Split the reviews into individual lines\nExample:\nreview 1\nreview 2\nreview 3',
                textarea : '',
                inputs : [
                    {id : 0, date : '', reviews : ''},
                ],
                step : 1,
                feedbacks : [],

                overallCount : {},
                overAllSatisfaction : 0,
                confidence : 0,
                wordFrequency : [],
                keywordFrequency : [],
                insights: [],
                strengths: [],
                opportunities: [],
                weaknesses: [],
                threats : [],
                results : [],
                dateCount : {},
                resultSearch : '',

                feedbackDetailModel : false,
                feedbackDetaildata : {},
                page : 1,
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
        },
        methods: {
            ...mapActions(useNotifStore, ['showNotif', 'hideNotif']),
            ...mapActions(useAnalysisStore, ['analyzeFeedback']),
            processReviewData(data){
                let temp = [];
                data.forEach((feedback) => {
                    const reviews = this.stringtoArray(feedback.reviews);
                    reviews.forEach((item) => {
                        temp.push({
                            Date : feedback.date.toLocaleDateString(),
                            Feedback :  item
                        })
                    })
                })
                this.feedbacks = temp;
            },
            stringtoArray(str){
                return str.split('\n');
            },
            handleDownloadCsv(){
                if(generateCsv()){
                    this.showNotif({
                        active : true,
                        title : 'Success',
                        subtitle : 'CSV feedback format downloaded',
                        icon : 'mdi-check-circle-outline',
                    })
                }
            },
            async handleFileUpload(event){
                
                const file = await event.target.files[0];

                this.feedbacks = await readCsv(file)
            },
            async handleAnalisys(){
                const res = await this.analyzeFeedback({
                    userId : this.userData['userId'],
                    feedbacks : this.feedbacks
                });
                if(res.success){
                    this.result = {
                        results : res.results,
                        insights : res.insights,
                        swot : res.swot,
                        count : res.count,
                    },
                    await this.processData()
                    this.step++;
                }
            },
            async processData(){
                //get summarry cards value
                let count = {
                    positive : 0,
                    negative : 0,
                    total : this.result.count,
                }

                let satisfactionTotal = 0;

                let themeCount = {};
                let keywordCount = {};
                let dateCount = {};
                let confidenceTotal = 0;
                this.result['results'].forEach(item => {
                    if(item['sentiment'] == 'positive'){
                        count.positive ++
                    }
                    if(item['sentiment'] == 'negative'){
                        count.negative ++
                    }
                    
                    satisfactionTotal += item.satisfaction;

                    item.themes.forEach(theme => {
                        if (!themeCount[theme]) {
                            themeCount[theme] = 1;
                        } else {
                            themeCount[theme]++;
                        }
                    })

                    item.keywords.forEach(keyword => {
                        if (!keywordCount[keyword]) {
                            keywordCount[keyword] = 1;
                        } else {
                            keywordCount[keyword]++;
                        }
                    })

                    dateCount[item.date] = dateCount[item.date] || {};
                    dateCount[item.date][item.sentiment] = (dateCount[item.date][item.sentiment] || 0) + 1;

                    confidenceTotal += item.confidence;
                });
               this.dateCount = dateCount;

                this.overallCount = {...count, positivePercentage : (count.positive / count.total) * 100, negativePercentage : (count.negative / count.total) * 100,};
                //get overall satisfaction
                this.overAllSatisfaction = satisfactionTotal / count.total;

                //get themes ranking
                const themeFrequency = Object.entries(themeCount).map(([theme, count]) => ({
                    theme, count
                })).sort((a, b) => b.count - a.count);

                this.wordFrequency = themeFrequency;

                //get keyword frequency
                const keywordFrequency = Object.entries(keywordCount).map(([keyword, count]) => ({
                    keyword, count
                })).sort((a, b) => b.count - a.count);

                this.wordFrequency = themeFrequency;
                this.keywordFrequency = keywordFrequency;

                //confidence ave
                this.confidence = confidenceTotal / this.result.count;
                //set up insights
                this.insights = this.result['insights']

                //populate feedback list
                this.results = this.result['results'].map(item => ({
                    date : item.date,
                    type : item.sentiment,
                    score : item.satisfaction,
                    feedback : item.text,
                    themes : item.themes,
                    summary : item.summary,
                    confidence : item.confidence
                }))

                //set up SWOT
                this.strengths = this.result['swot'].strengths;
                this.opportunities = this.result['swot'].opportunities;
                this.weaknesses = this.result['swot'].weaknesses;
                this.threats = this.result['swot'].threats;

            },
        },
        computed:{
            ...mapState(useUserStore, ['userData']),
            pageCount() {
                return Math.ceil(this.results.length / 9)
            },
            filterResult(){
                if(this.resultSearch == ''){
                    return this.results;
                }else{
                    return this.results.filter(item => item.feedback.toUpperCase().includes(this.resultSearch.toUpperCase()))
                }
            },
            paginatedResults() {
                const start = (this.page - 1) * 9
                const end = start + 9
                return this.filterResult.slice(start, end)
            }
        }
        
    }
</script>

<style scoped>
.note{
    font-size: clamp(0.7rem, 0.6vw, 1rem);
}
</style>