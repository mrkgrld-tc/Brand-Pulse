<template>
    <v-chart class="line-chart" :option="chartOption" autoresize/>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Sentiment Over Time'
        },
        dates: {
            type: Array,
            default: () => ['Feb 1', 'Feb 5', 'Feb 10', 'Feb 15', 'Feb 20', 'Feb 25']
        },
        positiveData: {
            type: Array,
            default: () => [45, 52, 48, 60, 55, 68]
        },
        neutralData: {
            type: Array,
            default: () => [18, 20, 22, 19, 21, 22]
        },
        negativeData: {
            type: Array,
            default: () => [8, 12, 9, 11, 8, 10]
        },
        
        showDataZoom: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        colors() {
            return {
                positive: '#4CAF50',
                neutral: '#FF9800',
                negative: '#F44336'
            }
        },
        chartOption() {
            return {
                title: {
                    text: this.title,
                    left: 'center',
                    top: 10,
                    textStyle: {
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#333'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: ['Positive', 'Neutral', 'Negative'],
                    bottom: 10,
                    textStyle: {
                        fontSize: 12
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    top: 70,
                    bottom: 60,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.dates,
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    axisLabel: {
                        fontSize: 11,
                        color: '#666'
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'No of Reviews',
                    nameTextStyle: {
                        fontSize: 12,
                        color: '#666'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#E5E5E5',
                            type: 'dashed'
                        }
                    }
                },
                dataZoom: this.showDataZoom ? [
                    {
                        type: 'inside',
                        start: 0,
                        end: 100
                    },
                    {
                        type: 'slider',
                        start: 0,
                        end: 100,
                        height: 20,
                        bottom: 35
                    }
                ] : [],
                series: [
                    {
                        name: 'Positive',
                        type: 'line',
                        smooth: true,
                        symbolSize: 8,
                        emphasis: {
                            focus: 'series'
                        },
                        lineStyle: {
                            width: 3,
                            color: this.colors.positive
                        },
                        itemStyle: {
                            color: this.colors.positive,
                            borderWidth: 2,
                            borderColor: '#fff'
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: 'rgba(76, 175, 80, 0.3)' },
                                    { offset: 1, color: 'rgba(76, 175, 80, 0.05)' }
                                ]
                            }
                        },
                        data: this.positiveData
                    },
                    {
                        name: 'Neutral',
                        type: 'line',
                        smooth: true,
                        symbolSize: 8,
                        emphasis: {
                            focus: 'series'
                        },
                        lineStyle: {
                            width: 3,
                            color: this.colors.neutral
                        },
                        itemStyle: {
                            color: this.colors.neutral,
                            borderWidth: 2,
                            borderColor: '#fff'
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: 'rgba(255, 152, 0, 0.3)' },
                                    { offset: 1, color: 'rgba(255, 152, 0, 0.05)' }
                                ]
                            }
                        },
                        data: this.neutralData
                    },
                    {
                        name: 'Negative',
                        type: 'line',
                        smooth: true,
                        symbolSize: 8,
                        emphasis: {
                            focus: 'series'
                        },
                        lineStyle: {
                            width: 3,
                            color: this.colors.negative
                        },
                        itemStyle: {
                            color: this.colors.negative,
                            borderWidth: 2,
                            borderColor: '#fff'
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: 'rgba(244, 67, 54, 0.3)' },
                                    { offset: 1, color: 'rgba(244, 67, 54, 0.05)' }
                                ]
                            }
                        },
                        data: this.negativeData
                    }
                ]
            }
        }
    }
}
</script>

<style scoped>
.line-chart {
    width: 100%;
    height: 100%;
    min-height: 300px;
}
</style>