<template>
    <v-app>
        <v-main>
            <v-app-bar class="glass-card" v-if="!backgroundActive" density="compact">
                <v-app-bar-title>
                    <div class="d-flex align-end ga-1">
                        <h3>Brand</h3>
                        <h3 class="text-primary">Pulse</h3>
                        <!-- <p style="font-size:0.6rem">powered by</p> -->
                        <v-chip variant="outlined" size="x-small" class="app__badge">AI-powered</v-chip>
                    </div>
                </v-app-bar-title>
                <template v-slot:append>
                    <v-icon class="mr-2" id="menu">mdi-menu</v-icon>
                    <v-menu activator="#menu" width="300px" class="pa-5">
                        <v-list  style="border-radius: 8px">
                            <v-list-item-title class="mx-3">Company Name</v-list-item-title>
                            <v-list-item-subtitle class="mx-3">Details</v-list-item-subtitle>
                            <v-divider class="border-opacity-25 my-2"></v-divider>
                            <v-list-item :append-icon="route.icon" v-for="(route, i) in nav" :keys="i" :to="route.path">{{route.title}}</v-list-item>
                            <v-list-item>
                                <v-btn
                                    text="Logout"
                                    block
                                    color="primary"
                                    variant="outlined"
                                    to="/landingpage"
                                ></v-btn>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>
            </v-app-bar>
            <template v-if="backgroundActive">
                <AnimatedBackground>
                    <router-view></router-view>
                </AnimatedBackground>
            </template>
            <template  v-else>
                <router-view></router-view>
            </template>
            <!-- <router-view></router-view> -->
            <Notification 
                v-model="notif.active"
                :title = "notif.title"
                :icon = "notif.icon"
                :subtitle="notif.subtitle"
            />
        </v-main>
    </v-app>
</template>
<script>
import AnimatedBackground from '@/components/AnimatedBackground.vue'
import Notification from './components/Notification.vue';
import { mapState } from 'pinia';
import { useNotifStore } from './stores/notifStore';
    export default {
        components : {
            AnimatedBackground,
            Notification
        },
        data(){
            return{
                nav: [
                    {title : 'Dashboard', path : '/', icon : 'mdi-view-dashboard'},
                    {title : 'Profile', path : '/profile', icon : 'mdi-account-outline'},
                    {title : 'Analyze', path : '/analyze', icon : 'mdi-file-chart-outline'},
                    {title : 'Competitor', path : '/competitor', icon : 'mdi-account-group-outline'},
                ]
            }
        },
        computed : {
            ...mapState(useNotifStore, ['notif']),
            backgroundActive(){
                if(this.$route.path === '/login'){
                    return true;
                }
                if(this.$route.path === '/landingpage'){
                    return true;
                }
                return false;
            },
        }
    }
</script>
<style scoped>
    .app__badge {
        display: inline-flex;
        align-items: center;
        width: fit-content;
        padding: 5px 5px;
        border-radius: 999px;
        font-size: 0.5rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        background: rgba(var(--v-theme-primary), 0.12);
        color: rgb(var(--v-theme-primary));
        border: 1px solid rgba(var(--v-theme-primary), 0.25);
    }
</style>