﻿//CrearAcordeonAreas();
LlenarSelects();
BloquearCTRL();

//****************************************************************************************************************************************************************************************************
//Áreas
//fucnion que oculta o muestra un div, cambia el icono del boton
function MostrarOcultar(id) {
    var x = document.getElementById("Recursos_areas" + id);
    if (x.style.display === "none") {
        x.style.display = "block";
        document.getElementById("BtnMO" + id).className = "fas fa-chevron-circle-up";
        recursos(id);
    }
    else {
        x.style.display = "none";
        document.getElementById("BtnMO" + id).className = "fas fa-chevron-circle-down";
    }
}
//Limpia la información y carga la informacion del área
function AbrirMArea(id) {
    var controlesObligatorio = document.getElementsByClassName("AreaObligatorio");
    for (var i = 0; i < controlesObligatorio.length; i++) {
        controlesObligatorio[i].parentNode.classList.remove("border-danger");
    }
    Limpiar();
    if (id > 0) {
        $.get("/Areas/ConsultaArea/?IDArea=" + id, function (DatosArea) {
            document.getElementById("TxtIDArea").value = DatosArea[0].IDArea;
            document.getElementById("TxtNombreArea").value = DatosArea[0].Nombre;
            document.getElementById("cmbEncargado").value = DatosArea[0].IDUsuario;
            document.getElementById("TxtCorreo").value = DatosArea[0].Correo;
            document.getElementById("TxtTelefono").value = DatosArea[0].Telefono;
            document.getElementById("TxtRecursos").value = DatosArea[0].Carpeta;
        });
    }

}
//Guarda los cambios y altas de las áreas
function GuardarArea() {
    if (Obligatorios("Area") == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            let HTMLAdvertencia = "";
            var IDArea = document.getElementById("TxtIDArea").value;
            var Nombre = document.getElementById("TxtNombreArea").value;
            var IDUsuario = document.getElementById("cmbEncargado").value;
            var temUser = document.getElementById("cmbEncargado");
            var UNombre = temUser.options[temUser.selectedIndex].text;
            var Correo = document.getElementById("TxtCorreo").value;
            var Telefono = document.getElementById("TxtTelefono").value;
            var Carpeta = document.getElementById("TxtRecursos").value;
            var frm = new FormData();
            frm.append("IDArea", IDArea);
            frm.append("Nombre", Nombre);
            frm.append("IDUsuario", IDUsuario);
            frm.append("UNombre", UNombre);
            frm.append("Correo", Correo);
            frm.append("Telefono", Telefono);
            frm.append("Carpeta", Carpeta);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Areas/GuardarArea",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        HTMLAdvertencia += "<div class='alert alert-danger alert-dismissible fade show' role='alert'>";
                        HTMLAdvertencia += "<strong>¡Ocurrio un error!</strong>";
                        HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                        HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                        HTMLAdvertencia += "</button>";
                        HTMLAdvertencia += "</div>";
                        document.getElementById("Alertas").innerHTML = HTMLAdvertencia;
                    }
                    else if (data == -1) {
                        HTMLAdvertencia += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>";
                        HTMLAdvertencia += "<strong>¡Ya existe un departamento con la misma información!</strong>";
                        HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                        HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                        HTMLAdvertencia += "</button>";
                        HTMLAdvertencia += "</div>";
                        document.getElementById("Alertas").innerHTML = HTMLAdvertencia;
                    }
                    else {
                        HTMLAdvertencia += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
                        HTMLAdvertencia += "<strong>Se guardo correctamente la información del nuevo departamento.</strong>";
                        HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                        HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                        HTMLAdvertencia += "</button>";
                        HTMLAdvertencia += "</div>";
                        document.getElementById("Alertas").innerHTML = HTMLAdvertencia;
                        CrearAcordeonAreas();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
    }
}
//"Elimina" el área cambia el Estatus
function EliminarArea(id) {
    if (confirm("¿Desea eliminar el registo?") == 1) {
        let HTMLAdvertencia = "";
        $.get("/Areas/EliminarArea/?IDArea=" + id, function (DatoArea) {
            if (DatoArea == 1) {
                HTMLAdvertencia += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
                HTMLAdvertencia += "<strong>Se elimino el departamento correctamente.</strong>";
                HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                HTMLAdvertencia += "</button>";
                HTMLAdvertencia += "</div>";
                document.getElementById("Alertas").innerHTML = HTMLAdvertencia;

                CrearAcordeonAreas();
            } else {
                HTMLAdvertencia += "<div class='alert alert-danger alert-dismissible fade show' role='alert'>";
                HTMLAdvertencia += "<strong>Ocurrio un error!</strong>";
                HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                HTMLAdvertencia += "</button>";
                HTMLAdvertencia += "</div>";
                document.getElementById("Alertas").innerHTML = HTMLAdvertencia;
            }
        });
    }
}
//****************************************************************************************************************************************************************************************************
//funcion para obtener la fecha del sistema
function FFecha() {
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();
    dd = addZero(dd);
    mm = addZero(mm);
    var fecha = dd + '/' + mm + '/' + yyyy;
    return fecha;
}
function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}
//consulta para llenar el actodion de las subareas
function AcordionSubareas(area) {
    $.get("/Areas/BDSubAreas/?IDArea=" + area, function (DatosSubareas) {
        let NombreAcordeon = "Acordeon_Subarea" + area;
        llenaSub(DatosSubareas, NombreAcordeon);
    });
}
//inserta el acorion y la informacion de las areas
function llenaSub(DatosSubareas, NombreAcordeon) {
    var CodHtml = "";
    let NoSub = DatosSubareas.length;
    for (var i = 0; i < DatosSubareas.length; i++) {
        if (i < 1) {
            CodHtml += "<div class='card m-b-0'>";
        }
        else {
            CodHtml += "<div class='card m-b-0 border-top'>";
        }
        CodHtml += "<div class='card-header' id='heading_Sub" + DatosSubareas[i].ID + "'>";
        CodHtml += "<h5 class='mb-0'>";
        CodHtml += "<a  data-toggle='collapse' data-target='#collapse_Sub" + DatosSubareas[i].ID + "' aria-expanded='false' aria-controls='collapse" + DatosSubareas[i].ID + "' class='collapsed'>";
        CodHtml += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodHtml += "<span >" + DatosSubareas[i].Nombre + "</span>";
        CodHtml += "</a>";
        CodHtml += "</h5>";
        CodHtml += "<div id='collapse_Sub" + DatosSubareas[i].ID + "' class='collapse' aria-labelledby='headingOne' data-parent='#" + NombreAcordeon + "' style=''>";
        CodHtml += "<div class='card-body'>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-sm-12 col-md-5 col-xs-5'><strong>Encargado 1: </strong>" + DatosSubareas[i].UNombre + "</div>";
        CodHtml += "<div class='col-sm-12 col-md-4 col-xs-4'><strong>Correo: </strong>" + DatosSubareas[i].Correo + "</div>";
        CodHtml += "<div class='col-sm-12 col-md-3 col-xs-3'><strong>Teléfono: </strong>" + DatosSubareas[i].Telefono + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Encargado 2: </strong>" + DatosSubareas[i].NEncargado2 + "</div>";
        CodHtml += "<div class='col-md-4 col-sm-4 col-xs-4'><strong>Correo: </strong>" + DatosSubareas[i].CorreoE2 + "</div>";
        CodHtml += "<div class='col-md-3 col-sm-2 col-xs-2'><strong>Teléfono: </strong>" + DatosSubareas[i].TelefonoE2 + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Encargado 3: </strong>" + DatosSubareas[i].NEncargado3 + "</div>";
        CodHtml += "<div class='col-md-4 col-sm-4 col-xs-4'><strong>Correo: </strong>" + DatosSubareas[i].CorreoE3 + "</div>";
        CodHtml += "<div class='col-md-3 col-sm-2 col-xs-2'><strong>Teléfono: </strong>" + DatosSubareas[i].TelefonoE3 + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodHtml += "<button class='btn btn-primary' onclick='abrirModalSub(" + DatosSubareas[i].ID + ")' data-toggle='modal' data-target='#ModalSubareas'><i class='fas fa-edit'></i></button> ";
        CodHtml += "<button class='btn btn-danger' onclick='eliminarsub(" + DatosSubareas[i].ID + "," + DatosSubareas[i].IDArea + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
    }
    document.getElementById(NombreAcordeon).innerHTML = CodHtml;
}
//abrir PopUp
function abrirModalSub(id, ida) {
    var PerfilObligatorio = document.getElementsByClassName("PerfilObligatorio");
    for (var i = 0; i < PerfilObligatorio.length; i++) {
        PerfilObligatorio[i].classList.remove("border-danger");
    }
    Limpiar();
    if (id == 0) {
        $.get("/Areas/BDSubAreas/?IDArea=" + ida, function (data) {
            document.getElementById("TxtNoSubArea").value = data.length + 1;
            document.getElementById("cmbAreaSubA").value = ida;
        });
    }
    else {
        $.get("/Areas/BDSubArea/?ID=" + id, function (DatosArea) {
            document.getElementById("TxtIDSubArea").value = DatosArea[0].ID;
            document.getElementById("TxtNombreSubArea").value = DatosArea[0].Nombre;
            document.getElementById("TxtNoSubArea").value = DatosArea[0].NoSubArea;
            document.getElementById("cmbAreaSubA").value = DatosArea[0].IDArea;

            document.getElementById("cmbEncargado1Sub").value = DatosArea[0].IDUsuario;
            document.getElementById("TxtCorreoSub").value = DatosArea[0].Correo;
            document.getElementById("TxtTelefonoSub").value = DatosArea[0].Telefono;

            document.getElementById("cmbEncargado2Sub").value = DatosArea[0].IDEncargado2;
            document.getElementById("TxtCorreoE2Sub").value = DatosArea[0].CorreoE2;
            document.getElementById("TxtTelefonoE2Sub").value = DatosArea[0].TelefonoE2;

            document.getElementById("cmbEncargado3Sub").value = DatosArea[0].IDEncargado3;
            document.getElementById("TxtCorreoE3Sub").value = DatosArea[0].CorreoE3;
            document.getElementById("TxtTelefonoE3Sub").value = DatosArea[0].TelefonoE3;
        });
    }
}
//guardar informacion
function GuardarSubarea() {
    if (Obligatorios("Subarea") == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            let HTMLAdvertencia = "";
            var IDSubArea = document.getElementById("TxtIDSubArea").value;
            var NoSubArea = document.getElementById("TxtNoSubArea").value;
            var Nombre = document.getElementById("TxtNombreSubArea").value;
            //Datos área
            var IDArea = document.getElementById("cmbAreaSubA").value;
            //Datos encargado 1
            var IDUsuario = document.getElementById("cmbEncargado1Sub").value;
            var temUser1 = document.getElementById("cmbEncargado1Sub");
            var UNombre = temUser1.options[temUser1.selectedIndex].text;
            var Correo = document.getElementById("TxtCorreoSub").value;
            var Telefono = document.getElementById("TxtTelefonoSub").value;
            //Datos encargado 2
            var IDEncargado2 = document.getElementById("cmbEncargado2Sub").value;
            var temUser2 = document.getElementById("cmbEncargado2Sub");
            var NEncargado2 = temUser2.options[temUser2.selectedIndex].text;
            var CorreoE2 = document.getElementById("TxtCorreoE2Sub").value;
            var TelefonoE2 = document.getElementById("TxtTelefonoE2Sub").value;
            //Datos encargado 3
            var IDEncargado3 = document.getElementById("cmbEncargado3Sub").value;
            var temUser3 = document.getElementById("cmbEncargado3Sub");
            var NEncargado3 = temUser3.options[temUser3.selectedIndex].text;
            var CorreoE3 = document.getElementById("TxtCorreoE3Sub").value;
            var TelefonoE3 = document.getElementById("TxtTelefonoE3Sub").value;
            var frm = new FormData();
            frm.append("IDSubArea", IDSubArea);
            frm.append("NoSubArea", NoSubArea);
            frm.append("Nombre", Nombre);
            frm.append("IDArea", IDArea);
            frm.append("IDUsuario", IDUsuario);
            frm.append("UNombre", UNombre);
            frm.append("Correo", Correo);
            frm.append("Telefono", Telefono);
            frm.append("IDEncargado2", IDEncargado2);
            frm.append("NEncargado2", NEncargado2);
            frm.append("CorreoE2", CorreoE2);
            frm.append("TelefonoE2", TelefonoE2);
            frm.append("IDEncargado3", IDEncargado3);
            frm.append("NEncargado3", NEncargado3);
            frm.append("CorreoE3", CorreoE3);
            frm.append("TelefonoE3", TelefonoE3);
            frm.append("Estatus", 1);
            $.ajax(
                {
                    type: "POST",
                    url: "/Areas/GuardarSubarea",
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
                            HTMLAdvertencia += "<strong>Ya existe una subárea con esa información!</strong>";
                            HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                            HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                            HTMLAdvertencia += "</button>";
                            HTMLAdvertencia += "</div>";
                            document.getElementById("Alertas").innerHTML = HTMLAdvertencia;
                        }
                        else {
                            HTMLAdvertencia += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
                            HTMLAdvertencia += "<strong>Se guardo correctamente la información de la nueva Subárea.</strong>";
                            HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                            HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                            HTMLAdvertencia += "</button>";
                            HTMLAdvertencia += "</div>";
                            document.getElementById("Alertas").innerHTML = HTMLAdvertencia;
                            AcordionSubareas(IDArea);
                            document.getElementById("btnCancelarsub").click();
                        }
                    }
                }
            );
        }
    }
}
//eliminar
function EliminarSub(id, IDArea) {
    if (confirm("¿Desea eliminar el registo?") == 1) {
        let HTMLAdvertencia = "";
        $.get("/Areas/eliminarsub/?id=" + id, function (data) {
            if (data == 0) {
                HTMLAdvertencia += "<div class='alert alert-danger alert-dismissible fade show' role='alert'>";
                HTMLAdvertencia += "<strong>Ocurrio un error!</strong>";
                HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                HTMLAdvertencia += "</button>";
                HTMLAdvertencia += "</div>";
                document.getElementById("Alertas").innerHTML = HTMLAdvertencia;
            }
            else {
                HTMLAdvertencia += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
                HTMLAdvertencia += "<strong>Se elimino la Subárea correctamente.</strong>";
                HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                HTMLAdvertencia += "</button>";
                HTMLAdvertencia += "</div>";
                document.getElementById("Alertas").innerHTML = HTMLAdvertencia;
                AcordionSubareas(IDArea);
            }
        });
    }
}
//****************************************************************************************************************************************************************************************************
//crea la tabla
function recursos(ida) {
    $.get("/Areas/BDRecursos/?IDArea=" + ida, function (Datosrecurso) {
        TablaRecursos(["Titulo", "Fecha modificación", "Tipo", "Dirección"], Datosrecurso, ida);
    });
}
function TablaRecursos(AColumnas, DatosAreas, ida) {
    var CodHtml = "";
    CodHtml += "<table id='tablas" + ida + "'  class='table table table-sm' >";
    CodHtml += "<thead>";
    CodHtml += "<tr>";
    for (var i = 0; i < AColumnas.length; i++) {
        CodHtml += "<td>" + AColumnas[i] + "</td>";
    }
    CodHtml += "<td>Opciones</td>";
    CodHtml += "</tr>";
    CodHtml += "</thead>";
    CodHtml += "<tbody>";
    for (var i = 0; i < DatosAreas.length; i++) {
        CodHtml += "<tr>";
        CodHtml += "<td>" + DatosAreas[i].Nombre + "</td>";
        CodHtml += "<td>" + DatosAreas[i].FechaM + "</td>";
        CodHtml += "<td>" + DatosAreas[i].Tipo + "</td>";
        CodHtml += "<td>" + DatosAreas[i].Direccion + "</td>";
        CodHtml += "<td><button class='btn btn-warning' onclick='ModalRecursos(" + DatosAreas[i].ID + "," + DatosAreas[i].IDArea + ")' data-toggle='modal' data-target='#RecursosModal'><i class='fas fa-edit'></i></button> "
        CodHtml += "<button class='btn btn-danger' onclick='EliminarRecursos(" + DatosAreas[i].ID + "," + DatosAreas[i].IDArea + ",this)' ><i class='fas fa-eraser'></i></button></td>"
        CodHtml += "</tr>";
    }
    CodHtml += "</tbody>";
    CodHtml += "</table>";
    document.getElementById("Recursos_areas" + ida).innerHTML = CodHtml;
}
//Abrir Modal recursos
function ModalRecursos(id, ida) {
    var controlesObligatorio = document.getElementsByClassName("Recursos-obligatorios");
    for (var i = 0; i < controlesObligatorio.length; i++) {
        controlesObligatorio[i].parentNode.classList.remove("border-danger");
    }
    $.get("/Areas/ConsultaArea/?IDArea=" + ida, function (datas) {
        document.getElementById("TxtDirectorio").value = datas[0].Carpeta;
        if (id == 0) {
            Limpiar();
            $("#PBFoto").attr('src', '');
            $.get("/Areas/BDRecursos/?IDArea=" + ida, function (Datosrecurso) {
                if (Datosrecurso.length > 0) {
                    var no = Datosrecurso.length + 1;
                    document.getElementById("TxtIDRecurso").value = ida + "" + no;
                }
                else {
                    document.getElementById("TxtIDRecurso").value = ida + "1";
                }
                document.getElementById("TxtFModificacionR").value = FFecha();
                document.getElementById("cmbRecursoArea").value = ida;
            }
            );
        }
        else {
            $.get("/Areas/BDRecurso/?IDRecurso=" + id, function (datos) {
                document.getElementById("TxtIDRecurso").value = datos[0].ID;
                document.getElementById("TxtTitulo").value = datos[0].Titulo;
                document.getElementById("cmbRecursoArea").value = datos[0].IDArea;
                let archivo = datos[0].Direccion;
                let remplazar = document.getElementById("TxtDirectorio").value + "/";
                document.getElementById("TxtFileName").value = archivo.replace(remplazar, "");
                document.getElementById("TxtFModificacionR").value = datos[0].FechaM;
                document.getElementById("cmbTipo").value = datos[0].Tipo;
                MostrarRecurso(datos[0].Tipo, datos[0].Direccion);
            });
        }
    });
}
//Evento Change index tipo
var NoS = document.getElementById("cmbTipo");
NoS.addEventListener("change", function () {
    var tipo = document.getElementById("cmbTipo").value;
    var FileName = document.getElementById("TxtFileName").value;
    var directorio = document.getElementById("TxtDirectorio").value;
    if (FileName != "") {
        var ruta = directorio + "/" + FileName;
        MostrarRecurso(tipo, ruta);
    }
    else {
        alert("Asegúrese introducir el nombre del archivo.");
    }
});
//Muestra el Video, imagen o emulador
function MostrarRecurso(tipo, ruta) {
    var CodHtml = "";
    if (tipo == "Imagen") {
        CodHtml = "<img id='PBFoto' src='../Assets/Resources/" + ruta + "' width='470' height='250'/>";
    }
    else if (tipo == "Video") {
        CodHtml = "<video width='400' controls>";
        CodHtml = "<source src='/assets/videos/" + ruta + "' type='video/mp4'>";
        CodHtml = "Su navegador no es compatible con video HTML.";
        CodHtml = "</video>";
    }
    else if (tipo == "Simulador") {
        alert("En construcción");
    }
    if (CodHtml != "") {
        document.getElementById("MRecurso").innerHTML = CodHtml;
    }
}
//guardar informacion
function GuardarRecurso() {
    if (Obligatorios("Recursos") == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            let HTMLAdvertencia = "";
            var IDRecurso = document.getElementById("TxtIDRecurso").value;
            var Titulo = document.getElementById("TxtTitulo").value;
            var IDArea = document.getElementById("cmbRecursoArea").value;
            var NDire = document.getElementById("TxtDirectorio").value + "/" + document.getElementById("TxtFileName").value;
            var Direccion = NDire;
            var Tipo = document.getElementById("cmbTipo").value;
            var FModificacion = document.getElementById("TxtFModificacionR").value;
            var frm = new FormData();
            frm.append("IDRecurso", IDRecurso);
            frm.append("Titulo", Titulo);
            frm.append("IDArea", IDArea);
            frm.append("Direccion", Direccion);
            frm.append("Tipo", Tipo);
            frm.append("FModificacion", FModificacion);
            frm.append("Estatus", 1);
            $.ajax(
                {
                    type: "POST",
                    url: "/Areas/GuardarRecurso",
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
                            HTMLAdvertencia += "<strong>Ya existe un recurso con esa información!</strong>";
                            HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                            HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                            HTMLAdvertencia += "</button>";
                            HTMLAdvertencia += "</div>";
                            document.getElementById("Alertas").innerHTML = HTMLAdvertencia;
                        }
                        else {
                            HTMLAdvertencia += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
                            HTMLAdvertencia += "<strong>Se guardo la información del recurso correctamente.</strong>";
                            HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                            HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                            HTMLAdvertencia += "</button>";
                            HTMLAdvertencia += "</div>";
                            document.getElementById("Alertas").innerHTML = HTMLAdvertencia;
                            recursos(IDArea);
                            document.getElementById("btnCancelarRecurso").click();
                        }
                    }
                }
            );
        }
    }
}
//eliminar el recurso
function EliminarRecursos(id, IDArea) {
    if (confirm("¿Desea eliminar el registo?") == 1) {
        $.get("/Areas/ERecursos/?id=" + id, function (data) {
            if (data == -1) {
                alert("Ya existe el recurso");
            }
            else {
                if (data == 0) {
                    alert("Ocurrio un error");
                }
                else {
                    alert("Se elimino correctamente");
                    recursos(IDArea);
                }
            }
        });
    }
}
//****************************************************************************************************************************************************************************************************
//Ejecuta la consulta para llenar el combobox de emcargados
function LlenarSelects() {
    $.get("/Usuarios/BDUserNivel/?LVLPerfil=" + 4, function (data) {
        llenarCombo(data, document.getElementById("cmbEncargado"));
    });
    $.get("/Usuarios/BDUserNivel/?LVLPerfil=" + 5, function (data) {
        llenarCombo(data, document.getElementById("cmbEncargado1Sub"));
        llenarCombo(data, document.getElementById("cmbEncargado2Sub"));
        llenarCombo(data, document.getElementById("cmbEncargado3Sub"));
    });
    $.get("/Cardinal/BDAreas", function (DatosAreas) {
        llenarCombo(DatosAreas, document.getElementById("cmbAreaSubA"));
        llenarCombo(DatosAreas, document.getElementById("cmbRecursoArea"));
    });
}
//llena los combobos
function llenarCombo(DatosAreas, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
    for (var i = 0; i < DatosAreas.length; i++) {
        contenido += "<option value='" + DatosAreas[i].ID + "'>" + DatosAreas[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
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

function Limpiar() {
    var controlesTXT = document.getElementsByClassName("limpiar");
    for (var i = 0; i < controlesTXT.length; i++) {
        controlesTXT[i].value = "";
    }
    var controlesCMB = document.getElementsByClassName("SelectCLS");
    for (var i = 0; i < controlesCMB.length; i++) {
        document.getElementById(controlesCMB[i].id).value = 0;
    }
}

function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}