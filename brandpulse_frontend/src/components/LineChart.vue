<template>
  <div style="height: 300px;"> <!-- fixed height so chart doesn't look squished -->
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>
<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  name: 'LineChart',
  props: {
    date: { type: Array, default: () => [1, 2, 3, 4] },
    positive: { type: Array, default: () => [40, 43, 32, 45] },
    negative: { type: Array, default: () => [54, 23, 76, 34] }
  },
  mounted() {
    this.renderChart()
  },
  beforeUnmount() {
    if (this.chart) this.chart.destroy()
  },
  watch: {
    date() { this.updateChart() },
    positive() { this.updateChart() },
    negative() { this.updateChart() }
  },
  methods: {
    renderChart() {
      if (this.chart) {        // ✅ destroy before re-creating
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
              borderRadius: 2,
              barPercentage: 1.0,
              categoryPercentage: 1.0
            },
            {
              label: 'Negative',
              data: this.negative,
              borderColor: '#ED4245',
              backgroundColor: 'rgba(237, 66, 69, 0.7)',
              fill: true,
              borderRadius: 2,
              barPercentage: 1.0,
              categoryPercentage: 1.0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: { bar: { borderWidth: 0 } },
          plugins: { legend: { position: 'top' } },
          scales: {
            x: { ticks: { font: { size: isMobile ? 10 : 12 } } },
            y: { ticks: { font: { size: isMobile ? 10 : 12 } } }
          }
        }
      })
    },
    updateChart() {
      if (!this.chart) {       // ✅ fallback if chart was destroyed
        this.renderChart()
        return
      }
      this.chart.data.labels = this.date
      this.chart.data.datasets[0].data = this.positive
      this.chart.data.datasets[1].data = this.negative
      this.chart.update()
    }
  }
}
</script>
