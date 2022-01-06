let Tiempo;
Preguntas();
Respuestas();
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        setTimeout(RespuestasUsuario, 3000);
        //RespuestasUsuario();
    }
}
function Preguntas() {
    $.get("/Cardinal/EvaluacionPreguntasCuestionario/?IDCuestionario=" + sessionStorage.getItem('IDCuestionario'), function (DatosPreguntas) {
        var HTMLPreguntas = "";
        for (var i = 0; i < DatosPreguntas.length; i++) {

            HTMLPreguntas += "<div class='row'>";
            HTMLPreguntas += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>" + DatosPreguntas[i].NoPregunta + ". " + DatosPreguntas[i].Pregunta + "</strong></div>";
            HTMLPreguntas += "</div>";
            HTMLPreguntas += "<div id='Respuestas" + DatosPreguntas[i].IDPregunta + "' class='row'>Espacio para las RESPUESTAS</div>";
            HTMLPreguntas += "<hr>";
        }
        HTMLPreguntas += "<div class='row'>";
        HTMLPreguntas += "<div class='col-md-10 col-sm-12 col-xs-12'></div>";
        HTMLPreguntas += "<div class='col-md-2 col-sm-12 col-xs-12'>";
        HTMLPreguntas += "<button class='btn btn-success' onclick='Evaluar()'><i class='fas fa-edit'></i>Finalizar</button>";
        HTMLPreguntas += "<button class='btn btn-danger'><i class='fas fa-eraser'></i>Cancelar</button>";
        HTMLPreguntas += "</div>";
        HTMLPreguntas += "</div>";
        document.getElementById("PreguntasCuestionario").innerHTML = HTMLPreguntas;
    });
}
function Respuestas() {
    $.get("/Cardinal/EvaluacionPreguntasCuestionario/?IDCuestionario=" + sessionStorage.getItem('IDCuestionario'), function (DatosPreguntas) {
        if (DatosPreguntas.length > 0) {
            for (var i = 0; i < DatosPreguntas.length; i++) {
                $.get("/Cardinal/EvaluacionRespuestasCuestionario/?IDPregunta=" + DatosPreguntas[i].IDPregunta, function (DatosRespuestas) {
                    if (DatosRespuestas.length > 0) {
                        let HTMLRespuesta = "";
                        HTMLRespuesta += "<div class='row'>";
                        for (var r = 0; r < DatosRespuestas.length; r++) {
                            HTMLRespuesta += "<div class='col-md-10 col-sm-12 col-xs-12'><input type='radio'id='" + DatosRespuestas[r].IDRespuesta + "' name='Pregunta" + DatosRespuestas[r].IDPregunta + "' value='" + DatosRespuestas[r].IDRespuesta + "'>" + DatosRespuestas[r].NoRespuesta + "- " + DatosRespuestas[r].Respuesta + "</div>";
                        }
                        HTMLRespuesta += "</div>";
                        let Objeto = "Respuestas" + DatosRespuestas[0].IDPregunta;
                        document.getElementById(Objeto).innerHTML = HTMLRespuesta;
                    }
                });
                //if (i == DatosPreguntas.length - 1) {
                //    RespuestasUsuario();
                //}
            }
        }
    });
}

function RespuestasUsuario() {
    //let IDRespuestas = sessionStorage.getItem('IDRespuestas');
    //let Respuestas = sessionStorage.getItem('Respuestas');
    //let IDCuestionario = sessionStorage.getItem('IDCuestionario');
    $.get("/Evaluacion/ConsultaRespuestas/?IDRespuestas=" + sessionStorage.getItem('IDRespuestas'), function (DatosRespuestas) {
        if (DatosRespuestas.length > 0) {
            //let Respuestas=
            let ArrayRespuestas = DatosRespuestas[0].Respuestas.split(',');
            for (let i = 0; i < ArrayRespuestas.length; i++) {
                let Refutacion = ArrayRespuestas[i].split('-');
                if (Refutacion[1] != null && Refutacion[1] != "") {
                    document.getElementById(Refutacion[1]).checked = true;
                }
            }
        }
        Tiempo = setInterval(Evaluar, 60000, "Sistema");
    });
    //Cada 1000 = 1seg, 1 min = 60seg.
    //5min= (5*60)*1000=300*1000
    //120000= 2 minutos    
}



function Evaluar(Finalizado) {
    $.get("/Cardinal/EvaluacionPreguntasCuestionario/?IDCuestionario=" + sessionStorage.getItem('IDCuestionario'), function (DatosPreguntas) {
        if (DatosPreguntas.length > 0) {
            let Total = 0;
            let RespuestasFinales = "";
            for (var i = 0; i < DatosPreguntas.length; i++) {
                let Radios = document.getElementsByName("Pregunta" + DatosPreguntas[i].IDPregunta);
                let Valor = "";
                for (let r = 0; r < Radios.length; r++) {
                    if (Radios[r].checked) {
                        Valor = document.getElementById(Radios[r].id).value;
                    }
                }
                RespuestasFinales += "Pregunta" + DatosPreguntas[i].IDPregunta + "-" + Valor + ",";
                if (Valor == DatosPreguntas[i].IDRespuesta) {
                    Total = Total + DatosPreguntas[i].Valor;
                }
            }
            let Respuestas;
            Respuestas = RespuestasFinales.substring(0, RespuestasFinales.length - 1);
            //RespuestaUsuario = RespuestasFinales.substring(0, RespuestasFinales.length - 1);
            //alert(RespuestaUsuario);
            if (Finalizado == "Usuario") {
                if (confirm("¿Desea finalizar la evaluación?") == 1) {
                    Guardar(Respuestas, Finalizado, Total);
                }
            }
            else {
                Guardar(Respuestas, Finalizado, Total)
            }
        }
    });

}
function Guardar(Respuestas, Finalizado, Total) {
    Fecha = new Date();
    let IDRespuestas = sessionStorage.getItem('IDRespuestas');
    let IDCuestionario = sessionStorage.getItem('IDCuestionario');
    let SFecha = Fecha.toLocaleDateString();
    let NoSemana = Semana();
    let Año = new Date().getFullYear();
    var frm = new FormData();
    frm.append("IDRespuestas", IDRespuestas);
    frm.append("IDCuestionario", IDCuestionario);
    frm.append("Fecha", SFecha);
    frm.append("NoSemana", NoSemana);
    frm.append("Año", Año);
    frm.append("Respuestas", Respuestas);
    frm.append("Total", Total);
    frm.append("Finalizado", Finalizado);
    $.ajax({
        type: "POST",
        url: "/Evaluacion/GuardarRespuestasUsuario",
        data: frm,
        contentType: false,
        processData: false,
        success: function (Respuesta) {
            let HTMLAdvertencia = "";
            if (Respuesta == 1 && Finalizado == "Usuario") {
                HTMLAdvertencia += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
                HTMLAdvertencia += "<strong>Su evaluación ha sido guardada.</strong>";
                HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                HTMLAdvertencia += "</button>";
                HTMLAdvertencia += "</div>";
                document.getElementById("Alertas").innerHTML = HTMLAdvertencia;

                //document.getElementById("btnCancelar").click();
            }
            else if (Respuesta == 1 && Finalizado == "Sistema" || Respuesta == -1) {
                RespuestasUsuario();
            }
            else {
                HTMLAdvertencia += "<div class='alert alert-danger alert-dismissible fade show' role='alert'>";
                HTMLAdvertencia += "<strong>¡Ocurrio un error!</strong>";
                HTMLAdvertencia += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
                HTMLAdvertencia += "<span aria-hidden='true'>&times;</span>";
                HTMLAdvertencia += "</button>";
                HTMLAdvertencia += "</div>";
                document.getElementById("Alertas").innerHTML = HTMLAdvertencia;
            }
        }
    });
}
function Semana() {
    currentdate = new Date();
    var oneJan = new Date(currentdate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    var result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
    return result;
}