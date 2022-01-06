var base64;
Consulta();
function Consulta() {
    base64 = getBase64Image(document.getElementById("imageid"));
    //$.get("/Usuarios/BDUsuariosNivel", function (DatosUsuarios) {
    //    if (DatosUsuarios.length !== 0) {
    //        //CrearTabla(DatosUsuarios);
    //        //CrearTablaUsuarios(DatosUsuarios);
    //    } else {
    //        alert("No hay datos en la tabla Usuarios.");
    //    }
    //});    
}
//funcion general para llenar los select
function llenarCombo(InfPerfiles, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
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
        CodHtml += "<button class='btn btn-danger' onclick='EliminarUsuario(" + DatosUsuarios[i].ID + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodHtml += "</td>";
        CodHtml += "</tr>";
    }
    CodHtml += "</tbody>";
    CodHtml += "</table>";
    document.getElementById("tabla").innerHTML = CodHtml;
}
//***********************************************************************************************************************
function CrearTablaUsuarios(DatosUsuarios) {
    var CodHtml = "";
    CodHtml += "<table id='zero_config' class='table table-striped table-bordered'>";
    CodHtml += "<thead>";
    CodHtml += "<tr>";
    CodHtml += "<th>Nombre Completo</th>";
    CodHtml += "<th>Área</th>";
    CodHtml += "<th>Correo Electrónico</th>";
    CodHtml += "<th>Teléfono</th>";
    CodHtml += "<th>Ingreso</th>";
    CodHtml += "<th>Opciones</th>";
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
        CodHtml += "<td >";
        CodHtml += "<button class='btn btn-primary' onclick='abrirModal(" + DatosUsuarios[i].ID + ")' data-toggle='modal' data-target='#myModal'><i class='fas fa-edit'></i></button>";
        CodHtml += "<button class='btn btn-danger' onclick='EliminarUsuario(" + DatosUsuarios[i].ID + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodHtml += "</td>";
        CodHtml += "</tr>";
    }
    CodHtml += "</tbody>";
    CodHtml += "<tfoot>";
    CodHtml += "<tr>";
    CodHtml += "<th>Nombre Completo</th>";
    CodHtml += "<th>Área</th>";
    CodHtml += "<th>Correo Electrónico</th>";
    CodHtml += "<th>Teléfono</th>";
    CodHtml += "<th>Ingreso</th>";
    CodHtml += "<th>Opciones</th>";
    CodHtml += "</tr>";
    CodHtml += "</tfoot>";
    CodHtml += "</table>";
    document.getElementById("tabla").innerHTML = CodHtml;
}
//***********************************************************************************************************************
//abrir PopUp
function abrirModal(id) {
    sessionStorage.setItem('IDUsuarioM', id);
    Limpiar();
    if (id != 0) {
        $.get("/Usuarios/BDUsuario/?ID=" + id, function (InfUsuario) {
            document.getElementById("TxtIDUsuario").value = InfUsuario[0].IDUsuario;
            document.getElementById("TxtCURP").value = InfUsuario[0].CURP;
            document.getElementById("TxtNombreUser").value = InfUsuario[0].Nombre;
            document.getElementById("TxtAPaterno").value = InfUsuario[0].APaterno;
            document.getElementById("TxtAMaterno").value = InfUsuario[0].AMaterno;

            document.getElementById("TxtContactoNombre").value = InfUsuario[0].ContactoNombre;
            document.getElementById("TxtContactoTelefono").value = InfUsuario[0].ContactoEmergencia;
            document.getElementById("cmbContactoParentesco").value = InfUsuario[0].ContactoParentesco;

            document.getElementById("PBFoto").src = "data:image/png;base64," + InfUsuario[0].FOTOMOSTRAR;
            let FechaDB = InfUsuario[0].FechaNaci.split("/");
            let fechaConv = FechaDB[2] + "-" + FechaDB[1] + "-" + FechaDB[0];
            document.getElementById("TxtFnaci").value = fechaConv;
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
            document.getElementById("cmbAsignacion").value = InfUsuario[0].IDAsignacion;
            Sitio(InfUsuario[0].IDAsignacion, InfUsuario[0].IDSitio);
            document.getElementById("TxtCorreo").value = InfUsuario[0].Correo;
            document.getElementById("TxtTelefono").value = InfUsuario[0].Telefono;
            document.getElementById("TxtUsuario").value = InfUsuario[0].Usuario;
            document.getElementById("TxtContrasena").value = InfUsuario[0].Contrasena;
            document.getElementById("TxtContrasenaConf").value = InfUsuario[0].Contrasena;
        });
    }
    Pasos(0);
}

function Pasos(Step) {
    let ID = sessionStorage.getItem('IDUsuarioM');
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
        MostrarDiv(ClaseMostrar);
    }
    else if (ObligatoriosDatosP("Datostep-1") == true && ClaseMostrar == "step-2") {
        avance.style.width = "25%";
        MostrarDiv(ClaseMostrar);
    }
    else if (ObligatoriosDatosP("Datostep-2") == true && ClaseMostrar == "step-3") {
        avance.style.width = "50%";
        MostrarDiv(ClaseMostrar);
        Informacion();
    }
    else if (ClaseMostrar == "step-4") {
        avance.style.width = "75%";
        MostrarDiv(ClaseMostrar);
        if (ID == 0) {
            NomUsuar();
        }
    }
    else if (ObligatoriosDatosP("Datostep-4") == true && ClaseMostrar == "step-5" && document.getElementById("mensage").innerText === "Autenticación correcta") {
        avance.style.width = "100%";
        GUsuario();
    }
    else {
        //alert("Entro al otro else");
    }
}
//Crear Usuario
function NomUsuar() {
    let nombres = document.getElementById("TxtNombreUser").value;
    let NUser = nombres.split(" ");
    let fech = document.getElementById("TxtFnaci").value;
    let Nombrefil = NUser[0].replace("A", "4").replace("E", "3").replace("I", "1").replace("O", "0");
    let Fechfil = fech.replace("/", "").replace("-", "");
    document.getElementById("TxtUsuario").value = Nombrefil + Fechfil.replace("/", "").replace("-", "");
}
//Unir campos
function Informacion() {
    let INF = "";
    INF += "<div class='row'>";
    INF += "<div class='col-md-12 col-sm-12 col-xs-12' style='line-height: 100px; text-align: center; background-color: #000000; color:#ffffff'><H4>DATOS PERSONALES</H4></div>";
    INF += "</div>";

    INF += "<div class='row'>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>CURP: </strong>" + document.getElementById("TxtCURP").value + "</div>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>F.Nacimiento: </strong>" + document.getElementById("TxtFnaci").value + "</div>";
    INF += "</div>";

    INF += "<div class='row'>";
    INF += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Nombre: </strong>" + document.getElementById("TxtNombreUser").value + " " + document.getElementById("TxtAPaterno").value + " " + document.getElementById("TxtAMaterno").value + "</div>";
    INF += "</div>";

    INF += "<div class='row'>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>RFC: </strong>" + document.getElementById("TxtRFC").value + "</div>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>NSS: </strong>" + document.getElementById("TxtNSS").value + "</div>";
    INF += "</div>";

    INF += "<div class='row'>";
    INF += "<div class='col-md-12 col-sm-12 col-xs-12' style='line-height: 100px; text-align: center; background-color: #000000; color:#ffffff'><H4>INFORMACIÓN DE CONTACTO</H4></div>";
    INF += "</div >";

    INF += "<div class='row'>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Correo: </strong>" + document.getElementById("TxtCorreo").value + "</div>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + document.getElementById("TxtTelefono").value + "</div>";
    INF += "</div>";

    INF += "<div class='row'>";
    INF += "<div class='col-md-12 col-sm-12 col-xs-12'style='line-height: 100px; text-align: center; background-color: #000000; color:#ffffff'><H4>DIRECCIÓN</H4></div>";
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
    INF += "<div class='col-md-12 col-sm-12 col-xs-12' style=' text-align: center; background-color: #000000; color:#ffffff'><H4>LUGAR DE TRABAJO</H4></div>";
    INF += "</div>";
    let TempAsig = document.getElementById("cmbAsignacion");
    let Asignacion = TempAsig.options[TempAsig.selectedIndex].text;
    let TempUbic = document.getElementById("cmbSitio");
    let Sitio = TempUbic.options[TempUbic.selectedIndex].text;
    INF += "<div class='row'>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Lugar: </strong>" + Asignacion + "</div>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Ubicación: </strong>" + Sitio + "</div>";
    INF += "</div>";
    let TempNA = document.getElementById("cmbArea");
    let NArea = TempNA.options[TempNA.selectedIndex].text;
    let TempNSA = document.getElementById("cmbSubArea");
    let NSArea = TempNSA.options[TempNSA.selectedIndex].text;
    INF += "<div class='row'>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Área: </strong>" + NArea + "</div>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Subárea: </strong>" + NSArea + "</div>";
    INF += "</div>";
    let TempPerf = document.getElementById("cmbPerfil");
    let Perfil = TempPerf.options[TempPerf.selectedIndex].text;
    INF += "<div class='row'>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Perfil: </strong>" + Perfil + "</div>";
    INF += "<div class='col-md-6 col-sm-6 col-xs-6'><strong></div>";
    INF += "</div>";
    document.getElementById("DivDatos").innerHTML = INF;
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
//validar el usuario y contrasela padre sea correcto
function validarParent() {
    $.get("/Usuarios/DUsuario/?Usuario=" + $('#TxtUPadre').val() + "&contrasena=" + $('#TxtCPadre').val(), function (respuesta) {
        $('#mensage').html(validar(respuesta.length))
    });
}
//inserta la clase y texto al div
function validar(Usuario) {
    if (Usuario === 1) {
        $('#mensage').removeClass()
        $('#mensage').addClass('Good')
        return 'Autenticación correcta'
    }
    else {
        $('#mensage').removeClass()
        $('#mensage').addClass('Short')
        return 'Usuario anulo'
    }
}
//valida los campos obligatorios
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
//event Change index Areas
var IDA = document.getElementById("cmbArea");
IDA.addEventListener("change", function () {
    $.get("/Cardinal/BDSubAreas/?IDA=" + IDA.value, function (data) {
        llenarCombo(data, document.getElementById("cmbSubArea"), true);
    });
});
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
var Asigna = document.getElementById("cmbAsignacion");
Asigna.addEventListener("change", function () {
    Sitio(Asigna.value, 0);
});

function Sitio(IDAsignacion, IDSitio) {
    if (IDAsignacion == 3) {
        let DatosOficina = [{ "ID": 1, "Nombre": "Oficina" }];
        llenarCombo(DatosOficina, document.getElementById("cmbSitio"));
        document.getElementById("cmbSitio").value = IDSitio;
    }
    else if (IDAsignacion == 2) {
        $.get("/Cardinal/BDSupervision", function (DatosSupervisiones) {
            if (DatosSupervisiones.length !== 0) {
                llenarCombo(DatosSupervisiones, document.getElementById("cmbSitio"));
                document.getElementById("cmbSitio").value = IDSitio;
            }
            else {
                alert("No hay datos en la tabla Supervision.");
            }
        });
    }
    else if (IDAsignacion == 1) {
        $.get("/Cardinal/BDTiendas", function (DatosTiendas) {
            if (DatosTiendas.length !== 0) {
                llenarCombo(DatosTiendas, document.getElementById("cmbSitio"));
                document.getElementById("cmbSitio").value = IDSitio;
            }
            else {
                alert("No hay datos en la tabla Tiendas.");
            }
        });
    }
    else {
        alert("hay un error en tu codigo y no lo encuentras :)");
    }

}

function Limpiar() {
    var Ctrls = document.getElementsByClassName("border-danger");
    for (var i = 0; i < Ctrls.length; i++) {
        Ctrls[i].classList.remove("border-danger");
    }
    var ControlesTXT = document.getElementsByClassName("limpiar");
    for (var i = 0; i < ControlesTXT.length; i++) {
        ControlesTXT[i].value = "";
    }
    var ControlesSLT = document.getElementsByClassName("SelectCLS");
    for (var i = 0; i < ControlesSLT.length; i++) {
        document.getElementById(ControlesSLT[i].id).value = 0;
    }
}

//imagenes
var btnFoto = document.getElementById("BtnFoto");
btnFoto.onchange = function (e) {
    var file = document.getElementById("BtnFoto").files[0];
    var reader = new FileReader();
    if (reader != null) {
        reader.onloadend = function () {
            var img = document.getElementById("PBFoto");
            img.src = reader.result;
        }
    }
    reader.readAsDataURL(file);
}

// Guardar
function GUsuario() {
    var pas1 = document.getElementById("TxtContrasena").value;
    var pas2 = document.getElementById("TxtContrasenaConf").value;
    var LVLPerfil = 0;
    let IDParent = 0;
    if (pas1 == pas2) {
        if (ObligatoriosDatosP("DatosGuardar") == true) {
            if (confirm("¿Desea aplicar los cambios?") == 1) {
                $.get("/Usuarios/DUsuario/?Usuario=" + document.getElementById("TxtUPadre").value + "&contrasena=" + document.getElementById("TxtCPadre").value, function (respuesta) {
                    IDParent = respuesta[0].IDUsuario;
                    //**consulta para obtener el nivel
                    $.get("/CardinalSystem/BDPerfil/?IDPerfil=" + document.getElementById("cmbPerfil").value, function (Perfil) {
                        LVLPerfil = Perfil[0].Nivel;
                        let IDUsuario = document.getElementById("TxtIDUsuario").value;
                        let CURP = document.getElementById("TxtCURP").value;
                        let Nombre = document.getElementById("TxtNombreUser").value;
                        let APaterno = document.getElementById("TxtAPaterno").value;
                        let AMaterno = document.getElementById("TxtAMaterno").value;
                        let ContactoNombre = document.getElementById("TxtContactoNombre").value
                        let ContactoEmergencia = document.getElementById("TxtContactoTelefono").value
                        let ContactoParentesco = document.getElementById("cmbContactoParentesco").value
                        let Foto = document.getElementById("PBFoto").src.replace("data:image/png;base64,", "");
                        if (Foto.endsWith('AdministrarUsuarios')) {
                            Foto = base64.replace("data:image/png;base64,", "");
                        }
                        let FNacimiento = document.getElementById("TxtFnaci").value;
                        let IDEstado = document.getElementById("cmbEstado").value;
                        let IDMunicipio = document.getElementById("cmbMunicipio").value;
                        let IDLocalidad = document.getElementById("cmbLocalidad").value;
                        let RFC = document.getElementById("TxtRFC").value;
                        let NoSS = document.getElementById("TxtNSS").value;
                        let Correo = document.getElementById("TxtCorreo").value;
                        let Telefono = document.getElementById("TxtTelefono").value;
                        let IDPerfil = document.getElementById("cmbPerfil").value;
                        let IDArea = document.getElementById("cmbArea").value;
                        let TempNA = document.getElementById("cmbArea");
                        let NArea = TempNA.options[TempNA.selectedIndex].text;
                        let IDSubArea = document.getElementById("cmbSubArea").value;
                        let TempNSA = document.getElementById("cmbSubArea");
                        let NSArea = TempNSA.options[TempNSA.selectedIndex].text;
                        let IDAsignacion = document.getElementById("cmbAsignacion").value;
                        let IDSitio = document.getElementById("cmbSitio").value;
                        let IDPadre = IDParent;
                        let Usuario = document.getElementById("TxtUsuario").value;
                        let Contraseña = document.getElementById("TxtContrasena").value;
                        let f = new Date();
                        let FIngreso = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
                        let frm = new FormData();
                        frm.append("IDUsuario", IDUsuario);
                        frm.append("CURP", CURP);
                        frm.append("Nombre", Nombre);
                        frm.append("APaterno", APaterno);
                        frm.append("AMaterno", AMaterno);
                        frm.append("ContactoNombre", ContactoNombre);
                        frm.append("ContactoEmergencia", ContactoEmergencia);
                        frm.append("ContactoParentesco", ContactoParentesco);
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
                        frm.append("IDAsignacion", IDAsignacion);
                        frm.append("IDSitio", IDSitio);
                        frm.append("IDPadre", IDPadre);
                        frm.append("Usuario", Usuario);
                        frm.append("Contraseña", Contraseña);
                        frm.append("FIngreso", FIngreso);
                        frm.append("Estatus", 1);
                        $.ajax({
                            type: "POST",
                            url: "/Usuarios/GuardarUsuario",
                            data: frm,
                            contentType: false,
                            processData: false,
                            success: function (data) {
                                var HTMLAdvertencia = "";
                                if (data === 0) {
                                    HTMLAdvertencia += "<div class='alert alert-danger alert-dismissible fade show' role='alert'>";
                                    HTMLAdvertencia += "<strong>Ocurrio un error!</strong>";
                                    HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                                    HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                                    HTMLAdvertencia += "</button>";
                                    HTMLAdvertencia += "</div>";
                                }
                                else if (data === -1) {
                                    HTMLAdvertencia += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>";
                                    HTMLAdvertencia += "<strong>Ya existe un usuario con esa información!</strong>";
                                    HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                                    HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                                    HTMLAdvertencia += "</button>";
                                    HTMLAdvertencia += "</div>";
                                }
                                else {
                                    location.reload();
                                    HTMLAdvertencia += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
                                    HTMLAdvertencia += "<strong>Los datos se guardaron correctamente.</strong>";
                                    HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                                    HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                                    HTMLAdvertencia += "</button>";
                                    HTMLAdvertencia += "</div>";
                                }
                                //window.location.reload();
                                document.getElementById("Alertas").innerHTML = HTMLAdvertencia;
                                Consulta();
                                document.getElementById("BtnCancelar").click();
                            }
                        });
                    });
                });
            }
        }
    }
    else {
        alert("Ingrese nuevamente su contraseña");
    }
}
//"Elimina" el Usuario cambia el Estatus
function EliminarUsuario(ID) {
    if (confirm("¿Desea eliminar el registo?") == 1) {
        $.get("/Usuarios/EliminarUsuario/?ID=" + ID, function (EliUsuario) {
            if (EliUsuario == 1) {
                alert("Se elimino correctamente");
                Consulta();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
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