<template>
    <v-col cols="12">
        <v-card>
            <v-card-title><p>Competitor List</p></v-card-title>
            <v-card-text>
                <v-table>
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Score</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in competitorList" :key="i">
                            <td>{{ item.companyName }}</td>
                            <td>{{ item.score }}</td>
                            <td class="text-center">
                                <v-btn 
                                    color="primary" 
                                    @click="handleBrandComparison(item)"
                                >
                                    Compare
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>
    </v-col>
    
    <v-dialog 
        v-model="brandComparisonDialog"
        max-width="1400"
        scrollable
    >
        <BrandComparison 
            v-if="selectedCompetitor"
            :competitor="selectedCompetitor"
            @close="brandComparisonDialog = false"
        />
    </v-dialog>
</template>

<script>
import BrandComparison from './BrandComparison.vue';

export default {
    components: {
        BrandComparison
    },
    props: {
        competitorList: {
            type: Array,
            default: () => [],
        }
    },
    data() {
        return {
            brandComparisonDialog: false,
            selectedCompetitor: null
        }
    },
    methods: {
        handleBrandComparison(competitor) {
            this.selectedCompetitor = competitor;
            this.brandComparisonDialog = true;
        }
    }
}
</script>