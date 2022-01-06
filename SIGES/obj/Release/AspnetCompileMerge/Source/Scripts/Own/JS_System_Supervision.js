Inicializar();

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

    $.get("/Supervision/BDSupervisiones", function (DatosSupervision) {
        if (DatosSupervision.length != 0) {
            CrearTabla(DatosSupervision);
        }
        else {
            alert("No hay datos que mostrar Supervision");
        }
    });
    $.get("/Cardinal/BDTiendas", function (InfSucursales) {
        var TablaSucursales = "";
        TablaSucursales += "<div class='row'>";
        for (var i = 0; i < InfSucursales.length; i++) {
            TablaSucursales += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            TablaSucursales += "<input type='checkbox' class='checkbox-Sucursal' id='" + InfSucursales[i].ID + "' ><span class='help-block text-muted small-font'>" + InfSucursales[i].Nombre + "</span>";
            TablaSucursales += "</div>";
        }
        TablaSucursales += "</div>";
        document.getElementById("TblSucursales").innerHTML = TablaSucursales;
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
    Limpiar();
    var controlesObligatorio = document.getElementsByClassName("Supervision");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("border-danger");
    }
    if (id == 0) {
        
    }
    else {
        $.get("/Supervision/BDSupervision/?ID=" + id, function (DatosSupervision) {
            document.getElementById("TxtIDSupervision").value = DatosSupervision[0].ID;
            document.getElementById("TxtSupervision").value = DatosSupervision[0].Nombre;
            document.getElementById("cmbEncargado").value = DatosSupervision[0].IDUsuario;
            //****************************************************************************
            var activar = DatosSupervision[0].Tiendas.split(',');
            var ChevPermisos = document.getElementsByClassName("checkbox-Sucursal");
            for (let j = 0; j < activar.length; j++) {
                for (let i = 0; i < ChevPermisos.length; i++) {
                    if (ChevPermisos[i].id == activar[j]) {
                        ChevPermisos[i].checked = true;
                        break;
                    }
                }
            }
            //****************************************************************************
            //document.getElementById("cmbTiendas").value = data[0].IDTiendas;
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
            var CheckSucursales = document.getElementsByClassName("checkbox-Sucursal");
            let seleccionados = "";
            for (let i = 0; i < CheckSucursales.length; i++) {
                if (CheckSucursales[i].checked == true) {
                    seleccionados += CheckSucursales[i].id;
                    seleccionados += ",";
                }
            }
            var Tiendas = seleccionados.substring(0, seleccionados.length - 1);
            //-----------------------------------------------------------------
            var frm = new FormData();
            frm.append("IDSupervision", IDSupervision);
            frm.append("Supervision", Supervision);
            frm.append("IDUsuario", IDUsuario);
            frm.append("UNombre", UNombre);
            frm.append("Tiendas", Tiendas);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Supervision/GuardarSupervision",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    let HTMLAdvertencia = "";
                    if (data == 0) {
                        HTMLAdvertencia += "<div class='alert alert-danger alert-dismissible fade show' role='alert'>";
                        HTMLAdvertencia += "<strong>Ocurrio un error!</strong>";
                    }
                    else if (data == -1) {
                        HTMLAdvertencia += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>";
                        HTMLAdvertencia += "<strong>Ya existe una supervisión con esa información!</strong>";
                    }
                    else {
                        HTMLAdvertencia += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
                        HTMLAdvertencia += "<strong>Se guardo correctamente la información de la nueva supervisión.</strong>";
                        Inicializar();
                        document.getElementById("btnCancelar").click();
                    }
                    HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                    HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                    HTMLAdvertencia += "</button>";
                    HTMLAdvertencia += "</div>";
                    document.getElementById("Alertas").innerHTML = HTMLAdvertencia;
                }
            });
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
//utilerias//
//Funcion para llenar los combos
function llenarCombo(data, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
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
    var controlesTXT = document.getElementsByClassName("limpiar");
    for (var i = 0; i < controlesTXT.length; i++) {
        controlesTXT[i].value = "";
    }
    var ChevPermisos = document.getElementsByClassName("checkbox-Sucursal");
    for (let i = 0; i < ChevPermisos.length; i++) {
        ChevPermisos[i].checked = false;
    }
    var controlesCMB = document.getElementsByClassName("SelectCLS");
    for (var i = 0; i < controlesCMB.length; i++) {
        document.getElementById(controlesCMB[i].id).value = 0;
    }
    /*Bloquear controles */
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}

