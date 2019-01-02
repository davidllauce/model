<template>	
	<div class='container'>
		<canvas ref="canvas" width="900" height="400"></canvas>
	</div>
</template>

<script>

    import VueCharts from 'vue-chartjs'
    import { Bar } from 'vue-chartjs'

    export default {
        name: 'chart-bar',
        extends: Bar,
        props:['propLabel','propLabels','propData'],
        mounted () {
            this.renderChart({
                labels: this.propLabels,
                datasets: [
                    {
                        label: this.propLabel,
                        backgroundColor: '#19B775',
                        data: this.propData
                    }
                ]
            })
        },
    }
</script>