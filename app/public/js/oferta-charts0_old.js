(function($) {
    'use strict';
    $(function() {
        if ($("#earning-report").length) {
            var earningReportData = {
                datasets: [{
                    data: [600, 200, 150, 200],
                    backgroundColor: [
                        '#439aff',
                        '#fdbab1',
                        '#f3f6f9',
                        'grey'
                    ],
                    borderWidth: 0
                }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'Vendas',
                    'Prestação de Serviços',
                    'Juros e Royalties',
                    'Outros Rendimentos'
                ]
            };
            var earningReportOptions = {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                legend: {
                    display: false
                },
                /*
                legendCallback: function(chart) {
                    var text = [];
                    text.push('<ul class="legend' + chart.id + '">');
                    for (var i = 0; i < chart.data.datasets[0].data.length; i++) {
                        text.push('<li><span class="legend-label" style="background-color:' + chart.data.datasets[0].backgroundColor[i] + '"></span>');
                        if (chart.data.labels[i]) {
                            text.push(chart.data.labels[i]);
                        }
                        text.push('<span class="legend-percentage ml-auto">' + chart.data.datasets[0].data[i] + '%</span>');
                        text.push('</li>');
                    }
                    text.push('</ul>');
                    return text.join("");
                },
                */
                cutoutPercentage: 70
            };
            var earningReportCanvas = $("#earning-report").get(0).getContext("2d");
            var earningReportChart = new Chart(earningReportCanvas, {
                type: 'doughnut',
                data: earningReportData,
                options: earningReportOptions
            });
            document.getElementById('earning-report-legend').innerHTML = earningReportChart.generateLegend();
        }
    });
})(jQuery);