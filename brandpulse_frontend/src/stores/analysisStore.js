import { defineStore } from 'pinia';
import api from '@/plugin/axios';
import { useNotifStore } from '../utilities/notifStore';
import { useDashboardStore } from './dashboardStore';
import { useBenchStore } from './benchmarkStore';

export const useAnalysisStore = defineStore('useAnalysisStore', {
    state : () => ({
        fetchedDashboard : false,
    }), 
    persist : {
        storage : sessionStorage,
        pick : []
    },
    actions : {
        async analyzeFeedback(data){
            try {
                const notifStore = useNotifStore();
                notifStore.showNotif({
                    active : true,
                    title : 'Please Wait',
                    subtitle : 'please be patient while AI is analyzing data',
                    icon : 'mdi-loading',
                    autoClose : false,
                })
                const res = await api.post('/analyzeFeedback', data);
                notifStore.hideNotif();

                if(res.data.success){
                    notifStore.showNotif({
                        active : true,
                        title : 'Success',
                        subtitle : 'Analysis Complete!',
                        icon : 'mdi-check-circle-outline',
                        autoClose : true,
                    })
                    const dashboardStore = useDashboardStore();
                    dashboardStore.fetchedDashboard = false;
                    const benchStore = useBenchStore();
                    benchStore.fetchedBench = false;
                    return {
                        success : true,
                        results : res.data.results,
                        insights : res.data.insights,
                        swot : res.data.swot,
                        count : res.data.count,
                    }
                }else{
                    notifStore.showNotif({
                        active : true,
                        title : 'Analysis Failed',
                        subtitle : res.data.message,
                        icon : 'mdi-alert-circle-outline',
                        autoClose : true,
                    });
                    return {
                        success : false
                    };
                }
            } catch (error) {
                const notifStore = useNotifStore();
                notifStore.hideNotif();
                notifStore.showNotif({
                    active : true,
                    title : 'Analysis Failed',
                    subtitle : `${error}, AI model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later.`,
                    icon : 'mdi-alert-circle-outline',
                    autoClose : false,
                });
                return {
                    success : false
                };
            }
        },
        async getdashBoardData(userId, companyId){
            try {
                const notifStore = useNotifStore();
                notifStore.showNotif({
                    active : true,
                    title : 'Please Wait',
                    subtitle : 'Please wait while we fetching your data',
                    icon : 'mdi-loading',
                    autoClose : false,
                })
                const res = await api.post('/getDashboardData', {userId, companyId});
                notifStore.hideNotif();
                this.fetchedDashboard = true;
                if(res.data.success){
                    this.fetchedDashboard = true;
                    return res.data.data;
                }else{
                    return null;
                }
            } catch (error) {
                const notifStore = useNotifStore();
                notifStore.hideNotif();
                notifStore.showNotif({
                    active : true,
                    title : 'Analysis Failed',
                    subtitle : error,
                    icon : 'mdi-alert-circle-outline',
                    autoClose : false,
                });
                return {
                    success : false
                };
            }
        }
    }
})