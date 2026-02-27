<template>
    <v-chart :option="chartOptions" autoresize/>
</template>
<script>
export default {
    data() {
        return {
            lineStyle : {
                width: 1,
                opacity: 0.5
            },
            chartOptions:  {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: 'bottom'
                },
                series: [
                    {
                        name: 'Feedback',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        roseType: 'area',
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 4
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        labelLine: {
                            show: false
                        },
                        color:[
                            '#C62828', '#2E7D32', '#1565C0'
                        ],
                        data: [
                            { value: 800, name: 'Negative' },
                            { value: 735, name: 'Positive' },
                            { value: 580, name: 'Neutral' },
                        ]
                    }
                ]
            }
        }
    },
}
</script>