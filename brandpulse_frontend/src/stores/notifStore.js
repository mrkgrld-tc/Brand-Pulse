import { defineStore } from 'pinia';

export const useNotifStore = defineStore('notifStore', {
    state : ()=> ({
        notif : {
            active : false,
            title : 'Notification',
            subtitle : 'subtitle',
            icon : 'mdi-bell-outline',
        },
        toast : [

        ]
    }),
    actions : {
        showNotif(notif){
           this.notif = {...notif}

           setTimeout(()=>{
            this.notif.active = false;
           }, 2000)
        },

        showToast(toast){
            
        }
    }
})