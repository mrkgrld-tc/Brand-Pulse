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
                title: {
                    text: 'Business Performance'
                },
                legend: {
                    data: ['Business Performance']
                },
                color : [

                ],
                radar: {
                    // shape: 'circle',
                    indicator: [
                        { name: 'Customer Service', max: 100 },
                        { name: 'Product Quality', max: 100 },
                        { name: 'Value for Money', max: 100 },
                        { name: 'Speed/Efficiency', max: 100 },
                        { name: 'Cleanliness', max: 100 },
                        { name: 'Atmosphere', max: 100 }
                    ],
                     axisLine: {
                        lineStyle: {
                            color: '#7289DA'
                        }   
                    }
                },
                series: [
                    {
                    name: 'Business Performance',
                    type: 'radar',
                    itemStyle: {
                        color: '#F14A00'
                    },
                    areaStyle: {
                        opacity: 0.4
                    },
                    lineStyle: this.lineStyle,
                    data: [
                        {
                        value: [25, 34, 67, 86, 96, 50],
                        name: 'Business Performance'
                        }
                    ]
                    }
                ]
            }
        }
    },
}
</script>

<style>

</style>
