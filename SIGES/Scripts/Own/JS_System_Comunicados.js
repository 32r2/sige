Inicializar();
BloquearCTRL();

//if (DatosAreas.length !== 0) {}
function Inicializar() {
    $.get("/Cardinal/BDAreas", function (DatosAreas) {
        if (DatosAreas.length !== 0) {
            llenarCombo(DatosAreas, document.getElementById("cmbArea"));
            TablistAreas(DatosAreas, document.getElementById("TablistAreas"));
            
        } else {
            alert("No hay datos en la tabla Áreas.");
        }
    });
    $.get("/CardinalSystem/BDPerfiles", function (DatosPerfiles) {
        if (DatosPerfiles.length !== 0) {
            llenarMulti(DatosPerfiles, document.getElementById("cmbUsuarios"))
        } else {
            alert("No hay datos en la tabla Áreas.");
        }
    });
}

//Crea el acordeon de las areas y lo inserta
//Inserta las Áreas
function TablistAreas(DatosAreas, CtrlAreas) {
    var CodigoHTMLAreas = "";
    CodigoHTMLAreas += "<ul class='nav nav-tabs' role='tablist'>";
    for (var i = 0; i < DatosAreas.length; i++) {
        if (i < 1) {
            CodigoHTMLAreas += "<li class='nav-item'>";
            CodigoHTMLAreas += "<a class='nav-link active' data-toggle='tab' href='#Panel" + DatosAreas[i].ID + "' role='tab'>";
            CodigoHTMLAreas += "<span class='hidden-sm-up'></span>";
            CodigoHTMLAreas += "<span class='hidden-xs-down'><i class='m-r-10 mdi mdi-arrow-right-bold-circle-outline'></i>" + DatosAreas[i].Nombre + "</span>";
            CodigoHTMLAreas += "</a>";
            CodigoHTMLAreas += "</li>";
        }
        else {
            CodigoHTMLAreas += "<li class='nav-item'>";
            CodigoHTMLAreas += "<a class='nav-link' data-toggle='tab' href='#Panel" + DatosAreas[i].ID + "' role='tab'>";
            CodigoHTMLAreas += "<span class='hidden-sm-up'></span>";
            CodigoHTMLAreas += "<span class='hidden-xs-down'><i class='m-r-10 mdi mdi-arrow-right-bold-circle-outline'></i>" + DatosAreas[i].Nombre + "</span>";
            CodigoHTMLAreas += "</a>";
            CodigoHTMLAreas += "</li>";
        }
    }
    CodigoHTMLAreas += "</ul>";
    //******************************************************************Crear los divS de las areas para los comunicados************************************
    CodigoHTMLAreas += "<div class='tab-content tabcontent-border'>";
    for (var i = 0; i < DatosAreas.length; i++) {
        if (i < 1) {
            CodigoHTMLAreas += "<div class='tab-pane active' id='Panel" + DatosAreas[i].ID + "' role='tabpanel'>";
            CodigoHTMLAreas += "<div class='p-20'>";
            CodigoHTMLAreas += "<button onclick='AModalArea(0," + DatosAreas[i].ID + ")' type='button' class='btn btn-primary' data-toggle='modal' data-target='#ModalComunicados'>Agregar</button>";
            CodigoHTMLAreas += "</div>";
            CodigoHTMLAreas += "<div id='Tabla" + DatosAreas[i].ID + "' class='p-20'>";
            CodigoHTMLAreas += "Área para los comunicados del área de " + DatosAreas[i].Nombre;
            CodigoHTMLAreas += "</div>";
            CodigoHTMLAreas += "</div>";
        }
        else {
            CodigoHTMLAreas += "<div class='tab-pane' id='Panel" + DatosAreas[i].ID + "' role='tabpanel'>";
            CodigoHTMLAreas += "<div class='p-20'>";
            CodigoHTMLAreas += "<button onclick='AModalArea(0," + DatosAreas[i].ID + ")' type='button' class='btn btn-primary' data-toggle='modal' data-target='#ModalComunicados'>Agregar</button>";
            CodigoHTMLAreas += "</div>";
            CodigoHTMLAreas += "<div id='Tabla" + DatosAreas[i].ID + "' class='p-20'>";
            CodigoHTMLAreas += "Área para los comunicados del área de " + DatosAreas[i].Nombre;
            CodigoHTMLAreas += "</div>";
            CodigoHTMLAreas += "</div>";
        }
        Consulta(DatosAreas[i].ID);
    }
    CodigoHTMLAreas += "</div>";
    CtrlAreas.innerHTML = CodigoHTMLAreas;
}
//Inserta la tabla de las notificaciones por area
function Consulta(IDArea) {
    $.get("/Comunicados/ComunicadosArea/?IDArea=" + IDArea, function (ComunicadosArea) {
        if (ComunicadosArea.length > 0) {
            CrearTabla(ComunicadosArea, IDArea);
        }
    });
}
//tabla de notificaciones
function CrearTabla(ComunicadosArea, IDArea) {
    let CodHtml = "";
    CodHtml += "<table id='tablas' class='table table table-sm'>";
    CodHtml += "<thead>";
    CodHtml += "<tr><td>Encabezado</td><td>Usuarios</td><td>Fecha Inicia</td><td>Fecha Termina</td><td>Descripción</td><td>Opciones</td></tr>";
    CodHtml += "</thead>";
    CodHtml += "<tbody>";
    for (let i = 0; i < ComunicadosArea.length; i++) {
        CodHtml += "<tr>";
        CodHtml += "<td>" + ComunicadosArea[i].Nombre + "</td>";
        CodHtml += "<td>" + ComunicadosArea[i].Usuarios + "</td>";
        CodHtml += "<td>" + ComunicadosArea[i].FechaIni + "</td>";
        CodHtml += "<td>" + ComunicadosArea[i].FechaFin + "</td>";
        CodHtml += "<td>" + ComunicadosArea[i].Descripcion + "</td>";
        CodHtml += "<td>";
        CodHtml += "<button class='btn btn-primary' onclick='AModalArea(" + ComunicadosArea[i].ID + "," + IDArea + ")' data-toggle='modal' data-target='#ModalComunicados'><i class='fas fa-edit'></i></button> "
        CodHtml += "<button class='btn btn-danger' onclick='EliminarComunicado(" + ComunicadosArea[i].ID + "," + IDArea + ",this)' ><i class='fas fa-eraser'></i></button>"
        CodHtml += "</td>"
        CodHtml += "</tr>";
    }
    CodHtml += "</tbody>";
    CodHtml += "</table>";
    document.getElementById("Tabla" + IDArea).innerHTML = CodHtml;
}
//Abrir modal
function AModalArea(ID, IDArea) {
    let controlesObligatorio = document.getElementsByClassName("obligatorio");
    let ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("error");
    }
    if (ID == 0) {
        Limpiar();
        $("#PBFoto").attr('src', '');
        document.getElementById("cmbArea").value = IDArea;
        $.get("/Areas/BDRecursosImagenes/?IDArea=" + IDArea, function (Datosrecurso) {
            llenarComboRecursos(Datosrecurso, document.getElementById("cmbRecurso"));
        });
    }
    else {
        $.get("/Comunicados/BDComunicado/?ID=" + ID, function (Comunicado) {
            $.get("/Areas/BDRecursosImagenes/?IDArea=" + IDArea, function (Datosrecurso) {
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
            });
        });
    }
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
    if (Obligatorios("Comunicado") == true) {
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
            let ListUsuarios = document.getElementById("cmbUsuarios");
            let TempUsuarios = "";
            for (let i = 0; i < ListUsuarios.length; i++) {
                currentOption = ListUsuarios[i];
                //print it if it has been selected
                if (currentOption.selected == true) {
                    TempUsuarios += currentOption.text + ",";
                }
            }
            let Usuarios = TempUsuarios.substring(0, TempUsuarios.length - 1);
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
                            Consulta(IDArea);
                            document.getElementById("btnCancelar").click();
                        }
                    }
                }
            );
        }
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
                    Consulta(IDArea);
                }
            }
        });
    }
}

//llena el combobox
function llenarComboRecursos(data, control, primerElemento) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='../Assets/Resources/" + data[i].ID + "'>" + data[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
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
//llena el multiselect
function llenarMulti(data, control) {
    var contenido = "<option value='0'>Todos</option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}
function llenarCombo(data, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}