Prueba();
function Prueba() {
    var colors = [
        '#008FFB',
        '#00E396',
        '#FEB019',
        '#FF4560',
        '#775DD0',
        '#546E7A',
        '#26a69a',
        '#D10CE8'
    ]
    $.get("/Reportes/GraficaReporteAreas", function (Grafica) {
        let Incidencias = Grafica.Incidencias;
        let NoIncidencias = Grafica.NoIncidencias;
        /****************************************************************************************/
        var options = {
            series: [{
                data: NoIncidencias.split(',')
            }],
            chart: {
                height: 550,
                type: 'bar',
                events: {
                    click: function (chart, w, e) {
                    }
                }
            },
            colors: colors,
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                }
            },
            dataLabels: {
                enabled: true
            },
            legend: {
                show: true
            },
            xaxis: {
                categories: Incidencias.split(','),
                labels: {
                    style: {
                        colors: colors,
                        fontSize: '12px'
                    }
                }
            }
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    });
}

