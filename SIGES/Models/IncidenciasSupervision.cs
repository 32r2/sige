using System;
using System.Collections.Generic;

namespace SIGES.Models
{
    public class IncidenciasSupervision
    {
        public static List<long> IDRIncidencia { get; set; }
        public static List<string> Nombre_Area { get; set; }
        public static List<string> Nombre_Subarea { get; set; }
        public static List<string> Tienda { get; set; }
        public static List<string> NombreIncidencia { get; set; }
        public static List<string> ReporteUNombre { get; set; }
        public static List<long> NoInsidencia { get; set; }
        public static List<DateTime> ReporteFecha { get; set; }
        public static List<string> ReporteObservaciones { get; set; }
        public static List<string> ReporteFoto { get; set; }
        public static List<string> SolucionUNombre { get; set; }
        public static List<DateTime> SolucionFecha { get; set; }
        public static List<string> SolucionDescripcion { get; set; }
        public static List<string> SolucionFoto { get; set; }
        public static List<int> Estatus { get; set; }
    }
}