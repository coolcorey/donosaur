<style scoped>

canvas {
    width: 100% !important;
    //max-width: 800px;
    height: 100% !important;
}

</style>

<template>

<div>
    <div class="widget-header">
        <h6>Income</h6>
    </div>
    <div class="widget-content">
        <canvas id="incomeChart"></canvas>
    </div>
</div>

</template>

<script>

var Chart = require('chart.js');
export default {
    props: ['data'],
    data: function() {
        return {
            dataL: this.data,
            done: false,
        }
    },
    watch: {
        'dataL': {
            handler: function(val, oldVal) {

                if (!this.dataL.tax2015 || !this.dataL.tax2014 || !this.dataL.tax2013 || !this.dataL.tax2012) {
                    return;
                }
                if (this.done) {
                    return;
                }

                this.done = true;

                var datasetIter = 0;
                var datasets = [];
                var datasetObj = {
                    'netincfndrsng': {
                        data: [],
                        label: 'Fundraising'
                    },
                    'netincsales': {
                        data: [],
                        label: 'Sales'
                    },
                    'grsincgaming': {
                        data: [],
                        label: 'Gaming'
                    },
                    'grsinc170': {
                        data: [],
                        label: 'Interest'
                    }
                }


                for (var type in datasetObj) {

                    if (this.dataL.tax2015 && this.dataL.tax2015[0]) {
                        datasetObj[type].data.push(this.dataL.tax2015[0][type] ? this.dataL.tax2015[0][type] : 0);
                    } else {
                        datasetObj[type].data.push(0);
                    }

                    if (this.dataL.tax2014 && this.dataL.tax2014[0]) {
                        datasetObj[type].data.push(this.dataL.tax2014[0][type] ? this.dataL.tax2014[0][type] : 0);
                    } else {
                        datasetObj[type].data.push(0);
                    }

                    if (this.dataL.tax2013 && this.dataL.tax2013[0]) {
                        datasetObj[type].data.push(this.dataL.tax2013[0][type] ? this.dataL.tax2013[0][type] : 0);
                    } else {
                        datasetObj[type].data.push(0);
                    }
                    if (this.dataL.tax2012 && this.dataL.tax2012[0]) {
                        datasetObj[type].data.push(this.dataL.tax2012[0][type] ? this.dataL.tax2012[0][type] : 0);
                    } else {
                        datasetObj[type].data.push(0);
                    }
                    datasets.push({
                        label: datasetObj[type].label,
                        data: datasetObj[type].data,
                        backgroundColor: donosaurColors[datasetIter]
                    })
                    datasetIter++;
                }


                var ctx = document.getElementById("incomeChart");
                Chart.defaults.global.maintainAspectRatio = false;

                var formatMoney = window.formatMoney;

                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ["2012", "2013", "2014", "2015"],
                        datasets: datasets,
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    callback: function(label, index, labels) {
                                        return formatMoney(label);
                                    }
                                },
                            }],
                            xAxes: [{
                                stacked: true
                            }]
                        },
                        tooltips: {
                            enabled: true,
                            mode: 'single',
                            callbacks: {
                                label: function(tooltipItems, data) {
                                    var val = formatMoney(tooltipItems.yLabel);
                                    var prefix = data.datasets[tooltipItems.datasetIndex].label;
                                    return prefix + ' ' + val;
                                }
                            }
                        },
                    }
                });
            },
            deep: true
        }
    },

    ready: function() {

    }
}

</script>
