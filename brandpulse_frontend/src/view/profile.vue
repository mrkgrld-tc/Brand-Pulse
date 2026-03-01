<template>
    <v-container>
        <v-row dense class="d-flex">
            <v-col cols="12" lg="8" md="8" sm="12">
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
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="12" class="d-flex flex-column ga-2">
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
                                <v-sheet color="info" class="pa-2 rounded-lg w-100">
                                    <p>Password Requirements</p>
                                    <ul class="ml-5">
                                        <li>At least 8 characters long</li>
                                        <li>Include uppercase and lowercase letters</li>
                                        <li>Include at least one number</li>
                                        <li>Include at least one special character (!@#$%)</li>
                                    </ul>
                                </v-sheet>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-end">
                        <v-btn prepend-icon="mdi-lock-reset" variant="tonal" color="primary">Change Password</v-btn>
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
                                <v-sheet color="info" class="pa-2 rounded-lg w-100">
                                    <p>Password Requirements</p>
                                    <ul class="ml-5">
                                        <li>At least 8 characters long</li>
                                        <li>Include uppercase and lowercase letters</li>
                                        <li>Include at least one number</li>
                                        <li>Include at least one special character (!@#$%)</li>
                                    </ul>
                                </v-sheet>
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
        
    }
</script>

<style scoped>
    .profile-card{
        height: 300px;
    }
</style>