let ArrayTiendas = sessionStorage.getItem('Tiendas');
var TiendasSuper = ArrayTiendas.split(',');
Prueba();
function Prueba() {
    $.get("/Reportes/GraficaReporte", function (Grafica) {
        let Areas = Grafica.Areas;
        let ArrayAreas = Areas.split(',');
        let Tiendas = Grafica.Tiendas;
        let NoIncidencias = Grafica.NoIncidencias;
        let N_Inc_Sucursal = NoIncidencias.split('/');
    /****************************************************************************************/
        var options = {
            series: [
                { name: ArrayAreas[0], data: N_Inc_Sucursal[0].split(',') },
                { name: ArrayAreas[1], data: N_Inc_Sucursal[1].split(',') },
                { name: ArrayAreas[2], data: N_Inc_Sucursal[2].split(',') },
                { name: ArrayAreas[3], data: N_Inc_Sucursal[3].split(',') },
                { name: ArrayAreas[4], data: N_Inc_Sucursal[4].split(',') },
                { name: ArrayAreas[5], data: N_Inc_Sucursal[5].split(',') },
                { name: ArrayAreas[6], data: N_Inc_Sucursal[6].split(',') },
                { name: ArrayAreas[7], data: N_Inc_Sucursal[7].split(',') },
                { name: ArrayAreas[8], data: N_Inc_Sucursal[8].split(',') }
            ],
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                },
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            title: {
                text: 'Reporte de incidencias por supervisión'
            },
            xaxis: {
                categories: Tiendas.split(','),  
                labels: {
                    formatter: function (val) {
                        return val
                    }
                }
            },
            yaxis: {
                title: {
                    text: undefined
                },
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val
                    }
                }
            },
            fill: {
                opacity: 1
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetX: 40
            }
        };
        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    });
}