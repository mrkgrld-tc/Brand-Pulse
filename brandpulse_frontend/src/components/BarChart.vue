<template>
    <v-chart :option="chartOption" autoresize/>
</template>

<script>
    export default {
        data(){
            return {
                chartOption : {
                    title :{
                        text : 'Top Keywords'
                    },
                    xAxis: {
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {},
                    series: [
                        {
                        type: 'bar',
                        data: [23, 24, 18, 25, 27, 28, 25]
                        }
                    ]
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>