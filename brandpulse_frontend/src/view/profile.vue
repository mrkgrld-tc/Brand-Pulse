<template>
    <v-container>
        <v-row dense class="d-flex">
            <!-- main content -->
            <v-col cols="12" lg="8" md="8" sm="12" class="d-flex flex-column ga-2">
                <v-card>
                    <v-card-title class="d-flex ga-2">
                        <v-icon>mdi-account-circle-outline</v-icon>
                        <p>Profile Details</p>
                    </v-card-title>
                    <v-card-text class="d-flex flex-column align-center ga-2">   
                        <v-avatar image="https://tr.rbxcdn.com/180DAY-ade052b708397ae1aad4671869c7edb3/420/420/FaceAccessory/Webp/noFilter" size="120"></v-avatar>
                        <v-btn append-icon="mdi-pencil" variant="outlined">Change photo</v-btn>
                        <v-row dense>
                            <v-col cols="12" lg="6" md="6" sm="12">
                                <v-text-field
                                    prepend-inner-icon="mdi-account"
                                    hide-details
                                    label="Name"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" lg="6" md="6" sm="12">
                                <v-text-field
                                    prepend-inner-icon="mdi-map-marker"
                                    hide-details
                                    label="Address"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" lg="6" md="6" sm="12">
                                <v-text-field
                                    prepend-inner-icon="mdi-email"
                                    hide-details
                                    label="Email"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" lg="6" md="6" sm="12">
                                <v-text-field
                                    prepend-inner-icon="mdi-phone"
                                    hide-details
                                    label="Contact Number"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" lg="6" md="6" sm="12">
                                <v-text-field
                                    prepend-inner-icon="mdi-office-building"
                                    hide-details
                                    label="Company/Business Name"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" lg="6" md="6" sm="12">
                                <v-text-field
                                    prepend-inner-icon="mdi-treasure-chest-outline"
                                    hide-details
                                    label="Industry"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-end">
                        <v-btn prepend-icon="mdi-pencil" variant="tonal" color="primary">Edit</v-btn>
                    </v-card-actions>
                </v-card>

                <v-card>
                    <v-card-title class="d-flex ga-2">
                        <v-icon>mdi-earth</v-icon>
                        <p>Public Analysis & Benchmarking</p>
                    </v-card-title>
                    <v-card-text>
                        <v-alert type="info" variant="tonal" class="mb-4" closable>
                            <div class="d-flex align-start">
                                <div>
                                    <strong>Share Your Success & Compare with Others</strong>
                                    <p class="mb-0 text-caption mt-1">
                                        Make your sentiment analysis public to benchmark against similar businesses in your industry.
                                        Your customer reviews and personal information remain private.
                                    </p>
                                </div>
                            </div>
                        </v-alert>
                        <div class="pa-4 rounded mb-4" style="background: rgba(103, 126, 234, 0.1);">
                            <div class="d-flex align-center justify-space-between">
                                <div>
                                    <div class="d-flex align-center mb-2">
                                        <v-icon color="primary" class="mr-2">mdi-earth</v-icon>
                                        <h4>Make My Analysis Public</h4>
                                    </div>
                                    <p class="text-caption text-medium-emphasis mb-0">
                                        Allow other businesses to see your sentiment scores for benchmarking
                                    </p>
                                </div>
                                <v-switch
                                    v-model="public"
                                    color="primary"
                                    hide-details
                                    @change="togglePublicAnalysis"
                                ></v-switch>
                            </div>
                        </div>
                        <div>
                            <v-divider class="my-4"></v-divider>
                            <h4 class="mb-3 d-flex align-center ga-2">
                                <v-icon color="green">mdi-check-circle-outline</v-icon>
                                <p>What Gets Shared</p>
                            </h4>
                            <v-list density="compact" class="rounded">
                                <v-list-item>
                                    <p>Your overall sentiment scores (positive, neutral, negative %)</p>
                                </v-list-item>
                                <v-list-item>
                                    <p>Your industry category and location (city only)</p>
                                </v-list-item>
                                <v-list-item>
                                    <p>Your business performance metrics (radar chart scores)</p>
                                </v-list-item>
                                <v-list-item>
                                    <p>Anonymous business name (e.g., "Restaurant A" instead of "Juan's Restaurant")</p>
                                </v-list-item>
                            </v-list>

                            <v-divider class="my-4"></v-divider>
                            <h4 class="mb-3 d-flex align-center ga-2">
                                <v-icon color="red">mdi-shield-lock-outline</v-icon>
                                <p>What Stays Private</p>
                            </h4>
                            <v-list density="compact" class="rounded">
                                <v-list-item>
                                    <p>Individual customer reviews and feedback text</p>
                                </v-list-item>
                                <v-list-item>
                                    <p>Your contact information and account details</p>
                                </v-list-item>
                            </v-list>

                            <!-- Benchmarking Access -->
                            <v-divider class="my-4"></v-divider>
                            
                            <div class="pa-4 rounded" style="background: rgba(76, 175, 80, 0.1);">
                                <div class="d-flex align-start">
                                    <v-icon color="success" class="mr-2">mdi-check-circle</v-icon>
                                    <div>
                                        <h4 class="text-success mb-1">Benchmarking Unlocked!</h4>
                                        <p class="text-caption mb-2">
                                            You can now compare your performance with other public businesses in your industry
                                        </p>
                                        <v-btn
                                            color="success"
                                            variant="outlined"
                                            prepend-icon="mdi-chart-bar"
                                            to="/compare"
                                        >
                                            View Industry Benchmarks
                                        </v-btn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
                
                <v-card style="border : 1px solid rgba(255, 0, 0, 0.2);">
                    <v-card-title class="d-flex ga-2">
                        <v-icon>mdi-alert</v-icon>
                        <p>Danger Zone</p>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" md="6">
                                <h4><p>Delete All Analysis History</p></h4>
                                <p class="text-caption text-medium-emphasis mb-3">
                                    Permanently delete all your saved analyses. This cannot be undone.
                                </p>
                                <v-btn 
                                    color="error" 
                                    variant="outlined"
                                    prepend-icon="mdi-delete"
                                    @click=""
                                >
                                    Delete History
                                </v-btn>
                            </v-col>

                            <v-col cols="12" md="6">
                                <h4><p></p>Delete Account</h4>
                                <p class="text-caption text-medium-emphasis mb-3">
                                    Permanently delete your BrandPulse account and all data. This cannot be undone.
                                </p>
                                <v-btn 
                                    color="error" 
                                    variant="outlined"
                                    prepend-icon="mdi-account-remove"
                                    @click=""
                                >
                                    Delete Account
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <!-- side bar -->
            <v-col cols="12" lg="4" md="4" sm="12" class="d-flex flex-column ga-2">
                <v-card>
                    <v-card-title class="d-flex ga-2">
                        <v-icon>mdi-account-check</v-icon>
                        <p>Account Status</p>
                    </v-card-title>
                    <v-card-text>
                        <v-list density="compact">
                            <v-list-item>
                                <template v-slot:prepend>
                                    <v-icon color="success">mdi-check-circle</v-icon>
                                </template>
                                <v-list-item-title>Free Plan</v-list-item-title>
                                <v-list-item-subtitle>Active</v-list-item-subtitle>
                            </v-list-item>

                            <v-list-item>
                                <template v-slot:prepend>
                                    <v-icon color="primary">mdi-chart-line</v-icon>
                                </template>
                                <v-list-item-title>Analyses Used</v-list-item-title>
                                <v-list-item-subtitle>13 this month</v-list-item-subtitle>
                            </v-list-item>

                            <v-list-item>
                                <template v-slot:prepend>
                                    <v-icon color="orange">mdi-progress-helper</v-icon>
                                </template>
                                <v-list-item-title>Analysis left</v-list-item-title>
                                <v-list-item-subtitle>20/20</v-list-item-subtitle>
                            </v-list-item>

                            <v-list-item>
                                <template v-slot:prepend>
                                    <v-icon color="orange">mdi-calendar</v-icon>
                                </template>
                                <v-list-item-title>Member Since</v-list-item-title>
                                <v-list-item-subtitle>09/87/26</v-list-item-subtitle>
                            </v-list-item>

                        </v-list>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-end">
                        <v-btn prepend-icon="mdi-star" variant="tonal" color="primary">Upgrade plan</v-btn>
                    </v-card-actions>
                </v-card>

                <v-card>
                    <v-card-title class="d-flex ga-2">
                        <v-icon>mdi-shield-account-outline</v-icon>
                        <p>Password and Security</p>
                    </v-card-title>
                    <v-card-text>
                        <v-row dense>
                            <v-col cols="12">
                                <v-text-field
                                    prepend-inner-icon="mdi-lock"
                                    hide-details
                                    label="Current Password"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    prepend-inner-icon="mdi-lock-reset"
                                    hide-details
                                    label="New Password"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    prepend-inner-icon="mdi-lock-check"
                                    hide-details
                                    label="Confirm Password "
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-alert type="info" variant="tonal" class="pa-2 rounded-lg w-100">
                                    <strong>Password Requirements</strong>
                                    <p class="mb-0 text-caption mt-1 ml-4">
                                        <p>*At least 8 characters long</p>
                                        <p>*Include uppercase and lowercase letters</p>
                                        <p>*Include at least one number</p>
                                        <p>*Include at least one special character (!@#$%)</p>
                                    </p>
                                </v-alert>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-end">
                        <v-btn prepend-icon="mdi-lock-reset" variant="tonal" color="primary">Change Password</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data(){
            return{
                public : true,
            }
        }
    }
</script>

<style scoped>
    .profile-card{
        height: 300px;
    }
</style>