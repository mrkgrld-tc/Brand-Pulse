<template>
  <div class="chart">
    <v-chart :option="chartOptions" />
  </div>
</template>

<script>
export default {
  name: 'SwotRadarChart',
  data() {
    return {
      chartOptions: {
        title: { text: 'SWOT Radar Chart' },
        tooltip: {},
        radar: {
          // Define axes for SWOT factors
          indicator: [
            { name: 'Strengths', max: 10 },
            { name: 'Weaknesses', max: 10 },
            { name: 'Opportunities', max: 10 },
            { name: 'Threats', max: 10 }
          ]
        },
        series: [
          {
            name: 'SWOT Analysis',
            type: 'radar',
            data: [
              {
                value: [8, 4, 7, 6], // scores for each category
                name: 'Company A'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    updateSwot(strength, weakness, opportunity, threat) {
      this.chartOptions.series[0].data[0].value = [
        strength,
        weakness,
        opportunity,
        threat
      ]
    }
  }
}
</script>

<style>
.chart {
  width: 300px;
  height: 160px;
}
</style>
