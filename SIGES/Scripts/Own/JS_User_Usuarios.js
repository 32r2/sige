Consulta();
function Consulta() {
    $.get("/Usuarios/BDUsuarios", function (DatosUsuarios) {
        CrearTabla(DatosUsuarios);
    });
    $.get("/CardinalSystem/BDPerfiles", function (InfPerfiles) {
        llenarCombo(InfPerfiles, document.getElementById("cmbPerfil"), true);
    });
}
$("#TxtFnaci").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
);

//funcion general para llenar los select
function llenarCombo(InfPerfiles, control, primerElemento) {
    var contenido = "";
    if (primerElemento == true) {
        contenido += "<option value='0'>--Seleccione--</option>";
    }
    for (var i = 0; i < InfPerfiles.length; i++) {
        contenido += "<option value='" + InfPerfiles[i].ID + "'>" + InfPerfiles[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}

function CrearTabla(DatosUsuarios) {
    var CodHtml = "";
    CodHtml += "<table id='tablas'  class='table table table-sm' >";
    CodHtml += "<thead>";
    CodHtml += "<tr>";
    CodHtml += "<td>Nombre Completo</td>";
    CodHtml += "<td>Área</td>";
    CodHtml += "<td>Correo Electrónico</td>";
    CodHtml += "<td>Teléfono</td>";
    CodHtml += "<td>Ingreso</td>";
    CodHtml += "<td>Opciones</td>";
    CodHtml += "</tr>";
    CodHtml += "</thead>";
    CodHtml += "<tbody>";
    for (var i = 0; i < DatosUsuarios.length; i++) {
        CodHtml += "<tr>";
        CodHtml += "<td>" + DatosUsuarios[i].Nombre + " " + DatosUsuarios[i].APaterno + " " + DatosUsuarios[i].AMaterno + "</td>";
        CodHtml += "<td>" + DatosUsuarios[i].NArea + "</td>";
        CodHtml += "<td>" + DatosUsuarios[i].Correo + "</td>";
        CodHtml += "<td>" + DatosUsuarios[i].Telefono + "</td>";
        CodHtml += "<td>" + DatosUsuarios[i].FechaIngreso + "</td>";
        CodHtml += "<td>";
        CodHtml += "<button class='btn btn-primary' onclick='abrirModal(" + DatosUsuarios[i].ID + ")' data-toggle='modal' data-target='#myModal'><i class='fas fa-edit'></i></button>";
        CodHtml += "<button class='btn btn-danger' onclick='eliminar(" + DatosUsuarios[i].ID + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodHtml += "</td>";
        CodHtml += "</tr>";
    }
    CodHtml += "</tbody>";
    CodHtml += "</table>";
    document.getElementById("tabla").innerHTML = CodHtml;
    //$("#tablas").dataTable(
    //    {
    //        searching: false
    //    }
    //);
}
//abrir PopUp
function abrirModal(id) {
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    //Limpiar();
    for (var i = 0; i < controlesObligatorio.length; i++) {
        controlesObligatorio[i].parentNode.classList.remove("error");
    }
    if (id == 0) {
        Limpiar();
    }
    else {
        $.get("/Usuarios/BDUsuario/?ID=" + id, function (InfUsuario) {
            document.getElementById("TxtIDUsuario").value = InfUsuario[0].IDUsuario;
            document.getElementById("TxtCURP").value = InfUsuario[0].CURP;
            document.getElementById("TxtNombreUser").value = InfUsuario[0].Nombre;
            document.getElementById("TxtAPaterno").value = InfUsuario[0].APaterno;
            document.getElementById("TxtAMaterno").value = InfUsuario[0].AMaterno;
            //document.getElementById("PBFoto").src = "data:image/png;base64," + InfUsuario[0].FOTOMOSTRAR;
            document.getElementById("TxtFnaci").value = InfUsuario[0].FechaNaci;
            document.getElementById("TxtRFC").value = InfUsuario[0].RFC;
            document.getElementById("TxtNSS").value = InfUsuario[0].NoSS;
            document.getElementById("cmbEstado").value = InfUsuario[0].IDEstado;
            document.getElementById("cmbPerfil").value = InfUsuario[0].IDPerfil;
            document.getElementById("cmbArea").value = InfUsuario[0].IDArea;
            $.get("/Cardinal/BDMunicipio/?IDE=" + InfUsuario[0].IDEstado, function (Municipios) {
                llenarCombo(Municipios, document.getElementById("cmbMunicipio"), true);
                document.getElementById("cmbMunicipio").value = InfUsuario[0].IDMunicipio;
            });
            $.get("/Cardinal/BDLocalidades/?IDM=" + InfUsuario[0].IDMunicipio, function (Localidades) {
                llenarCombo(Localidades, document.getElementById("cmbLocalidad"), true);
                document.getElementById("cmbLocalidad").value = InfUsuario[0].IDLocalidad;
            });
            $.get("/Cardinal/BDSubAreas/?IDA=" + InfUsuario[0].IDArea, function (Subareas) {
                llenarCombo(Subareas, document.getElementById("cmbSubArea"), true);
                document.getElementById("cmbSubArea").value = InfUsuario[0].IDSubArea;
            });
            document.getElementById("TxtCorreo").value = InfUsuario[0].Correo;
            document.getElementById("TxtTelefono").value = InfUsuario[0].Telefono;
            //document.getElementById("TxtContrasena").value = InfUsuario[0].Contraseña;
            //document.getElementById("TxtContrasenaConf").value = InfUsuario[0].Contraseña;
        });
    }
    Pasos(0);
}

function Pasos(Step) {
    let paso = document.getElementsByClassName("steps");
    var ClaseM = 0;
    for (var i = 0; i < paso.length; i++) {
        //en cuantos elementos esta la clase mostrar
        if ($(paso[i]).hasClass("mostrar")) {
            ClaseM = (paso[i].id).substring(5, 6);
        }
    }
    var ClaseMostrar = "";
    if (Step == 0) {
        ClaseMostrar = "step-1";
    } else {
        ClaseMostrar = "step-" + (parseInt(ClaseM, 10) + Step);
    }
    for (var i = 0; i < paso.length; i++) {
        if ($(paso[i]).hasClass(ClaseMostrar)) {
            paso[i].classList.remove('ocultar');
            paso[i].classList.add('mostrar');
        } else {
            paso[i].classList.remove('mostrar');
            paso[i].classList.add('ocultar');
        }
        if (ClaseMostrar == "step-1") {
            document.getElementById("BtnCancelar").classList.remove('ocultar');
            document.getElementById("BtnCancelar").classList.add('mostrar');
            document.getElementById("BtnRetrocdr").classList.remove('mostrar');
            document.getElementById("BtnRetrocdr").classList.add('ocultar');
            document.getElementById("BtnCntinuar").classList.remove('ocultar');
            document.getElementById("BtnCntinuar").classList.add('mostrar');
            document.getElementById("BtnFinalzar").classList.remove('mostrar');
            document.getElementById("BtnFinalzar").classList.add('ocultar');
        } else if (ClaseMostrar == "step-5") {
            document.getElementById("BtnCancelar").classList.remove('mostrar');
            document.getElementById("BtnCancelar").classList.add('ocultar');
            document.getElementById("BtnCntinuar").classList.remove('mostrar');
            document.getElementById("BtnCntinuar").classList.add('ocultar');
            document.getElementById("BtnRetrocdr").classList.remove('mostrar');
            document.getElementById("BtnRetrocdr").classList.add('ocultar');
            document.getElementById("BtnFinalzar").classList.remove('ocultar');
            document.getElementById("BtnFinalzar").classList.add('mostrar');
        } else {
            document.getElementById("BtnCancelar").classList.remove('ocultar');
            document.getElementById("BtnCancelar").classList.add('mostrar');
            document.getElementById("BtnRetrocdr").classList.remove('ocultar');
            document.getElementById("BtnRetrocdr").classList.add('mostrar');
            document.getElementById("BtnCntinuar").classList.remove('ocultar');
            document.getElementById("BtnCntinuar").classList.add('mostrar');
            document.getElementById("BtnFinalzar").classList.remove('mostrar');
            document.getElementById("BtnFinalzar").classList.add('ocultar');
        }
    }
}

var Asig = document.getElementById("cmbAsignacion");
Asig.addEventListener("change", function () {
    if (Asig.value == "Oficina") {
        let DatosOficina = [{ "ID": 1, "Nombre": "Oficina" }];
        llenarCombo(DatosOficina, document.getElementById("cmbSitio"), true);
    }
    else if (Asig.value == "Campo") {
        $.get("/Cardinal/BDSupervision", function (DatosSupervisiones) {
            if (DatosSupervisiones.length !== 0) {
                llenarCombo(DatosSupervisiones, document.getElementById("cmbSitio"), true);
            }
            else {
                alert("No hay datos en la tabla Supervision.");
            }
        });
    }
    else {
        $.get("/Cardinal/BDTiendas", function (DatosTiendas) {
            if (DatosTiendas.length !== 0) {
                llenarCombo(DatosTiendas, document.getElementById("cmbSitio"), true);
            }
            else {
                alert("No hay datos en la tabla Tiendas.");
            }
        });
    }
});

function Limpiar() {
    var controles = document.getElementsByClassName("limpiar");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        controles[i].value = "";
    }
}

// Guardar
function Guardar() {
    var pas1 = document.getElementById("TxtContrasena").value;
    var pas2 = document.getElementById("TxtContrasenaConf").value;
    if (pas1 == pas2) {
        if (CamposObligatorios() == true) {
            if (confirm("¿Desea aplicar los cambios?") == 1) {
                var IDUsuario = document.getElementById("TxtIDUsuario").value;
                var CURP = document.getElementById("TxtCURP").value;
                var Nombre = document.getElementById("TxtNombreUser").value;
                var APaterno = document.getElementById("TxtAPaterno").value;
                var AMaterno = document.getElementById("TxtAMaterno").value;
                var Foto = document.getElementById("PBFoto").src.replace("data:image/png;base64,", "");
                var FNacimiento = document.getElementById("TxtFnaci").value;
                var IDEstado = document.getElementById("cmbEstado").value;
                var IDMunicipio = document.getElementById("cmbMunicipio").value;
                var IDLocalidad = document.getElementById("cmbLocalidad").value;
                var RFC = document.getElementById("TxtRFC").value;
                var NoSS = document.getElementById("TxtNSS").value;
                var Correo = document.getElementById("TxtCorreo").value;
                var Telefono = document.getElementById("TxtTelefono").value;
                var IDPerfil = document.getElementById("cmbPerfil").value;
                //**consulta para obtener el nivel
                $.get("/CardinalSystem/BDPerfil/?IDPerfil=" + IDPerfil, function (Perfil) {
                    var LVLPerfil = Perfil[0].LVLPerfil;
                });                
                //**
                var IDArea = document.getElementById("cmbArea").value;
                var TempNA = document.getElementById("cmbArea");
                var NombreA = TempNA.options[TempNA.selectedIndex].text;
                var IDSubArea = document.getElementById("cmbSubArea").value;
                var TempNSA = document.getElementById("cmbSubArea");
                var NombreAS = TempNSA.options[TempNSA.selectedIndex].text;
                //**
                var Asignacion = document.getElementById("cmbSubArea");
                var Sitio = document.getElementById("cmbSubArea");
                var IDPadre = document.getElementById("cmbSubArea");
                var Usuario = document.getElementById("cmbSubArea");
                //**
                var Contraseña = document.getElementById("TxtContrasena").value;                

                //*****************************************************************************************
                
                var f = new Date();
                var FIngreso = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
                var frm = new FormData();
                frm.append("IDUsuario", IDUsuario);
                frm.append("CURP", CURP);
                frm.append("IDArea", IDArea);
                frm.append("NombreA", NombreA);
                frm.append("IDSubArea", IDSubArea);
                frm.append("NombreAS", NombreAS);
                frm.append("IDPerfil", IDPerfil);
                frm.append("Perfil", Perfil);
                frm.append("Nombre", Nombre);
                frm.append("APaterno", APaterno);
                frm.append("AMaterno", AMaterno);
                frm.append("FNacimiento", FNacimiento);
                frm.append("Contraseña", Contraseña);
                frm.append("IDEstado", IDEstado);
                frm.append("NombreE", NombreE);
                frm.append("IDMunicipio", IDMunicipio);
                frm.append("NombreM", NombreM);
                frm.append("IDLocalidad", IDLocalidad);
                frm.append("NombreL", NombreL);
                frm.append("Correo", Correo);
                frm.append("Telefono", Telefono);
                frm.append("FIngreso", FIngreso);
                frm.append("cadF", Foto);
                frm.append("Estatus", 1);
                $.ajax({
                    type: "POST",
                    url: "/Usuarios/guardar",
                    data: frm,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (data == 0) {
                            alert("Ocurrio un error");
                        }
                        else if (data == -1) {
                            alert("Ya existe un usuario con esa información");
                        }
                        else {
                            alert("Se ejecuto correctamente");
                            Consulta();
                            document.getElementById("btnCancelar").click();
                        }
                    }
                }
                );
            }
        }
    }
    else {
        alert("Ingrese nuevamente su contraseña")
    }
}
