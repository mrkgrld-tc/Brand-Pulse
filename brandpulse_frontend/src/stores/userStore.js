import { defineStore } from 'pinia';
import api from '@/plugin/axios';
import { useNotifStore } from '../utilities/notifStore';
import router from '@/router';

export const useUserStore = defineStore('userStore' , {
    state : () => ({
        userData : {},
        companyData : {},
        authentication : {
            status : false,
            token : '',
            password : ''
        },
    }),
    persist : {
        storage : sessionStorage,
        pick : ['userData', 'authentication', 'companyData']
    },
    actions : {
        async logIn(data){
            const res = await api.post('/authUser',{
                data
            })
            const notifStore = useNotifStore();
            if(res.data.success){
                if(res.data.message == 'account not found'){
                    notifStore.showNotif({
                        active : true,
                        title : 'Warning',
                        subtitle : 'Log in Failed, Account not Found',
                        icon : 'mdi-alert-circle-outline',
                    })
                }else if(res.data.message == 'wrong password'){
                    notifStore.showNotif({
                        active : true,
                        title : 'Warning',
                        subtitle : 'Log in Failed, Wrong Password',
                        icon : 'mdi-alert-circle-outline',
                    })
                }else if(res.data.message == 'proceed to login'){
                    notifStore.showNotif({
                        active : true,
                        title : 'Welcome',
                        subtitle : 'Log in Successful',
                        icon : 'mdi-check-circle-outline',
                    })
                    const resUserData = res.data['userData'];
                    this.userData = {
                        userId: resUserData['user_id'],
                        username: resUserData['username'],
                        email: resUserData['email'],
                        contactNumber: resUserData['contact_number'],
                        address: resUserData['address'],
                        planType: resUserData['plan_type'],
                        benchmarkingStatus: resUserData['benchmarking_status'],
                        image : resUserData['avatar_base64']
                    };

                    this.companyData = {
                        companyId: resUserData['company_id'],
                        companyName: resUserData['name'],
                        industry: resUserData['industry']
                    };

                    this.authentication = {
                        status: true,
                        password: true,
                        token: true
                    };

                    router.push('/')
                }
            }else{
                notifStore.showNotif({
                    active : true,
                    title : 'Error',
                    subtitle : 'Log in Failed, an error occured',
                    icon : 'mdi-alert-circle-outline',
                })
            }
        },

        async signUp(data){
            const res = await api.post('/signup',{
                data
            })
            const notifStore = useNotifStore();
            if(res.data.success){
                console.log('tsettt')
                if(res.data.message == 'account already exist'){
                    notifStore.showNotif({
                        active : true,
                        title : 'Notice',
                        subtitle : 'An account with this email, already exist',
                        icon : 'mdi-information-outline',
                    })
                }else{
                    notifStore.showNotif({
                        active : true,
                        title : 'Success',
                        subtitle : 'Created account successfully',
                        icon : 'mdi-check-circle-outline',
                    })
                }
            }else{
                notifStore.showNotif({
                    active : true,
                    title : 'Failed',
                    subtitle : 'An error occured',
                    icon : 'mdi-alert-circle-outline',
                })
            }
        },

        logout(){
            this.userData = {}
            this.companyData = {}
            this.authentication = {
                status : false,
                token : '',
                password : ''
            }
            router.push('/landingpage')
        },

        async updateProfile(data){
            const res = await api.post('/updateProfile', data);
            const notifStore = useNotifStore();

            if(res.data.success){
                notifStore.showNotif({
                    active : true,
                    title : 'Success',
                    subtitle : 'Updated account successfully',
                    icon : 'mdi-check-circle-outline',
                });
                this.userData.username = data.username;
                this.userData.address = data.address;
                this.userData.email = data.email;
                this.userData.contactNumber = data.contactNumber;
                this.userData.image = data.image;
                this.companyData.companyName = data.companyName;
                this.companyData.industry = data.industry;
            }else{
                notifStore.showNotif({
                    active : true,
                    title : 'Failed',
                    subtitle : 'An error occured while updating profile',
                    icon : 'mdi-alert-circle-outline',
                })
            }
        }
    }
})