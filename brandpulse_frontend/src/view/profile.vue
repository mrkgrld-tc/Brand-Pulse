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
                        <div class="d-flex align-end">
                            <v-avatar 
                                style="border: 2px solid rgba(88, 101, 242, 0.3)" 
                                size="120"
                                class="bg-white">
                                <img v-if="profileData.image" :src="profileData.image" alt="default profile" width="100%">
                                <v-icon v-else size="120">mdi-account-circle-outline</v-icon>
                            </v-avatar>
                            <v-btn 
                                icon="mdi-pencil" 
                                variant="outlined" 
                                class="rounded-xl position-absolute bg-yellow-lighten-3" 
                                style="margin-left:80px"
                                @click="uploadAvatar = true"
                                v-if="editMode"
                            ></v-btn>
                        </div>
                        <v-row dense>
                            <v-col cols="12" lg="6" md="6" sm="12" class="pa-2">
                                <v-text-field
                                    v-model="profileData.username"
                                    prepend-inner-icon="mdi-account"
                                    hide-details
                                    label="Name"
                                    :readonly="!editMode"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" lg="6" md="6" sm="12" class="pa-2">
                                <v-text-field
                                    v-model="profileData.address"
                                    prepend-inner-icon="mdi-map-marker"
                                    hide-details
                                    label="Address"
                                    :readonly="!editMode"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" lg="6" md="6" sm="12" class="pa-2">
                                <v-text-field
                                    v-model="profileData.email"
                                    prepend-inner-icon="mdi-email"
                                    hide-details
                                    label="Email"
                                    :readonly="!editMode"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" lg="6" md="6" sm="12" class="pa-2">
                                <v-text-field
                                    v-model="profileData.contactNumber"
                                    prepend-inner-icon="mdi-phone"
                                    hide-details
                                    label="Contact Number"
                                    :readonly="!editMode"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" lg="6" md="6" sm="12" class="pa-2">
                                <v-text-field
                                    v-model="profileData.companyName"
                                    prepend-inner-icon="mdi-office-building"
                                    hide-details
                                    label="Company/Business Name"
                                    :readonly="!editMode"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" lg="6" md="6" sm="12" class="pa-2">
                                <v-text-field
                                    v-model="profileData.industry"
                                    prepend-inner-icon="mdi-treasure-chest-outline"
                                    hide-details
                                    label="Industry"
                                    :readonly="!editMode"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-end">
                        <v-btn @click="editMode = !editMode"  prepend-icon="mdi-pencil" variant="tonal" color="primary" v-if="!editMode">Edit</v-btn>
                        <v-btn 
                            @click="handleUpdateData" 
                            color="success" 
                            variant="tonal" 
                            prepend-icon="mdi-content-save" 
                            v-if="editMode"
                        >save</v-btn>
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
                                    v-model="profileData.benchmarkingStatus"
                                    color="primary"
                                    hide-details
                                ></v-switch>
                            </div>
                        </div>
                        <div v-if="profileData.benchmarkingStatus">
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
                                    <div class="mb-0 text-caption mt-1 ml-4">
                                        <p>*At least 8 characters long</p>
                                        <p>*Include uppercase and lowercase letters</p>
                                        <p>*Include at least one number</p>
                                        <p>*Include at least one special character (!@#$%)</p>
                                    </div>
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
        <v-dialog width="40vw" v-model="uploadAvatar">
            <v-card>
                <v-card-title>Change Avatar</v-card-title>
                <v-card-text>
                    <v-file-upload 
                        density="compact" 
                        variant="compact" 
                        clearable 
                        type="file" 
                        @change="handleFileSelect" 
                        accept="image/*"
                    ></v-file-upload>
                </v-card-text>
                <v-card-actions class="d-flex ga-2">
                    <v-btn @click="profileData['image'] = imageData, uploadAvatar = false" color="success" variant="tonal">confirm</v-btn>
                    <v-btn @click="uploadAvatar = false" color="warning" variant="tonal">cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import { imageCompress } from '@/utilities/imageCompress';
import { VFileUpload } from 'vuetify/labs/VFileUpload'
import { useNotifStore } from '@/utilities/notifStore';
    export default {
        data(){
            return{
                public : true,
                profileData : {},
                editMode : false,
                uploadAvatar : false,
                imageData : null
            }
        },
        methods : {
        ...mapActions(useNotifStore, ['showNotif']),
        ...mapActions(useUserStore, ['updateProfile']),
            async handleFileSelect(event){
                const file = await imageCompress(event.target.files[0]);
                
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
                if (!allowedTypes.includes(file.type)) {
                     this.showNotif({
                        active : true,
                        title : 'Invalid File Type',
                        subtitle : 'File type not supported',
                        icon : 'mdi-alert-circle-outline',
                    })
                    return;
                }

                if (file && file.type.startsWith('image/')){
                    const selectedFile = file;
                    const reader = new FileReader();
                    reader.onload = (e)=>{
                        this.imageData = e.target.result
                        console.log(this.imageData)
                    }
                    reader.readAsDataURL(selectedFile);
                }
            },
            handleUpdateData(){
                this.editMode = !this.editMode;
                const updateData = {
                    userId : this.profileData['userId'],
                    username : this.profileData['username'],
                    email : this.profileData['email'],
                    contactNumber : this.profileData['contactNumber'],
                    address : this.profileData['address'],
                    image : this.profileData['image'],
                    companyId : this.profileData['companyId'],
                    companyName : this.profileData['companyName'],
                    industry : this.profileData['industry'],
                }
                this.updateProfile(updateData);
            }
        },
        computed : {
            ...mapState(useUserStore, ['companyData', 'userData']),
        },
        mounted() {
            this.profileData = {
                ...this.companyData, 
                ...this.userData, 
                benchmarkingStatus : this.userData.benchmarkingStatus == 'public' ? true : false
            };
        }, 
        components : {
            VFileUpload
        }
    }
</script>

<style scoped>
    .profile-card{
        height: 300px;
    }
</style>