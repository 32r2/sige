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
            llenarCombo(DatosSupervisores, document.getElementById("cmbIDSupervisor"));
        }
        else {
            alert("No hay datos que mostrar Supervisores");
        }
    });
    $.get("/Usuarios/BDUserPerfil/?IDPerfil=" + 10, function (DatosLider) {
        if (DatosLider.lenght != 0) {
            llenarCombo(DatosLider, document.getElementById("cmbIDLider"));
        }
        else {
            alert("No hay datos que mostrar");
        }
    });
    //Encargados
    $.get("/Usuarios/BDUserPerfil/?IDPerfil=" + 11, function (DatosEncargados) {
        if (DatosEncargados.lenght != 0) {
            llenarCombo(DatosEncargados, document.getElementById("cmbIDEncargado1"));
            llenarCombo(DatosEncargados, document.getElementById("cmbIDEncargado2"));
            llenarCombo(DatosEncargados, document.getElementById("cmbIDEncargado3"));
        }
        else {
            alert("No hay datos que mostrar");
        }
    });
    //Auxiliares
    $.get("/Usuarios/BDUserPerfil/?IDPerfil=" + 12, function (DatosAuxiliares) {
        if (DatosAuxiliares.lenght != 0) {
            llenarCombo(DatosAuxiliares, document.getElementById("cmbIDAuxsiliar1"));
            llenarCombo(DatosAuxiliares, document.getElementById("cmbIDAuxsiliar2"));
            llenarCombo(DatosAuxiliares, document.getElementById("cmbIDAuxsiliar3"));
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
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Longitud: </strong>" + DatosTiendas[i].Logitud + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Apertura: </strong>" + DatosTiendas[i].HApertura + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Cierre: </strong>" + DatosTiendas[i].HCierre + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLAreas += "<button class='btn btn-success' onclick='AbrirMArea(" + DatosTiendas[i].ID + ")' data-toggle='modal' data-target='#ModalArea'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarArea(" + DatosTiendas[i].ID + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
    }
    Control.innerHTML = CodigoHTMLAreas;
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
//abrir PopUp
function abrirModal(id) {
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("error");
    }
    if (id == 0) {
        Limpiar();
    }
    else {
        $.get("/Tiendas/BDStore/?ID=" + id, function (data) {
            LlenarMunicipiosCMB(data[0].IDEstado);
            LlenarLocalidadesCMB(data[0].IDMunicipio);
        });
        $.get("/Tiendas/BDTienda/?ID=" + id, function (data) {
            document.getElementById("TxtIDTienda").value = data[0].IDTienda;
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
            document.getElementById("TxtCalle").value = data[0].Calle;
            document.getElementById("TxtCP").value = data[0].CP;
            document.getElementById("TxtTelefono").value = data[0].Telefono;
            document.getElementById("TxtLatitud").value = data[0].Latitud;
            document.getElementById("TxtLongitud").value = data[0].Longitud;
            document.getElementById("TxtHApertura").value = data[0].HApertura;
            document.getElementById("TxtHCierre").value = data[0].HCierre;

        });
        $.get("/Tiendas/BDStore/?ID=" + id, function (data) {            
            buscartext(data[0].NombreM, "cmbMunicipio");

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
    else if (ClaseMostrar == "step-4") {
        avance.style.width = "75%";
        MostrarDiv(ClaseMostrar);
        Informacion();
    }
    else if (ObligatoriosDatosP("Datostep-4") == true && ClaseMostrar == "step-5" && document.getElementById("mensage").innerText === "Autenticación correcta") {
        avance.style.width = "100%";
        GUsuario();
        MostrarDiv(ClaseMostrar);
    }
    else {
        //alert("Entro al otro else");
    }
}
//Mostrar u ocultar según la clase
function MostrarDiv(ClaseMostrar) {
    for (let o = 1; o < 6; o++) {
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