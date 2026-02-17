<template>
    <AnimatedBackground>
    <v-container style="height: 100vh" class="d-flex flex-column align-center justify-center">
        <h1 class="text-center">Stop Guessing. Start Knowing</h1>
        <p class="text-center">BrandPulse analyzes customer sentiment, tracks trends, and compares competitors, so you can make smarter decisions faster</p>
        <div class="mt-4 d-flex ga-4">
            <v-btn size="small" append-icon="mdi-arrow-top-right" variant="tonal">Start</v-btn>
            <v-btn size="small" color="primary">Discover</v-btn>
        </div>
    </v-container>
    
    <v-container style="height: 100vh">
        <h1 class="text-center">Key Features</h1>
        <v-row>
            <v-col cols="12" md="6">
                <v-card class="glass-card">
                    <v-card-text>
                        <div class="d-flex align-center ga-3">
                            <v-icon size="36">mdi-message-text-outline</v-icon>
                            <p>Drowning in customer reviews but no clear insights?</p>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card class="glass-card">
                    <v-card-text>
                        <div class="d-flex align-center ga-3">
                            <v-icon size="36">mdi-head-question-outline</v-icon>
                            <p>Wondering what customers really think about your brand?</p>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card class="glass-card">
                    <v-card-text>
                        <div class="d-flex align-center ga-3">
                            <v-icon size="36">mdi-account-arrow-right-outline</v-icon>
                            <p>Losing customers to competitors but don't know why?</p>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card class="glass-card">
                    <v-card-text>
                        <div class="d-flex align-center ga-3">
                            <v-icon size="36">mdi-clock-alert-outline</v-icon>
                            <p>Spending hours manually reading feedback?</p>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>       
    </v-container>
    </AnimatedBackground>
</template>

<script>
import AnimatedBackground from '@/components/AnimatedBackground.vue'
    export default {
        methods : {
            
        },
        components: {
            AnimatedBackground
        },
    }
</script>

<style>
    .hero-title {
        font-size: clamp(2rem, 4vw, 3rem);
    }
    .hero-subtitle {
        font-size: clamp(1rem, 1vw, 2rem);
    }
    .nav-text {
        font-size : clamp(0.75rem, 1vw, 1.5rem)
    }
</style>