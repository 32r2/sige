﻿Cargar();
function Cargar() {
    $.get("/Cardinal/BDAreas", function (datos) {
        CrearBtnAreas(["bg-cyan", "bg-success", "bg-warning", "bg-danger", "bg-info"], datos);
    });
}
//Crea los botones de las áreas
function CrearBtnAreas(BtnAreas, DatosAreas) {
    var NC = 0;
    var CodHtml = "";
    var Nareas = DatosAreas.length;
    for (var j = 1; j < Nareas; j++) {
        if (NC > 4) {
            NC = 0;
        }
        CodHtml += "<div class='col-md-6 col-lg-2 col-xlg-3' onclick='BuscarIn(" + DatosAreas[j].ID + ")'>";
        CodHtml += "<div class='card card-hover'>";
        CodHtml += "<div class='box " + BtnAreas[NC] + " text-center'>";
        CodHtml += "<h1 class='font-light text-white'>";
        //CodHtml += "<i class='"++"'></i>";
        CodHtml += "</h1>";
        CodHtml += "<h6  style='color:white; font-size:18px; font-weight: bold;'>" + DatosAreas[j].Nombre + "</h6>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        NC++;
    }
    document.getElementById("BotonesAyuda").innerHTML = CodHtml;
}
//Busca las insidencias por área
function BuscarIn(IDA) {
    $.get("/Incidencias/BDInsidenciasJoinArea/?IDA=" + IDA, function (datos) {
        CrearIncidencias(datos, document.getElementById("accordion"));
    });
}
// Funcion Buscar con Entrar
function ValidarEntrar(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13) {
        var conepto = document.getElementById("TxtBuscar").value;
        $.get("/Incidencias/BDInsidenciasContienen/?Contener=" + conepto, function (datos) {
            if (datos.length !== 0) {
                CrearIncidencias(datos, document.getElementById("accordion"));
            } else {
                document.getElementById("accordion").innerHTML = "Su búsqueda no tiene posibles resultados."
            }
        });
        //document.getElementById("TxtBuscar").value = "";
       
    }
}

// Funcion Buscar
function Buscar() {
    var conepto = document.getElementById("TxtBuscar").value;
    $.get("/Incidencias/BDInsidenciasContienen/?Contener=" + conepto, function (datos) {
        if (datos.length !== 0) {
            CrearIncidencias(datos, document.getElementById("accordion"));
        } else {
            document.getElementById("accordion").innerHTML ="Su búsqueda no tiene posibles resultados."
        }        
    });
    document.getElementById("TxtBuscar").value = "";
}
function CrearIncidencias(data, IDo) {
    var CodHtml = "";
    for (var i = 0; i < data.length; i++) {
        if (i < 1) {
            CodHtml += "<div class='card m-b-0'>";
        }
        else {
            CodHtml += "<div class='card m-b-0 border-top'>";
        }
        CodHtml += "<div class='card-header' id='heading" + data[i].ID + "'>";
        CodHtml += "<h5 class='mb-0'>";
        CodHtml += "<a onclick='MostrarProcedimientos(" + data[i].ID + ");' data-toggle='collapse' data-target='#collapse" + data[i].ID + "' aria-expanded='false' aria-controls='collapse" + data[i].ID + "' class='collapsed'>";
        CodHtml += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodHtml += "<span >" + data[i].Nombre + "</span>";
        CodHtml += "</a>";
        CodHtml += "</h5>";
        CodHtml += "<div id='collapse" + data[i].ID + "' class='collapse' aria-labelledby='headingOne' data-parent='#accordion' style=''>";
        CodHtml += "<div class='card-body'>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Área: </strong>" + data[i].Area + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Subárea: </strong>" + data[i].SubArea + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'></div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + data[i].Telefono + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Descripcion: </strong>" + data[i].Descripcion + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-9 col-sm-9 col-xs-9'><strong>Posibles soluciones: </strong></div >";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-12 col-sm-12 col-xs-12' id='Soluciones" + data[i].ID + "'>Espacio para las soluciones de las incidencias.</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
    }
    IDo.innerHTML = CodHtml;
}
//inserta los paso a seguir para solucionar la insidencia
function MostrarProcedimientos(IDIncidencia) {
    $.get("/Incidencias/BDInsidencia/?ID=" + IDIncidencia, function (Insidencias) {
        var CodeHTML = "";
        if (Insidencias.length !== 0) {
            var Soluciones = Insidencias[0].NoSoluciones;
            for (var i = 1; i < Soluciones + 1; i++) {
                CodeHTML += "<h5> Procedimiento No." + i + " para la solución de la insidencia</h5>";
                CodeHTML += "<div class='row col-md-12 col-sm-12 col-xs-12' id='P" + IDIncidencia + "nP" + i + "'></div>";
                $.get("/Incidencias/BDMesaayuda/?IDI=" + IDIncidencia + "&NoS= " + i, function (Pasos) {
                    var CodigoHTML = "";
                    CodigoHTML += "<p>";
                    if (Pasos.length !== 0) {
                        for (var x = 0; x < Pasos.length; x++) {
                            var temp = Pasos[x].Descripcion;
                            var sux = temp.replace(/< /g, "<").replace(/ >/g, ">");
                            var vr1 = "<p>";
                            var vr2 = "</p>";
                            var vr3 = "<br>";
                            CodigoHTML += sux.replace(new RegExp(vr1, "g"), "").replace(new RegExp(vr2, "g"), "").replace(new RegExp(vr3, "g"), "") + "<br/>";
                            var TempImg = Pasos[x].Imagen;
                            if (TempImg != 0) {
                                CodigoHTML += "<img width='470' height='250' src='/assets/Resources/" + TempImg + "'><br>";
                            }
                            IDObjto = "P" + IDIncidencia + "nP" + Pasos[x].NoSolucion;
                        }
                        CodigoHTML += "</p>";
                        document.getElementById(IDObjto).innerHTML = CodigoHTML;
                    }
                });
            }
            if (Insidencias[0].Reporte == 2) {
                CodeHTML += "<button onclick='' type='button' class='btn btn-danger' data-toggle='modal' data-target='#ModalReporteIn'>Iniciar reporte</button>";
            }
        }
        else {
            CodeHTML += "<p>Aun no se ha ingresado el procedimiento para esta incidencia.</p>";
        }
        document.getElementById("Soluciones" + IDIncidencia).innerHTML = CodeHTML;
    });
}