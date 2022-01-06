var base64;
Cargar();
BloquearCTRL();
const f = new Date();
//*********************************************************************************************************************************************************************************************************
//Busca las insidencias por área
function BuscarIn(IDA) {
    $.get("/Incidencias/BDIncidenciasJoinArea/?IDA=" + IDA, function (datos) {
        CrearIncidencias(datos, document.getElementById("accordion"));
    });
}
// Funcion Buscar
function Buscar() {
    var conepto = document.getElementById("TxtBuscar").value;
    $.get("/Incidencias/BDIncidenciasContienen/?Contener=" + conepto, function (datos) {
        if (datos.length !== 0) {
            CrearIncidencias(datos, document.getElementById("accordion"));
        } else {
            document.getElementById("accordion").innerHTML = "Su búsqueda no tiene posibles resultados."
        }
    });
    document.getElementById("TxtBuscar").value = "";
}
//Crea la información basica de las insidencias
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
        CodHtml += "<div class='row' id='Soluciones" + data[i].ID + "'>Espacio para las soluciones de las incidencias.</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
    }
    IDo.innerHTML = CodHtml;
}
//Cambio de index en el Select
var IDA = document.getElementById("cmbArea");
IDA.addEventListener("change", function () {
    $.get("/Cardinal/BDSubAreas/?IDA=" + IDA.value, function (DatosArea) {
        llenarCombo(DatosArea, document.getElementById("cmbSubArea"));
    });
    $.get("/Incidencias/BDIncidenciasArea/?IDA=" + IDA.value, function (DatosIncidenciaArea) {
        llenarCombo(DatosIncidenciaArea, document.getElementById("cmbIDInsidencia"));
    });
});
//inserta los paso a seguir para solucionar la insidencia
function MostrarProcedimientos(IDIncidencia) {
    $.get("/Incidencias/BDIncidencia/?ID=" + IDIncidencia, function (Insidencias) {
        var CodeHTML = "";
        if (Insidencias.length !== 0) {
            var Soluciones = Insidencias[0].NoSoluciones;
            for (var i = 1; i < Soluciones + 1; i++) {
                CodeHTML += "<h5> Procedimiento No." + i + " para la solución de la insidencia</h5>";
                CodeHTML += "<div class='col-md-12 col-sm-12 col-xs-12' id='P" + IDIncidencia + "nP" + i + "'></div>";
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
                CodeHTML += "<button onclick='AModalIncidencia(" + IDIncidencia + ")' type='button' class='btn btn-danger' data-toggle='modal' data-target='#ModalReporteIn'>Iniciar reporte</button>";
            }
        }
        else {
            CodeHTML += "<p>Aun no se ha ingresado el procedimiento para esta incidencia.</p>";
        }
        document.getElementById("Soluciones" + IDIncidencia).innerHTML = CodeHTML;
    });
}


//*********************************************************************************************************************************************************************************************************
function Cargar() {
    base64 = getBase64Image(document.getElementById("imageid"));
}
//Funcion para bloquear los controles
function BloquearCTRL() {
    let CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}
//Funcion para desbloquear los controles
function DESBloquearCTRL() {
    let CTRL = document.getElementsByClassName("desbloquear");
    for (var i = 0; i < CTRL.length; i++) {
        var StatusItem = $("#" + CTRL[i].id).attr("disabled");
        if (StatusItem == "disabled") {
            $("#" + CTRL[i].id).removeAttr('disabled');
        }
    }
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
//funcion general para llenar los select
function llenarCombo(DAtos, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
    for (var i = 0; i < DAtos.length; i++) {
        contenido += "<option value='" + DAtos[i].ID + "'>" + DAtos[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}

function AModalIncidencia(IDIncidencia) {
    DESBloquearCTRL();
    LimpiarSelect();
    var FEcha = (f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear());
    document.getElementById("TxtFecha").value = FEcha;
    //**************************************************************************************//
    let Asignacion = sessionStorage.getItem('IDAsignacion');
    if (Asignacion == 1) {
        Usuarios_X_Tienda(sessionStorage.getItem('Tiendas'), "", "");
        document.getElementById("cmbIDTienda").value = sessionStorage.getItem('Tiendas');
        document.getElementById("cmbIDTienda").classList.add("bloquear");
        Incidencias_X_Tienda(sessionStorage.getItem('Tiendas'));
        BloquearCTRL();
    }

    //BloquearCTRL();

    if (IDIncidencia > 0) {
        $.get("/Incidencias/BDIncidencia/?ID=" + IDIncidencia, function (DatosIncidencia) {
            document.getElementById("cmbArea").value = DatosIncidencia[0].IDArea;
            $.get("/Cardinal/BDSubAreas/?IDA=" + IDA.value, function (DatosSArea) {
                llenarCombo(DatosSArea, document.getElementById("cmbSubArea"));
                document.getElementById("cmbSubArea").value = DatosIncidencia[0].IDSubArea;
            });
            $.get("/Incidencias/BDIncidenciasArea/?IDA=" + DatosIncidencia[0].IDArea, function (DatosInArea) {
                llenarCombo(DatosInArea, document.getElementById("cmbIDInsidencia"));
                document.getElementById("cmbIDInsidencia").value = IDIncidencia;
            });
        });
        document.getElementById("cmbArea").classList.add("bloquear");
        document.getElementById("cmbSubArea").classList.add("bloquear");
        document.getElementById("cmbIDInsidencia").classList.add("bloquear");
        BloquearCTRL();
    }
    else {
        DESBloquearCTRL();
    }    
}

var NoS = document.getElementById("cmbIDTienda");
NoS.addEventListener("change", function () {
    var IDTienda = document.getElementById("cmbIDTienda").value;
    Incidencias_X_Tienda(IDTienda);
    Usuarios_X_Tienda(IDTienda);
});

//Incidencias por tienda
function Incidencias_X_Tienda(IDTienda) {
    $.get("/Incidencias/ReporteIncidenciasXTienda/?IDTienda=" + IDTienda, function (TiendaIns) {
        document.getElementById("TxtNoInsidencia").value = TiendaIns.length + 1;
    });
}
//Usuarios por tienda
function Usuarios_X_Tienda(IDTienda) {
    $.get("/Usuarios/UsuariosXTienda/?IDTienda=" + IDTienda, function (PersonalTienda) {
        if (PersonalTienda.lenght != 0) {
            llenarComboPersonal(PersonalTienda, document.getElementById("cmbIDUsuario"), sessionStorage.getItem('IDUsuario'), sessionStorage.getItem('Nombre'));
            document.getElementById("cmbIDUsuario").value = sessionStorage.getItem('IDUsuario');
        }
    });
}
//imagenes
var btnFoto = document.getElementById("BtnFoto");
btnFoto.onchange = function (e) {
    var file = document.getElementById("BtnFoto").files[0];
    var reader = new FileReader();
    if (reader != null) {
        reader.onloadend = function () {
            var img = document.getElementById("PBFoto");
            img.src = reader.result;
        }
    }
    reader.readAsDataURL(file);
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
//Guarda el reporte de la insidencia
function GenerarReporte() {
    if (Obligatorios("obligatorio") == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var HTMLAdvertencia = "";
            let IDRIncidencia = document.getElementById("TxtIDRInsidencia").value;
            let IDArea = document.getElementById("cmbArea").value;
            let IDSubArea = document.getElementById("cmbSubArea").value;
            if (IDSubArea == '') {
                IDSubArea = 0;
            }
            let IDIncidencia = document.getElementById("cmbIDInsidencia").value;
            let ReporteIDUsuario = document.getElementById("cmbIDUsuario").value;
            let temUser = document.getElementById("cmbIDUsuario");
            let ReporteUNombre = temUser.options[temUser.selectedIndex].text;
            let IDTienda = document.getElementById("cmbIDTienda").value;
            let NoInsidencia = document.getElementById("TxtNoInsidencia").value;
            let ReporteFecha = document.getElementById("TxtFecha").value;
            let ReporteObservaciones = document.getElementById("TxtObservaciones").value;
            let Foto = document.getElementById("PBFoto").src.replace("data:image/png;base64,", "");
            if (Foto.endsWith('Mayuda')) {
                Foto = base64.replace("data:image/png;base64,", "");
            }
            SolucionFoto = base64.replace("data:image/png;base64,", "");
            var frm = new FormData();
            frm.append("IDRIncidencia", IDRIncidencia);
            frm.append("IDArea", IDArea);
            frm.append("IDSubArea", IDSubArea);
            frm.append("IDIncidencia", IDIncidencia);
            frm.append("ReporteIDUsuario", ReporteIDUsuario);
            frm.append("ReporteUNombre", ReporteUNombre);
            frm.append("IDTienda", IDTienda);
            frm.append("NoInsidencia", NoInsidencia);
            frm.append("ReporteFecha", ReporteFecha);
            frm.append("ReporteObservaciones", ReporteObservaciones);
            frm.append("cadF", Foto);
            frm.append("SFoto", SolucionFoto);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Incidencias/GuardarReporte",
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
                        HTMLAdvertencia += "<strong>Se genero correctamente el reporte.</strong>";
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

//verifica que los campos obligatorios tengas datos "AreaObligatorio"
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
function LimpiarSelect() {
    var controlesTxt = document.getElementsByClassName("Limpiar");
    var ncontrolesTxt = controlesTxt.length;
    for (var i = 0; i < ncontrolesTxt; i++) {
        document.getElementById(controlesTxt[i].id).value = "";
    }
    var controles = document.getElementsByClassName("SelectCLS");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        document.getElementById(controles[i].id).value = 0;
    }
}