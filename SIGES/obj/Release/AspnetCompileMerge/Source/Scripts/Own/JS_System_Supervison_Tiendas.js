var base64;
const f = new Date();
BadgesTiendas();

function BadgesTiendas() {
    var TiendasSuper = sessionStorage.getItem('Tiendas').split(',');
    for (let t = 0; t < TiendasSuper.length; t++) {
        let NoTienda = TiendasSuper[t];
        $.get("/Cardinal/NoIncidenciaTienda/?IDTienda=" + NoTienda, function (NIncidencias) {
            let Bag = "Badge_Sucursal_" + NoTienda;
            if (NIncidencias.length > 0) {
                document.getElementById(Bag).innerHTML = NIncidencias.length;
            }
        });
    }
    base64 = getBase64Image(document.getElementById("imageid"));
}

function llenarBadges(IDTienda) {
    $.get("/Cardinal/BDAreas", function (DatosAreas) {
        for (var i = 0; i < DatosAreas.length; i++) {
            var IDArea = DatosAreas[i].ID;
            $.get("/Supervision/ReportesXArea/?IDArea=" + IDArea + "&IDTienda=" + IDTienda, function (IncidenciasRpt) {
                if (IncidenciasRpt.length > 0) {
                    var Item = "Badge_Sucursal_" + IDTienda + "_Depto_" + IncidenciasRpt[0].IDArea;
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
                        Tabla += "<input type='checkbox' name='switch-button' id='switch-label" + IncidenciasRpt[Inci].ID + "' class='switch-button__checkbox' onChange='FinalizarIncidencia(" + IncidenciasRpt[Inci].ID + "," + IncidenciasRpt[0].IDArea + ")'>";
                        Tabla += "<label for='switch-label" + IncidenciasRpt[Inci].ID + "' class='switch-button__label'></label>";
                        Tabla += "</div>";
                        Tabla += "</td>";
                        Tabla += "</tr>";
                    }
                    Tabla += "</tbody>";
                    Tabla += "</table>";
                    document.getElementById("Tabla_Sucursal_" + IDTienda + "_Depto_" + IncidenciasRpt[0].IDArea).innerHTML = Tabla;
                }
            });
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
function Usuarios_X_Tienda(IDTienda) {
    $.get("/Usuarios/UsuariosXTienda/?IDTienda=" + IDTienda, function (PersonalTienda) {
        if (PersonalTienda.lenght != 0) {
            llenarComboPersonal(PersonalTienda, document.getElementById("cmbIDUsuario"), sessionStorage.getItem('IDUsuario'), sessionStorage.getItem('Nombre'));
            document.getElementById("cmbIDUsuario").value = sessionStorage.getItem('IDUsuario');
        }
    });
}

function FinalizarReporte() {
    var IDReporte = document.getElementById("TxtIDRInsidencia").value;
    let Area;
    $.get("/Incidencias/SeguimientoReporte/?IDRIncidencia=" + IDReporte, function (DatosSeguimiento) {
        Area = DatosSeguimiento[0].IDArea;
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
                let SolucionFoto = document.getElementById("PBFoto").src.replace("data:image/png;base64,", "");
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
    llenarBadges();
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