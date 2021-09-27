CrearAcordeonAreas();
llenarBadges();
//Áreas
function CrearAcordeonAreas() {
    $.get("/Cardinal/BDAreas", function (DatosAreas) {
        var CodigoHTMLAreas = "";
        for (var i = 0; i < DatosAreas.length; i++) {
            if (i < 1) {
                CodigoHTMLAreas += "<div class='card m-b-0'>";
            }
            else {
                CodigoHTMLAreas += "<div class='card m-b-0 border-top'>";
            }
            CodigoHTMLAreas += "<div class='card-header' id='heading" + DatosAreas[i].ID + "'>";
            CodigoHTMLAreas += "<h5 class='mb-0'>";
            CodigoHTMLAreas += "<a data-toggle='collapse' data-target='#collapse" + DatosAreas[i].ID + "' aria-expanded='false' aria-controls='collapse" + DatosAreas[i].ID + "' class='collapsed'>";
            CodigoHTMLAreas += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
            CodigoHTMLAreas += "<span >" + DatosAreas[i].Nombre + "</span><span id='Badge" + DatosAreas[i].ID + "' class='badge badge-danger'></span>";
            CodigoHTMLAreas += "</a>";
            CodigoHTMLAreas += "</h5>";
            CodigoHTMLAreas += "<div id='collapse" + DatosAreas[i].ID + "' class='collapse' aria-labelledby='headingOne' data-parent='#AcordeonArea' style=''>";
            CodigoHTMLAreas += "<div class='card-body'>";
            CodigoHTMLAreas += "<div class='row'>";
            CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Jefe de área: </strong>" + DatosAreas[i].UNombre + "</div>";
            CodigoHTMLAreas += "</div>";
            CodigoHTMLAreas += "<div class='row'>";
            CodigoHTMLAreas += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Correo: </strong>" + DatosAreas[i].Correo + "</div>";
            CodigoHTMLAreas += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + DatosAreas[i].Telefono + "</div>";
            CodigoHTMLAreas += "</div>";
            CodigoHTMLAreas += "<div class='row'><div class='col-md-6 col-sm-6 col-xs-6'><br> </div></div>";
            CodigoHTMLAreas += "<div class='row'>";
            CodigoHTMLAreas += "<div id='TablaIncidencias" + DatosAreas[i].ID + "'class='col-md-12 col-sm-12 col-xs-12'>Espacio para las Incidencias por área</div>";
            CodigoHTMLAreas += "</div>";
            CodigoHTMLAreas += "</div>";
            CodigoHTMLAreas += "</div>";
            CodigoHTMLAreas += "</div>";
            CodigoHTMLAreas += "</div>";
        }
        document.getElementById("AcordeonArea").innerHTML = CodigoHTMLAreas;
    });

}
function llenarBadges() {
    var Sitio = "";
    $.get("/Usuarios/UsuarioINF", function (Usuario) {
        Sitio = Usuario[0].Sitio;
        $.get("/Cardinal/BDAreas", function (DatosAreas) {
            for (var i = 0; i < DatosAreas.length; i++) {
                var IDArea = DatosAreas[i].ID;
                //$.get("/Incidencias/ReportesXTiendaArea/?IDArea=" + IDArea + "&IDTienda=" + Sitio, function (IncidenciasRpt) {                    
                $.get("/Incidencias/ReportesXArea/?IDArea=" + IDArea + "&IDTienda=" + Sitio, function (IncidenciasRpt) {
                    if (IncidenciasRpt.length > 0) {
                        var Item = "Badge" + IncidenciasRpt[0].IDArea;
                        document.getElementById(Item).innerHTML = IncidenciasRpt.length;
                        var Tabla = "";
                        Tabla += "<table id='Incidencias" + IncidenciasRpt[0].IDArea + "'  class='table table table-sm' >";
                        Tabla += "<thead>";
                        Tabla += "<tr>";
                        Tabla += "<td>No. Reporte</td><td>Inc. Tienda</td><td>Incidencia</td><td>Fecha</td><td>Descripción</td><td>Estatus</td>";
                        Tabla += "</tr>";
                        Tabla += "</thead>";
                        Tabla += "<tbody>";
                        for (let Inci = 0; Inci < IncidenciasRpt.length; Inci++) {
                            Tabla += "<tr>";
                            Tabla += "<td>" + IncidenciasRpt[Inci].ID + "</td>";
                            Tabla += "<td>" + IncidenciasRpt[Inci].NOIncidencia + "</td>";
                            Tabla += "<td>" + IncidenciasRpt[Inci].Nombre + "</td>";
                            Tabla += "<td>" + IncidenciasRpt[Inci].Fecha + "</td>";
                            Tabla += "<td>" + IncidenciasRpt[Inci].Descripcion + "</td>";
                            Tabla += "<td>";
                            Tabla += "<div class='switch-button'>";
                            Tabla += "<input type='checkbox' name='switch-button' id='switch-label" + IncidenciasRpt[Inci].ID + "' class='switch-button__checkbox' onChange='FinalizarIncidencia(" + IncidenciasRpt[Inci].ID + ")'>";
                            Tabla += "<label for='switch-label" + IncidenciasRpt[Inci].ID + "' class='switch-button__label'></label>";
                            Tabla += "</div>";
                            Tabla += "</td>";
                            Tabla += "</tr>";
                        }
                        Tabla += "</tbody>";
                        Tabla += "</table>";
                        var NombreTabla = "TablaIncidencias" + IncidenciasRpt[0].IDArea;
                        document.getElementById(NombreTabla).innerHTML = Tabla;
                    }
                });
            }
        });
    });
}
function FinalizarIncidencia(ID) {    
    $.get("/Incidencias/FinalizarReporte/?ID=" + ID, function (Reporte) {
        if (Reporte == 1) {
            alert("Se elimino correctamente");
            CrearAcordeonAreas();
            llenarBadges();
        } else {
            alert("Ocurrio un error");
        }
    });
}