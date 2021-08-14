LlenarCMBPrin();

function LlenarCMBPrin() {
    
    $.get("/Comunicados/ComunicadosUsuario/?Usuario=" + "Todos", function (Comunicados) {
        llena(Comunicados, document.getElementById("myCarousel"));
    });
}
function llena(Comunicados, control) {
    var CodHtml = "";
    CodHtml += "<ol class='carousel-indicators'>";
    for (var i = 0; i < Comunicados.length; i++) {
        if (i < 1) {
            CodHtml += "<li data-target='#myCarousel' data-slide-to='" + i + "' class='active'></li>";
        }
        else {
            CodHtml += "<li data-target='#myCarousel' data-slide-to='" + i + "'></li>";
        }
    }
    CodHtml += "</ol>";
    CodHtml += "<div class='carousel-inner' height='514' width='209'>";
    for (var i = 0; i < Comunicados.length; i++) {
        if (i < 1) {
            CodHtml += "<div class='carousel-item active'>";
        }
        else {
            CodHtml += "<div class='carousel-item'>";
        }
        CodHtml += "<div class='parent d-flex justify-content-center'>";
        CodHtml += "<img class='d-block w-100' src='" + Comunicados[i].Foto + "' alt='" + Comunicados[i].Nombre + "' height='514' width=''>";
        CodHtml += "</div>";
        CodHtml += "<div class='carousel-caption '>";
        CodHtml += "<h3>" + Comunicados[i].Nombre + "</h3>";
        CodHtml += "<p>" + Comunicados[i].Descripcion + "</p>";
        CodHtml += "</div>";
        CodHtml += "</div>";
    }
    CodHtml += "</div>";
    CodHtml += "<a class='carousel-control-prev' href='#myCarousel' role='button' data-slide='prev'>";
    CodHtml += "<span class='carousel-control-prev-icon' aria-hidden='true' ></span>";
    CodHtml += "<span class='sr-only'>Previous</span>";
    CodHtml += "</a>";
    CodHtml += "<a class='carousel-control-next' href='#myCarousel' role='button' data-slide='next'>";
    CodHtml += "<span class='carousel-control-next-icon' aria-hidden='true'></span>";
    CodHtml += "<span class='sr-only'>Next</span>";
    CodHtml += "</a>";
    control.innerHTML = CodHtml;
}

//Fecha
//funcion para obtener la fecha del sistema
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