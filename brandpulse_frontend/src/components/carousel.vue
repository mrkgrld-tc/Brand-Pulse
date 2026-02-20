<template>
  <div
    class="carousel"
    @mouseenter="stopCycle"
    @mouseleave="startCycle"
  >
    <div class="carousel__track-wrapper">
      <div
        ref="trackRef"
        class="carousel__track"
        :style="{ transform: `translateX(${offset}px)` }"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <div
          v-for="(item, i) in items"
          :key="i"
          class="carousel__slide"
          :class="{ 'is-active': i === current }"
        >
          <slot :item="item" :index="i" />
        </div>
      </div>
    </div>

    <button class="carousel__arrow carousel__arrow--left" @click="prev">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
    <button class="carousel__arrow carousel__arrow--right" @click="next">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>

    <div class="carousel__dots">
      <button
        v-for="(_, i) in items"
        :key="i"
        class="carousel__dot"
        :class="{ 'is-active': i === current }"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  peek: {
    type: Number,
    default: 60,
  },
  gap: {
    type: Number,
    default: 16,
  },
  interval: {
    type: Number,
    default: 4000,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
})

const current = ref(0)
const trackRef = ref(null)
const slideWidth = ref(0)
let timer = null

// Measure the actual rendered slide width
const measure = () => {
  const firstSlide = trackRef.value?.querySelector('.carousel__slide')
  if (firstSlide) {
    slideWidth.value = firstSlide.offsetWidth + props.gap
  }
}

// Offset = peek pushes the first slide in, then each step moves by one full slide width
const offset = computed(() => {
  return props.peek - current.value * slideWidth.value
})

const goTo = (i) => { current.value = i }
const next = () => goTo((current.value + 1) % props.items.length)
const prev = () => goTo((current.value - 1 + props.items.length) % props.items.length)

const startCycle = () => {
  if (!props.autoplay) return
  stopCycle()
  timer = setInterval(next, props.interval)
}
const stopCycle = () => {
  clearInterval(timer)
  timer = null
}

onMounted(async () => {
  await nextTick()
  measure()
  window.addEventListener('resize', measure)
  startCycle()
})

onUnmounted(() => {
  stopCycle()
  window.removeEventListener('resize', measure)
})

// Touch
let touchStartX = 0
const onTouchStart = (e) => { touchStartX = e.touches[0].clientX }
const onTouchEnd = (e) => {
  const delta = touchStartX - e.changedTouches[0].clientX
  if (Math.abs(delta) > 40) delta > 0 ? next() : prev()
}
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  max-width: 700px;
  user-select: none;
}

.carousel__track-wrapper {
  overflow: hidden;
  padding: 12px 0;
}

.carousel__track {
  display: flex;
  gap: v-bind('`${gap}px`');
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.carousel__slide {
  flex: 0 0 calc(100% - v-bind('`${peek * 2}px`'));
  transition: opacity 0.35s ease, transform 0.35s ease;
  opacity: 0.4;
  transform: scale(0.96);
}

.carousel__slide.is-active {
  opacity: 1;
  transform: scale(1);
}

.carousel__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(calc(-50% - 16px));
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 2;
}

.carousel__arrow:hover {
  background: rgba(255, 255, 255, 0.25);
}

.carousel__arrow svg {
  width: 18px;
  height: 18px;
}

.carousel__arrow--left  { left: 0; }
.carousel__arrow--right { right: 0; }

.carousel__dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}

.carousel__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: background 0.25s, transform 0.25s;
  padding: 0;
}

.carousel__dot.is-active {
  background: white;
  transform: scale(1.3);
}
</style>