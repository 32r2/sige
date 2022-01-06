using System.Collections.Generic;

namespace SIGES.Models
{
    public class Sucursales
    {
        public static List<long> IDTienda { get; set; }
        public static List<long> NoTienda { get; set; }
        public static List<string> Nombre { get; set; }
        public static List<string> NombreS { get; set; }
        public static List<string> LNombre { get; set; }
        public static List<string> E1Nombre { get; set; }
        public static List<string> E2Nombre { get; set; }
        public static List<string> E3Nombre { get; set; }
        public static List<string> A1Nombre { get; set; }
        public static List<string> A2Nombre { get; set; }
        public static List<string> A3Nombre { get; set; }
        public static List<string> Estado { get; set; }
        public static List<string> Municipio { get; set; }
        public static List<string> Localidad { get; set; }
        public static List<string> Calle { get; set; }
        public static List<long> CP { get; set; }
        public static List<long> Telefono { get; set; }
        public static List<string> Latitud { get; set; }
        public static List<string> Longitud { get; set; }
        public static List<string> HApertura { get; set; }
        public static List<string> HCierre { get; set; }
        public static List<string> IUSACodigo { get; set; }
        public static List<string> IUSAUsuario { get; set; }
        public static List<string> IUSAContraseña { get; set; }
        public static List<string> PCPAYUsuario { get; set; }
        public static List<string> PCPAYContraseña { get; set; }
        public static List<string> NoServicioLuz { get; set; }
        public static List<int> Estatus { get; set; }
    }
}