var base64;
const f = new Date();
Cargar();
function Cargar() {
    $.get("/Incidencias/BDIncidencias_Area", function (IncidenciasArea) {
        CrearIncidencias(IncidenciasArea, document.getElementById("ReportesArea"));
        llenarBag(IncidenciasArea);
    });
    base64 = getBase64Image(document.getElementById("imageid"));
}

//Crea la información basica de las insidencias
function CrearIncidencias(IncidenciasArea, IDo) {
    var CodHtml = "";
    for (var i = 0; i < IncidenciasArea.length; i++) {
        if (i < 1) {
            CodHtml += "<div class='card m-b-0'>";
        }
        else {
            CodHtml += "<div class='card m-b-0 border-top'>";
        }
        CodHtml += "<div class='card-header' id='heading" + IncidenciasArea[i].ID + "'>";
        CodHtml += "<h5 class='mb-0'>";
        CodHtml += "<a onclick='MostrarReportes(" + IncidenciasArea[i].ID + ");' data-toggle='collapse' data-target='#collapse" + IncidenciasArea[i].ID + "' aria-expanded='false' aria-controls='collapse" + IncidenciasArea[i].ID + "' class='collapsed'>";
        CodHtml += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodHtml += "<span >" + IncidenciasArea[i].Nombre + "</span>";
        CodHtml += "<span id='BAGIncidencia" + IncidenciasArea[i].ID + "' class='badge badge-danger'></span>";
        CodHtml += "</a>";
        CodHtml += "</h5>";
        CodHtml += "<div id='collapse" + IncidenciasArea[i].ID + "' class='collapse' aria-labelledby='headingOne' data-parent='#accordion' style=''>";
        CodHtml += "<div class='card-body'>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Área: </strong>" + IncidenciasArea[i].Area + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Subárea: </strong>" + IncidenciasArea[i].SubArea + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + IncidenciasArea[i].Telefono + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'></div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Descripcion: </strong>" + IncidenciasArea[i].Descripcion + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-9 col-sm-9 col-xs-9'><strong>Reportes de esta incidencia: </strong></div >";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-12 col-sm-12 col-xs-12' id='Reportes" + IncidenciasArea[i].ID + "'>Espacio para los reportes de las incidencias.</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
    }
    IDo.innerHTML = CodHtml;
}
function llenarBag(IncidenciasArea) {

    for (var i = 0; i < IncidenciasArea.length; i++) {
        let IDIncidencia;
        IDIncidencia = IncidenciasArea[i].ID;
        $.get("/Cardinal/NoReportesIncidencia/?IDIncidencia=" + IncidenciasArea[i].ID, function (NReportes) {
            let Bag = "BAGIncidencia" + IDIncidencia;
            if (NReportes.length > 0) {
                document.getElementById(Bag).innerHTML = NReportes.length;
            }
        });
    }
}
function MostrarReportes(IDIncidencia) {
    $.get("/Incidencias/ReportesPArea/?IDIncidencia=" + IDIncidencia, function (Reportes) {
        if (Reportes.length > 0) {

            var Tabla = "";
            Tabla += "<table id='TlbReportes" + IDIncidencia + "'  class='table table table-sm' >";
            Tabla += "<thead>";
            Tabla += "<tr>";
            Tabla += "<td>No. Reporte</td><td>Sucursal</td><td>No. Incidencia</td><td>Fecha</td><td>Descripción</td><td>Estatus</td>";
            Tabla += "</tr>";
            Tabla += "</thead>";
            Tabla += "<tbody>";
            for (let Inci = 0; Inci < Reportes.length; Inci++) {
                Tabla += "<tr>";
                Tabla += "<td>" + Reportes[Inci].ID + "</td>";
                Tabla += "<td>" + Reportes[Inci].IDTienda + "</td>";
                Tabla += "<td>" + Reportes[Inci].NoInsidencia + "</td>";
                Tabla += "<td>" + Reportes[Inci].ReporteFecha + "</td>";
                Tabla += "<td>" + Reportes[Inci].ReporteObservaciones + "</td>";
                Tabla += "<td>";
                Tabla += "<div class='switch-button'>";
                Tabla += "<input type='checkbox' name='switch-button' id='switch-label" + Reportes[Inci].ID + "' class='switch-button__checkbox' onChange='FinalizarIncidencia(" + Reportes[Inci].ID + "," + Reportes[0].IDArea + ")'>";
                Tabla += "<label for='switch-label" + Reportes[Inci].ID + "' class='switch-button__label'></label>";
                Tabla += "</div>";
                Tabla += "</td>";
                Tabla += "</tr>";
            }
            Tabla += "</tbody>";
            Tabla += "</table>";
            document.getElementById("Reportes" + IDIncidencia).innerHTML = Tabla;
        }
    });
}
function FinalizarIncidencia(IDReporte, IDArea) {
    Limpiar();
    $.get("/Incidencias/BDIncidenciasArea/?IDA=" + IDArea, function (DatosIncidenciaArea) {
        llenarCombo(DatosIncidenciaArea, document.getElementById("cmbIDInsidencia"));
    });
    var FEcha = (f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear());
    document.getElementById("TxtFecha").value = FEcha;
    $.get("/Incidencias/SeguimientoReporte/?IDRIncidencia=" + IDReporte, function (DatosSeguimiento) {
        //document.getElementById("cmbIDUsuario").value = sessionStorage.getItem('IDUsuario');
        document.getElementById("TxtIDRInsidencia").value = DatosSeguimiento[0].ID;
        document.getElementById("cmbIDInsidencia").value = DatosSeguimiento[0].IDIncidencia;
        document.getElementById("TxtNoInsidencia").value = DatosSeguimiento[0].NoInsidencia;
        document.getElementById("cmbIDTienda").value = DatosSeguimiento[0].IDTienda;
        document.getElementById("PBFotoReporte").src = "data:image/png;base64," + DatosSeguimiento[0].ReporteFoto;
        document.getElementById("aPBFotoReporte").href = "data:image/png;base64," + DatosSeguimiento[0].ReporteFoto;
        Usuarios_X_Tienda(DatosSeguimiento[0].IDTienda);
        document.getElementById("TxtNombreUsuario").value = DatosSeguimiento[0].ReporteUNombre;
    });
    $('#ModalFinIncidencia').modal();
}

function FinalizarReporte() {
    var IDReporte = document.getElementById("TxtIDRInsidencia").value;
    let Area;
    $.get("/Incidencias/SeguimientoReporte/?IDRIncidencia=" + IDReporte, function (DatosSeguimiento) {
        Area = DatosSeguimiento[0].ID;
    });
    if (confirm("¿Desea Finalizar la incidencia?") == 1) {
        if (Obligatorios("obligatorio") == true) {
            if (confirm("¿Desea aplicar los cambios?") == 1) {
                var HTMLAdvertencia = "";

                let IDRIncidencia = document.getElementById("TxtIDRInsidencia").value;
                let SolucionIDUsuario = document.getElementById("cmbIDUsuario").value;
                let temUser = document.getElementById("cmbIDUsuario");
                let SolucionUNombre = temUser.options[temUser.selectedIndex].text;
                let SolucionFecha = document.getElementById("TxtFecha").value;
                let SolucionDescripcion = document.getElementById("TxtObservaciones").value;
                let SolucionFoto = document.getElementById("PBFotoSolucion").src.replace("data:image/png;base64,", "");
                if (SolucionFoto.endsWith('ReportesTienda')) {
                    SolucionFoto = base64.replace("data:image/png;base64,", "");
                }
                var frm = new FormData();
                frm.append("IDRIncidencia", IDRIncidencia);
                frm.append("SolucionIDUsuario", SolucionIDUsuario);
                frm.append("SolucionUNombre", SolucionUNombre);
                frm.append("SolucionFecha", SolucionFecha);
                frm.append("SolucionDescripcion", SolucionDescripcion);
                frm.append("cadF", SolucionFoto);
                $.ajax({
                    type: "POST",
                    url: "/Incidencias/FinalizarReporte",
                    data: frm,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (data == 0) {
                            HTMLAdvertencia += "<div class='alert alert-danger alert-dismissible fade show' role='alert'>";
                            HTMLAdvertencia += "<strong>Ocurrio un error!</strong>";
                            HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                            HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                            HTMLAdvertencia += "</button>";
                            HTMLAdvertencia += "</div>";
                            document.getElementById("Alertas").innerHTML = HTMLAdvertencia;
                        }
                        else if (data == -1) {
                            HTMLAdvertencia += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>";
                            HTMLAdvertencia += "<strong>Ya se reportó de esa incidencia!</strong>";
                            HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                            HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                            HTMLAdvertencia += "</button>";
                            HTMLAdvertencia += "</div>";
                            document.getElementById("Alertas").innerHTML = HTMLAdvertencia;
                        }
                        else {
                            HTMLAdvertencia += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
                            HTMLAdvertencia += "<strong>Se finalizo la incidencia correctamente.</strong>";
                            HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                            HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                            HTMLAdvertencia += "</button>";
                            HTMLAdvertencia += "</div>";
                            document.getElementById("Alertas").innerHTML = HTMLAdvertencia;
                            document.getElementById("btnCancelar").click();
                        }
                    }
                });
            }
        }
    }
    else {
        var Check = "switch-label" + Area
        document.getElementById(Check).checked = false;
    }
    //CrearAcordeonAreas();
    Cargar();
}

function Obligatorios(NoClase) {
    let exito = true;
    let CtrlObligatorio = document.getElementsByClassName(NoClase);
    for (let i = 0; i < CtrlObligatorio.length; i++) {
        if (CtrlObligatorio[i].value == "") {
            exito = false;
            CtrlObligatorio[i].classList.add("border-danger");
        }
        else {
            CtrlObligatorio[i].classList.remove("border-danger");
        }
    }
    return exito;
}

function Usuarios_X_Tienda(IDTienda) {
    $.get("/Usuarios/UsuariosXTienda/?IDTienda=" + IDTienda, function (PersonalTienda) {
        if (PersonalTienda.lenght != 0) {
            llenarComboPersonal(PersonalTienda, document.getElementById("cmbIDUsuario"), sessionStorage.getItem('IDUsuario'), sessionStorage.getItem('Nombre'));
            document.getElementById("cmbIDUsuario").value = sessionStorage.getItem('IDUsuario');
        }
    });
}
//combo personal por tienda
function llenarComboPersonal(Datos, control, IDExtra, NombreExtra) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
    for (var i = 0; i < Datos.length; i++) {
        contenido += "<option value='" + Datos[i].ID + "'>" + Datos[i].Nombre + "</option>";
    }
    if (IDExtra != "") {
        contenido += "<option value='" + IDExtra + "'>" + NombreExtra + "</option>";
    }
    control.innerHTML = contenido;
}

function Limpiar() {
    var ControlesTXT = document.getElementsByClassName("limpiar");
    for (var i = 0; i < ControlesTXT.length; i++) {
        ControlesTXT[i].value = "";
    }
    var ControlesSLT = document.getElementsByClassName("SelectCLS");
    for (var i = 0; i < ControlesSLT.length; i++) {
        document.getElementById(ControlesSLT[i].id).value = 0;
    }
}

//funcion general para llenar los select
function llenarCombo(DAtos, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
    for (var i = 0; i < DAtos.length; i++) {
        contenido += "<option value='" + DAtos[i].ID + "'>" + DAtos[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}
//Convierte a base 64 la imagen
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}