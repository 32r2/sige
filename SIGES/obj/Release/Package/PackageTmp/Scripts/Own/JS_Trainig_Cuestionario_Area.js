LlenarCMBPrin();
//llena los combosprincipales
function LlenarCMBPrin() {
    $.get("/Cardinal/BDAreas", function (DatosAreas) {
        llenarCombo(DatosAreas, document.getElementById("cmbArea"));
    });
    $.get("/CardinalSystem/BDPerfiles", function (DatosPerfiles) {
        var TablaPerfiles = "";
        TablaPerfiles += "<div class='row'>";
        TablaPerfiles += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
        TablaPerfiles += "<input type='checkbox' class='checkbox-Perfiles' id='0'name='Todos' ><span class='help-block text-muted small-font'>Todos</span>";
        TablaPerfiles += "</div>";
        for (var i = 0; i < DatosPerfiles.length; i++) {
            TablaPerfiles += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            TablaPerfiles += "<input type='checkbox' class='checkbox-Perfiles' id='" + DatosPerfiles[i].ID + "'name='" + DatosPerfiles[i].Nombre + "' ><span class='help-block text-muted small-font'>" + DatosPerfiles[i].Nombre + "</span>";
            TablaPerfiles += "</div>";
        }
        TablaPerfiles += "</div>";
        document.getElementById("TblPerfiles").innerHTML = TablaPerfiles;
    });
    $.get("/Usuarios/BDUsuarios", function (DatosUsuarios) {
        llenarComboUsuarios(DatosUsuarios, document.getElementById("cmbEncargado"));
    });
    $.get("/Cuestionarios/BDCuestionariosArea", function (DatosCuestionarios) {
        CrearAcordeon(DatosCuestionarios, document.getElementById("accordion"));
    });
}
//Cuestionarios    *********************************************************************************************************************************************************
//Inserta el acordeon
function CrearAcordeon(DatosCuestionarios, control) {
    if (DatosCuestionarios.length > 0) {
        var CodHtml = "";
        for (var i = 0; i < DatosCuestionarios.length; i++) {
            var Npre = DatosCuestionarios[i].NoPreguntas;
            if (i < 1) {
                CodHtml += "<div class='card m-b-0'>";
            }
            else {
                CodHtml += "<div class='card m-b-0 border-top'>";
            }
            CodHtml += "<div class='card-header' id='heading" + DatosCuestionarios[i].IDCuestionario + "'>";
            CodHtml += "<h5 class='mb-0'>";
            CodHtml += "<a onclick='CrearTabla(" + DatosCuestionarios[i].IDCuestionario + ");' data-toggle='collapse' data-target='#collapse" + DatosCuestionarios[i].IDCuestionario + "' aria-expanded='false' aria-controls='collapse" + DatosCuestionarios[i].IDCuestionario + "' class='collapsed'>";
            CodHtml += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
            CodHtml += "<span >" + DatosCuestionarios[i].Nombre + "</span>";
            CodHtml += "</a>";
            CodHtml += "</h5>";
            CodHtml += "<div id='collapse" + DatosCuestionarios[i].IDCuestionario + "' class='collapse' aria-labelledby='headingOne' data-parent='#accordion' style=''>";
            CodHtml += "<div class='card-body'>";
            CodHtml += "<div class='row'>";
            CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Autor: </strong>" + DatosCuestionarios[i].UNombre + "</div>";
            CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Area: </strong>" + DatosCuestionarios[i].NombreA + "</div>";
            CodHtml += "</div>";
            CodHtml += "<div class='row'>";
            CodHtml += "<div class='col-md-3 col-sm-6 col-xs-6'><strong>No. cuestionario: </strong>" + DatosCuestionarios[i].NoCuestionario + "</div>";
            let NomVarSession = "NoPreguntas" + DatosCuestionarios[i].IDCuestionario;
            sessionStorage.setItem(NomVarSession, DatosCuestionarios[i].NoPreguntas)
            CodHtml += "<div class='col-md-3 col-sm-6 col-xs-6'><strong>No. preguntas: </strong>" + DatosCuestionarios[i].NoPreguntas + "</div>";
            let NoRVarSession = "NoRespuestas" + DatosCuestionarios[i].IDCuestionario;
            sessionStorage.setItem(NoRVarSession, DatosCuestionarios[i].NoRespuestas)
            CodHtml += "<div class='col-md-3 col-sm-6 col-xs-6'><strong>No. respuestas: </strong>" + DatosCuestionarios[i].NoRespuestas + "</div>";
            CodHtml += "<div class='col-md-3 col-sm-6 col-xs-6'><strong>Calificación máxima: </strong>" + DatosCuestionarios[i].Calificacion + "</div>";
            CodHtml += "</div>";
            CodHtml += "<div class='row'>";
            CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Fecha Inicio: </strong>" + DatosCuestionarios[i].FechaInicio + "</div>";
            CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Fecha Fin: </strong>" + DatosCuestionarios[i].FechaFin + "</div>";
            CodHtml += "</div>";
            CodHtml += "<div class='row'>";
            CodHtml += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Usuarios: </strong>" + DatosCuestionarios[i].Usuarios + "</div>";
            CodHtml += "</div>";
            CodHtml += "<div class='row'>";
            CodHtml += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Descripcion de la evaluación: </strong>" + DatosCuestionarios[i].Descripcion + "</div>";
            CodHtml += "</div>";
            CodHtml += "<div class='row'>";
            CodHtml += "<div class='col-md-9 col-sm-9 col-xs-9'><strong>Preguntas: </strong></div >";
            CodHtml += "<div class='col-md-3 col-sm-3 col-xs-3'><button id='BtnAddPregunta" + DatosCuestionarios[i].IDCuestionario + "'  onclick='ModalPreguntas(" + DatosCuestionarios[i].IDCuestionario + ",0)' type='button' class='btn btn-warning' data-toggle='modal' data-target='#ModalPreguntas'>Agregar</button></div > ";
            CodHtml += "</div>";
            CodHtml += "<div class='row'>";
            CodHtml += "<div class='col-md-12 col-sm-12 col-xs-12' id='preguntas" + DatosCuestionarios[i].IDCuestionario + "'>Espacio para las preguntas y respuestas</div>";
            CodHtml += "</div>";
            CodHtml += "<div class='row'>";
            CodHtml += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
            CodHtml += "<button onclick='ModalCuestionario(" + DatosCuestionarios[i].IDCuestionario + ")' type = 'button' class='btn btn-primary' data-toggle='modal' data-target='#ModalCuestionario'>Modificar</button>";
            CodHtml += "<button id='EliminarCuestionario' type='button' class='btn btn-danger' onclick='EliminarCuestionario(" + DatosCuestionarios[i].IDCuestionario + ",this)'>Eliminar</button>";
            CodHtml += "</div>";
            CodHtml += "</div>";
            CodHtml += "</div>";
            CodHtml += "</div>";
            CodHtml += "</div>";
            CodHtml += "</div>";
        }
        control.innerHTML = CodHtml;
    } else {
        var HTMLAdvertencia = "";
        HTMLAdvertencia += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>";
        HTMLAdvertencia += "<strong>No hay datos que mostrar.</strong>";
        HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
        HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
        HTMLAdvertencia += "</button>";
        HTMLAdvertencia += "</div>";
        document.getElementById("Alertas").innerHTML = HTMLAdvertencia;
    }
}
//abrir PopUp
function ModalCuestionario(id) {
    var controlesObligatorio = document.getElementsByClassName("Cuestionario");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("border-danger");
    }
    Limpiar();
    if (id != 0) {
        $.get("/Cuestionarios/BDCuestionario/?ID=" + id, function (DatosCuestionario) {
            document.getElementById("TxtIDCuestionario").value = DatosCuestionario[0].IDCuestionario;
            document.getElementById("TxtNoCuestionario").value = DatosCuestionario[0].NoCuestionario;
            document.getElementById("TxtNombre").value = DatosCuestionario[0].Nombre;
            document.getElementById("cmbArea").value = DatosCuestionario[0].IDArea;
            document.getElementById("cmbEncargado").value = DatosCuestionario[0].IDUsuario;
            document.getElementById("TxtNoRespuestas").value = DatosCuestionario[0].NoRespuestas;
            document.getElementById("TxtCalificacion").value = DatosCuestionario[0].Calificacion;
            //****************************************************************************
            var activar = DatosCuestionario[0].Usuarios.split(',');
            var ChevPermisos = document.getElementsByClassName("checkbox-Perfiles");
            for (let j = 0; j < activar.length; j++) {
                for (let i = 0; i < ChevPermisos.length; i++) {
                    if (ChevPermisos[i].name == activar[j]) {
                        ChevPermisos[i].checked = true;
                        break;
                    }
                }
            }
            //****************************************************************************
            document.getElementById("TxtNoPreguntas").value = DatosCuestionario[0].NoPreguntas;
            let FechaIn = DatosCuestionario[0].FechaInicio.split("/");
            let FechaInC = FechaIn[2] + "-" + FechaIn[1] + "-" + FechaIn[0];
            document.getElementById("TxtFInicio").value = FechaInC;
            let FechaFF = DatosCuestionario[0].FechaFin.split("/");
            let FechaFfC = FechaFF[2] + "-" + FechaFF[1] + "-" + FechaFF[0];
            document.getElementById("TxtFFin").value = FechaFfC;
            document.getElementById("TxtDescripcion").value = DatosCuestionario[0].Descripcion;
        });
    }
}
//Guardar Cuestionario
function GuardarCuestionario() {
    if (Obligatorios("Cuestionario") == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IDCuestionario = document.getElementById("TxtIDCuestionario").value;
            var NoCuestionario = document.getElementById("TxtNoCuestionario").value;
            var Nombre = document.getElementById("TxtNombre").value;
            var IDArea = document.getElementById("cmbArea").value;
            var TempNA = document.getElementById("cmbArea");
            var NombreA = TempNA.options[TempNA.selectedIndex].text;
            var IDUsuario = document.getElementById("cmbEncargado").value;
            var temUser = document.getElementById("cmbEncargado");
            var UNombre = temUser.options[temUser.selectedIndex].text;
            //***********************************************************************************************************************
            var CheckSucursales = document.getElementsByClassName("checkbox-Perfiles");
            let seleccionados = "";
            for (let i = 0; i < CheckSucursales.length; i++) {
                if (CheckSucursales[i].checked == true) {
                    seleccionados += CheckSucursales[i].name;
                    seleccionados += ",";
                }
            }
            var Usuarios = seleccionados.substring(0, seleccionados.length - 1);
            //*************************************************************************************************************************
            var NoPreguntas = document.getElementById("TxtNoPreguntas").value;
            var FInicio = document.getElementById("TxtFInicio").value;
            var FFin = document.getElementById("TxtFFin").value;
            var NoRespuestas = document.getElementById("TxtNoRespuestas").value;
            var Calificacion = document.getElementById("TxtCalificacion").value;
            var Descripcion = document.getElementById("TxtDescripcion").value;

            //Obtiene el texto de combo para el supervisor
            var frm = new FormData();
            frm.append("IDCuestionario", IDCuestionario);
            frm.append("NoCuestionario", NoCuestionario);
            frm.append("Nombre", Nombre);
            frm.append("IDArea", IDArea);
            frm.append("NombreA", NombreA);
            frm.append("IDUsuario", IDUsuario);
            frm.append("UNombre", UNombre);
            frm.append("Usuarios", Usuarios);
            frm.append("NoPreguntas", NoPreguntas);
            frm.append("FInicio", FInicio);
            frm.append("FFin", FFin);
            frm.append("NoRespuestas", NoRespuestas);
            frm.append("Calificacion", Calificacion);
            frm.append("Descripcion", Descripcion);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Cuestionarios/GuardarCuestionario",
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
                        HTMLAdvertencia += "<strong>Ya existe un cuestionario con esa información!</strong>";
                    }
                    else {
                        HTMLAdvertencia += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
                        HTMLAdvertencia += "<strong>Se creo correctamente el nuevo cuestionario.</strong>";
                        LlenarCMBPrin();
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
//Eliminar cuestionario
function EliminarCuestionario(id) {
    if (confirm("¿Desea eliminar el cuestionario?") == 1) {
        $.get("/Cuestionarios/EliminarCuestionario/?ID=" + id, function (data) {
            let HTMLAdvertencia = "";
            if (data == 0) {
                HTMLAdvertencia += "<div class='alert alert-danger alert-dismissible fade show' role='alert'>";
                HTMLAdvertencia += "<strong>Ocurrio un error!</strong>";
            } else {
                HTMLAdvertencia += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
                HTMLAdvertencia += "<strong>Se elimino el cuestionario.</strong>";
                LlenarCMBPrin();
            }
            HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
            HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
            HTMLAdvertencia += "</button>";
            HTMLAdvertencia += "</div>";
            document.getElementById("Alertas").innerHTML = HTMLAdvertencia;
        });
    }
}
//Preguntas       *********************************************************************************************************************************************************
//Consulta para insertar las preguntas
function CrearTabla(IDo) {
    $.get("/Cuestionarios/BDPreguntasTabla/?IDc=" + IDo, function (DatosPreguntas) {
        var CodHtml = "";
        CodHtml += "<div class='card-body' id='Pregutas'>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-1 col-sm-1 col-xs-1'>No.</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'>Preguntas</div>";
        CodHtml += "<div class='col-md-2 col-sm-2 col-xs-2'>Respuesta</div>";
        CodHtml += "<div class='col-md-1 col-sm-1 col-xs-1'>Valor</div>";
        CodHtml += "<div class='col-md-2 col-sm-2 col-xs-2'>Opciones</div>";
        CodHtml += "</div>";
        for (var i = 0; i < DatosPreguntas.length; i++) {
            CodHtml += "<div class='row'>";
            CodHtml += "<div class='col-md-1 col-sm-1 col-xs-1'>" + DatosPreguntas[i].NoPregunta + "</div>";
            CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'>" + DatosPreguntas[i].Pregunta + "</div>";
            CodHtml += "<div class='col-md-2 col-sm-2 col-xs-2'>" + DatosPreguntas[i].IDRespuesta + "</div>";
            CodHtml += "<div class='col-md-1 col-sm-1 col-xs-1'>" + DatosPreguntas[i].Valor + "</div>";
            CodHtml += "<div class='col-md-2 col-sm-2 col-xs-2'>";
            CodHtml += "<button class='btn btn-warning' onclick='ModalPreguntas(" + DatosPreguntas[i].IDCuestionario + "," + DatosPreguntas[i].IDPregunta + ")' data-toggle='modal' data-target='#ModalPreguntas'><i class='fas fa-edit'></i></button>";
            CodHtml += "<button class='btn btn-info' onclick='ValRespuestas(" + DatosPreguntas[i].IDCuestionario + "," + DatosPreguntas[i].IDPregunta + "," + DatosPreguntas[i].NoPregunta + ");'><i class='fas fa-chevron-circle-down'></i></button>";
            CodHtml += "</div>";
            CodHtml += "</div>";
            CodHtml += "<div class='row' id='C" + DatosPreguntas[i].IDCuestionario + "P" + DatosPreguntas[i].IDPregunta + "'></div>";
            CodHtml += "<hr/>";
        }
        CodHtml += "</div>";
        document.getElementById("preguntas" + IDo).innerHTML = CodHtml;
        var NoPreguntas = "NoPreguntas" + IDo;
        if (DatosPreguntas.length >= sessionStorage.getItem(NoPreguntas)) {
            $("#BtnAddPregunta" + IDo).attr('disabled', 'disabled');
        }
    });
}
//Modal Preguntas
function ModalPreguntas(IDC, ID) {
    var controlesForzoso = document.getElementsByClassName("Pregunta");
    var ncontroles = controlesForzoso.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesForzoso[i].parentNode.classList.remove("border-danger");
    }
    Limpiar();
    var Nopreguntas = sessionStorage.getItem("NoPreguntas" + IDC);

    if (ID != 0) {
        $.get("/Cuestionarios/BDPregunta/?IDp=" + ID, function (DatosPregunta) {
            document.getElementById("TxtIDPregunta").value = DatosPregunta[0].IDPregunta;
            document.getElementById("TxtIDPCuestionario").value = DatosPregunta[0].IDCuestionario;
            document.getElementById("TxtNoPregunta").value = DatosPregunta[0].NoPregunta;
            document.getElementById("TxtPregunta").value = DatosPregunta[0].Pregunta;
            $.get("/Cuestionarios/Respuestas/?IDp=" + ID, function (Respuestas) {
                llenarCombo(Respuestas, document.getElementById("cmbIDRespuesta"), true)
                if (DatosPregunta[0].IDRespuesta !== null) {
                    document.getElementById("cmbIDRespuesta").value = DatosPregunta[0].IDRespuesta;
                }
            });
            document.getElementById("TxtValor").value = DatosPregunta[0].Valor;
        });
    }
    else {
        $.get("/Cuestionarios/BDPreguntasTabla/?IDc=" + IDC, function (Preguntas) {
            if (Preguntas.length < Nopreguntas + 1) {
                document.getElementById("TxtNoPregunta").value = Preguntas.length + 1;
                document.getElementById("TxtIDPCuestionario").value = IDC;
            }
            else {
                let HTMLAdvertencia = "";
                HTMLAdvertencia += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>";
                HTMLAdvertencia += "<strong>Si usted desea ingresar más preguntas de las establecidas primero debe modificar el campo No. De preguntas.!</strong>";
                HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                HTMLAdvertencia += "</button>";
                HTMLAdvertencia += "</div>";
                document.getElementById("Alertas").innerHTML = HTMLAdvertencia;
                document.getElementById("btnCancelarP").click();
            }
        });
    }
}
//GUARDAR
function GuardarPregunta() {
    if (Obligatorios("Pregunta") == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {

            var IDPregunta = document.getElementById("TxtIDPregunta").value;
            var IDCuestionario = document.getElementById("TxtIDPCuestionario").value;
            var NoPregunta = document.getElementById("TxtNoPregunta").value;
            var Pregunta = document.getElementById("TxtPregunta").value;
            var IDRespuesta = document.getElementById("cmbIDRespuesta").value;
            var Valor = document.getElementById("TxtValor").value;
            //Obtiene el texto de combo para el supervisor
            var frm = new FormData();
            frm.append("IDPregunta", IDPregunta);
            frm.append("IDCuestionario", IDCuestionario);
            frm.append("NoPregunta", NoPregunta);
            frm.append("Pregunta", Pregunta);
            frm.append("IDRespuesta", IDRespuesta);
            frm.append("Valor", Valor);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Cuestionarios/GuardarPregunta",
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
                        HTMLAdvertencia += "<strong>Ya existe un cuestionario con esa información!</strong>";
                    }
                    else {
                        HTMLAdvertencia += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
                        HTMLAdvertencia += "<strong>Se creo correctamente la nueva pregunta.</strong>";
                        CrearTabla(IDCuestionario);
                        document.getElementById("btnCancelarP").click();
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
//Respuestas    *******************************************************************************************************************************************
//Inserta las Respuestas
function CrearRespuestas(DatosRespuestas, IDo) {
    var CodHtml = "";
    CodHtml += "<div class='card-body' id='Respuestas" + IDo + "'>";
    CodHtml += "<div class='row'>";
    CodHtml += "<div class='col-md-1 col-sm-1 col-xs-1'>No.</div>";
    CodHtml += "<div class='col-md-6 col-sm-6 col-xs-9'>Respuesta</div>";
    CodHtml += "<div class='col-md-2 col-sm-2 col-xs-2'>Opciones</div>";
    CodHtml += "</div>";
    for (var i = 0; i < DatosRespuestas.length; i++) {
        var Nop = DatosRespuestas[i].NoRespuesta;
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-1 col-sm-1 col-xs-1'>" + Nop + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-9'>" + DatosRespuestas[i].Nombre + "</div>";
        CodHtml += "<div class='col-md-2 col-sm-2 col-xs-2'>";
        CodHtml += "<button class='btn btn-primary' onclick='ModalRespuestas(" + DatosRespuestas[i].ID + ")' data-toggle='modal' data-target='#myModalRespuesta'><i class='fas fa-edit'></i></button>";
        CodHtml += "</div>";
        CodHtml += "</div>";
    }
    CodHtml += "</div>";
    IDo.innerHTML = CodHtml;
}
function ValRespuestas(IdC, IdP, NoP) {
    let NoRespuestas = "NoRespuestas" + IdC;
    $.get("/Cuestionarios/Respuestas/?IDp=" + IdP, function (DatosRespuestas) {
        if (DatosRespuestas.length < sessionStorage.getItem(NoRespuestas)) {
            document.getElementById("TxtNoRespuesta").value = DatosRespuestas.length + 1;
            document.getElementById("TxtNoPreguntaR").value = NoP;
            document.getElementById("TxtIDRpregunta").value = IdP;
            document.getElementById("TxtIDRCuestionario").value = IdC;
            $('#myModalRespuesta').modal('show');
        }
        CrearRespuestas(DatosRespuestas, document.getElementById("C" + IdC + "P" + IdP));
    });
}
//Modal Respuestas
function ModalRespuestas(id) {
    var controlesForzoso = document.getElementsByClassName("Respuesta");
    var ncontroles = controlesForzoso.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesForzoso[i].parentNode.classList.remove("border-danger");
    }
    Limpiar();
    if (id != 0) {
        $.get("/Cuestionarios/BDRespuesta/?IDr=" + id, function (data) {
            document.getElementById("TxtIDRespuesta").value = data[0].IDRespuesta;
            document.getElementById("TxtIDRpregunta").value = data[0].IDPregunta;
            document.getElementById("TxtIDRCuestionario").value = data[0].IDCuestionario;
            document.getElementById("TxtNoRespuesta").value = data[0].NoRespuesta;
            document.getElementById("TxtRespuesta").value = data[0].Respuesta;
        });
    }
}
function GuardarRespuesta() {
    if (Obligatorios("Respuesta") == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            let IDRespuesta = document.getElementById("TxtIDRespuesta").value;
            let IDPregunta = document.getElementById("TxtIDRpregunta").value;
            let IDCuestionario = document.getElementById("TxtIDRCuestionario").value;
            let NoPregunta = document.getElementById("TxtNoPreguntaR").value;
            let NoRespuesta = document.getElementById("TxtNoRespuesta").value;
            let Respuesta = document.getElementById("TxtRespuesta").value;
            //Obtiene el texto de combo para el supervisor
            var frm = new FormData();
            frm.append("IDRespuesta", IDRespuesta);
            frm.append("IDPregunta", IDPregunta);
            frm.append("IDCuestionario", IDCuestionario);
            frm.append("NoRespuesta", NoRespuesta);
            frm.append("Respuesta", Respuesta);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Cuestionarios/GuardarRespuestas",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        alert("Ocurrio un error");
                    }
                    else if (data == -1) {
                        alert("Ya existe la Respuesta");
                    }
                    else {
                        alert("Se ejecuto correctamente");
                        ValRespuestas(IDCuestionario, IDPregunta, NoPregunta)
                        document.getElementById("btnCancelarR").click();
                    }
                }
            });
        }
    }
}
//*********************************************************************************************************************************************************
//funcion general para llenar los select generarles
function llenarCombo(data, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}
//funcion para llenar los combos de personas
function llenarComboUsuarios(data, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + " " + data[i].APaterno + " " + data[i].AMaterno + "</option>";
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
    var ChevPermisos = document.getElementsByClassName("checkbox-Perfiles");
    for (let i = 0; i < ChevPermisos.length; i++) {
        ChevPermisos[i].checked = false;
    }
    var controlesCMB = document.getElementsByClassName("LimpiarSLT");
    for (var i = 0; i < controlesCMB.length; i++) {
        document.getElementById(controlesCMB[i].id).value = 0;
    }
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}