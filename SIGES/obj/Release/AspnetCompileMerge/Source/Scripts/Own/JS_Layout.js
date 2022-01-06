function icono(id, una, otra) {
    imagen = document.getElementById(id);
    var str = imagen.src;
    var n = str.indexOf("/Assets");
    var res = str.substring(n, str.length);
    if (res == otra) {
        imagen.src = una;
        imagen.width = "175";
        imagen.height = "50";
    } else {
        imagen.src = otra;
        imagen.width = "45";
        imagen.height = "45";
    }
}

DatosSucursal();
function DatosSucursal() {
    let Asignacion = document.getElementById("AsignacionModal").textContent;
    let Sitio = document.getElementById("SitioModal").textContent;
    if (Asignacion == "Sucursal") {
        Sucursal();
    } else if (Asignacion == "Supervisión") {
        sessionStorage.setItem('Supervision', Sitio);
        var DatosIUSA = "";
        DatosIUSA += "<div>";
        DatosIUSA += "<p ><a class='btn btn-success' href='/Supervision/SucursalesSupervision'>Sucursales</a><span class='CardBody_Text_Claro'><br>Hacer clic en el enlace para visualizar la información de las sucursales relacionadas a su supervisión</span></p>";
        DatosIUSA += "</div>";        
        document.getElementById("DatosIUSA").innerHTML = DatosIUSA;
    }
    else {
        var DatosIUSA = "";
        DatosIUSA += "<div>";
        DatosIUSA += "<p class='CardBody_Text'>usted no tiene asignada una sucursal o supervisión<span class='CardBody_Text_Claro'></span></p>";
        DatosIUSA += "</div>";
        document.getElementById("DatosIUSA").innerHTML = DatosIUSA;
    }  
}

function Sucursal() {
    $.get("/Tiendas/SucursalUsuario/", function (Sucursal) {
        var DatosIUSA = "";
        DatosIUSA += "<div class='CardFooter_Stats'>";
        DatosIUSA += "<p class='CardBody_Text'>" + Sucursal[0].IUSACodigo + "<span class='CardBody_Text_Claro'><br>Código IUSA</span></p>";
        DatosIUSA += "</div>";
        DatosIUSA += "<div class='CardFooter_Stats'>";
        DatosIUSA += "<p class='CardBody_Text'>" + Sucursal[0].IUSAUsuario + "<span class='CardBody_Text_Claro'><br>Usuario IUSA</span></p>";
        DatosIUSA += "</div>";
        DatosIUSA += "<div class='CardFooter_Stats'>";
        DatosIUSA += "<p class='CardBody_Text'>" + Sucursal[0].IUSAContraseña + "<span class='CardBody_Text_Claro'><br>Contraseña IUSA</span></p>";
        DatosIUSA += "</div>";
        document.getElementById("DatosIUSA").innerHTML = DatosIUSA;
        var DatosPCPay = "";
        DatosPCPay += "<div class='CardFooter_Stats'>";
        DatosPCPay += "<p class='CardBody_Text'>" + Sucursal[0].PCPAYUsuario + "<span class='CardBody_Text_Claro'><br>Usuario PCPay</span></p>";
        DatosPCPay += "</div>";
        DatosPCPay += "<div class='CardFooter_Stats'>";
        DatosPCPay += "<p class='CardBody_Text' >" + Sucursal[0].PCPAYContraseña + "<span class='CardBody_Text_Claro'><br>Contraseña</span></p>";
        DatosPCPay += "</div>";
        DatosPCPay += "<div class='CardFooter_Stats'>";
        DatosPCPay += "<p class='CardBody_Text' >" + Sucursal[0].NoServicioLuz + "<span class='CardBody_Text_Claro'><br>No. Servicio CFE</span></p>";
        DatosPCPay += "</div>";
        document.getElementById("DatosPCPay").innerHTML = DatosPCPay;    
    });
}