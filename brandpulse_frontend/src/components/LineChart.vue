<template>
  <div style="overflow-x: auto; width: 100%;">
    <div :style="{ height: '300px', minWidth: '100%', width: chartWidth }">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const BAR_WIDTH = 32      // px per bar
const BAR_GAP = 12        // px gap between bars
const GROUP_GAP = 24      // px gap between groups (datasets)
const MIN_WIDTH = 500     // px minimum chart width

export default {
  name: 'LineChart',
  props: {
    date:     { type: Array, default: () => [1, 2, 3, 4] },
    positive: { type: Array, default: () => [40, 43, 32, 45] },
    negative: { type: Array, default: () => [54, 23, 76, 34] }
  },
  computed: {
    chartWidth() {
      const numGroups  = this.date.length
      const numDatasets = 2
      // Each group: 2 bars + 1 gap between bars, then group gap after
      const computed = numGroups * (numDatasets * BAR_WIDTH + BAR_GAP + GROUP_GAP) + 80
      return Math.max(computed, MIN_WIDTH) + 'px'
    }
  },
  mounted() {
    this.renderChart()
  },
  beforeUnmount() {
    if (this.chart) this.chart.destroy()
  },
  watch: {
    date()     { this.updateChart() },
    positive() { this.updateChart() },
    negative() { this.updateChart() }
  },
  methods: {
    renderChart() {
      if (this.chart) {
        this.chart.destroy()
        this.chart = null
      }

      const isMobile = window.innerWidth < 600

      this.chart = new Chart(this.$refs.chartCanvas, {
        type: 'bar',
        data: {
          labels: this.date,
          datasets: [
            {
              label: 'Positive',
              data: this.positive,
              borderColor: '#42b983',
              backgroundColor: 'rgba(66, 185, 131, 0.7)',
              fill: true,
              borderRadius: 4,
              // ── fixed bar width via barThickness ──
              barThickness: BAR_WIDTH
            },
            {
              label: 'Negative',
              data: this.negative,
              borderColor: '#ED4245',
              backgroundColor: 'rgba(237, 66, 69, 0.7)',
              fill: true,
              borderRadius: 4,
              barThickness: BAR_WIDTH
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: { bar: { borderWidth: 0 } },
          plugins: { legend: { position: 'top' } },
          scales: {
            x: {
              // subtle spacing between bar groups
              grid: { display: false },
              ticks: { font: { size: isMobile ? 10 : 12 } }
            },
            y: {
              ticks: { font: { size: isMobile ? 10 : 12 } }
            }
          }
        }
      })
    },

    updateChart() {
      if (!this.chart) {
        this.renderChart()
        return
      }
      this.chart.data.labels                  = this.date
      this.chart.data.datasets[0].data        = this.positive
      this.chart.data.datasets[1].data        = this.negative
      this.chart.update()
    }
  }
}
</script> 