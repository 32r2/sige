LlenarCMBPrin();

function LlenarCMBPrin() {

    //Número de usuarios
    $.get("/Cardinal/NuUsuarios/", function (NuUsuarios) {
        let NuS = "0";
        if (NuUsuarios.length > 0) {
            NuS = NUsuarios.length;
        }
        document.getElementById("NUsuarios").innerHTML = NuS;
    });
    //Número de nuevos usuarios
    $.get("/Cardinal/NoUsuarios/", function (NUsuarios) {
        let NS = "0";
        if (NUsuarios.length > 0) {
            NS = NUsuarios.length;
        }
        document.getElementById("Usuarios").innerHTML = NS;
    });
    //Número de tiendas
    $.get("/Cardinal/BDTiendas/", function (NTiendas) {
        let NT = "0";
        if (NTiendas.length > 0) {
            NT = NTiendas.length;
        }
        document.getElementById("Tiendas").innerHTML = NT;
    });
    //Número de cursos
    $.get("/Cardinal/NoCursos/", function (NCursos) {
        let NC = "0";
        if (NCursos.length > 0) {
            NC = NCursos.length;
        }
        document.getElementById("Cursos").innerHTML = NC;
    });
    //Número de cuestionarios
    $.get("/Cardinal/NoCuestinoarios/", function (NCuestionarios) {
        let NCu = "0";
        if (NCuestionarios.length > 0) {
            NCu = NCuestionarios.length;
        }
        document.getElementById("Cuestionarios").innerHTML = NCu;
    });    
    $.get("/Usuarios/UsuarioINF/", function (InformacionUsuario) {
        if (InformacionUsuario.length > 0) {
            sessionStorage.setItem('IDUsuario', InformacionUsuario[0].ID);
            sessionStorage.setItem('Nombre', InformacionUsuario[0].Nombre);
            sessionStorage.setItem('IDAsignacion', InformacionUsuario[0].IDAsignacion);
            sessionStorage.setItem('IDSitio', InformacionUsuario[0].IDSitio);
            if (InformacionUsuario[0].IDAsignacion == 1) {
                sessionStorage.setItem('Tiendas', InformacionUsuario[0].IDSitio);
                $.get("/Cardinal/NoIncidenciaTienda/?IDTienda=" + InformacionUsuario[0].IDSitio, function (NIncidencias) {
                    let NI = "0";
                    if (NIncidencias.length > 0) {
                        NI = NIncidencias.length;
                    }
                    document.getElementById("Incidencias").innerHTML = NI;
                });
            }
            else if (InformacionUsuario[0].IDAsignacion == 2) {
                $.get("/Supervision/BDSupervision/?ID=" + InformacionUsuario[0].IDSitio, function (InformacionUsuario) {
                    sessionStorage.setItem('Tiendas', InformacionUsuario[0].Tiendas);
                    let NoInciSupervision = 0;
                    var TiendasSuper = InformacionUsuario[0].Tiendas.split(',');
                    for (let t = 0; t < TiendasSuper.length; t++) {
                        $.get("/Cardinal/NoIncidenciaTienda/?IDTienda=" + TiendasSuper[t], function (NIncidencias) {
                            NoInciSupervision += NIncidencias.length;
                            document.getElementById("Incidencias").innerHTML = NoInciSupervision;
                        });
                    }
                    
                });
            }
        }
    });
    $.get("/Cardinal/ComunicadosUsuario/", function (Comunicados) {
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