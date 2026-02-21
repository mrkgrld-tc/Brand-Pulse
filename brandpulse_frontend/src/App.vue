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
                        <v-card>
                            <v-card-text>
                                <v-list>
                                    <v-list-item-title><h4>Angles Burger</h4></v-list-item-title>
                                </v-list>
                            </v-card-text>
                        </v-card>
                    </v-menu>
                </template>
            </v-app-bar>
            
            <!-- <AnimatedBackground> -->
                <router-view></router-view>
            <!-- </AnimatedBackground> -->

            <!-- <router-view else></router-view> -->
        </v-main>
    </v-app>
</template>
<script>
    import AnimatedBackground from '@/components/AnimatedBackground.vue'
    export default {
        components : {
            AnimatedBackground
        },
        computed : {
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