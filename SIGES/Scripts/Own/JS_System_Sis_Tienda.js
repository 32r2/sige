Inicializar();


function Inicializar() {
    $.get("/Cardinal/BDEstados", function (DatosEstados) {
        if (DatosEstados.length != 0) {
            llenarCombo(DatosEstados, document.getElementById("cmbEstado"));
        }
        else {
            alert("No hay datos en la tabla Estados.");
        }
    });
    $.get("/Tiendas/ConsultaSucursales", function (DatosTiendas) {
        if (DatosTiendas.lenght != 0) {
            AcordionTiendas(DatosTiendas, document.getElementById("AcordeonSucursales"));
        }
        else {
            alert("No hay datos que mostrar Sucursales");
        }
    });
    $.get("/Supervision/BDSupervisiones", function (DatosSupervision) {
        if (DatosSupervision.lenght != 0) {
            llenarCombo(DatosSupervision, document.getElementById("cmbIDSupervision"));
        }
        else {
            alert("No hay datos que mostrar Estados");
        }
    });
    $.get("/Usuarios/BDUserPerfil/?IDPerfil=" + 9, function (DatosSupervisores) {
        if (DatosSupervisores.lenght != 0) {
            llenarComboPersonal(DatosSupervisores, document.getElementById("cmbIDSupervisor"));
        }
        else {
            alert("No hay datos que mostrar Supervisores");
        }
    });
    $.get("/Usuarios/BDUserPerfil/?IDPerfil=" + 10, function (DatosLider) {
        if (DatosLider.lenght != 0) {
            llenarComboPersonal(DatosLider, document.getElementById("cmbIDLider"));
        }
        else {
            alert("No hay datos que mostrar");
        }
    });
    //Encargados
    $.get("/Usuarios/BDUserPerfil/?IDPerfil=" + 11, function (DatosEncargados) {
        if (DatosEncargados.lenght != 0) {
            llenarComboPersonal(DatosEncargados, document.getElementById("cmbIDEncargado1"));
            llenarComboPersonal(DatosEncargados, document.getElementById("cmbIDEncargado2"));
            llenarComboPersonal(DatosEncargados, document.getElementById("cmbIDEncargado3"));
        }
        else {
            alert("No hay datos que mostrar");
        }
    });
    //Auxiliares
    $.get("/Usuarios/BDUserPerfil/?IDPerfil=" + 12, function (DatosAuxiliares) {
        if (DatosAuxiliares.lenght != 0) {
            llenarComboPersonal(DatosAuxiliares, document.getElementById("cmbIDAuxsiliar1"));
            llenarComboPersonal(DatosAuxiliares, document.getElementById("cmbIDAuxsiliar2"));
            llenarComboPersonal(DatosAuxiliares, document.getElementById("cmbIDAuxsiliar3"));
        }
        else {
            alert("No hay datos que mostrar");
        }
    });
}
//CUANDO SE SELECCIONA EL ESTADO CARGA LA INFORMACION DE LOS MUNICIPIOS
var IDE = document.getElementById("cmbEstado");
IDE.addEventListener("change", function () {
    $.get("/Cardinal/BDMunicipio/?IDE=" + IDE.value, function (data) {
        llenarCombo(data, document.getElementById("cmbMunicipio"), true);
    });
});
//event Change index Municipio para llenar el combo box Municipios
var IDM = document.getElementById("cmbMunicipio");
IDM.addEventListener("change", function () {
    $.get("/Cardinal/BDLocalidades/?IDM=" + IDM.value, function (data) {
        llenarCombo(data, document.getElementById("cmbLocalidad"), true);
    });
});
function AcordionTiendas(DatosTiendas, Control) {
    var CodigoHTMLAreas = "";
    for (var i = 0; i < DatosTiendas.length; i++) {
        if (i < 1) {
            CodigoHTMLAreas += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLAreas += "<div class='card m-b-0 border-top'>";
        }
        CodigoHTMLAreas += "<div class='card-header' id='heading" + DatosTiendas[i].ID + "'>";
        CodigoHTMLAreas += "<h5 class='mb-0'>";
        CodigoHTMLAreas += "<a data-toggle='collapse' data-target='#collapse" + DatosTiendas[i].ID + "' aria-expanded='false' aria-controls='collapse" + DatosTiendas[i].ID + "' class='collapsed'>";
        CodigoHTMLAreas += "<i class='m-r-5 mdi mdi-store' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<span >" + DatosTiendas[i].Nombre + "</span>";
        CodigoHTMLAreas += "</a>";
        CodigoHTMLAreas += "</h5>";
        CodigoHTMLAreas += "<div id='collapse" + DatosTiendas[i].ID + "' class='collapse' aria-labelledby='headingOne' data-parent='#accordion' style=''>";
        CodigoHTMLAreas += "<div class='card-body'>";

        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Supervisión: </strong>" + DatosTiendas[i].NombreS + "</div>";
        CodigoHTMLAreas += "</div>";

        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Supervisor: </strong>" + DatosTiendas[i].UNombre + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Lider: </strong>" + DatosTiendas[i].LNombre + "</div>";
        CodigoHTMLAreas += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Encargado: </strong>" + DatosTiendas[i].E1Nombre + "</div>";
        CodigoHTMLAreas += "</div>";
        if (DatosTiendas[i].E2Nombre != "--Seleccione--" || DatosTiendas[i].E3Nombre != "--Seleccione--") {
            CodigoHTMLAreas += "<div class='row'>";
            CodigoHTMLAreas += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Encargado: </strong>" + DatosTiendas[i].E2Nombre + "</div>";
            CodigoHTMLAreas += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Encargado: </strong>" + DatosTiendas[i].E3Nombre + "</div>";
            CodigoHTMLAreas += "</div>";
        }
        if (DatosTiendas[i].A1Nombre != "--Seleccione--" || DatosTiendas[i].A2Nombre != "--Seleccione--") {
            CodigoHTMLAreas += "<div class='row'>";
            CodigoHTMLAreas += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Auxiliar: </strong>" + DatosTiendas[i].A1Nombre + "</div>";
            CodigoHTMLAreas += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Auxiliar: </strong>" + DatosTiendas[i].A2Nombre + "</div>";
            CodigoHTMLAreas += "</div>";
        }
        if (DatosTiendas[i].A3Nombre != "--Seleccione--") {
            CodigoHTMLAreas += "<div class='row'>";
            CodigoHTMLAreas += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Auxiliar: </strong>" + DatosTiendas[i].A3Nombre + "</div>";
            CodigoHTMLAreas += "</div>";
        }
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Dirección</strong></div >";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Estado: </strong>" + DatosTiendas[i].Estado + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + DatosTiendas[i].Municipio + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-6 col-xs-6'><strong>Localidas: </strong>" + DatosTiendas[i].Localidad + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-6 col-xs-6'><strong>Calle: </strong>" + DatosTiendas[i].Calle + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + DatosTiendas[i].Telefono + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>C.p.: </strong>" + DatosTiendas[i].CP + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Latitud: </strong>" + DatosTiendas[i].Latitud + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Longitud: </strong>" + DatosTiendas[i].Longitud + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Apertura: </strong>" + DatosTiendas[i].HApertura + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Cierre: </strong>" + DatosTiendas[i].HCierre + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLAreas += "<button class='btn btn-success' onclick='AbrirModalTienda(" + DatosTiendas[i].ID + ")' data-toggle='modal' data-target='#ModalTiendas'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarTienda(" + DatosTiendas[i].ID + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
    }
    Control.innerHTML = CodigoHTMLAreas;
}
// Guardar
function GuardarTienda() {
    if (ObligatoriosDatosP("Datostep-1") == true && ObligatoriosDatosP("Datostep-2") == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IDTienda = document.getElementById("TxtIDTienda").value;
            var NoTienda = document.getElementById("TxtNoTienda").value;
            var Nombre = document.getElementById("TxtTienda").value;

            var IDSupervision = document.getElementById("cmbIDSupervision").value;
            var TempSup = document.getElementById("cmbIDSupervision");
            var NombreS = TempSup.options[TempSup.selectedIndex].text;

            var IDSupervisor = document.getElementById("cmbIDSupervisor").value;
            var TempSuper = document.getElementById("cmbIDSupervisor");
            var UNombre = TempSuper.options[TempSuper.selectedIndex].text;

            var IDLider = document.getElementById("cmbIDLider").value;
            var TempIDPerfil = document.getElementById("cmbIDLider");
            var LNombre = TempIDPerfil.options[TempIDPerfil.selectedIndex].text;

            var IDEncargado1 = document.getElementById("cmbIDEncargado1").value;
            var TempIDEncargado1 = document.getElementById("cmbIDEncargado1");
            var E1Nombre = TempIDEncargado1.options[TempIDEncargado1.selectedIndex].text;

            var IDEncargado2 = document.getElementById("cmbIDEncargado2").value;
            var TempIDEncargado2 = document.getElementById("cmbIDEncargado2");
            var E2Nombre = TempIDEncargado2.options[TempIDEncargado2.selectedIndex].text;

            var IDEncargado3 = document.getElementById("cmbIDEncargado3").value;
            var TempIDEncargado3 = document.getElementById("cmbIDEncargado3");
            var E3Nombre = TempIDEncargado3.options[TempIDEncargado3.selectedIndex].text;

            var IDAuxsiliar1 = document.getElementById("cmbIDAuxsiliar1").value;
            var TempIDAuxsiliar1 = document.getElementById("cmbIDAuxsiliar1");
            var A1Nombre = TempIDAuxsiliar1.options[TempIDAuxsiliar1.selectedIndex].text;

            var IDAuxsiliar2 = document.getElementById("cmbIDAuxsiliar2").value;
            var TempIDAuxsiliar2 = document.getElementById("cmbIDAuxsiliar2");
            var A2Nombre = TempIDAuxsiliar2.options[TempIDAuxsiliar2.selectedIndex].text;

            var IDAuxsiliar3 = document.getElementById("cmbIDAuxsiliar3").value;
            var TempIDAuxsiliar3 = document.getElementById("cmbIDAuxsiliar3");
            var A3Nombre = TempIDAuxsiliar3.options[TempIDAuxsiliar3.selectedIndex].text;

            var IDEstado = document.getElementById("cmbEstado").value;
            var TempEdo = document.getElementById("cmbEstado");
            var Estado = TempEdo.options[TempEdo.selectedIndex].text;

            var IDMunicipio = document.getElementById("cmbMunicipio").value;
            var TempMuni = document.getElementById("cmbMunicipio");
            var Municipio = TempMuni.options[TempMuni.selectedIndex].text;

            var IDLocalidad = document.getElementById("cmbLocalidad").value;
            var TempLoca = document.getElementById("cmbLocalidad");
            var Localidad = TempLoca.options[TempLoca.selectedIndex].text;

            var Calle = document.getElementById("TxtCalle").value;
            var CP = document.getElementById("TxtCP").value;
            var Telefono = document.getElementById("TxtTelefono").value;
            var Latitud = document.getElementById("TxtLatitud").value;
            var Longitud = document.getElementById("TxtLongitud").value;
            var HApertura = document.getElementById("TxtHApertura").value;
            var HCierre = document.getElementById("TxtHCierre").value;

            var NoServicioLuz = document.getElementById("TxtNoServicioLuz").value;
            var IUSACodigo = document.getElementById("TxtIUSACodigo").value;
            var IUSAUsuario = document.getElementById("TxtIUSAUsuario").value;
            var IUSAContraseña = document.getElementById("TxtIUSAContrasena").value;
            var PCPAYUsuario = document.getElementById("TxtPCPAYUsuario").value;
            var PCPAYContraseña = document.getElementById("TxtPCPAYContraseña").value;

            var frm = new FormData();
            frm.append("IDTienda", IDTienda);
            frm.append("NoTienda", NoTienda);
            frm.append("Nombre", Nombre);
            frm.append("IDSupervision", IDSupervision);
            frm.append("NombreS", NombreS);
            frm.append("IDSupervisor", IDSupervisor);
            frm.append("UNombre", UNombre);
            frm.append("IDLider", IDLider);
            frm.append("LNombre", LNombre);
            frm.append("IDEncargado1", IDEncargado1);
            frm.append("E1Nombre", E1Nombre);
            frm.append("IDEncargado2", IDEncargado2);
            frm.append("E2Nombre", E2Nombre);
            frm.append("IDEncargado3", IDEncargado3);
            frm.append("E3Nombre", E3Nombre);
            frm.append("IDAuxsiliar1", IDAuxsiliar1);
            frm.append("A1Nombre", A1Nombre);
            frm.append("IDAuxsiliar2", IDAuxsiliar2);
            frm.append("A2Nombre", A2Nombre);
            frm.append("IDAuxsiliar3", IDAuxsiliar3);
            frm.append("A3Nombre", A3Nombre);
            frm.append("IDEstado", IDEstado);
            frm.append("Estado", Estado);
            frm.append("IDMunicipio", IDMunicipio);
            frm.append("Municipio", Municipio);
            frm.append("IDLocalidad", IDLocalidad);
            frm.append("Localidad", Localidad);
            frm.append("Calle", Calle);
            frm.append("CP", CP);
            frm.append("Telefono", Telefono);
            frm.append("Latitud", Latitud);
            frm.append("Longitud", Longitud);
            frm.append("HApertura", HApertura);
            frm.append("HCierre", HCierre);
            frm.append("NoServicioLuz", NoServicioLuz);
            frm.append("IUSACodigo", IUSACodigo);
            frm.append("IUSAUsuario", IUSAUsuario);
            frm.append("IUSAContraseña", IUSAContraseña);
            frm.append("PCPAYUsuario", PCPAYUsuario);
            frm.append("PCPAYContraseña", PCPAYContraseña);
            frm.append("Estatus", 1);
            $.ajax(
                {
                    type: "POST",
                    url: "/Tiendas/GuardarSucursal",
                    data: frm,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (data == 0) {
                            alert("Ocurrio un error");
                            document.getElementById("btnCancelar").click();
                        }
                        else if (data == -1) {
                            alert("Ya existe la Tienda");
                            document.getElementById("btnCancelar").click();
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
function EliminarTienda(id) {
    if (confirm("¿Desea eliminar el registo?") == 1) {
        $.get("/Tiendas/EliminarSucursal/?id=" + id, function (data) {
            if (data == -1) {
                alert("Ya existe la sucursal");
            }
            else {
                if (data == 0) {
                    alert("Ocurrio un error");
                } else {
                    alert("Se elimino correctamente");
                    Inicializar();
                }
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
function llenarComboPersonal(Datos, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
    for (var i = 0; i < Datos.length; i++) {
        contenido += "<option value='" + Datos[i].ID + "'>" + Datos[i].Nombre + " " + Datos[i].APaterno + " " + Datos[i].AMaterno + "</option>";
    }
    control.innerHTML = contenido;
}
//abrir PopUp
function AbrirModalTienda(id) {
    var controlesObligatorio = document.getElementsByClassName("Datostep-1");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("border-danger");
    }
    var controlesObligatorio = document.getElementsByClassName("Datostep-2");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("border-danger");
    }
    if (id == 0) {
        Limpiar();
        LimpiarSelect();
    }
    else {
        $.get("/Tiendas/BDTienda/?ID=" + id, function (data) {
            document.getElementById("TxtIDTienda").value = data[0].IDTienda;
            document.getElementById("TxtNoTienda").value = data[0].NoTienda;
            document.getElementById("TxtTienda").value = data[0].Nombre;
            document.getElementById("cmbIDSupervision").value = data[0].IDSupervision;
            document.getElementById("cmbIDSupervisor").value = data[0].IDSupervisor;
            document.getElementById("cmbIDLider").value = data[0].IDLider;
            document.getElementById("cmbIDEncargado1").value = data[0].IDEncargado1;
            document.getElementById("cmbIDEncargado2").value = data[0].IDEncargado2;
            document.getElementById("cmbIDEncargado3").value = data[0].IDEncargado3;
            document.getElementById("cmbIDAuxsiliar1").value = data[0].IDAuxsiliar1;
            document.getElementById("cmbIDAuxsiliar2").value = data[0].IDAuxsiliar2;
            document.getElementById("cmbIDAuxsiliar3").value = data[0].IDAuxsiliar3;
            document.getElementById("cmbEstado").value = data[0].IDEstado;
            $.get("/Cardinal/BDMunicipio/?IDE=" + data[0].IDEstado, function (Municipios) {
                llenarCombo(Municipios, document.getElementById("cmbMunicipio"), true);
                document.getElementById("cmbMunicipio").value = data[0].IDMunicipio;
            });
            $.get("/Cardinal/BDLocalidades/?IDM=" + data[0].IDMunicipio, function (Localidades) {
                llenarCombo(Localidades, document.getElementById("cmbLocalidad"), true);
                document.getElementById("cmbLocalidad").value = data[0].IDLocalidad;
            });            
            document.getElementById("TxtCalle").value = data[0].Calle;
            document.getElementById("TxtCP").value = data[0].CP;
            document.getElementById("TxtTelefono").value = data[0].Telefono;
            document.getElementById("TxtLatitud").value = data[0].Latitud;
            document.getElementById("TxtLongitud").value = data[0].Longitud;
            document.getElementById("TxtHApertura").value = data[0].HApertura;
            document.getElementById("TxtHCierre").value = data[0].HCierre;
            document.getElementById("TxtNoServicioLuz").value = data[0].NoServicioLuz;
            document.getElementById("TxtIUSACodigo").value = data[0].IUSACodigo;
            document.getElementById("TxtIUSAUsuario").value = data[0].IUSAUsuario;
            document.getElementById("TxtIUSAContrasena").value = data[0].IUSAContraseña;
            document.getElementById("TxtPCPAYUsuario").value = data[0].PCPAYUsuario;
            document.getElementById("TxtPCPAYContraseña").value = data[0].PCPAYContraseña;
        });
    }
    Pasos(0);
}
function Pasos(Step) {
    let paso = document.getElementsByClassName("steps");
    let avance = document.getElementById("avance");
    var ClaseM = 0;
    for (var i = 0; i < paso.length; i++) {
        //en cuantos elementos esta la clase mostrar
        if ($(paso[i]).hasClass("mostrar")) {
            //extrae la clase activa
            ClaseM = (paso[i].id).substring(5, 6);
        }
    }
    var ClaseMostrar = "";
    if (Step == 0) {
        ClaseMostrar = "step-1";
    }
    else {
        ClaseMostrar = "step-" + (parseInt(ClaseM, 10) + Step);
    }
    if (ClaseMostrar == "step-1") {
        avance.style.width = "0%";
        MostrarDiv(ClaseMostrar);
    }
    else if (ObligatoriosDatosP("Datostep-1") == true && ClaseMostrar == "step-2") {
        avance.style.width = "25%";
        MostrarDiv(ClaseMostrar);
    }
    else if (ObligatoriosDatosP("Datostep-2") == true && ClaseMostrar == "step-3") {
        avance.style.width = "50%";
        MostrarDiv(ClaseMostrar);
    }
    else if (ObligatoriosDatosP("Datostep-3") == true && ClaseMostrar == "step-4") {
        avance.style.width = "75%";
        MostrarDiv(ClaseMostrar);
        Informacion();
    }
    else if (ObligatoriosDatosP("Datostep-4") == true && ClaseMostrar == "step-5") {
        avance.style.width = "100%";
        MostrarDiv(ClaseMostrar);
        Informacion2();
    }
    else if (ObligatoriosDatosP("Datostep-5") == true && ClaseMostrar == "step-6") {
        avance.style.width = "100%";
        GuardarTienda();
        MostrarDiv(ClaseMostrar);
    }
    else {
        //alert("Entro al otro else");
    }
}
//Mostrar u ocultar según la clase
function MostrarDiv(ClaseMostrar) {
    for (let o = 1; o < 7; o++) {
        let NClsO = "step-" + o;
        let COcul = document.getElementsByClassName(NClsO);
        for (let CO = 0; CO < COcul.length; CO++) {
            COcul[CO].classList.remove('mostrar');
            COcul[CO].classList.add('ocultar');
        }
    }
    let CMos = document.getElementsByClassName(ClaseMostrar);
    for (let m = 0; m < CMos.length; m++) {
        CMos[m].classList.remove('ocultar');
        CMos[m].classList.add('mostrar');
    }
}
function Limpiar() {
    var controles = document.getElementsByClassName("limpiar");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        controles[i].value = "";
    }
}
function LimpiarSelect() {
    var controles = document.getElementsByClassName("SelectCLS");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        document.getElementById(controles[i].id).value = 0;
    }
}
function ObligatoriosDatosP(DatosClase) {
    let exito = true;
    let CtrlObligatorio = document.getElementsByClassName(DatosClase);
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
function Informacion() {
    let INF = "";
    INF += "<div class='row'>";
    INF += "<div class='col-md-12 col-sm-12 col-xs-12' style='line-height: 100px; text-align: center; background-color: #000000; color:#ffffff'><H4>Datos principales</H4></div>";
    INF += "</div>";

    INF += "<div class='row'>";
    INF += "<div class='col-md-4 col-sm-4 col-xs-12'><strong>Número: </strong>" + document.getElementById("TxtNoTienda").value + "</div>";
    INF += "<div class='col-md-4 col-sm-4 col-xs-12'><strong>Nombre: </strong>" + document.getElementById("TxtTienda").value + "</div>";
    INF += "</div>";

    let TempEdo = document.getElementById("cmbEstado");
    let Estado = TempEdo.options[TempEdo.selectedIndex].text;
    INF += "<div class='row'>";
    INF += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Estado: </strong>" + Estado + "</div>";
    INF += "</div>";

    let TempMucip = document.getElementById("cmbMunicipio");
    let Municipio = TempMucip.options[TempMucip.selectedIndex].text;
    INF += "<div class='row'>";
    INF += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Municipio: </strong>" + Municipio + "</div>";
    INF += "</div>";

    let TempLocal = document.getElementById("cmbLocalidad");
    let Localidad = TempLocal.options[TempLocal.selectedIndex].text;
    INF += "<div class='row'>";
    INF += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Localidad: </strong>" + Localidad + "</div>";
    INF += "</div>";

    INF += "<div class='row'>";
    INF += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Dirección: </strong>" + document.getElementById("TxtCalle").value + "</div>";
    INF += "</div>";

    INF += "<div class='row'>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + document.getElementById("TxtTelefono").value + "</div>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Código postal: </strong>" + document.getElementById("TxtCP").value + "</div>";
    INF += "</div>";

    INF += "<div class='row'>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Latitud: </strong>" + document.getElementById("TxtLatitud").value + "</div>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Longitud: </strong>" + document.getElementById("TxtLongitud").value + "</div>";
    INF += "</div>";
    INF += "<div class='row'>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Hora de apertura: </strong>" + document.getElementById("TxtHApertura").value + "</div>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Hora de cierre: </strong>" + document.getElementById("TxtHCierre").value + "</div>";
    INF += "</div>";

    INF += "<div class='row'>";
    let TempSupervision = document.getElementById("cmbIDSupervision");
    let Supervision = TempSupervision.options[TempSupervision.selectedIndex].text;
    INF += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Supervisión: </strong>" + Supervision + "</div>";

    INF += "<br/>";

    INF += "</div>";
    INF += "<div class='row'>";
    INF += "<div class='col-md-12 col-sm-12 col-xs-12' style='line-height: 100px; text-align: center; background-color: #000000; color:#ffffff'><H4>Datos de Servicios y Plataformas</H4></div>";
    INF += "</div >";
    //*****************************************************************************************************************************************
    INF += "<div class='row'>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>No. de servicio de CFE: </strong>" + document.getElementById("TxtNoServicioLuz").value + "</div>";
    INF += "</div>";
    //*****************************************************************************************************************************************
    INF += "<div class='row'>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Código IUSA: </strong>" + document.getElementById("TxtIUSACodigo").value + "</div>";
    INF += "</div>";
    //*****************************************************************************************************************************************
    INF += "<div class='row'>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Usuario de IUSA: </strong>" + document.getElementById("TxtIUSAUsuario").value + "</div>";
    INF += "</div>";
    //*****************************************************************************************************************************************
    INF += "<div class='row'>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Contraseña de IUSA: </strong>" + document.getElementById("TxtIUSAContrasena").value + "</div>";
    INF += "</div>";
    //*****************************************************************************************************************************************
    INF += "<div class='row'>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Usuario de PCPay: </strong>" + document.getElementById("TxtPCPAYUsuario").value + "</div>";
    INF += "</div>";
    //*****************************************************************************************************************************************
    INF += "<div class='row'>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Contraseña de PCPay: </strong>" + document.getElementById("TxtPCPAYContraseña").value + "</div>";
    INF += "</div>";
    //*****************************************************************************************************************************************
    document.getElementById("DivDatos").innerHTML = INF;
}
function Informacion2() {
    let INF = "";
    INF += "<br/>";
    INF += "<div class='row'>";
    INF += "<div class='col-md-12 col-sm-12 col-xs-12' style='line-height: 100px; text-align: center; background-color: #000000; color:#ffffff'><H4>Información del personal</H4></div>";
    INF += "</div >";
    //*****************************************************************************************************************************************
    INF += "<div class='row'>";
    let TempSupervisor = document.getElementById("cmbIDSupervisor");
    let Supervisor = TempSupervisor.options[TempSupervisor.selectedIndex].text;
    INF += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Supervisor: </strong>" + Supervisor + "</div>";
    INF += "</div>";
    INF += "<br/>";
    //*****************************************************************************************************************************************
    INF += "<div class='row'>";
    let TempLider = document.getElementById("cmbIDLider");
    let Lider = TempLider.options[TempLider.selectedIndex].text;
    INF += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Líder: </strong>" + Lider + "</div>";
    INF += "</div>";
    INF += "<br/>";
    //*****************************************************************************************************************************************
    INF += "<div class='row'>";
    let TempEncargado1 = document.getElementById("cmbIDEncargado1");
    let Encargado1 = TempEncargado1.options[TempEncargado1.selectedIndex].text;
    INF += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Encargado: </strong>" + Encargado1 + "</div>";
    INF += "</div>";
    INF += "<br/>";
    //*****************************************************************************************************************************************
    INF += "<div class='row'>";
    let TempEncargado2 = document.getElementById("cmbIDEncargado2");
    let Encargado2 = TempEncargado2.options[TempEncargado2.selectedIndex].text;
    INF += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Encargado: </strong>" + Encargado2 + "</div>";
    INF += "</div>";
    INF += "<br/>";
    //*****************************************************************************************************************************************
    INF += "<div class='row'>";
    let TempEncargado3 = document.getElementById("cmbIDEncargado3");
    let Encargado3 = TempEncargado3.options[TempEncargado3.selectedIndex].text;
    INF += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Encargado: </strong>" + Encargado3 + "</div>";
    INF += "</div>";
    INF += "<br/>";
    //*****************************************************************************************************************************************
    INF += "<div class='row'>";
    let TempAuxiliar1 = document.getElementById("cmbIDAuxsiliar1");
    let Auxiliar1 = TempAuxiliar1.options[TempAuxiliar1.selectedIndex].text;
    INF += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Auxiliar: </strong>" + Auxiliar1 + "</div>";
    INF += "</div>";
    INF += "<br/>";
    //*****************************************************************************************************************************************
    INF += "<div class='row'>";
    let TempAuxiliar2 = document.getElementById("cmbIDAuxsiliar2");
    let Auxiliar2 = TempAuxiliar2.options[TempAuxiliar2.selectedIndex].text;
    INF += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Auxiliar: </strong>" + Auxiliar2 + "</div>";
    INF += "</div>";
    INF += "<br/>";
    //*****************************************************************************************************************************************
    INF += "<div class='row'>";
    let TempAuxiliar3 = document.getElementById("cmbIDAuxsiliar3");
    let Auxiliar3 = TempAuxiliar3.options[TempAuxiliar3.selectedIndex].text;
    INF += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Auxiliar: </strong>" + Auxiliar3 + "</div>";
    INF += "</div>";
    //*****************************************************************************************************************************************
    INF += "<div class='row'>";
    INF += "<div class='col-md-12 col-sm-12 col-xs-12'><h4 style='color: red'><strong>Favor de verificar la información ya que el proceso de registro está por concluir.</strong></h4></div>";
    INF += "</div>";
    document.getElementById("DivDatos2").innerHTML = INF;
}
