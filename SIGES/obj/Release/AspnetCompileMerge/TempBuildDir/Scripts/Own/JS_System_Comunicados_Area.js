Cargar();
BloquearCTRL();

function Cargar() {
    $.get("/Comunicados/Comunicados_Area", function (ComunicadosArea) {
        Galeria(ComunicadosArea);
    });
}


function Galeria(ComunicadosArea) {
    if (ComunicadosArea.length > 0) {
        let CodigoGaleria = "";
        let Estilo = "style='opacity: .3;'";
        for (let i = 0; i < ComunicadosArea.length; i++) {
            let SysFecha = FFecha().split('/');
            let AviFecha = ComunicadosArea[i].FechaFin.split('/');

            var SF = new Date(SysFecha[2], SysFecha[1], SysFecha[0]); //31 de diciembre de 2015
            var AF = new Date(AviFecha[2], AviFecha[1], AviFecha[0]); //30 de noviembre de 2014

            if (SF <= AF) {            
                Estilo = "";
            }
            else {
                Estilo = "style='opacity: .3;'";
            }
            CodigoGaleria += "<div class='col-lg-3 col-md-6' " + Estilo + ">";
            CodigoGaleria += "<div class='card'>";
            CodigoGaleria += "<div class='el-card-item'>";
            CodigoGaleria += "<div class='el-card-avatar el-overlay-1'>";
            //Ruta de la imagen
            CodigoGaleria += "<img src='" + ComunicadosArea[i].Foto + "' alt='" + ComunicadosArea[i].Nombre + "' />";
            CodigoGaleria += "<div class='el-overlay'>";
            CodigoGaleria += "<ul class='list-style-none el-info'>";
            //Colocar los botones
            CodigoGaleria += "<li class='el-item'><a class='btn default btn-outline image-popup-vertical-fit el-link' href='" + ComunicadosArea[i].Foto + "'><i class='mdi mdi-magnify-plus'></i></a></li>";
            CodigoGaleria += "<li class='el-item'><a class='btn default btn-outline el-link' onclick='AModalArea(" + ComunicadosArea[i].ID + ")' data-toggle='modal' data-target='#ModalComunicados'><i class='fas fa-edit'></i></a></li>";
            CodigoGaleria += "<li class='el-item'><a class='btn default btn-outline el-link' onclick='EliminarComunicado(" + ComunicadosArea[i].ID + ",this)'><i class='fas fa-eraser'></i></a></li>";
            CodigoGaleria += "</ul>";
            CodigoGaleria += "</div>";
            CodigoGaleria += "</div>";
            CodigoGaleria += "<div class='el-card-content' >";
            CodigoGaleria += "<h3 class='mb-0' style='height: 60px;'>" + ComunicadosArea[i].Nombre + "</h3>";
            CodigoGaleria += "<span class='text-muted'>Inicio:" + ComunicadosArea[i].FechaIni + " - Fin:" + ComunicadosArea[i].FechaFin + "</span>";
            CodigoGaleria += "</div>";
            CodigoGaleria += "</div>";
            CodigoGaleria += "</div>";
            CodigoGaleria += "</div>";
        }
        document.getElementById("Notificaciones_Area").innerHTML = CodigoGaleria;
    }
}
//Abrir modal
function AModalArea(ID, IDArea) {
    MostrarPerfiles();
    Limpiar();
    if (ID == 0) {
        $("#PBFoto").attr('src', '');
        document.getElementById("cmbArea").value = IDArea;
        $.get("/Areas/ImagenesArea", function (Datosrecurso) {
            llenarComboRecursos(Datosrecurso, document.getElementById("cmbRecurso"));
        });
    }
    else {
        $.get("/Comunicados/BDComunicado/?ID=" + ID, function (Comunicado) {
            $.get("/Areas/ImagenesArea", function (Datosrecurso) {
                llenarComboRecursos(Datosrecurso, document.getElementById("cmbRecurso"));
                document.getElementById("TxtIDNotificacion").value = Comunicado[0].IDNotificacion;
                document.getElementById("TxtNombre").value = Comunicado[0].Nombre;
                $("#PBFoto").attr('src', Comunicado[0].Foto);
                let FechaIn = Comunicado[0].FI.split("/");
                let FechaInC = FechaIn[2] + "-" + FechaIn[1] + "-" + FechaIn[0];
                document.getElementById("TxtFInicio").value = FechaInC;
                let FechaFF = Comunicado[0].FF.split("/");
                let FechaFfC = FechaFF[2] + "-" + FechaFF[1] + "-" + FechaFF[0];
                document.getElementById("TxtFFin").value = FechaFfC;
                document.getElementById("TxtDescripcion").value = Comunicado[0].Descripcion;
                document.getElementById("cmbArea").value = Comunicado[0].IDArea;
                let arch = Comunicado[0].Foto;
                document.getElementById("cmbRecurso").value = arch;
                //****************************************************************************
                var activar = Comunicado[0].Usuarios.split(',');
                var ChevPermisos = document.getElementsByClassName("checkbox-perfiles");
                for (let j = 0; j < activar.length; j++) {
                    for (let i = 0; i < ChevPermisos.length; i++) {
                        if (ChevPermisos[i].name == activar[j]) {
                            ChevPermisos[i].checked = true;
                            break;
                        }
                    }
                }
                //****************************************************************************
            });
        });
    }
    Pasos(0);
}
//Evento Change index tipo
var NoS = document.getElementById("cmbRecurso");
NoS.addEventListener("change", function () {
    MostrarRecurso(document.getElementById("cmbRecurso").value);
});
//Muestra el Video, imagen o emulador
function MostrarRecurso(ruta) {
    if (ruta !== "") {
        $("#PBFoto").attr('src', ruta);
    } else {
        $("#PBFoto").attr('src', '');
    }
}
// Guardar
function GuardarComunicado() {
    let val = document.getElementById("cmbRecurso").value
    if (val != 0) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            let IDNotificacion = document.getElementById("TxtIDNotificacion").value;
            let Nombre = document.getElementById("TxtNombre").value;
            let IDArea = document.getElementById("cmbArea").value;
            let TempNA = document.getElementById("cmbArea");
            let NombreA = TempNA.options[TempNA.selectedIndex].text;
            let FInicio = document.getElementById("TxtFInicio").value;
            let FFin = document.getElementById("TxtFFin").value;
            let Foto = document.getElementById("cmbRecurso").value;
            //-----------------------------------------------------------------
            var ChevPermisos = document.getElementsByClassName("checkbox-perfiles");
            let seleccionados = "";
            for (let i = 0; i < ChevPermisos.length; i++) {
                if (ChevPermisos[i].checked == true) {
                    seleccionados += ChevPermisos[i].name;
                    seleccionados += ",";
                }
            }
            var Usuarios = seleccionados.substring(0, seleccionados.length - 1);
            //-----------------------------------------------------------------
            let Descripcion = document.getElementById("TxtDescripcion").value;
            let f = new Date();
            let FCreacion = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
            let frm = new FormData();
            frm.append("IDNotificacion", IDNotificacion);
            frm.append("IDArea", IDArea);
            frm.append("NombreA", NombreA);
            frm.append("Nombre", Nombre);
            frm.append("FCreacion", FCreacion);
            frm.append("FInicio", FInicio);
            frm.append("FFin", FFin);
            frm.append("Descripcion", Descripcion);
            frm.append("Foto", Foto);
            frm.append("Usuarios", Usuarios);
            frm.append("Estatus", 1);
            $.ajax(
                {
                    type: "POST",
                    url: "/Comunicados/GuardarComunicado",
                    data: frm,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (data == 0) {
                            alert("Ocurrio un error");
                        }
                        else if (data == -1) {
                            alert("Es la misma información");
                        }
                        else {
                            alert("Se ejecuto correctamente");
                            Cargar();
                            document.getElementById("switch-label").checked = false;
                            Mostrar();
                            document.getElementById("BtnCancelar").click();
                        }
                    }
                }
            );
        }
    }
    else {
        document.getElementById("alertaimagen").innerHTML = "Debe seleccionar una imagen.";
        document.getElementById("alertaimagen").style.color = "red";
    }
}
//Eliminar
function EliminarComunicado(ID, IDArea) {
    if (confirm("¿Desea eliminar el registo?") == 1) {
        $.get("/Comunicados/EliminarComunicado/?ID=" + ID, function (data) {
            if (data == -1) {
                alert("Ya existe el docente");
            } else {
                if (data == 0) {
                    alert("Ocurrio un error");
                } else {
                    alert("Se elimino correctamente");
                    Cargar();
                }
            }
        });
    }
}

//llena el combobox
function llenarComboRecursos(data, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='../Assets/Resources/" + data[i].ID + "'>" + data[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}
//**********************************************************************Genericos*************************************************************************/
function Mostrar() {
    let CheckBox = document.getElementsByClassName("vigentes");
    if (CheckBox.length == 1) {
        CheckBox[0].classList.remove("vigentes");
        document.getElementById("Mensaje").title = "Ocultar notificaciones inactivas."
        $.get("/Comunicados/TodosComunicados_Area", function (ComunicadosArea) {
            Galeria(ComunicadosArea);
        });
    }
    else {
        document.getElementById("switch-label").classList.add("vigentes");
        document.getElementById("Mensaje").title = "Mostrar notificaciones inactivas."
        Cargar();
    }
}

//**********************************************************************Genericos*************************************************************************/
function BloquearCTRL() {
    let CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}
function Limpiar() {
    let controles = document.getElementsByClassName("limpiar");
    let ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        controles[i].value = "";
    }
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
function llenarCombo(data, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}
function MostrarPerfiles() {
    $.get("/CardinalSystem/BDPerfiles", function (InfPerfiles) {
        var CodigoHtmlTablaPagina = "";
        CodigoHtmlTablaPagina += "<div class='row'>";
        CodigoHtmlTablaPagina += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
        CodigoHtmlTablaPagina += "<input type='checkbox' class='checkbox-perfiles' id='0' name ='Todos'><span id='Span0' class='help-block text-muted small-font span-perfiles border'>Todos</span>";
        CodigoHtmlTablaPagina += "</div>";
        for (var i = 0; i < InfPerfiles.length; i++) {
            CodigoHtmlTablaPagina += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            CodigoHtmlTablaPagina += "<input type='checkbox' class='checkbox-perfiles' id='" + InfPerfiles[i].ID + "' name='" + InfPerfiles[i].Nombre + "' ><span id='Span" + InfPerfiles[i].ID + "' class='help-block text-muted small-font span-perfiles'>" + InfPerfiles[i].Nombre + "</span>";
            CodigoHtmlTablaPagina += "</div>";
        }
        CodigoHtmlTablaPagina += "</div>";
        document.getElementById("TblPerfiles").innerHTML = CodigoHtmlTablaPagina;
    });
}
//Multi-step
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
        avance.style.width = "0%"
        MostrarDiv(ClaseMostrar);
    }
    else if (ObligatoriosDatosP("Datostep-1") == true && ClaseMostrar == "step-2") {
        avance.style.width = "50%";
        MostrarDiv(ClaseMostrar);
    }
    else if (ObligatoriosDatosP("Datostep-2") == true && ClaseMostrar == "step-3" && SelecPerfiles() == true) {
        avance.style.width = "100%";
        MostrarDiv(ClaseMostrar);
    }
    else {
        //alert("Entro al otro else");
    }
}
function SelecPerfiles() {
    let Validacion = true;
    var ChevPermisos = document.getElementsByClassName("checkbox-perfiles");
    let seleccionados = "";
    for (let i = 0; i < ChevPermisos.length; i++) {
        if (ChevPermisos[i].checked == true) {
            seleccionados += ChevPermisos[i].name + ",";
        }
    }
    //let spanPermisos = document.getElementsByClassName("span-perfiles");

    if (seleccionados == "") {
        document.getElementById("alerta").innerHTML = "Debe seleccionar por lo menos un perfil";
        document.getElementById("alerta").style.color = "red";
        Validacion = false;
    }
    else {
        document.getElementById("alerta").innerHTML = "";
    }
    return Validacion;
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

function FFecha() {
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();
    dd = addZero(dd);
    mm = addZero(mm);
    var fecha = dd + '/' + mm + '/' + yyyy;
    return fecha;
}
function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}