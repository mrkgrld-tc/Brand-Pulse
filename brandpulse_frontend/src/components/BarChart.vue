<template>
    <v-chart class="bar-chart" :option="chartOption" autoresize/>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Top Keywords'
        },
        keywords: {
            type: Array,
            default: () => ['food', 'service', 'price', 'quality', 'ambiance', 'staff']
        },
        counts: {
            type: Array,
            default: () => [42, 35, 28, 22, 19, 15]
        },
        showValues: {
            type: Boolean,
            default: true
        },
        orientation: {
            type: String,
            default: 'vertical', // 'vertical' or 'horizontal'
            validator: (value) => ['vertical', 'horizontal'].includes(value)
        }
    },
    computed: {
        chartOption() {
            const isHorizontal = this.orientation === 'horizontal';
            
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
                        type: 'shadow'
                    },
                    formatter: (params) => {
                        const item = params[0];
                        return `<strong>${item.name}</strong><br/>Mentions: ${item.value}`;
                    }
                },
                grid: {
                    left: isHorizontal ? '15%' : '3%',
                    right: '4%',
                    top: 60,
                    bottom: 60,
                    containLabel: true
                },
                xAxis: isHorizontal ? {
                    type: 'value',
                    axisLabel: {
                        fontSize: 11,
                        color: '#666'
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#E5E5E5',
                            type: 'dashed'
                        }
                    }
                } : {
                    type: 'category',
                    data: this.keywords,
                    axisLabel: {
                        fontSize: 11,
                        color: '#666',
                        interval: 0,
                        rotate: this.keywords.length > 8 ? 45 : 0
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    }
                },
                yAxis: isHorizontal ? {
                    type: 'category',
                    data: this.keywords,
                    axisLabel: {
                        fontSize: 11,
                        color: '#666'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    }
                } : {
                    type: 'value',
                    name: 'Mentions',
                    nameTextStyle: {
                        fontSize: 12,
                        color: '#666'
                    },
                    axisLabel: {
                        fontSize: 11,
                        color: '#666'
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#E5E5E5',
                            type: 'dashed'
                        }
                    }
                },
                series: [
                    {
                        name: 'Keywords',
                        type: 'bar',
                        data: this.counts,
                        itemStyle: {
                            color: (params) => {
                                // Gradient colors based on value
                                const colors = [
                                    '#667eea',
                                    '#764ba2',
                                    '#f093fb',
                                    '#4facfe',
                                    '#00f2fe',
                                    '#43e97b',
                                    '#38f9d7'
                                ];
                                return colors[params.dataIndex % colors.length];
                            },
                            borderRadius: isHorizontal ? [0, 8, 8, 0] : [8, 8, 0, 0]
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.3)'
                            }
                        },
                        label: this.showValues ? {
                            show: true,
                            position: isHorizontal ? 'right' : 'top',
                            fontSize: 11,
                            fontWeight: 'bold',
                            color: '#333'
                        } : {
                            show: false
                        },
                        barWidth: '50%'
                    }
                ]
            }
        }
    }
}
</script>

<style scoped>
.bar-chart {
    width: 100%;
    height: 100%;
    min-height: 300px;
}
</style>