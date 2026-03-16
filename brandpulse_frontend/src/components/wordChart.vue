<template>
<v-card class="glass-card mb-6">
    <v-card-title class="d-flex justify-space-between align-center">
        <p>Word Analysis</p>
        
        <!-- Filter Controls -->
        <v-btn-toggle
            v-model="wordAnalysisView"
            mandatory
            density="compact"
            color="primary"
        >
            <v-btn value="chart" size="small">
                <v-icon>mdi-chart-bar</v-icon>
            </v-btn>
            <v-btn value="cloud" size="small">
                <v-icon>mdi-cloud</v-icon>
            </v-btn>
        </v-btn-toggle>
    </v-card-title>
    
    <v-card-text>
        <v-row>
            <!-- THEMES SECTION -->
            <v-col cols="12" md="6">
                <div class="d-flex align-center justify-space-between mb-3">
                    <h3 class="text-subtitle-1">
                        <v-icon size="small" class="mr-2">mdi-label-multiple</v-icon>
                        Mentioned Themes
                    </h3>
                    <v-chip size="small" variant="tonal">
                        {{ wordFrequency.length }} themes
                    </v-chip>
                </div>
                
                <!-- Chart View -->
                <div v-if="wordAnalysisView === 'chart'">
                    <div 
                        v-for="(theme, index) in wordFrequency.slice(0, 10)" 
                        :key="theme.theme"
                        class="mb-3"
                    >
                        <div class="d-flex justify-space-between align-center mb-1">
                            <div class="d-flex align-center gap-2">
                                <!-- Rank Badge -->
                                <v-avatar 
                                    size="20" 
                                    :color="index < 3 ? 'primary' : 'grey-darken-2'"
                                >
                                    <span class="text-caption">{{ index + 1 }}</span>
                                </v-avatar>
                                
                                <!-- Theme Name -->
                                <span class="text-body-2">{{ theme.theme }}</span>
                            </div>
                            
                            <!-- Count -->
                            <span class="text-caption font-weight-bold">
                                {{ theme.count }} mentions
                            </span>
                        </div>
                        
                        <!-- Progress Bar -->
                        <v-progress-linear
                            :model-value="(theme.count / maxThemeCount) * 100"
                            :color="getThemeColor(index)"
                            height="10"
                            rounded
                        >
                            <template v-slot:default>
                                <span class="text-white text-caption">
                                    {{ ((theme.count / totalThemeCount) * 100).toFixed(1) }}%
                                </span>
                            </template>
                        </v-progress-linear>
                    </div>
                    
                    <!-- Show more button if there are more themes -->
                    <!-- <v-btn 
                        v-if="wordFrequency.length > 10 && !showAllThemes"
                        variant="text" 
                        size="small"
                        @click="showAllThemes = true"
                        class="mt-2"
                    >
                        Show {{ wordFrequency.length - 10 }} more themes
                        <v-icon end>mdi-chevron-down</v-icon>
                    </v-btn> -->
                </div>
                
                <!-- Cloud View -->
                <div v-else class="theme-cloud pa-3">
                    <v-chip
                        v-for="(theme, index) in wordFrequency"
                        :key="theme.theme"
                        :size="getChipSize(theme.count, maxThemeCount)"
                        :color="getThemeColor(index)"
                        class="ma-1"
                        variant="tonal"
                    >
                        {{ theme.theme }} ({{ theme.count }})
                    </v-chip>
                </div>
            </v-col>
            
            <!-- KEYWORDS SECTION -->
            <v-col cols="12" md="6">
                <div class="d-flex align-center justify-space-between mb-3">
                    <h3 class="text-subtitle-1">
                        <v-icon size="small" class="mr-2">mdi-key</v-icon>
                        Mentioned Keywords
                    </h3>
                    <v-chip size="small" variant="tonal">
                        {{ keywordFrequency.length }} keywords
                    </v-chip>
                </div>
                
                <!-- Chart View -->
                <div v-if="wordAnalysisView === 'chart'">
                    <div 
                        v-for="(keyword, index) in keywordFrequency.slice(0, 10)" 
                        :key="keyword.keyword"
                        class="mb-3"
                    >
                        <div class="d-flex justify-space-between align-center mb-1">
                            <div class="d-flex align-center gap-2">
                                <!-- Rank Badge -->
                                <v-avatar 
                                    size="20" 
                                    :color="index < 3 ? 'success' : 'grey-darken-2'"
                                >
                                    <span class="text-caption">{{ index + 1 }}</span>
                                </v-avatar>
                                
                                <!-- Keyword Name -->
                                <span class="text-body-2 font-weight-medium">
                                    {{ keyword.keyword }}
                                </span>
                            </div>
                            
                            <!-- Count -->
                            <span class="text-caption font-weight-bold">
                                {{ keyword.count }} times
                            </span>
                        </div>
                        
                        <!-- Progress Bar -->
                        <v-progress-linear
                            :model-value="(keyword.count / maxKeywordCount) * 100"
                            :color="getKeywordColor(index)"
                            height="10"
                            rounded
                        >
                            <template v-slot:default>
                                <span class="text-white text-caption">
                                    {{ ((keyword.count / totalKeywordCount) * 100).toFixed(1) }}%
                                </span>
                            </template>
                        </v-progress-linear>
                    </div>
                    
                    <!-- Show more button if there are more keywords -->
                    <!-- <v-btn 
                        v-if="keywordFrequency.length > 10 && !showAllKeywords"
                        variant="text" 
                        size="small"
                        @click="showAllKeywords = true"
                        class="mt-2"
                    >
                        Show {{ keywordFrequency.length - 10 }} more keywords
                        <v-icon end>mdi-chevron-down</v-icon>
                    </v-btn> -->
                </div>
                
                <!-- Cloud View -->
                <div v-else class="keyword-cloud pa-3">
                    <v-chip
                        v-for="(keyword, index) in keywordFrequency"
                        :key="keyword.keyword"
                        :size="getChipSize(keyword.count, maxKeywordCount)"
                        :color="getKeywordColor(index)"
                        class="ma-1"
                        variant="outlined"
                        @click="searchKeyword(keyword.keyword)"
                    >
                        {{ keyword.keyword }} ({{ keyword.count }})
                    </v-chip>
                </div>
            </v-col>
        </v-row>
        
        <!-- Summary Statistics -->
        <v-divider class="my-4"></v-divider>
        
        <v-row dense>
            <v-col cols="6" sm="3">
                <div class="text-center pa-2">
                    <p class="text-caption text-medium-emphasis mb-1">Top Theme</p>
                    <v-chip size="small" color="primary">
                        {{ topTheme }}
                    </v-chip>
                    <p class="text-caption mt-1">{{ maxThemeCount }} mentions</p>
                </div>
            </v-col>
            
            <v-col cols="6" sm="3">
                <div class="text-center pa-2">
                    <p class="text-caption text-medium-emphasis mb-1">Top Keyword</p>
                    <v-chip size="small" color="success">
                        {{ topKeyword }}
                    </v-chip>
                    <p class="text-caption mt-1">{{ maxKeywordCount }} times</p>
                </div>
            </v-col>
            
            <v-col cols="6" sm="3">
                <div class="text-center pa-2">
                    <p class="text-caption text-medium-emphasis mb-1">Total Themes</p>
                    <h3 class="text-h5">{{ wordFrequency.length }}</h3>
                </div>
            </v-col>
            
            <v-col cols="6" sm="3">
                <div class="text-center pa-2">
                    <p class="text-caption text-medium-emphasis mb-1">Total Keywords</p>
                    <h3 class="text-h5">{{ keywordFrequency.length }}</h3>
                </div>
            </v-col>
        </v-row>
    </v-card-text>
</v-card>
</template>

<script setup>
import { ref, computed } from 'vue';

// View toggle
const wordAnalysisView = ref('chart'); // 'chart' or 'cloud'
const showAllThemes = ref(false);
const showAllKeywords = ref(false);

// Props
const props = defineProps({
    wordFrequency: {
        type: Array,
        default: () => []
        // Expected format: [{ theme: 'food quality', count: 15 }, ...]
    },
    keywordFrequency: {
        type: Array,
        default: () => []
        // Expected format: [{ keyword: 'sarap', count: 8 }, ...]
    }
});

// Computed - Themes
const maxThemeCount = computed(() => {
    return props.wordFrequency.length > 0 
        ? Math.max(...props.wordFrequency.map(t => t.count))
        : 1;
});

const totalThemeCount = computed(() => {
    return props.wordFrequency.reduce((sum, t) => sum + t.count, 0);
});

const topTheme = computed(() => {
    return props.wordFrequency.length > 0 
        ? props.wordFrequency[0].theme 
        : '-';
});

// Computed - Keywords
const maxKeywordCount = computed(() => {
    return props.keywordFrequency.length > 0 
        ? Math.max(...props.keywordFrequency.map(k => k.count))
        : 1;
});

const totalKeywordCount = computed(() => {
    return props.keywordFrequency.reduce((sum, k) => sum + k.count, 0);
});

const topKeyword = computed(() => {
    return props.keywordFrequency.length > 0 
        ? props.keywordFrequency[0].keyword 
        : '-';
});

// Helper Functions
const getThemeColor = (index) => {
    const colors = ['primary', 'secondary', 'info', 'warning', 'purple', 'indigo'];
    if (index < 3) return colors[index];
    return 'grey-darken-1';
};

const getKeywordColor = (index) => {
    const colors = ['success', 'info', 'primary', 'secondary', 'teal', 'cyan'];
    if (index < 3) return colors[index];
    return 'grey-darken-1';
};

const getChipSize = (count, maxCount) => {
    const ratio = count / maxCount;
    if (ratio > 0.7) return 'large';
    if (ratio > 0.4) return 'default';
    return 'small';
};

const searchKeyword = (keyword) => {
    // Emit event to parent component to filter reviews
    emit('search-keyword', keyword);
    
    // Or scroll to feedback list
    const feedbackList = document.getElementById('feedback-list');
    if (feedbackList) {
        feedbackList.scrollIntoView({ behavior: 'smooth' });
    }
};

const emit = defineEmits(['search-keyword']);
</script>

<style scoped>
.theme-cloud,
.keyword-cloud {
    min-height: 200px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 8px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}

.glass-card {
    background: rgba(20, 20, 35, 0.75);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>