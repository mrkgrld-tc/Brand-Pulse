<template>
    <v-card>
        <v-card-title class="mt-2"><p>Actionable Insights & Recommendations</p></v-card-title>
        <v-card-text>
            <template v-for="(insight, i) in paginatedInsights" :key="i">
                <v-card 
                    :style="`border-left: 4px solid ${colorLib[insight.sentiment_type]}`" 
                    class="pa-4 mb-2 rounded-lg d-flex flex-column ga-1 overflow-visible">
                    <p style="font-size: 1.05rem">{{ insight.title }}</p>
                    <p>{{ insight.description }}</p>
                    <v-chip 
                        size="small" 
                        :color="colorLib[insight.priority]"
                        class="position-absolute right-0 top-0"
                        style="margin-top: -8px; margin-right: -8px"
                        variant="tonal"
                    >
                        {{ insight.priority }} priority
                    </v-chip>
                </v-card>
            </template>

            <!-- Empty state -->
            <div v-if="!insights || insights.length === 0" class="text-center text-medium-emphasis py-4">
                No insights available.
            </div>
        </v-card-text>

        <!-- Pagination -->
        <v-card-actions v-if="totalPages > 1" class="justify-space-between px-4 pb-3">
            <span class="text-caption text-medium-emphasis">
                {{ rangeLabel }}
            </span>
            <v-pagination
                v-model="currentPage"
                :length="totalPages"
                :total-visible="5"
                density="compact"
                rounded="circle"
            />
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        props: {
            insights: {
                type: Array,
                default: () => []
            },
            itemsPerPage: {
                type: Number,
                default: 5
            }
        },
        data() {
            return {
                currentPage: 1,
                colorLib: {
                    error:   'rgba(237, 66, 69, 0.5)',
                    info:    'rgba(0, 168, 252, 0.5)',
                    success: 'rgba(59, 165, 93, 0.5)',
                    warning: 'rgba(250, 168, 26, 0.5)',
                    low:      'info',
                    medium:   'warning',
                    high:     'error',
                    negative: 'red',
                    positive: 'green',
                    neutral:  'blue'
                }
            }
        },
        computed: {
            totalPages() {
                return Math.ceil((this.insights?.length || 0) / this.itemsPerPage)
            },
            paginatedInsights() {
                const start = (this.currentPage - 1) * this.itemsPerPage
                return (this.insights || []).slice(start, start + this.itemsPerPage)
            },
            rangeLabel() {
                const start = (this.currentPage - 1) * this.itemsPerPage + 1
                const end   = Math.min(this.currentPage * this.itemsPerPage, this.insights.length)
                return `Showing ${start}–${end} of ${this.insights.length}`
            }
        },
        watch: {
            // Reset to page 1 whenever the insights data changes
            insights() {
                this.currentPage = 1
            }
        }
    }
</script>