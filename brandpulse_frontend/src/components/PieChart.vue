<template>
    <v-chart :option="chartOptions" autoresize/>
</template>
<script>
export default {
    props :{
        positive : {
            type : Number,
            default : 20
        },
        negative : {
            type : Number,
            default : 20
        },
        neutral : {
            type : Number,
            default : 20
        },
    },
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
                            { value: this.negative, name: 'Negative' },
                            { value: this.positive, name: 'Positive' },
                            { value: this.neutral, name: 'Neutral' },
                        ]
                    }
                ]
            }
        }
    },
}
</script>