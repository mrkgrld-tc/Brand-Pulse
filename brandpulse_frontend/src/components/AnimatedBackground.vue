<template>
  <div class="ai-background">
    <canvas
      ref="canvasRef"
      class="neural-canvas"
      :width="canvasWidth"
      :height="canvasHeight"
    ></canvas>
    <div class="noise-overlay"></div>
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef   = ref(null)
const canvasWidth  = ref(window.innerWidth)
const canvasHeight = ref(window.innerHeight)
let animationId   = null

onMounted(() => {
  const canvas = canvasRef.value
  const ctx    = canvas.getContext('2d')

  // --- Responsive Config ---
  const getConfig = () => {
    const W = window.innerWidth
    if (W < 480)  return { NODE_COUNT: 28, MAX_DIST: 100 }
    if (W < 768)  return { NODE_COUNT: 42, MAX_DIST: 130 }
    if (W < 1024) return { NODE_COUNT: 55, MAX_DIST: 150 }
    if (W < 1440) return { NODE_COUNT: 72, MAX_DIST: 180 }
    return               { NODE_COUNT: 95, MAX_DIST: 210 }
  }

  let config     = getConfig()
  let NODE_COUNT = config.NODE_COUNT
  let MAX_DIST   = config.MAX_DIST
  const PULSE_SPEED = 0.012

  const COLORS = [
    '108, 99,  200',
    '124, 58,  237',
    ' 37, 99,  235',
    ' 76, 29,  149',
    ' 56, 189, 248',
  ]

  class Node {
    constructor(W, H) {
      this.x          = Math.random() * W
      this.y          = Math.random() * H
      this.vx         = (Math.random() - 0.5) * 0.45
      this.vy         = (Math.random() - 0.5) * 0.45
      this.r          = Math.random() * 2.2 + 1.2
      this.color      = COLORS[Math.floor(Math.random() * COLORS.length)]
      this.pulse      = Math.random() * Math.PI * 2
      this.pulseSpeed = 0.02 + Math.random() * 0.02
    }
    update(W, H) {
      this.x += this.vx
      this.y += this.vy
      this.pulse += this.pulseSpeed
      if (this.x < 0) this.x = W
      if (this.x > W) this.x = 0
      if (this.y < 0) this.y = H
      if (this.y > H) this.y = 0
    }
    draw(ctx) {
      const glow  = (Math.sin(this.pulse) + 1) / 2
      const alpha = 0.5 + glow * 0.5

      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 6)
      grad.addColorStop(0,   `rgba(${this.color}, ${alpha})`)
      grad.addColorStop(0.4, `rgba(${this.color}, ${alpha * 0.3})`)
      grad.addColorStop(1,   `rgba(${this.color}, 0)`)
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.r * 6, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = `rgba(${this.color}, ${alpha})`
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  class Signal {
    constructor(from, to) {
      this.from  = from
      this.to    = to
      this.t     = 0
      this.color = from.color
      this.speed = PULSE_SPEED + Math.random() * 0.008
      this.done  = false
    }
    update() {
      this.t += this.speed
      if (this.t >= 1) this.done = true
    }
    draw(ctx) {
      const x     = this.from.x + (this.to.x - this.from.x) * this.t
      const y     = this.from.y + (this.to.y - this.from.y) * this.t
      const alpha = 1 - Math.abs(this.t - 0.5) * 2

      const grad = ctx.createRadialGradient(x, y, 0, x, y, 5)
      grad.addColorStop(0, `rgba(${this.color}, ${alpha})`)
      grad.addColorStop(1, `rgba(${this.color}, 0)`)
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  let nodes      = []
  let signals    = []
  let frameCount = 0

  const resize = () => {
    canvasWidth.value  = window.innerWidth
    canvasHeight.value = window.innerHeight
    config      = getConfig()
    NODE_COUNT  = config.NODE_COUNT
    MAX_DIST    = config.MAX_DIST
    nodes       = Array.from({ length: NODE_COUNT }, () => new Node(canvasWidth.value, canvasHeight.value))
    signals     = []
  }
  resize()
  window.addEventListener('resize', resize)

  const draw = () => {
    const W = canvas.width
    const H = canvas.height
    frameCount++

    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = '#07060f'
    ctx.fillRect(0, 0, W, H)

    const blobs = [
      { x: 0.2 * W, y: 0.3 * H, r: 0.35 * H, color: '76, 29, 149' },
      { x: 0.8 * W, y: 0.7 * H, r: 0.30 * H, color: '37, 99, 235' },
      { x: 0.5 * W, y: 0.9 * H, r: 0.25 * H, color: '108, 99, 200' },
    ]
    blobs.forEach(b => {
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
      g.addColorStop(0, `rgba(${b.color}, 0.12)`)
      g.addColorStop(1, `rgba(${b.color}, 0)`)
      ctx.globalCompositeOperation = 'screen'
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
      ctx.fill()
    })
    ctx.globalCompositeOperation = 'source-over'

    nodes.forEach(n => n.update(W, H))

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j]
        const dx = a.x - b.x, dy = a.y - b.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.35
          ctx.strokeStyle = `rgba(${a.color}, ${alpha})`
          ctx.lineWidth   = (1 - dist / MAX_DIST) * 1.2
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()

          if (frameCount % 90 === 0 && Math.random() < 0.08) {
            signals.push(new Signal(a, b))
          }
        }
      }
    }

    signals = signals.filter(s => !s.done)
    signals.forEach(s => { s.update(); s.draw(ctx) })
    nodes.forEach(n => n.draw(ctx))

    const vignette = ctx.createRadialGradient(W/2, H/2, H * 0.15, W/2, H/2, H * 0.85)
    vignette.addColorStop(0, 'rgba(0,0,0,0)')
    vignette.addColorStop(1, 'rgba(0,0,0,0.7)')
    ctx.fillStyle = vignette
    ctx.fillRect(0, 0, W, H)

    animationId = requestAnimationFrame(draw)
  }

  draw()

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', resize)
  })
})
</script>

<style scoped>
.ai-background {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

.neural-canvas {
  position: fixed;
  inset: 0;
  display: block;
  width: 100vw;
  height: 100vh;
  z-index: 0;
}

.noise-overlay {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

:deep(*) {
  position: relative;
  z-index: 2;
}
</style>
