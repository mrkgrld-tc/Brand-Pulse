<template>
    <v-chart class="gauge-chart" :option="chartOption" autoresize/>
</template>

<script>
    export default {
        props: {
            value: {
                type: Number,
                default: 75,
                validator: (value) => value >= 0 && value <= 100
            },
            title: {
                type: String,
                default: 'Customer Satisfaction'
            },
            subtitle: {
                type: String,
                default: ''
            },
            showGrades: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return {    
                
            }
        },
        computed : {
            chartOption (){
                return {
                    series: [
                        {
                        type: 'gauge',
                        startAngle: 180,
                        endAngle: 0,
                        center: ['50%', '75%'],
                        radius: '90%',
                        min: 1,
                        max: 100,
                        splitNumber: 8,
                        axisLine: {
                            lineStyle: {
                            width: 6,
                                color: [
                                    [0.25, '#FF6E76'],
                                    [0.5, '#FDDD60'],
                                    [0.75, '#58D9F9'],
                                    [1, '#7CFFB2']
                                ]
                            }
                        },
                        pointer: {
                            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                            length: '12%',
                            width: 15,
                            offsetCenter: [0, '-30%'],
                            itemStyle: {
                            color: 'auto'
                            }
                        },
                        // axisTick: {
                        //     length: 12,
                        //     lineStyle: {
                        //     color: 'auto',
                        //     width: 2
                        //     }
                        // },
                        splitLine: {
                            length: 10,
                            lineStyle: {
                            color: 'auto',
                                width: 1
                            }
                        },
                        title: {
                            offsetCenter: [0, '-130%'],  // Move to top
                            fontSize: 20,
                            fontWeight : 'bold'
                            // fontWeight: 'bold',
                            // color: '#DBDEE1'
                        },
                        detail: {
                            fontSize: 30,
                            offsetCenter: [0, '10%'],
                            valueAnimation: true,
                            formatter: function (value) {
                                return Math.round(value) + '%';
                            },
                            color: 'inherit'
                        },
                        data: [
                            {
                                value: this.value,
                                name: this.title
                            }
                        ]
                        }
                    ]
                }
            }
        }
    }
</script>
<style scoped>
.gauge-chart {
    width: 100%;
    height: 100%;
    min-height: 300px;
}
</style>