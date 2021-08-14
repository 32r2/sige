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
    //Operador=Supervisor
    $.get("/Usuarios/BDUserPerfil/?IDPerfil=" + 9, function (DatosSupervisores) {
        if (DatosSupervisores.lenght != 0) {
            llenarCombo(DatosSupervisores, document.getElementById("cmbIDSupervisor"));
        }
        else {
            alert("No hay datos que mostrar Supervisores");
        }
    });
    //Lider de tienda
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