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