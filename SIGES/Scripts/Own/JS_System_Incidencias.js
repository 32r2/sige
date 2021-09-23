Inicializar();
BloquearCTRL();
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
function Inicializar() {
    $.get("/Cardinal/BDAreas", function (DatosAreas) {
        if (DatosAreas.length > 0) {
            llena(DatosAreas, document.getElementById("AcordeonArea"));
            llenarCombo(DatosAreas, document.getElementById("cmbArea"));
        }
        else {
            alert("No hay información en la tabla áreas")
        }
    });
}
//Inserta las Áreas
function llena(DatosAreas, control) {
    var CodHtml = "";
    for (var i = 0; i < DatosAreas.length; i++) {
        if (i < 1) {
            CodHtml += "<div class='card m-b-0'>";
        }
        else {
            CodHtml += "<div class='card m-b-0 border-top'>";
        }
        CodHtml += "<div class='card-header' id='heading" + DatosAreas[i].ID + "'>";
        CodHtml += "<h5 class='mb-0'>";
        CodHtml += "<a onclick='InsertIncidencias(" + DatosAreas[i].ID + ")' data-toggle='collapse' data-target='#collapse" + DatosAreas[i].ID + "' aria-expanded='false' aria-controls='collapse" + DatosAreas[i].ID + "' class='collapsed'>";
        CodHtml += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodHtml += "<span >" + DatosAreas[i].Nombre + "</span>";
        CodHtml += "</a>";
        CodHtml += "</h5>";
        CodHtml += "<div id='collapse" + DatosAreas[i].ID + "' class='collapse' aria-labelledby='headingOne' data-parent='#AcordeonArea' style=''>";
        CodHtml += "<div class='card-body'>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Jefe de área: </strong>" + DatosAreas[i].UNombre + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Correo: </strong>" + DatosAreas[i].Correo + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + DatosAreas[i].Telefono + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-9 col-sm-9 col-xs-9'><strong>Incidencias: </strong></div >";
        CodHtml += "<div class='col-md-3 col-sm-3 col-xs-3'><button onclick='AbrirModalIncidencia(0, " + DatosAreas[i].ID + ")' type='button' class='btn btn-primary' data-toggle='modal' data-target='#ModalIncidencias'>Agregar</button></div > ";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-12 col-sm-12 col-xs-12' id='Incidencias" + DatosAreas[i].ID + "'>Espacio para las incidencias del área</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
    }
    control.innerHTML = CodHtml;
}
//**********************************************************************************************************************************************************************************
//INFORMACION DE LAS INCIDENCIAS **********************************************************
//Consulta para insertar las INCIDENCIAS
function InsertIncidencias(IDA) {
    $.get("/Incidencias/BDInsidenciasArea/?IDA=" + IDA, function (DatosIncidencias) {
        CrearIncidencias(DatosIncidencias, document.getElementById("Incidencias" + IDA));
    });
}
//Inserta la informacion de las preguntas
function CrearIncidencias(DatosIncidencias, IDo) {
    var CodHtml = "";
    CodHtml += "<div class='card-body' id='Incidencia'>";
    CodHtml += "<div class='row'>";
    CodHtml += "<div class='col-md-4 col-sm-4 col-xs-4'>Incidencia</div>";
    CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'>Descripción</div>";
    CodHtml += "<div class='col-md-2 col-sm-2 col-xs-2'>Opciones</div>";
    CodHtml += "</div>";
    for (var i = 0; i < DatosIncidencias.length; i++) {
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-4 col-sm-4 col-xs-4'>"
        CodHtml += "<button class='btn btn-primary' onclick='AbrirModalIncidencia(" + DatosIncidencias[i].ID + "," + DatosIncidencias[i].IDArea + ")' data-toggle='modal' data-target='#ModalIncidencias'><i class='fas fa-edit'></i></button> ";
        CodHtml += DatosIncidencias[i].Nombre + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'>" + DatosIncidencias[i].Descripcion + "</div>";
        CodHtml += "<div class='col-md-2 col-sm-2 col-xs-2'>";
        CodHtml += "<button class='btn btn-danger' onclick='EliminarIncidencia(" + DatosIncidencias[i].ID + "," + DatosIncidencias[i].IDArea + ",this)'><i class='fas fa-eraser'></i></button>";
        CodHtml += "<button class='btn btn-success' onclick='abrirModalProce(0," + DatosIncidencias[i].ID + ");' data-toggle='modal' data-target='#ModalProcedimientos'><i class='fa fa-plus-square'></i></button>";
        CodHtml += "<button class='btn btn-info' onclick='MostrarOcultar(" + DatosIncidencias[i].ID + ");'><i id='BtnMO" + DatosIncidencias[i].ID + "' class='fas fa-chevron-circle-down'></i></button>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "<div id='p" + DatosIncidencias[i].ID + "' style='background-color: white; display: none;'>Este elemento aparece y desaparece con el botón</div >";
        CodHtml += "<hr/>";
    }
    CodHtml += "</div>";
    IDo.innerHTML = CodHtml;
}
//abrir Modal
function AbrirModalIncidencia(id, IDA) {
    var controlesObligatorio = document.getElementsByClassName("Incidencias");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("border-danger");
    }
    if (id == 0) {
        LimpiarCampos();
        document.getElementById("cmbArea").value = IDA;
        $.get("/Cardinal/BDSubAreas/?IDA=" + IDA, function (DatosSubarea) {
            llenarCombo(DatosSubarea, document.getElementById("cmbSubArea"), true);
        });
    }
    else {
        $.get("/Incidencias/BDInsidencia/?ID=" + id, function (DatosIncidencia) {
            document.getElementById("TxtIDIncidencia").value = DatosIncidencia[0].IDIncidencia;
            document.getElementById("TxtNombre").value = DatosIncidencia[0].Nombre;
            document.getElementById("TxtNoSoluciones").value = DatosIncidencia[0].NoSoluciones;
            document.getElementById("cmbArea").value = DatosIncidencia[0].IDArea;
            $.get("/Cardinal/BDSubAreas/?IDA=" + IDA, function (DatosSubarea) {
                llenarCombo(DatosSubarea, document.getElementById("cmbSubArea"), true);
                document.getElementById("cmbSubArea").value = DatosIncidencia[0].IDSubArea;
            });
            document.getElementById("TxtDescripcion").value = DatosIncidencia[0].Descripcion;
            document.getElementById("cmbReporte").value = DatosIncidencia[0].Reporte;
        });
    }
}
// Guardar
function GuardarIncidencia() {
    if (Obligatorios("Incidencias") == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IDIncidencia = document.getElementById("TxtIDIncidencia").value;
            var IDArea = document.getElementById("cmbArea").value;
            var IDSubArea = document.getElementById("cmbSubArea").value;
            var NoSoluciones = document.getElementById("TxtNoSoluciones").value;
            var Nombre = document.getElementById("TxtNombre").value;
            var Descripcion = document.getElementById("TxtDescripcion").value;
            var Reporte = document.getElementById("cmbReporte").value;
            var frm = new FormData();
            frm.append("IDIncidencia", IDIncidencia);
            frm.append("IDArea", IDArea);
            frm.append("IDSubArea", IDSubArea);
            frm.append("NoSoluciones", NoSoluciones);
            frm.append("Nombre", Nombre);
            frm.append("Descripcion", Descripcion);
            frm.append("Reporte", Reporte);
            frm.append("Estatus", 1);
            $.ajax(
                {
                    type: "POST",
                    url: "/Incidencias/GuardarIncidencia",
                    data: frm,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (data == 0) {
                            alert("Ocurrio un error");
                        }
                        else if (data == -1) {
                            alert("Ya existe la Incidencia");
                        }
                        else {
                            alert("Se ejecuto correctamente");
                            InsertIncidencias(IDArea);
                            document.getElementById("btnCancelar").click();
                        }
                    }
                }
            );
        }
    }
}
//Eliminar incidencia
function EliminarIncidencia(id, IDArea) {
    if (confirm("¿Desea eliminar el registo?") == 1) {
        $.get("/Incidencias/EliminarIncidencia/?id=" + id, function (data) {
            if (data == -1) {
                alert("Ya existe un registro con esa información");
            } else
                if (data == 0) {
                    alert("Ocurrio un error");
                } else {
                    alert("Se elimino correctamente");
                    InsertIncidencias(IDArea);
                }
        });
    }
}
//**********************************************************************************************************************************************************************************
function abrirModalProce(id, idi) {
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("error");
    }
    LimpiarCampos();
    document.getElementById("carouselRecursos").innerHTML = "";
    if (id == 0) {
        $.get("/Incidencias/BDInsidencia/?ID=" + idi, function (data) {
            var Area = data[0].IDArea;
            $.get("/Cardinal/BDAreas", function (dataA) {
                llenarCombo(dataA, document.getElementById("cmbAreaProce"), true);
                document.getElementById("cmbAreaProce").value = Area;
            });
            $.get("/Incidencias/BDInsidenciasArea/?IDA=" + Area, function (datosInA) {
                llenarCombo(datosInA, document.getElementById("cmbIDIncidencia"), true);
                document.getElementById("cmbIDIncidencia").value = idi;
            });
            $.get("/Areas/BDRecursosImagenes/?IDArea=" + Area, function (Datosrecurso) {
                llenarCombo(Datosrecurso, document.getElementById("cmbRecurso"), true);
            });
            document.getElementById("TxtFModificacion").value = FFecha();
            var NoSoluciones = data[0].NoSoluciones;
            llenarComboSoluciones(NoSoluciones, document.getElementById("cmbNoSolucion"), true);
            document.getElementById('editor').value = "";
            
        });
    }
    else {
        $.get("/Incidencias/BDAyudaID/?IDm=" + id, function (Paso) {
            document.getElementById("TxtIDMesaAyuda").value = Paso[0].ID;
            $.get("/Incidencias/BDInsidenciasArea/?IDA=" + Paso[0].IDArea, function (datosInA) {
                llenarCombo(datosInA, document.getElementById("cmbIDIncidencia"), true);
                document.getElementById("cmbIDIncidencia").value = Paso[0].IDIncidencia;
                var NoSoluciones = datosInA[0].NoSoluciones;
                llenarComboSoluciones(NoSoluciones, document.getElementById("cmbNoSolucion"), true);
                document.getElementById("cmbNoSolucion").value = Paso[0].NoSolucion;
            });
            $.get("/Cardinal/BDAreas", function (dataA) {
                llenarCombo(dataA, document.getElementById("cmbAreaProce"), true);
                document.getElementById("cmbAreaProce").value = Paso[0].IDArea;
            });
            $.get("/Areas/BDRecursosImagenes/?IDArea=" + Paso[0].IDArea, function (Datosrecurso) {
                llenarCombo(Datosrecurso, document.getElementById("cmbRecurso"), true);
                document.getElementById("cmbRecurso").value = Paso[0].Imagen;
                if (Paso[0].Imagen != 0) {
                    document.getElementById("carouselRecursos").innerHTML = "<img id='PBFoto' src='../Assets/Resources/" + Paso[0].Imagen + "' width='470' height='250'/>";
                }
            });
            document.getElementById("TxtFModificacion").value = Paso[0].FechaModificacion;
            document.getElementById("TxtNoPaso").value = Paso[0].NoPaso;
            var DesTemp = Paso[0].Descripcion;
            var HTMLcOD = "<div class='ql-editor ql-blank' data-gramm='false' contenteditable='true'>";
            HTMLcOD += DesTemp.replace(/< /g, "<").replace(/ >/g, ">");
            HTMLcOD += "</div>";
            HTMLcOD += "<div class='ql-clipboard' tabindex='-1' contenteditable='true'></div>";
            HTMLcOD += "<div class='ql-tooltip ql-hidden'>";
            HTMLcOD += "<a class='ql-preview' target='_blank' href='about:blank'></a>";
            HTMLcOD += "<input type='text' data-formula='e=mc^2' data-link='https://quilljs.com' data-video='Embed URL'>";
            HTMLcOD += "<a class='ql-action'></a>";
            HTMLcOD += "<a class='ql-remove'></a>";
            HTMLcOD += "</div>";

            document.getElementById("editor").innerHTML = HTMLcOD;
        });
    }
}
//Evento Change index tipo
var NoS = document.getElementById("cmbRecurso");
NoS.addEventListener("change", function () {
    var Ruta = document.getElementById("cmbRecurso").value;
    var CodHtml = "";
    CodHtml = "<img id='PBFoto' src='../Assets/Resources/" + Ruta + "' width='470' height='250'/>";
    document.getElementById("carouselRecursos").innerHTML = CodHtml;
});

//event Change index Areas
var NoS = document.getElementById("cmbNoSolucion");
NoS.addEventListener("change", function () {
    var IDI = document.getElementById("cmbIDIncidencia");
    $.get("/Incidencias/BDAyudaPasos/?ID=" + IDI.value + "&NoS=" + NoS.value, function (data) {
        document.getElementById("TxtNoPaso").value = data.length + 1;
    });
});
//llena numero
function llenarComboSoluciones(NoSol, control, primerElemento) {
    var contenido = "";
    if (primerElemento == true) {
        contenido += "<option value='0'>--Seleccione--</option>";
    }
    for (var i = 1; i < NoSol + 1; i++) {
        contenido += "<option value='" + i + "'>" + i + "</option>";
    }
    control.innerHTML = contenido;
}
function GuardarProcedimiento() {
    if (Obligatorios("Procedimiento") == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IDMesaAyuda = document.getElementById("TxtIDMesaAyuda").value;
            var IDIncidencia = document.getElementById("cmbIDIncidencia").value;
            var IDArea = document.getElementById("cmbAreaProce").value;
            var NoSolucion = document.getElementById("cmbNoSolucion").value;
            var FModificacion = document.getElementById("TxtFModificacion").value;
            var NoPaso = document.getElementById("TxtNoPaso").value;
            var CadenaTemp = document.getElementById("editor").innerHTML;
            //Obtener la información dentro del div del editor
            var n1 = CadenaTemp.indexOf(">");
            var n2 = CadenaTemp.indexOf("</div>");
            var ncaenas = n2 - (n1 + 1);
            var Desc = CadenaTemp.substr(n1 + 1, ncaenas);
            var NCAd = Desc.replace(/</g, '< ');
            var NCAd2 = NCAd.replace(/>/g, ' >');
            var Descripcion = NCAd2;
            var Imagen = document.getElementById("cmbRecurso").value;
            var frm = new FormData();
            frm.append("IDMesaAyuda", IDMesaAyuda);
            frm.append("IDIncidencia", IDIncidencia);
            frm.append("IDArea", IDArea);
            frm.append("NoSolucion", NoSolucion);
            frm.append("FModificacion", FModificacion);
            frm.append("NoPaso", NoPaso);
            frm.append("Descripcion", Descripcion);
            frm.append("Imagen", Imagen);
            frm.append("Estatus", 1);
            $.ajax(
                {
                    type: "POST",
                    url: "/Incidencias/GuardarPro",
                    data: frm,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (data == 0) {
                            alert("Ocurrio un error");
                        }
                        else if (data == -1) {
                            alert("Ya existe la sub-área");
                        }
                        else {
                            alert("Se ejecuto correctamente");
                            MostrarProcedimientos(IDIncidencia);
                            InsertarPasos(IDIncidencia);
                            document.getElementById("btnCancelarPro").click();
                        }
                    }
                }
            );
        }
    }
}
//inserta los paso a seguir para solucionar la insidencia
function MostrarProcedimientos(IDIncidencia) {
    $.get("/Incidencias/BDInsidencia/?ID=" + IDIncidencia, function (Insidencias) {
        var CodeHTML = "";
        var Soluciones = Insidencias[0].NoSoluciones;
        for (var i = 1; i < Soluciones + 1; i++) {
            CodeHTML += "<br/>";
            CodeHTML += "<h5> Procedimiento No." + i + " para la solución de la insidencia</h5>";
            CodeHTML += "<div class='row' id='P" + IDIncidencia + "nP" + i + "'>Espacio</div>";
        }
        document.getElementById("p" + IDIncidencia).innerHTML = CodeHTML;
    });
}
function InsertarPasos(IDIncidencia) {
    $.get("/Incidencias/BDInsidencia/?ID=" + IDIncidencia, function (Incidencias) {
        let NoSol = Incidencias[0].NoSoluciones;
        for (let Is = 1; Is <= NoSol; Is++) {
            $.get("/Incidencias/BDAyudaPasos/?ID=" + IDIncidencia + "&NoS= " + Is, function (Pasos) {
                if (Pasos.length != 0) {
                    let CodigoHTML = "";
                    for (let x = 0; x < Pasos.length; x++) {
                        var temp = Pasos[x].Descripcion;
                        var sux = temp.replace(/< /g, "<").replace(/ >/g, ">");
                        CodigoHTML += "<div class='col-md-1 col-sm-1 col-xs-1'>";
                        CodigoHTML += "<button class='btn btn-success' onclick='abrirModalProce(" + Pasos[x].ID + "," + IDIncidencia + ");' data-toggle='modal' data-target='#ModalProcedimientos'><i class='fa fa-plus-square'></i></button>";
                        CodigoHTML += "</div>";
                        CodigoHTML += "<div class='col-md-8 col-sm-8 col-xs-8'style='height:auto;'>";
                        CodigoHTML += sux.replace(/<p>/g, "<p>");
                        CodigoHTML += "</div>";
                        CodigoHTML += "<div class='col-md-3 col-sm-3 col-xs-3'>";
                        var TempImg = Pasos[x].Imagen;
                        if (TempImg != 0) {
                            CodigoHTML += TempImg;
                        }
                        CodigoHTML += "</div>";
                    }
                    let Control = "P" + IDIncidencia + "nP" + Is;
                    document.getElementById(Control).innerHTML = CodigoHTML;
                }
            });
        }
    });
}
//fucnion que oculta o muestra un div, cambia el icono del boton
function MostrarOcultar(IDIncidencia) {
    var x = document.getElementById("p" + IDIncidencia);
    if (x.style.display === "none") {
        x.style.display = "block";
        document.getElementById("BtnMO" + IDIncidencia).className = "fas fa-chevron-circle-up";
        MostrarProcedimientos(IDIncidencia);
        InsertarPasos(IDIncidencia);
    }
    else {
        x.style.display = "none";
        document.getElementById("BtnMO" + IDIncidencia).className = "fas fa-chevron-circle-down";
    }
}
//**********************************************************************************************************************************************************************************
//limpiar campos
function LimpiarCampos() {
    var controles = document.getElementsByClassName("limpiar");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        if (controles[i].nodeName == "SELECT") {
            controles[i].value = "0";
        }
        else {
            controles[i].value = "";
        }
    }
}
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
function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}
function llenarCombo(data, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}