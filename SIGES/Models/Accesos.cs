using System;
using System.Collections.Generic;

namespace SIGES.Models
{
    public class Accesos
    {
        public static List<string> Accion { get; set; }
        public static List<string> Controlador { get; set; }
        public static List<string> Mensaje { get; set; }
        public static List<string> Icono { get; set; }
        public static long ID { get; set; }
        public static string CURP { get; set; }
        public static string Nombre { get; set; }
        public static string APaterno { get; set; }
        public static string AMaterno { get; set; }
        public static DateTime FNacimiento { get; set; }
        public static string RFC { get; set; }
        public static string NoSS { get; set; }
        public static string NArea { get; set; }
        public static string NSArea { get; set; }
        public static string Asignacion { get; set; }
        public static string CManejador { get; set; }
        public static string CPlataforma { get; set; }
        public static string Sitio { get; set; }        
        public static string Foto { get; set; }
    }
}