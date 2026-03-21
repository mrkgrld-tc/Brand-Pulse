<template>
    <div class="auth-page">
        <div class="auth-glow" />

        <v-card width="420" class="auth-card" elevation="0" rounded="xl">
          <!-- Header -->
            <div class="auth-header">
                <img src="../assets/logo.png" alt="BrandPulse" class="auth-logo" />
                <h2 class="auth-title">{{ action === 'login' ? 'Welcome back' : 'Create account' }}</h2>
                <p class="auth-subtitle">
                {{ action === 'login'
                    ? 'Sign in to access your dashboard'
                    : 'Create Your Account Today' }}
                </p>
            </div>

            <!-- Form -->
            <div class="auth-form">
                <!-- Login section -->
                <template v-if="action == 'login'">
                    <v-text-field
                        v-model="email"
                        label="Email address"
                        variant="outlined"
                        rounded="lg"
                        density="compact"
                        hide-details
                    >
                        <template #append-inner><v-icon size="18" opacity="0.5">mdi-email-outline</v-icon></template>
                    </v-text-field>

                    <v-text-field
                        v-model="password"
                        label="Password"
                        variant="outlined"
                        rounded="lg"
                        density="compact"
                        hide-details
                        :type="showPassword ? 'text' : 'password'"
                    >
                        <template #append-inner>
                            <v-icon
                            size="18"
                            opacity="0.5"
                            style="cursor:pointer"
                            @click="showPassword = !showPassword"
                            >
                            {{ showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline' }}
                            </v-icon>
                        </template>
                    </v-text-field>
                    <v-btn
                        color="primary"
                        rounded="lg"
                        block
                        class="auth-submit"
                        size="large"
                        @click="handleLogin()"
                    >
                        <p>Sign In</p>
                        <v-icon end>mdi-arrow-right</v-icon>
                    </v-btn>
                </template>
                <!-- Sign up Section -->
                <template v-else>
                    <template v-if="step == 1">
                        <v-text-field
                            v-if="action === 'signup'"
                            v-model="name"
                            label="Full Name"
                            variant="outlined"
                            rounded="lg"
                            density="compact"
                            hide-details
                        >
                            <template #append-inner><v-icon size="18" opacity="0.5">mdi-account-outline</v-icon></template>
                        </v-text-field>

                        <v-text-field
                            v-model="email"
                            label="Email address"
                            variant="outlined"
                            rounded="lg"
                            density="compact"
                            hide-details
                        >
                            <template #append-inner><v-icon size="18" opacity="0.5">mdi-email-outline</v-icon></template>
                        </v-text-field>

                        <v-text-field
                            v-model="password"
                            label="Password"
                            variant="outlined"
                            rounded="lg"
                            density="compact"
                            hide-details
                            :type="showPassword ? 'text' : 'password'"
                        >
                            <template #append-inner>
                                <v-icon
                                size="18"
                                opacity="0.5"
                                style="cursor:pointer"
                                @click="showPassword = !showPassword"
                                >
                                {{ showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline' }}
                                </v-icon>
                            </template>
                        </v-text-field>
                    </template>

                    <template v-if="step == 2">
                        <v-text-field
                            v-if="action === 'signup'"
                            v-model="address"
                            label="Address"
                            variant="outlined"
                            rounded="lg"
                            density="compact"
                            hide-details
                        >
                            <template #append-inner><v-icon size="18" opacity="0.5">mdi-account-outline</v-icon></template>
                        </v-text-field>

                        <v-text-field
                            v-model="contactNumber"
                            label="Contact Number"
                            variant="outlined"
                            rounded="lg"
                            density="compact"
                            hide-details
                        >
                            <template #append-inner><v-icon size="18" opacity="0.5">mdi-email-outline</v-icon></template>
                        </v-text-field>
                    </template>

                    <template v-if="step == 3">
                        <v-text-field
                            v-if="action === 'signup'"
                            v-model="companyName"
                            label="Company Name"
                            variant="outlined"
                            rounded="lg"
                            density="compact"
                            hide-details
                        >
                            <template #append-inner><v-icon size="18" opacity="0.5">mdi-account-outline</v-icon></template>
                        </v-text-field>
                        <v-select
                            v-model="industry"
                            label="Industry"
                            variant="outlined"
                            rounded="lg"
                            density="compact"
                            hide-details
                            :items="industries"
                            item-title="label"
                            item-value="industry_id"
                        >
                            <template #append-inner><v-icon size="18" opacity="0.5">mdi-email-outline</v-icon></template>
                        </v-select>
                    </template>
                    <v-btn
                        color="primary"
                        rounded="lg"
                        block
                        class="auth-submit"
                        size="large"
                        @click="handleSignUp()"
                    >
                        {{ step <= 2 ? 'Next' : 'Create Account' }}
                        <v-icon end>mdi-arrow-right</v-icon>
                    </v-btn>
                </template>
            </div>

            <!-- Footer -->
            <div class="auth-footer">
                <span class="auth-footer-text">
                {{ action === 'login' ? "Don't have an account?" : 'Already have an account?' }}
                </span>
                <button class="auth-link" @click="toggle">
                {{ action === 'login' ? 'Sign up free' : 'Sign in' }}
                </button>
            </div>
        </v-card>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import { useNotifStore } from '@/utilities/notifStore';
import { mapActions, mapState } from 'pinia';
import api from '@/plugin/axios';
export default {
    data() {
        return {
            action: 'login',
            step : 1,
            showPassword: false,
            name: '',
            email: '',
            password: '',
            address : '',
            contactNumber : '',
            companyName : '',
            industries : [],
            industry : '',
        }
    },
    methods: {
        ...mapActions(useUserStore, ['logIn', 'signUp']),
        ...mapActions(useNotifStore, ['showNotif']),
        toggle() {
            this.action = this.action === 'login' ? 'signup' : 'login'
            this.showPassword = false
        },
        handleLogin(){
            if(this.password.length == 0 || this.email.length == 0){
                this.showNotif({
                    active : true,
                    title : 'Form Empty',
                    subtitle : 'Please fill up all fields',
                    icon : 'mdi-alert-circle-outline',
                    autoClose : true,
                })
            }else{
                 const data = {
                    email : this.email,
                    password : this.password
                }
                this.logIn(data);   
            }
        },
        handleSignUp(){
            if(this.step == 1){
                if(this.password.length == 0 || this.email.length == 0 || !this.validateEmail(this.email) || !this.validatePassword(this.password)){
                    this.showNotif({
                        active : true,
                        title : 'Form Empty',
                        subtitle : 'Please fill up all fields',
                        icon : 'mdi-alert-circle-outline',
                        autoClose : true,
                    })
                }else{
                    this.step ++
                }
            }else if(this.step == 2){
                if(this.address.length == 0 || this.contactNumber.length == 0){
                    this.showNotif({
                        active : true,
                        title : 'Form Empty',
                        subtitle : 'Please fill up all fields',
                        icon : 'mdi-alert-circle-outline',
                        autoClose : true,
                    })
                }else{
                    this.step++
                }
            }else if(this.step == 3){
                if(this.companyName.length == 0 || this.industry.length == 0){
                    this.showNotif({
                        active : true,
                        title : 'Form Empty',
                        subtitle : 'Please fill up all fields',
                        icon : 'mdi-alert-circle-outline',
                        autoClose : true,
                    })
                }else{
                    const data = {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        address : this.address,
                        contactNumber : this.contactNumber,
                        companyName : this.companyName,
                        industry : this.industry,
                    }
                    this.signUp(data);
                    this.action = 'login';
                    this.step = 1;
                    this.name = '';
                    this.email = '';
                    this.password = '';
                    this.address = '';
                    this.contactNumber = '';
                    this.companyName = '';
                    this.industry = '';
                }
            }
        },
        validateInput(){
            if(!this.validateUserName(this.name)){
                this.showNotif({
                    active : true,
                    title : 'Invalid User Name',
                    subtitle : 'Username must not contain numerical character',
                    icon : 'mdi-alert-circle-outline',
                    autoClose : true,
                })
                return false;
            }
            if(!this.validatePassword(this.password)){
                this.showNotif({
                    active : true,
                    title : 'Invalid Password',
                    subtitle : 'Password must be atleast 8 character',
                    icon : 'mdi-alert-circle-outline',
                    autoClose : true,
                })
                return false;
            }
            if(!this.validateEmail(this.email)){
                this.showNotif({
                    active : true,
                    title : 'Invalid Email',
                    subtitle : 'Insert a valid Email Address',
                    icon : 'mdi-alert-circle-outline',
                    autoClose : true,
                })
                return false;
            }
            return true;
        },
        validateUserName(username){
            const regex = /^[a-zA-Z0-9_]{3,16}$/; 
            return regex.test(username);
        },
        validatePassword(password){
            // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 
            // return regex.test(password);
            if(password.length < 8 && this.action == 'signup'){
                this.showNotif({
                    active : true,
                    title : 'Invalid Password',
                    subtitle : 'Please insert valid password',
                    icon : 'mdi-alert-circle-outline',
                    autoClose : true,
                }) 
            }
            return password.length > 7
        },
        validateEmail(email){
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!regex.test(email)){
                this.showNotif({
                    active : true,
                    title : 'Invalid Email',
                    subtitle : 'Please use valid email',
                    icon : 'mdi-alert-circle-outline',
                    autoClose : true,
                }) 
            }
            return regex.test(email);
        },
        async getIndustry(){
            const res = await api.post('/getIndustries');
            this.industries = res.data.industries;
        }
    },
    mounted(){
        this.getIndustry();
    }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.auth-glow {
  position: fixed;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 40%,
    rgba(var(--v-theme-primary), 0.15) 0%,
    transparent 65%
  );
  pointer-events: none;
}

.auth-card {
  width: 100%;
  padding: 40px 36px 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* Header */
.auth-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
}

.auth-logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.auth-badge {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
  border: 1px solid rgba(var(--v-theme-primary), 0.2);
}

.auth-title {
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 4px 0 0;
}

.auth-subtitle {
  font-size: 0.88rem;
  opacity: 0.5;
  margin: 0;
}

/* Form */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}


.auth-link {
  background: none;
  border: none;
  padding: 0;
  font-size: 0.85rem;
  color: rgb(var(--v-theme-primary));
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
}

.auth-link:hover {
  text-decoration: underline;
}

.auth-submit {
  margin-top: 4px;
}

.auth-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0.3;
}

.auth-divider::before,
.auth-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: currentColor;
}

.auth-divider span {
  font-size: 0.8rem;
  white-space: nowrap;
}

/* Footer */
.auth-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding-top: 4px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.auth-footer-text {
  font-size: 0.87rem;
  opacity: 0.5;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 32px 24px 28px;
  }
}
</style>