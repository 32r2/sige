LlenarCMBPrin();

//if (DatosAreas.length !== 0) {
//    llenarCombo(DatosAreas, document.getElementById("cmbArea"), true);
//}
//else {
//    alert("No hay datos en la tabla Áreas.");
//}


//funcion general para llenar los select
function llenarCombo(data, control, primerElemento) {
    var contenido = "";
    if (primerElemento == true) {
        contenido += "<option value='0'>--Seleccione--</option>";
    }
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}

//llena los combosprincipales
function LlenarCMBPrin() {
    $.get("/Cardinal/BDAreas", function (DatosAreas) {
        if (DatosAreas.length !== 0) {
            llenarCombo(DatosAreas, document.getElementById("cmbArea"), true);
        }
        else {
            alert("No hay datos en la tabla Áreas.");
        }
    });
    $.get("/Cardinal/BDEstados", function (DatosEstados) {
        if (DatosEstados.length !== 0) {
            llenarCombo(DatosEstados, document.getElementById("cmbEstado"), true);
        }
        else {
            alert("No hay datos en la tabla Estados.");
        }
    });
    $.get("/Cardinal/BDTiendas", function (DatosTiendas) {
        if (DatosTiendas.length !== 0) {
            llenarCombo(DatosTiendas, document.getElementById("cmbIDTienda"), true);
        }
        else {
            //toastr.error('I do not think that word means what you think it means.', 'Inconceivable!');
            alert("No hay datos en la tabla tiendas.");
        }

    });
}

//event Change index Areas
var IDA = document.getElementById("cmbArea");
IDA.addEventListener("change", function () {
    $.get("/Cardinal/BDSubAreas/?IDA=" + IDA.value, function (data) {
        llenarCombo(data, document.getElementById("cmbSubArea"), true);
    });
});

//event Change index Estados para llenar el combobox Municipios
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
function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {        
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
    
}
