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
                        <v-file-input variant="solo" prepend-icon="mdi-file" density="compact" label="Feedback Data"></v-file-input>
                        <div class="d-flex ga-2 align-center">
                            <v-btn 
                                append-icon="mdi-tray-arrow-down" 
                                color="primary" 
                                variant="outlined" 
                                size="small"
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
                        <v-btn>Compare</v-btn>
                    </v-card-subtitle>
                    <v-divider class="border-opacity-25 my-1 mx-4"></v-divider>
                    <v-card-subtitle><p>Overview</p></v-card-subtitle>
                    <v-row class="mx-3" dense>
                        <v-col cols="6" sm="3" md="3" lg="3">
                            <v-card>
                                <v-card-text>
                                    <p class="text-caption summary-cards-title">Total</p>
                                    <h1 class="text-primary summary-cards-stat">45</h1>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="6" sm="3" md="3" lg="3">
                            <v-card>
                                <v-card-text>
                                    <p class="text-caption summary-cards-title">Positive</p>
                                    <h1 class="text-success summary-cards-stat">45</h1>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="6" sm="3" md="3" lg="3">
                            <v-card>
                                <v-card-text>
                                    <p class="text-caption summary-cards-title">Negative</p>
                                    <h1 class="text-error summary-cards-stat">45</h1>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="6" sm="3" md="3" lg="3">
                            <v-card>
                                <v-card-text>
                                    <p class="text-caption summary-cards-title">Neutral</p>
                                    <h1 class="text-blue summary-cards-stat">45</h1>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row class="mx-3" dense>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-card class="chart-card" height="300" style="flex: 1;">
                                <v-card-subtitle class="position-absolute mt-2"><p>Sentiment Distrubution</p></v-card-subtitle>
                                <PieChart/>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-card class="chart-card" height="300" style="flex: 1;">
                                <v-card-subtitle class="position-absolute mt-2"><p>Overall Satisfaction</p></v-card-subtitle>
                                <GaugeChart :value="80" title=""/>
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <v-card>
                                <v-card-subtitle class="mt-2 position-absolute">
                                    <p>Most Mentioned Keywords</p>
                                </v-card-subtitle>
                                <BarChart title=""/>
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <v-card>
                                <v-card-subtitle class="mt-2"><p>Actionable Insights & Recommendations</p></v-card-subtitle>
                                <v-card-text>
                                    <template v-for="(insight, i) in insights" :key="i">
                                        <v-card 
                                            :style="`border-opacity : 0.4 ;border: 1px groove ${colorLib[insight.type]}`" 
                                            class="pa-4 mb-2 rounded-lg d-flex flex-column ga-1 overflow-visible">
                                            <p style="font-size: 1.05rem">{{ insight.title }}</p>
                                            <p>{{ insight.description }}</p>
                                            <v-chip 
                                                    size="small" 
                                                    :color="colorLib[insight.priority]"
                                                    class="position-absolute right-0 top-0"
                                                    style="margin-top: -8px; margin-right: -8px"
                                                    variant="elevated"
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
                                <v-card-subtitle class="mt-2 d-flex justify-space-between">
                                    <p>Feedback List</p>
                                </v-card-subtitle>
                                <v-card-text>
                                    <v-table>
                                        <thead>
                                            <tr>
                                                <th>Type</th>
                                                <th>Review</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                    </v-table>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </template>
                
                <v-card-actions class="d-flex justify-end">
                    <v-btn :disabled="step <= 1" @click="step--" class="rounded-0" prepend-icon="mdi-arrow-left" variant="tonal">previous</v-btn>
                    <v-btn :disabled="step >= 3" @click="step++" class="rounded-0" append-icon="mdi-arrow-right" variant="tonal">next</v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import { VFileUpload } from 'vuetify/labs/VFileUpload'
import { VDateInput } from 'vuetify/labs/VDateInput'
import PieChart from '@/components/PieChart.vue';
import GaugeChart from '@/components/GaugeChart.vue';
import BarChart from '@/components/BarChart.vue';
    export default {
        components: {
            VFileUpload,
            VDateInput,
            PieChart,
            GaugeChart,
            BarChart
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
                feedbacks : [
                    {
                        "Date": "09/07/2024",
                        "Feedback": "The upload process was smooth and intuitive."
                    },
                    {
                        "Date": "09/08/2024",
                        "Feedback": "Data review section could use clearer labels."
                    },
                    {
                        "Date": "09/09/2024",
                        "Feedback": "System performance slowed down with larger files."
                    },
                    {
                        "Date": "09/10/2024",
                        "Feedback": "Helpful tooltips made navigation easier."
                    },
                    {
                        "Date": "09/11/2024",
                        "Feedback": "Would be great to have a progress bar during upload."
                    },
                    {
                        "Date": "09/12/2024",
                        "Feedback": "Review Data page displayed inconsistencies in formatting."
                    },
                    {
                        "Date": "09/13/2024",
                        "Feedback": "App worked well on desktop but lagged on mobile."
                    },
                    {
                        "Date": "09/14/2024",
                        "Feedback": "Export feature was missing in the final step."
                    },
                    {
                        "Date": "09/15/2024",
                        "Feedback": "Error messages were too generic, need more detail."
                    },
                    {
                        "Date": "09/07/2024",
                        "Feedback": "The upload process was smooth and intuitive."
                    },
                    {
                        "Date": "09/08/2024",
                        "Feedback": "Data review section could use clearer labels."
                    },
                    {
                        "Date": "09/09/2024",
                        "Feedback": "System performance slowed down with larger files."
                    },
                    {
                        "Date": "09/10/2024",
                        "Feedback": "Helpful tooltips made navigation easier."
                    },
                    {
                        "Date": "09/11/2024",
                        "Feedback": "Would be great to have a progress bar during upload."
                    },
                    {
                        "Date": "09/12/2024",
                        "Feedback": "Review Data page displayed inconsistencies in formatting."
                    },
                    {
                        "Date": "09/13/2024",
                        "Feedback": "App worked well on desktop but lagged on mobile."
                    },
                    {
                        "Date": "09/14/2024",
                        "Feedback": "Export feature was missing in the final step."
                    },
                    {
                        "Date": "09/15/2024",
                        "Feedback": "Error messages were too generic, need more detail."
                    },
                    {
                        "Date": "09/16/2024",
                        "Feedback": "Overall user experience was positive and efficient."
                    }
                ],
                insights: [
                    {
                        type: 'error',
                        priority: 'high',
                        title: 'Service Speed is a Major Complaint',
                        description: '28 customers mentioned slow service. Consider adding more staff during peak hours or streamlining your order process.'
                    },
                    {
                        type: 'success',
                        priority: 'medium',
                        title: 'Food Quality is Your Biggest Strength',
                        description: '56 customers praised your food! Highlight this in your marketing materials and social media.'
                    },
                    {
                        type: 'warning',
                        priority: 'high',
                        title: 'Price Sensitivity Detected',
                        description: '24 customers mentioned high prices. Consider introducing budget-friendly options or value meals.'
                    },
                    {
                        type: 'info',
                        priority: 'low',
                        title: 'Positive Trend This Week',
                        description: 'Sentiment improved 12% compared to last week. Keep up the good work!'
                    },
                ],
                colorLib : {
                    error: 'rgba(237, 66, 69, 0.5)',      
                    info: 'rgba(0, 168, 252, 0.5)',       
                    success: 'rgba(59, 165, 93, 0.5)',    
                    warning: 'rgba(250, 168, 26, 0.5)',
                    low : 'info',
                    medium : 'warning',
                    high : 'error'
                },
                strengths: [
                    { keyword: 'Delicious Food', count: 56, example: 'Ang sarap ng pagkain!' },
                    { keyword: 'Friendly Staff', count: 42, example: 'Staff are so accommodating' },
                    { keyword: 'Clean Environment', count: 38, example: 'Very clean and organized' }
                ],

                weaknesses: [
                    { keyword: 'Slow Service', count: 28, example: 'Waited 45 minutes for order' },
                    { keyword: 'Expensive Prices', count: 24, example: 'Sobrang mahal for the serving' },
                    { keyword: 'Limited Parking', count: 15, example: 'Hard to find parking space' }
                ]
            }
        },
        methods: {
            processReviewData(data){
                const processData = data.map((item) => {
                    return{
                        id : item.id,
                        date : item.date.toLocaleDateString(),
                        reviews : this.stringtoArray(item.reviews)
                    }
                })
                console.log(processData)
            },
            stringtoArray(str){
                return str.split('\n');
            }
        }
    }
</script>

<style scoped>
.note{
    font-size: clamp(0.7rem, 0.6vw, 1rem);
}
</style>