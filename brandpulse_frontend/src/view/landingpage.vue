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
    <v-container fluid style="height: 100vh" class="d-flex flex-column align-center justify-center">
        <h3 class="text-center section-title mb-8">Everything You Need to Understand Your Customers</h3>
        <v-carousel
            hide-delimiters
            show-arrows="hover"
            height="340"
            style="max-width: 700px; width: 100%;"
            cycle
            interval="3500"
        >
            <v-carousel-item v-for="(item, i) in features" :key="i">
                <v-card class="glass-card mx-auto" elevation="0" rounded="xl">
                <v-card-text class="d-flex flex-column align-center text-center pa-10">
                    <div class="icon-wrapper mb-5">
                    <img class="icon" :src="item.icon" :alt="item.alt" />
                    </div>
                    <div class="chip-label mb-3">{{ item.tag }}</div>
                    <h4 class="feature-title mb-3">{{ item.title }}</h4>
                    <p class="feature-desc">{{ item.desc }}</p>
                </v-card-text>
                </v-card>
            </v-carousel-item>
        </v-carousel>
        <!-- dot indicators -->
        <div class="d-flex ga-2">
            <v-icon v-for="(item, i) in features">mdi-circle-small</v-icon>
        </div>
    </v-container>
    </AnimatedBackground>
</template>

<script>
import liveChatIcon from '@/assets/icons/live-chat.gif'
import confusionIcon from '@/assets/icons/confusion.gif'
import unhappyIcon from '@/assets/icons/unhappy.gif'
import hourglassIcon from '@/assets/icons/hourglass.gif'
import AnimatedBackground from '@/components/AnimatedBackground.vue'
    export default {
        data(){
            return{
                features : [
                    {
                        icon: liveChatIcon,
                        alt: 'Live Chat',
                        tag: 'Problem #1',
                        title: 'Information Overload',
                        desc: 'Drowning in customer reviews with no clear insights? We aggregate and surface only what matters.',
                    },
                    {
                        icon: confusionIcon,
                        alt: 'Confusion',
                        tag: 'Problem #2',
                        title: 'Lack of Clarity',
                        desc: 'Wondering what customers really think about your brand? Get a crystal-clear picture in seconds.',
                    },
                    {
                        icon: unhappyIcon,
                        alt: 'Unhappy',
                        tag: 'Problem #3',
                        title: 'Customer Churn',
                        desc: 'Losing customers to competitors but dont know why? Identify friction points before it\'s too late.',
                    },
                    {
                        icon: hourglassIcon,
                        alt: 'Hourglass',
                        tag: 'Problem #4',
                        title: 'Wasted Time',
                        desc: 'Spending hours manually reading feedback? Automate the grunt work and focus on action.',
                    },
                ]
            }
        },
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
    .icon {
        height: 50px;
        border-radius: 4px;
    }
    
</style>