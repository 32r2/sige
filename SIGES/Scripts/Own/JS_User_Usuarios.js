Consulta();
function Consulta() {
    $.get("/Usuarios/BDUsuarios", function (DatosUsuarios) {
        CrearTabla(DatosUsuarios);
    });
    $.get("/CardinalSystem/BDPerfiles", function (InfPerfiles) {
        llenarCombo(InfPerfiles, document.getElementById("cmbPerfil"), true);
    });
}

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
            document.getElementById("cmbAsignacion").value = InfUsuario[0].Asignacion;
            Sitio(InfUsuario[0].Asignacion, InfUsuario[0].Sitio);
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
        MostrarDiv(ClaseMostrar);
    }
    else if (ObligatoriosDatosP("Datostep-1") == true && ClaseMostrar == "step-2") {
        MostrarDiv(ClaseMostrar);
    }
    else if (ObligatoriosDatosP("Datostep-2") == true && ClaseMostrar == "step-3") {
        MostrarDiv(ClaseMostrar);
        Informacion();
    }
    else if (ClaseMostrar == "step-4") {
        MostrarDiv(ClaseMostrar);

    }
    else {
        //alert("Entro al otro else");
    }
}
//Crear Usuario
function NomUsuar
//Unir campos
function Informacion() {
    let INF = "";
    INF += "<table style='border: solid black; border-collapse: collapse;'>";

    INF += "<tr><th colspan='4' style='text-align: center; background-color: black; color: white;'><H4>DATOS PERSONALES</H4></th></tr>";
    INF += "<tr><td>CURP:</td><td>" + document.getElementById("TxtCURP").value + "</td><td>F. de Nacimiento:</td><td>" + document.getElementById("TxtFnaci").value + "</td></tr>";
    INF += "<tr><td>Nombre completo:</td><td colspan='3'>" + document.getElementById("TxtNombreUser").value + " " + document.getElementById("TxtAPaterno").value + " " + document.getElementById("TxtAMaterno").value + "</td></tr>";
    INF += "<tr><td>RFC:</td><td>" + document.getElementById("TxtRFC").value + "</td><td>NSS:</td><td>" + document.getElementById("TxtNSS").value + "</td></tr>";

    INF += "<tr><th colspan='4' style='text-align: center; background-color: black; color: white;'><H4>INFORMACIÓN DE CONTACTO</H4></th></tr>";
    INF += "<tr><td>Correo:</td><td>" + document.getElementById("TxtCorreo").value + "</td><td>No. De Teléfono:</td><td>" + document.getElementById("TxtTelefono").value + "</td></tr>";

    INF += "<tr><th colspan='4' style='text-align: center; background-color: black; color: white;'><H4>DIRECCIÓN</H4></th></tr>";

    let TempEdo = document.getElementById("cmbEstado");
    let Estado = TempEdo.options[TempEdo.selectedIndex].text;
    INF += "<tr><td>Estado:</td><td colspan='3'>" + Estado + "</td></tr>";

    let TempMucip = document.getElementById("cmbMunicipio");
    let Municipio = TempMucip.options[TempMucip.selectedIndex].text;
    INF += "<tr><td>Municipio:</td><td colspan='3'>" + Municipio + "</td></tr>";

    let TempLocal = document.getElementById("cmbLocalidad");
    let Localidad = TempLocal.options[TempLocal.selectedIndex].text;
    INF += "<tr><td>Localidad:</td><td colspan='3'>" + Localidad + "</td></tr>";

    INF += "<tr><th colspan='4' style='text-align: center; background-color: black; color: white;'><H4>LUGAR DE TRABAJO</H4></th></tr>";

    let TempAsig = document.getElementById("cmbAsignacion");
    let Asignacion = TempAsig.options[TempAsig.selectedIndex].text;
    let TempUbic = document.getElementById("cmbSitio");
    let Sitio = TempUbic.options[TempUbic.selectedIndex].text;
    INF += "<tr><td>Lugar:</td><td>" + Asignacion + "</td><td>Ubicación:</td><td>" + Sitio + "</td></tr>";

    let TempNA = document.getElementById("cmbArea");
    let NArea = TempNA.options[TempNA.selectedIndex].text;
    let TempNSA = document.getElementById("cmbSubArea");
    let NSArea = TempNSA.options[TempNSA.selectedIndex].text;

    INF += "<tr><td>Área:</td><td>" + NArea + "</td><td>Subárea:</td><td>" + NSArea + "</td></tr>";
    let TempPerf = document.getElementById("cmbPerfil");
    let Perfil = TempPerf.options[TempPerf.selectedIndex].text;
    INF += "<tr><td>Perfil:</td><td>" + Perfil + "</td><td></td><td></td></tr>";
    INF += "</table>";
    document.getElementById("DivDatos").innerHTML = INF;
}
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

var IDE = document.getElementById("cmbEstado");
IDE.addEventListener("change", function () {
    $.get("/Cardinal/BDMunicipio/?IDE=" + IDE.value, function (data) {
        llenarCombo(data, document.getElementById("cmbMunicipio"), true);
    });
});

var Asigna = document.getElementById("cmbAsignacion");
Asigna.addEventListener("change", function () {
    if (Asigna.value == 1) {
        let DatosOficina = [{ "ID": 1, "Nombre": "Oficina" }];
        llenarCombo(DatosOficina, document.getElementById("cmbSitio"), true);
    }
    else if (Asigna.value == 2) {
        $.get("/Cardinal/BDSupervision", function (DatosSupervisiones) {
            if (DatosSupervisiones.length !== 0) {
                llenarCombo(DatosSupervisiones, document.getElementById("cmbSitio"), true);
            }
            else {
                alert("No hay datos en la tabla Supervision.");
            }
        });
    }
    else if (Asigna.value == 3) {
        $.get("/Cardinal/BDTiendas", function (DatosTiendas) {
            if (DatosTiendas.length !== 0) {
                llenarCombo(DatosTiendas, document.getElementById("cmbSitio"), true);
            }
            else {
                alert("No hay datos en la tabla Tiendas.");
            }
        });
    }
    else {
        alert("hay un error en tu codigo y no lo encuentras :)");
    }
});

function Sitio(IDAs, IDSitio) {
    if (IDAs == 1) {
        let DatosOficina = [{ "ID": 1, "Nombre": "Oficina" }];
        llenarCombo(DatosOficina, document.getElementById("cmbSitio"), true);
        document.getElementById("cmbSitio").value = IDSitio;
    }
    else if (IDAs == 2) {
        $.get("/Cardinal/BDSupervision", function (DatosSupervisiones) {
            if (DatosSupervisiones.length !== 0) {
                llenarCombo(DatosSupervisiones, document.getElementById("cmbSitio"), true);
                document.getElementById("cmbSitio").value = IDSitio;
            }
            else {
                alert("No hay datos en la tabla Supervision.");
            }
        });
    }
    else if (IDAs == 3) {
        $.get("/Cardinal/BDTiendas", function (DatosTiendas) {
            if (DatosTiendas.length !== 0) {
                llenarCombo(DatosTiendas, document.getElementById("cmbSitio"), true);
                document.getElementById("cmbSitio").value = IDSitio;
            }
            else {
                alert("No hay datos en la tabla Tiendas.");
            }
        });
    }
}

function Limpiar() {
    var controles = document.getElementsByClassName("limpiar");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        controles[i].value = "";
    }
}

// Guardar
function GUsuario() {
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
                var IDArea = document.getElementById("cmbArea").value;
                var TempNA = document.getElementById("cmbArea");
                var NArea = TempNA.options[TempNA.selectedIndex].text;
                var IDSubArea = document.getElementById("cmbSubArea").value;
                var TempNSA = document.getElementById("cmbSubArea");
                var NSArea = TempNSA.options[TempNSA.selectedIndex].text;
                var Asignacion = document.getElementById("cmbAsignacion").value;
                var Sitio = document.getElementById("cmbSitio").value;
                var IDPadre = document.getElementById("TxtUPadre");
                var Usuario = document.getElementById("TxtUsuario");
                var Contraseña = document.getElementById("TxtContrasena").value;
                var f = new Date();
                var FIngreso = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
                var frm = new FormData();
                frm.append("IDUsuario", IDUsuario);
                frm.append("CURP", CURP);
                frm.append("Nombre", Nombre);
                frm.append("APaterno", APaterno);
                frm.append("AMaterno", AMaterno);
                frm.append("cadF", Foto);
                frm.append("FNacimiento", FNacimiento);
                frm.append("IDEstado", IDEstado);
                frm.append("IDMunicipio", IDMunicipio);
                frm.append("IDLocalidad", IDLocalidad);
                frm.append("RFC", RFC);
                frm.append("NoSS", NoSS);
                frm.append("Correo", Correo);
                frm.append("Telefono", Telefono);
                frm.append("IDPerfil", IDPerfil);
                frm.append("LVLPerfil", LVLPerfil);
                frm.append("IDArea", IDArea);
                frm.append("NArea", NArea);
                frm.append("IDSubArea", IDSubArea);
                frm.append("NSArea", NSArea);
                frm.append("Asignacion", Asignacion);
                frm.append("Sitio", Sitio);
                frm.append("IDPadre", IDPadre);
                frm.append("Usuario", Usuario);
                frm.append("Contraseña", Contraseña);
                frm.append("FIngreso", FIngreso);
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
