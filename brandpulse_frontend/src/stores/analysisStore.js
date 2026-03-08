import { defineStore } from 'pinia';
import api from '@/plugin/axios';
import { useNotifStore } from '../utilities/notifStore';

export const useAnalysisStore = defineStore('useAnalysisStore', {
    state : () => ({

    }), 
    persist : {
        storage : sessionStorage,
        pick : []
    },
    actions : {
        async analyzeFeedback(data){
            const res = await api.post('/analyzeFeedback', data);
            console.log(res.data);

            return res.data.analysis;
        }
    }
})