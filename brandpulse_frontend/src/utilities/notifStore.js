import { defineStore } from 'pinia';

export const useNotifStore = defineStore('notifStore', {
    state : ()=> ({
        notif : {
            active : false,
            title : 'Notification',
            subtitle : 'subtitle',
            icon : 'mdi-bell-outline',
            autoClose : true,
        },
        toast : [

        ]
    }),
    actions : {
        showNotif(notif){
            if(this.notif.active == false){
                this.notif = {...notif}
                if(notif.autoClose){
                    setTimeout(()=>{
                        this.notif.active = false;
                    }, 2000)
                }
            }
        },
        hideNotif(){
            this.notif.active = false;
        },  
        showToast(toast){
            
        }
    }
})