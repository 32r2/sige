CrearCuestionario();

function CrearCuestionario() {
    $.get("/Cardinal/EvaluacionCuestionario/", function (DatosCuestionarios) {
        var HTMLCuestionario = "";
        for (var i = 0; i < DatosCuestionarios.length; i++) {
            if (i < 1) {
                HTMLCuestionario += "<div class='card m-b-0'>";
            }
            else {
                HTMLCuestionario += "<div class='card m-b-0 border-top'>";
            }
            HTMLCuestionario += "<div class='card-header' id='heading" + DatosCuestionarios[i].ID + "'>";
            HTMLCuestionario += "<h5 class='mb-0'>";
            HTMLCuestionario += "<a data-toggle='collapse' onclick='ValidarCuestionario(" + DatosCuestionarios[i].ID + ")' data-target='#collapse" + DatosCuestionarios[i].ID + "' aria-expanded='false' aria-controls='collapse" + DatosCuestionarios[i].ID + "' class='collapsed'>";
            HTMLCuestionario += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
            HTMLCuestionario += "<span >" + DatosCuestionarios[i].Nombre + "</span>";
            HTMLCuestionario += "</a>";
            HTMLCuestionario += "</h5>";
            HTMLCuestionario += "<div id='collapse" + DatosCuestionarios[i].ID + "' class='collapse' aria-labelledby='headingOne' data-parent='#accordion' style=''>";
            HTMLCuestionario += "<div class='card-body'>";

            HTMLCuestionario += "<div class='row'>";
            HTMLCuestionario += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Área: </strong>" + DatosCuestionarios[i].NombreA + "</div>";
            HTMLCuestionario += "</div>";

            HTMLCuestionario += "<div class='row'>";
            HTMLCuestionario += "<div class='col-md-4 col-sm-4 col-xs-12'><strong>No. Preguntas: </strong>" + DatosCuestionarios[i].NoPreguntas + "</div>";
            HTMLCuestionario += "<div class='col-md-4 col-sm-4 col-xs-12'><strong>Fecha Inicio: </strong>" + DatosCuestionarios[i].FInicio + "</div>";
            HTMLCuestionario += "<div class='col-md-4 col-sm-4 col-xs-12'><strong>Fecha Fin: </strong>" + DatosCuestionarios[i].FFin + "</div>";
            HTMLCuestionario += "</div>";

            HTMLCuestionario += "<div class='row'>";
            HTMLCuestionario += "<div class='col-sm-9 col-md-9 col-xs-9'><strong>Descripción: </strong>" + DatosCuestionarios[i].Descripcion + "</div >";
            HTMLCuestionario += "</div>";

            HTMLCuestionario += "<div class='row'>";
            HTMLCuestionario += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
            HTMLCuestionario += "<a id='Cuestionario" + DatosCuestionarios[i].ID + "' class='btn btn-success' onclick='CargarPreguntas(" + DatosCuestionarios[i].ID + ")'  href='/Evaluacion/Cuestionario'>Contestar cuestionario <i class='fas fa-edit'></i></a>";
            HTMLCuestionario += "</div>";

            HTMLCuestionario += "</div>";
            HTMLCuestionario += "</div>";
            HTMLCuestionario += "</div>";
            HTMLCuestionario += "</div>";
            HTMLCuestionario += "</div>";
        }
        document.getElementById("accordion").innerHTML = HTMLCuestionario;
    });
}
function ValidarCuestionario(IDCuestionario) {
    $.get("/Evaluacion/ConsultaExamen/?IDCuestionario=" + IDCuestionario, function (DatosRespuestasUsuario) {
        let Control = "Cuestionario" + IDCuestionario;
        if (DatosRespuestasUsuario.length > 0) {
            //var Respuestas = DatosRespuestasUsuario[0].Respuestas.split(',');
            if (DatosRespuestasUsuario[0].Finalizado == "Usuario") {
                //alert("Ya finalizo la evaluacion " + DatosCuestionarios[0].Nombre);
                document.getElementById(Control).classList.add("not-active");
            }
            else {
                document.getElementById(Control).classList.remove("not-active");
            }
        }
        else {
            document.getElementById(Control).classList.remove("not-active");
        }
    });
}

function CargarPreguntas(IDCuestionario) {
    sessionStorage.setItem('IDCuestionario', IDCuestionario);
    $.get("/Evaluacion/ConsultaExamen/?IDCuestionario=" + IDCuestionario, function (DatosRespuestasUsuario) {
        let IDRespuestas = 0;
        if (DatosRespuestasUsuario.length > 0) {
            IDRespuestas = DatosRespuestasUsuario[0].IDRespuestas;
        }
        sessionStorage.setItem('IDRespuestas', IDRespuestas);
    });
}

