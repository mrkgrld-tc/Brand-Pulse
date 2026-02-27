import { defineStore } from 'pinia';
import api from '@/plugin/axios';
import { useNotifStore } from './notifStore';
import router from '@/router';

export const useAuthStore = defineStore('authStore' , {
    state : () => ({
        userData : {}
    }),
    persist : {
        storage : sessionStorage,
        pick : ['userData']
    },
    actions : {
        logIn : (data) => {
            const notifStore = useNotifStore();
            notifStore.showNotif(
                {
                    active : true,
                    title : 'Welcome',
                    subtitle : 'Log in Successful',
                    icon : 'mdi-check',
                }
            )
            router.push('/')
        },

        signUp : (data) => {
            const notifStore = useNotifStore();
            notifStore.showNotif(
                {
                    active : true,
                    title : 'Success',
                    subtitle : 'Account Created Procced to Sign in',
                    icon : 'mdi-check',
                }
            )
            
        }
    }
})