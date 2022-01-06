using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SIGES.Models
{
    public class User_UsuariosM
    {
        public static List<long> IDUsuario { get; set; }
        //public static List<string> CURP { get; set; }
        public static List<string> Nombre { get; set; }
        public static List<string> APaterno { get; set; }
        public static List<string> AMaterno { get; set; }
        public static List<string> NArea { get; set; }
        //public static List<DateTime> FNacimiento { get; set; }
        //public static List<int> IDEstado { get; set; }
        //public static List<int> IDLocalidad { get; set; }
        //public static List<int> IDMunicipio { get; set; }
        public static List<string> RFC { get; set; }
        public static List<string> NoSS { get; set; }
        public static List<string> Correo { get; set; }
        public static List<long> Telefono { get; set; }
        public static List<long> ContactoEmergencia { get; set; }
        public static List<string> ContactoNombre { get; set; }
        public static List<string> ContactoParentesco { get; set; }
        public static List<string> FIngreso { get; set; }
    }
}