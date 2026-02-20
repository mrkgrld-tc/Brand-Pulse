<template>
    <!-- Hero Section -->
    <section class="hero">
        <div class="hero__content">
        <div class="hero__badge">AI-Powered Brand Intelligence</div>
        <h1 class="hero__title">
            Stop Guessing.<br />
            <span class="hero__title--highlight">Start Knowing.</span>
        </h1>
        <p class="hero__subtitle">
            BrandPulse analyzes customer sentiment, tracks trends, and compares
            competitors — so you can make smarter decisions faster.
        </p>
        <div class="hero__actions">
            <v-btn to="/login" append-icon="mdi-arrow-top-right" color="primary" size="small" rounded="lg">
              Get Started
            </v-btn>
            <v-btn @click="scrollToFeatures" size="small" rounded="lg" variant="tonal">
              See How It Works
            </v-btn>
        </div>

        <div class="hero__stats">
            <div class="hero__stat">
            <span class="hero__stat-value">10k+</span>
            <span class="hero__stat-label">Brands Tracked</span>
            </div>
            <div class="hero__stat-divider" />
            <div class="hero__stat">
            <span class="hero__stat-value">98%</span>
            <span class="hero__stat-label">Accuracy Rate</span>
            </div>
            <div class="hero__stat-divider" />
            <div class="hero__stat">
            <span class="hero__stat-value">2x</span>
            <span class="hero__stat-label">Faster Decisions</span>
            </div>
        </div>
        </div>

        <div class="hero__image-wrapper">
        <div class="hero__image-glow" />
        <img src="../assets/robot.jpeg" alt="AI managing business" class="hero__image" />
        </div>
    </section>

  <!-- Features Section -->
    <section id="features" class="page-section">
        <div class="section-header">
        <div class="section-badge">Features</div>
        <h2 class="section-title">Everything You Need to<br /><span class="highlight">Understand Your Customers</span></h2>
        <p class="section-subtitle">We turn messy, overwhelming feedback into clarity you can act on.</p>
        </div>
        <carousel :items="features" :peek="50" :gap="16" :interval="4000">
        <template #default="{ item }">
            <v-card class="glass-card" elevation="0" rounded="xl">
            <v-card-text class="d-flex flex-column align-center text-center pa-10">
                <div class="icon-wrapper mb-5">
                <img class="icon" :src="item.icon" :alt="item.alt" />
                </div>
                <div class="chip-label mb-3">{{ item.tag }}</div>
                <h4 class="feature-title mb-3">{{ item.title }}</h4>
                <p class="feature-desc">{{ item.desc }}</p>
            </v-card-text>
            </v-card>
        </template>
        </carousel>
    </section>

  <!-- Steps Section -->
    <section class="page-section page-section--alt">
        <div class="section-header">
        <div class="section-badge">How It Works</div>
        <h2 class="section-title">Up and Running in<br /><span class="highlight">Three Easy Steps</span></h2>
        <p class="section-subtitle">No complex setup. No data science degree required.</p>
        </div>
        <carousel :items="steps" :peek="50" :gap="16" :interval="4000">
        <template #default="{ item }">
            <v-card class="glass-card" elevation="0" rounded="xl">
            <v-card-text class="d-flex flex-column align-center text-center pa-10">
                <div class="icon-wrapper mb-5">
                <img class="icon" :src="item.icon" :alt="item.alt" />
                </div>
                <div class="chip-label mb-3">{{ item.tag }}</div>
                <h4 class="feature-title mb-3">{{ item.title }}</h4>
                <p class="feature-desc">{{ item.desc }}</p>
            </v-card-text>
            </v-card>
        </template>
        </carousel>
    </section>

  <!-- FAQ Section -->
    <section class="page-section">
        <div class="section-header">
            <div class="section-badge">FAQ</div>
            <h2 class="section-title">Frequently Asked <span class="highlight">Questions</span></h2>
            <p class="section-subtitle">Everything you need to know before getting started.</p>
        </div>

        <div class="faq__list">
            <div
            v-for="(faq, i) in faqs"
            :key="i"
            class="faq__item"
            :class="{ 'is-open': openFaq === i }"
            @click="openFaq = openFaq === i ? null : i"
            >
            <div class="faq__question">
                <span>{{ faq.q }}</span>
                <svg class="faq__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M6 9l6 6 6-6" />
                </svg>
            </div>
            <div class="faq__answer">
                <p>{{ faq.a }}</p>
            </div>
            </div>
        </div>
    </section>
    <!-- Pricing Section -->
    <section class="page-section page-section--alt">
        <div class="section-header">
            <div class="section-badge">Pricing</div>
            <h2 class="section-title">Simple, Affordable <span class="highlight">Pricing</span></h2>
            <p class="section-subtitle">Start free, upgrade when you're ready. No hidden fees.</p>
        </div>

        <div class="pricing__grid">
            <div
            v-for="(plan, i) in plans"
            :key="i"
            class="pricing__card"
            :class="{ 'pricing__card--popular': plan.popular }"
            >
            <div v-if="plan.popular" class="pricing__popular-badge">Most Popular</div>

            <div class="pricing__header">
                <span class="pricing__plan-name">{{ plan.name }}</span>
                <div class="pricing__price">
                <span class="pricing__currency">{{ plan.price === 'FREE' ? '' : '₱' }}</span>
                <span class="pricing__amount">{{ plan.price === 'FREE' ? 'FREE' : plan.price.toLocaleString() }}</span>
                <span v-if="plan.price !== 'FREE'" class="pricing__period">/month</span>
                </div>
            </div>

            <ul class="pricing__features">
                <li v-for="(feature, j) in plan.features" :key="j" class="pricing__feature">
                <svg class="pricing__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M5 13l4 4L19 7" />
                </svg>
                {{ feature }}
                </li>
            </ul>
            <div>
                <v-btn
                    :color="plan.popular ? 'primary' : undefined"
                    :variant="plan.popular ? 'flat' : 'tonal'"
                    rounded="lg"
                    block
                    size="default"
                    class="pricing__btn"
                    :to="plan.to"
                >
                    {{ plan.cta }}
                </v-btn>
            </div>
            </div>
        </div>

        <!-- All plans include -->
        <div class="pricing__perks">
            <p class="pricing__perks-label">All plans include:</p>
            <div class="pricing__perks-list">
            <span v-for="(perk, i) in perks" :key="i" class="pricing__perk">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 13l4 4L19 7" />
                </svg>
                {{ perk }}
            </span>
            </div>
        </div>
    </section>
    <!-- CTA Section -->
    <section class="cta-section">
        <div class="cta-glow" />
        <div class="section-badge" style="margin: 0 auto 20px;">Get Started Today</div>
        <h2 class="cta-title">Ready to Know Your Customers?</h2>
        <p class="cta-subtitle">Join thousands of brands making smarter decisions with BrandPulse.</p>
        <div class="cta-actions">
        <v-btn to="/login" color="primary" size="large" rounded="lg" append-icon="mdi-arrow-top-right">
            Start for Free
        </v-btn>
        <v-btn size="large" rounded="lg" variant="outlined">
            Book a Demo
        </v-btn>
        </div>
    </section>
</template>

<script>
import icon from '@/assets/icons/corporate-culture.gif'
import AnimatedBackground from '@/components/AnimatedBackground.vue'
import carousel from '@/components/carousel.vue'
import liveChatIcon from '@/assets/icons/live-chat.gif'
import confusionIcon from '@/assets/icons/confusion.gif'
import unhappyIcon from '@/assets/icons/unhappy.gif'
import hourglassIcon from '@/assets/icons/hourglass.gif'
export default {
    components: { AnimatedBackground, carousel },
    data() {
        return {
        features: [
            {
            icon : liveChatIcon,
            alt: 'Live Chat',
            tag: 'Problem #1',
            title: 'Information Overload',
            desc: 'Drowning in customer reviews with no clear insights? We aggregate and surface only what matters.',
            },
            {
            icon : confusionIcon,
            alt: 'Confusion',
            tag: 'Problem #2',
            title: 'Lack of Clarity',
            desc: 'Wondering what customers really think about your brand? Get a crystal-clear picture in seconds.',
            },
            {
            icon : unhappyIcon,
            alt: 'Unhappy',
            tag: 'Problem #3',
            title: 'Customer Churn',
            desc: "Losing customers to competitors but don't know why? Identify friction points before it's too late.",
            },
            {
            icon : hourglassIcon,
            alt: 'Hourglass',
            tag: 'Problem #4',
            title: 'Wasted Time',
            desc: 'Spending hours manually reading feedback? Automate the grunt work and focus on action.',
            },
        ],
        steps: [
            {
            icon,
            alt: 'Upload',
            tag: 'Step #1',
            title: 'Upload Your Data',
            desc: 'Paste reviews, upload a CSV, or connect your social media accounts.',
            },
            {
            icon,
            alt: 'Analyze',
            tag: 'Step #2',
            title: 'AI Analyzes Everything',
            desc: 'Our AI reads and understands customer sentiment in seconds.',
            },
            {
            icon,
            alt: 'Insights',
            tag: 'Step #3',
            title: 'Get Actionable Insights',
            desc: 'View beautiful dashboards and make smarter, faster decisions.',
            },
        ],
        openFaq: null,
        faqs: [
                {
                    q: 'Does it work with Tagalog reviews?',
                    a: 'Yes! BrandPulse is specifically trained to understand Filipino customer feedback, including Taglish (mixed Tagalog-English).',
                },
                {
                    q: 'How accurate is the sentiment analysis?',
                    a: 'Our AI achieves 90%+ accuracy on Filipino text, comparable to human analysis.',
                },
                {
                    q: 'Do I need technical skills to use it?',
                    a: 'Not at all! Just upload your data and get instant insights. No coding required.',
                },
                {
                    q: 'Can I try it before paying?',
                    a: 'Yes! We offer a 14-day free trial. No credit card required.',
                },
                {
                    q: 'What about data privacy?',
                    a: 'Your data is encrypted and never shared. We comply with the Philippine Data Privacy Act.',
                },
                // {
                //     q: 'Can I export the reports?',
                //     a: 'Yes, export as PDF or CSV for presentations and further analysis.',
                // },
            ],
            plans: [
                {
                    name: 'Free',
                    price: 'FREE',
                    popular: false,
                    cta: 'Get Started Free',
                    to: '/login',
                    features: [
                    '100 analyses / month',
                    'Basic sentiment analysis',
                    '1 user',
                    'Email support',
                    ],
                },
                {
                    name: 'Starter',
                    price: 2999,
                    popular: true,
                    cta: 'Start Free Trial',
                    to: '/login',
                    features: [
                    '1,000 analyses / month',
                    'Full sentiment analysis',
                    'Competitor comparison',
                    '3 users',
                    'Priority support',
                    ],
                },
                {
                    name: 'Business',
                    price: 7999,
                    popular: false,
                    cta: 'Contact Sales',
                    to: '/contact',
                    features: [
                    'Unlimited analyses',
                    'Advanced analytics',
                    'API access',
                    'Unlimited users',
                    'Dedicated support',
                    ],
                },
                ],
                perks: [
                'Tagalog & English support',
                'Visual dashboard',
                // 'Export reports',
                'No credit card required for trial',
            ],
        }
    },
    methods: {
        scrollToFeatures() {
            document.getElementById('features').scrollIntoView({ behavior: 'smooth' })
        }
    }
}
</script>

<style>
/* ── Hero ─────────────────────────────────────────── */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
  min-height: 100vh;
  padding: 80px 8vw;
  box-sizing: border-box;
}

.hero__content {
  flex: 1;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: rgba(var(--v-theme-primary), 0.12);
  color: rgb(var(--v-theme-primary));
  border: 1px solid rgba(var(--v-theme-primary), 0.25);
}

.hero__title {
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 0;
}

.hero__title--highlight,
.highlight {
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-primary)),
    color-mix(in srgb, rgb(var(--v-theme-primary)) 55%, white)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__subtitle {
  font-size: 1.05rem;
  line-height: 1.75;
  opacity: 0.65;
  margin: 0;
  max-width: 460px;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero__stats {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-top: 8px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.hero__stat {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.hero__stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
}

.hero__stat-label {
  font-size: 0.72rem;
  opacity: 0.45;
  white-space: nowrap;
  letter-spacing: 0.03em;
}

.hero__stat-divider {
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
}

.hero__image-wrapper {
  flex: 1;
  max-width: 520px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__image-glow {
  position: absolute;
  inset: -20%;
  background: radial-gradient(
    circle at center,
    rgba(var(--v-theme-primary), 0.2) 0%,
    transparent 65%
  );
  filter: blur(50px);
}

.hero__image {
  position: relative;
  width: 100%;
  max-width: 480px;
  border-radius: 24px;
  object-fit: cover;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.45);
}

/* ── Sections ─────────────────────────────────────── */
.page-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 8vw;
  box-sizing: border-box;
  gap: 48px;
}

.page-section--alt {
  background: rgba(var(--v-theme-primary), 0.03);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
  max-width: 600px;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
  border: 1px solid rgba(var(--v-theme-primary), 0.2);
}

.section-title {
  font-size: clamp(1.7rem, 3.5vw, 2.6rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 0;
}

.section-subtitle {
  font-size: 1rem;
  line-height: 1.7;
  opacity: 0.55;
  margin: 0;
}

/* ── CTA ──────────────────────────────────────────── */
.cta-section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 120px 8vw;
  overflow: hidden;
  gap: 16px;
}

.cta-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    rgba(var(--v-theme-primary), 0.15) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.cta-title {
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0;
}

.cta-subtitle {
  font-size: 1.05rem;
  opacity: 0.6;
  margin: 0 0 8px;
  max-width: 480px;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-top: 8px;
}

/* ── Responsive ───────────────────────────────────── */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    padding: 100px 6vw 60px;
    text-align: center;
  }

  .hero__content {
    align-items: center;
  }

  .hero__subtitle {
    text-align: center;
  }

  .hero__actions,
  .hero__stats {
    justify-content: center;
  }

  .hero__image-wrapper {
    max-width: 100%;
  }

  .hero__image {
    max-width: 320px;
  }

  .page-section {
    padding: 80px 5vw;
    gap: 32px;
  }
}

@media (max-width: 420px) {
  .hero__stats {
    gap: 16px;
  }

  .hero__stat-value {
    font-size: 1.2rem;
  }
}

/* ── FAQ ──────────────────────────────────────────── */
.faq__list {
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq__item {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.25s, background 0.25s;
}

.faq__item:hover {
  border-color: rgba(var(--v-theme-primary), 0.3);
  background: rgba(var(--v-theme-primary), 0.04);
}

.faq__item.is-open {
  border-color: rgba(var(--v-theme-primary), 0.4);
  background: rgba(var(--v-theme-primary), 0.06);
}

.faq__question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  font-weight: 600;
  font-size: 0.97rem;
}

.faq__chevron {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  opacity: 0.5;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s;
}

.faq__item.is-open .faq__chevron {
  transform: rotate(180deg);
  opacity: 1;
  color: rgb(var(--v-theme-primary));
}

.faq__answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq__item.is-open .faq__answer {
  grid-template-rows: 1fr;
}

.faq__answer p {
  overflow: hidden;       /* this is what clamps it to 0 when collapsed */
  min-height: 0;          /* ← required for 0fr to actually collapse */
  margin: 0;
  padding: 0 24px 20px;
  font-size: 0.92rem;
  line-height: 1.7;
  opacity: 0.65;
}

/* ── Pricing ──────────────────────────────────────── */
.pricing__grid {
  display: flex;
  gap: 24px;
  align-items: stretch;
  width: 100%;
  max-width: 960px;
  flex-wrap: wrap;
  justify-content: center;
}

.pricing__card {
  position: relative;
  flex: 1;
  min-width: 260px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  transition: border-color 0.25s, transform 0.25s;
}

.pricing__card:hover {
  border-color: rgba(var(--v-theme-primary), 0.3);
  transform: translateY(-4px);
}

.pricing__card--popular {
  border-color: rgba(var(--v-theme-primary), 0.5);
  background: rgba(var(--v-theme-primary), 0.07);
  transform: translateY(-8px);
}

.pricing__card--popular:hover {
  transform: translateY(-12px);
}

.pricing__popular-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: rgb(var(--v-theme-primary));
  color: white;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 5px 16px;
  border-radius: 999px;
  white-space: nowrap;
}

.pricing__header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pricing__plan-name {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0.5;
}

.pricing__price {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  line-height: 1;
}

.pricing__currency {
  font-size: 1.3rem;
  font-weight: 700;
  padding-bottom: 4px;
  opacity: 0.8;
}

.pricing__amount {
  font-size: 2.8rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.pricing__period {
  font-size: 0.85rem;
  opacity: 0.45;
  padding-bottom: 6px;
}

.pricing__features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.pricing__feature {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  opacity: 0.8;
}

.pricing__check {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: rgb(var(--v-theme-primary));
}

.pricing__btn {
  margin-top: auto;
}

/* Perks */
.pricing__perks {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
}

.pricing__perks-label {
  font-size: 0.85rem;
  opacity: 0.45;
  margin: 0;
}

.pricing__perks-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px 28px;
}

.pricing__perk {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.88rem;
  opacity: 0.7;
}

.pricing__perk svg {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  color: rgb(var(--v-theme-primary));
}

@media (max-width: 768px) {
  .pricing__card {
    transform: none !important;
    max-width: 100%;
  }

  .pricing__card--popular {
    order: -1;
  }
}
</style>