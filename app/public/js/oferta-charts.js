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
                title: {
                    display: true,
                    text: 'Receitas'
                }, 
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


new Chart(document.getElementById("totalBar-chart"), {
    type: 'bar',
    data: {
        labels: ["Receitas", "Despesas", "Total"],
        datasets: [{
            label: "",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
            data: [5278, 2500, 1250]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        legend: { display: false },
        title: {
            display: true,
            text: 'Performance da Empresa'
        }
    }
});



 
new Chart(document.getElementById("activoBar-chart"), {
    type: 'bar',
    data: {
        labels: [
            "Inventário", "Adiantamento a Fornecedores", "Outros",
            "Caixa", "Depósitos Bancários", "Total"
        ],
        datasets: [{
            label: "",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "blue", "yellow", "red"],
            data: [1160, 200, 150, 200, 2000, 4300]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        legend: { display: false },
        title: {
            display: true,
            text: 'Activo'
        }
    }
});
 
new Chart(document.getElementById("proprioBar-chart"), {
    type: 'bar',
    data: {
        labels: [
            "Capital Realizado", "Reservas Legais", "Outras Reservas",
            "Restultados Transitados", "Total"
        ],
        datasets: [{
            label: "",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "blue",
                "red"
            ],
            data: [6378, 2500, 1250, 1080, 8430]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        legend: { display: false },
        title: {
            display: true,
            text: 'Capital Próprio'
        }
    }
});


new Chart(document.getElementById("passivoBar-chart"), {
    type: 'horizontalBar',
    data: {
        labels: [
            "Crédito Bancário", "Imposto e Segurança Social", "Outros Passivos",
            "Suprimentos", "Fornecedores", "Trabalhadores", "Administração",
            "Subtotal Médio e Longo Prazo", "Subtotal Curto Prazo", "Total"
        ],
        datasets: [{
            label: "",
            backgroundColor: [
                "#3e95cd", "#8e5ea2", "#3cba9f",
                "#3e95cd", "#8e5ea2", "#3cba9f", "#3e95cd",
                "#E57373", "#FF5252", "#D32F2F"
            ],
            data: [
                5278, 2500, 350,
                340, 680, 3890, 3500,
                6200, 4500, 11000
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        legend: { display: false },
        title: {
            display: true,
            text: 'Passivo'
        }
    }
});


 
new Chart(document.getElementById("despesasBar-chart"), {
    type: 'horizontalBar',
    data: {
        labels: [
            'Compras',
            'Contratação de Serviços',
            'Gastos com Trabalhadores',
            'Outros Gastos'
        ],
        datasets: [{
            label: "",
            backgroundColor: ['#27AAC8', "#3e95cd", "#8e5ea2", "#3cba9f"],
            data: [500, 666, 250, 50]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        legend: { display: false },
        title: {
            display: true,
            text: 'Despesas'
        }
    }
}); 