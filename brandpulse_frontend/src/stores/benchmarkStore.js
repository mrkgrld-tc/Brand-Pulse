import api from "@/plugin/axios";
import { useNotifStore } from "@/utilities/notifStore";
import { useDashboardStore } from "./dashboardStore";
import { useUserStore } from "./userStore";
import { defineStore } from "pinia";

export const useBenchStore = defineStore('useBenchStore', {
    state : () => ({
        competitorsRawData : {},

        allCompetitors : {}, 

        industry : {},

        topCompetitor : {},

        yourRanking : null,
        totalCompetitors : null,
    }),
    actions : {
         async getCompetitorsData (companyId, industryId){
            try {
                const raw = await api.post('/getCompetitorsData', {companyId, industryId});
                this.competitorsRawData = raw.data.res;
                
                this.processData(this.competitorsRawData);
            } catch (error) {
                console.log('error fetching competitors data', error);
                const notifStore = useNotifStore();
                notifStore.hideNotif();
                notifStore.showNotif({
                    active : true,
                    title : 'Fetching Competitors Data Failed',
                    subtitle : `${error}`,
                    icon : 'mdi-alert-circle-outline',
                    autoClose : false,
                });
                return {
                    success : false
                };
            }
        },

        processData(data){
            this.getIndustryData(data);

            this.getRanking(data);

        },

        
        getRanking(data){
            const companyScore = [];
            Object.entries(data).forEach(([key, value]) => {
                const score = this.getAveragePerCompany(value.results);
                companyScore.push({
                    companyId : value.companyId,
                    companyName : value.company,
                    score,
                })
            })
            const userStore = useUserStore();
            const dashboardStore = useDashboardStore();

            const companyId = userStore.companyData.companyId;
            const companyName = userStore.companyData.companyName;
            const score = dashboardStore.overallCount.satisfaction;

            this.allCompetitors = companyScore;

            companyScore.push({
                companyId,
                companyName,
                score,
            })

            companyScore.sort((a, b) => b.score - a.score);

            companyScore.forEach((item, i) => {
                if(item.companyId == companyId){
                    this.yourRanking = i + 1;
                }
            })

            this.totalCompetitors = companyScore.length;

            if(companyId == companyScore[0].companyId){
                this.topCompetitor.companyId = companyId;
                this.topCompetitor.companyName = companyName;
                this.topCompetitor.score = score;
            }else{
                this.getTopCompetitorsData(companyScore[0])
            }


            
            console.log('you ranked', this.yourRanking, 'of ', this.totalCompetitors)
            console.log('test',companyScore);   
        },
        
        getAveragePerCompany(data){ 
            let total = 0;
            
            data.forEach(item => {
                const satisfaction = Number(item.satisfaction)
                total += satisfaction;
            })
            
            return (total / data.length).toFixed(2);
        },
        
        getIndustryData(data){
            const dashboard = useDashboardStore();
            const count = dashboard.calculateSentimentCounts(data);
            
            this.industry.average = count.satisfaction;
            this.industry.positive = count.positivePercentage;
            this.industry.negative = count.negativePercentage;
            
            const themes = dashboard.calculateThemeFrequency(data);

            this.industry.themes = themes.slice(0, 10);
        },
        
        
        getTopCompetitorsData(data){
            const dashboard = useDashboardStore();
            const temp = {};
            temp[data.companyId] = this.competitorsRawData[data.companyId];
            const count = dashboard.calculateSentimentCounts(temp);

            this.topCompetitor.average = count.satisfaction;
            this.topCompetitor.positive = count.positivePercentage;
            this.topCompetitor.negative = count.negativePercentage;

            const themes = dashboard.calculateThemeFrequency(temp);

            this.topCompetitor.themes = themes.slice(0, 10);
        },
    }
})