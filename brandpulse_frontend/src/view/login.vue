<template>
  <div class="auth-page">
    <div class="auth-glow" />

    <v-card width="420" class="auth-card glass-card" elevation="0" rounded="xl">
      <!-- Header -->
      <div class="auth-header">
        <img src="../assets/icons/corporate-culture.gif" alt="BrandPulse" class="auth-logo" />
        <div class="auth-badge">BrandPulse</div>
        <h2 class="auth-title">{{ action === 'login' ? 'Welcome back' : 'Create account' }}</h2>
        <p class="auth-subtitle">
          {{ action === 'login'
            ? 'Sign in to access your dashboard'
            : 'Start your 14-day free trial today' }}
        </p>
      </div>

      <!-- Form -->
      <div class="auth-form">
        <!-- Sign Up only -->
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

        <div v-if="action === 'login'" class="auth-forgot">
          <a href="#" class="auth-link">Forgot password?</a>
        </div>

        <v-btn
          :to="action === 'login' ? '/' : undefined"
          color="primary"
          size="large"
          rounded="lg"
          block
          class="auth-submit"
        >
          {{ action === 'login' ? 'Sign In' : 'Create Account' }}
          <v-icon end>mdi-arrow-right</v-icon>
        </v-btn>

        <!-- <div class="auth-divider">
          <span>or</span>
        </div>

        <v-btn
          variant="outlined"
          size="large"
          rounded="lg"
          block
          class="auth-google"
        >
          <template #prepend>
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
          </template>
          Continue with Google
        </v-btn> -->
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
export default {
  data() {
    return {
      action: 'login',
      showPassword: false,
      name: '',
      email: '',
      password: '',
    }
  },
  methods: {
    toggle() {
      this.action = this.action === 'login' ? 'signup' : 'login'
      this.showPassword = false
    },
  },
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
  width: 56px;
  height: 56px;
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

.auth-forgot {
  display: flex;
  justify-content: flex-end;
  margin-top: -6px;
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

.auth-google {
  opacity: 0.85;
  transition: opacity 0.2s;
}

.auth-google:hover {
  opacity: 1;
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