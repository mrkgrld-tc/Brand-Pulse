<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  name: 'LineChart',
  props: {
        date : {
            type : Array,
            default : [1, 2, 3, 4]
        },
        positive : {
            type : Array,
            default : [40, 43, 32, 45]
        },
        negative : {
            type : Array,
            default : [54, 23, 76, 34,]
        }
  },
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart() {
      new Chart(this.$refs.chartCanvas, {
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
                        barPercentage: 0.6,
                        categoryPercentage: 0.7
                    },
                    {
                        label: 'Negative',
                        data: this.negative,
                        borderColor: '#ED4245',
                        backgroundColor: 'rgba(237, 66, 69, 0.7)',
                        fill: true,
                        borderRadius: 2,
                        barPercentage: 0.6,
                        categoryPercentage: 0.7
                    }
                ]
            },
            options: {
                elements: {
                    bar: {
                        borderWidth: 3,
                    }
                },
                indexAxis: 'x',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                }
            }
        })
    }
  }
}
</script>
