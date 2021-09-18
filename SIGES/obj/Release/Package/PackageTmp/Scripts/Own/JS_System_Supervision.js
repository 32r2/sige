Inicializar();
BloquearCTRL();
function Inicializar() {
    //Operador=Supervisor
    $.get("/Usuarios/BDUserPerfil/?IDPerfil=" + 9, function (DatosSupervisores) {
        if (DatosSupervisores.length != 0) {
            llenarCombo(DatosSupervisores, document.getElementById("cmbEncargado"));
        }
        else {
            alert("No hay datos que mostrar Supervisores");
        }
    });
    $.get("/Tiendas/ConsultaSucursales", function (DatosTiendas) {
        if (DatosTiendas.length != 0) {
            llenarMulti(DatosTiendas, document.getElementById("cmbTiendas"));
        }
        else {
            alert("No hay datos que mostrar Sucursales");
        }
    });
    $.get("/Supervision/BDSupervisiones", function (DatosSupervision) {
        if (DatosSupervision.length != 0) {
            CrearTabla(DatosSupervision);
        }
        else {
            alert("No hay datos que mostrar Supervision");
        }
    });
}

function CrearTabla(DatosSupervision) {
    var CodHtml = "";
    CodHtml += "<table id='tablas'  class='table table table-sm' >";
    CodHtml += "<thead>";
    CodHtml += "<tr><td>Supervisión</td><td>Supervisor</td><td>Tiendas</td><td>Opciones</td></tr>";
    CodHtml += "</thead>";
    CodHtml += "<tbody>";
    for (var i = 0; i < DatosSupervision.length; i++) {
        CodHtml += "<tr>";
        CodHtml += "<td>" + DatosSupervision[i].Nombre + "</td>";
        CodHtml += "<td>" + DatosSupervision[i].UNombre + "</td>";
        CodHtml += "<td>" + DatosSupervision[i].Tiendas + "</td>";
        CodHtml += "<td>";
        CodHtml += "<button class='btn btn-primary' onclick='abrirModal(" + DatosSupervision[i].ID + ")' data-toggle='modal' data-target='#ModalSupervision'><i class='fas fa-edit'></i></button> "
        CodHtml += "<button class='btn btn-danger' onclick='EliminarSupervision(" + DatosSupervision[i].ID + ",this)' ><i class='fas fa-eraser'></i></button>"
        CodHtml += "</td>"
        CodHtml += "</tr>";
    }
    CodHtml += "</tbody>";
    CodHtml += "</table>";
    document.getElementById("tabla").innerHTML = CodHtml;
}
//abrir Modal
function abrirModal(id) {
    var controlesObligatorio = document.getElementsByClassName("Supervision");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("border-danger");
    }
    if (id == 0) {
        Limpiar();
    }
    else {
        $.get("/Supervision/BDSupervision/?ID=" + id, function (data) {
            document.getElementById("TxtIDSupervision").value = data[0].ID;
            document.getElementById("TxtSupervision").value = data[0].Nombre;
            document.getElementById("cmbEncargado").value = data[0].IDUsuario;
            document.getElementById("cmbTiendas").value = data[0].IDTiendas;
        });
    }
}
//guardar informacion
function GuardarSupervision() {
    if (Obligatorios("Supervision") == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IDSupervision = document.getElementById("TxtIDSupervision").value;
            var Supervision = document.getElementById("TxtSupervision").value;
            //Obtiene el texto de combo para el supervisor
            var IDUsuario = document.getElementById("cmbEncargado").value;
            var temUser = document.getElementById("cmbEncargado");
            var UNombre = temUser.options[temUser.selectedIndex].text;
            //-----------------------------------------------------------------
            var ListTiendas = document.getElementById("cmbTiendas");
            var TempTiendas = "";
            for (i = 0; i < ListTiendas.length; i++) {
                currentOption = ListTiendas[i];
                //print it if it has been selected
                if (currentOption.selected == true) {
                    TempTiendas += currentOption.text + ",";
                }
            }
            let Tiendas = TempTiendas.substring(0, TempTiendas.length - 1);
            //-----------------------------------------------------------------
            var frm = new FormData();
            frm.append("IDSupervision", IDSupervision);
            frm.append("Supervision", Supervision);
            frm.append("IDUsuario", IDUsuario);
            frm.append("UNombre", UNombre);
            frm.append("Tiendas", Tiendas);
            frm.append("Estatus", 1);
            $.ajax
                (
                    {
                        type: "POST",
                        url: "/Supervision/GuardarSupervision",
                        data: frm,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            if (data == 0) {
                                alert("Ocurrio un error");
                            }
                            else if (data == -1) {
                                alert("Ya existe la sub-área");
                            }
                            else {
                                alert("Se ejecuto correctamente");
                                Inicializar();
                                document.getElementById("btnCancelar").click();
                            }
                        }
                    }
                );
        }
    }
}
//eliminar
function EliminarSupervision(id) {
    if (confirm("¿Desea eliminar el registo?") == 1) {
        $.get("/Supervision/EliminarSupervision/?ID=" + id, function (data) {
            if (data == -1) {
                alert("Ya existe el docente");
            }
            else if (data == 0) {
                alert("Ocurrio un error");
            }
            else {
                alert("Se elimino correctamente");
                Inicializar();
            }

        });
    }
}
//****************************************************************************************************************************************
//Funcion para llenar los combos
function llenarCombo(data, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}
//llena el multiselect
function llenarMulti(data, control) {
    var contenido = "";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
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
    var controles = document.getElementsByClassName("limpiar");
    for (var i = 0; i < controles.length; i++) {
        if (controles[i].nodeName == "SELECT") {
            controles[i].value = "0";
        }
        else {
            controles[i].value = "";
        }
    }
}
function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}