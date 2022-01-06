using SIGES.Filtro;
using SIGES.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace SIGES.Controllers
{
    [Seguridad]
    public class ReportesController : Controller
    {
        SIGESDBDataContext SIGES = new SIGESDBDataContext();

        // GET: Reportes
        public ActionResult Reportes()
        {
            CargarIncidenciasTiendas();
            return View();
        }
        //Consulta por tienda
        public void CargarIncidenciasTiendas()
        {
            IncidenciasSupervision ListaIncidencias = new IncidenciasSupervision();
            IncidenciasSupervision.IDRIncidencia = new List<long>();
            IncidenciasSupervision.Nombre_Area = new List<string>();
            IncidenciasSupervision.Nombre_Subarea = new List<string>();
            IncidenciasSupervision.Tienda = new List<string>();
            IncidenciasSupervision.NombreIncidencia = new List<string>();
            IncidenciasSupervision.ReporteUNombre = new List<string>();
            IncidenciasSupervision.NoInsidencia = new List<long>();
            IncidenciasSupervision.ReporteFecha = new List<DateTime>();
            IncidenciasSupervision.ReporteObservaciones = new List<string>();
            IncidenciasSupervision.ReporteFoto = new List<string>();
            IncidenciasSupervision.SolucionUNombre = new List<string>();
            IncidenciasSupervision.SolucionFecha = new List<DateTime>();
            IncidenciasSupervision.SolucionDescripcion = new List<string>();
            IncidenciasSupervision.SolucionFoto = new List<string>();
            IncidenciasSupervision.Estatus = new List<int>();
            int Resultado = 0;
            string Tiendas = Session["Tiendas"].ToString();
            string[] ArrayIDTiendas = Tiendas.Split(',');
            string FechaActua = DateTime.Now.ToString("dd-MM-yyyy");
            string[] ArrayFecha = FechaActua.Split('-');
            DateTime NFecha = Convert.ToDateTime(ArrayFecha[2] + "/" + ArrayFecha[1] + "/" + ArrayFecha[0]);
            DateTime MFecha = NFecha.AddDays(-30);
            for (int i = 0; i < ArrayIDTiendas.Length; i++)
            {
                if (ArrayIDTiendas[i] != "")
                {
                    var IncidenciasXTienda = (from TableReportes in SIGES.System_Incidencias_User_RIncidencias
                                              join TableIncidencias in SIGES.System_Incidencias
                                              on TableReportes.IDIncidencia equals TableIncidencias.IDIncidencia
                                              join TableAreas in SIGES.System_Areas
                                              on TableReportes.IDArea equals TableAreas.IDArea
                                              join TableSubareas in SIGES.System_Areas_SubAreas
                                              on TableReportes.IDSubArea equals TableSubareas.IDSubArea
                                              join TableTiendas in SIGES.System_Sis_Tienda
                                              on TableReportes.IDTienda equals TableTiendas.IDTienda
                                              where TableReportes.IDTienda.Equals(Convert.ToInt32(ArrayIDTiendas[i])) && TableReportes.ReporteFecha >= MFecha
                                              select new
                                              {
                                                  IDRIncidencia = TableReportes.IDRIncidencia,
                                                  NombreArea = TableAreas.Nombre,
                                                  NombreSubarea = TableSubareas.Nombre,
                                                  Tienda = TableTiendas.Nombre,
                                                  NombreIncidencia = TableIncidencias.Nombre,
                                                  ReporteUNombre = TableReportes.ReporteUNombre,
                                                  NoInsidencia = TableReportes.NoInsidencia,
                                                  ReporteFecha = TableReportes.ReporteFecha,
                                                  ReporteObservaciones = TableReportes.ReporteObservaciones,
                                                  ReporteFoto = Convert.ToBase64String(TableReportes.ReporteFoto.ToArray()),
                                                  SolucionUNombre = TableReportes.SolucionUNombre,
                                                  SolucionFecha = TableReportes.SolucionFecha,
                                                  SolucionDescripcion = TableReportes.SolucionDescripcion,
                                                  SolucionFoto = Convert.ToBase64String(TableReportes.SolucionFoto.ToArray()),
                                                  Estatus = TableReportes.Estatus
                                              }).ToList();
                    Resultado += IncidenciasXTienda.Count();
                    if (IncidenciasXTienda.Count() > 0)
                    {
                        foreach (var Inc in IncidenciasXTienda)
                        {
                            IncidenciasSupervision.IDRIncidencia.Add(Inc.IDRIncidencia);
                            IncidenciasSupervision.Nombre_Area.Add(Inc.NombreArea);
                            IncidenciasSupervision.Nombre_Subarea.Add(Inc.NombreSubarea);
                            IncidenciasSupervision.Tienda.Add(Inc.Tienda);
                            IncidenciasSupervision.NombreIncidencia.Add(Inc.NombreIncidencia);
                            IncidenciasSupervision.ReporteUNombre.Add(Inc.ReporteUNombre);
                            IncidenciasSupervision.NoInsidencia.Add(Inc.NoInsidencia);
                            IncidenciasSupervision.ReporteFecha.Add(Inc.ReporteFecha);
                            IncidenciasSupervision.ReporteObservaciones.Add(Inc.ReporteObservaciones);
                            IncidenciasSupervision.ReporteFoto.Add(Inc.ReporteFoto);
                            if (Inc.SolucionUNombre != null)
                            {
                                IncidenciasSupervision.SolucionUNombre.Add(Inc.SolucionUNombre);
                            }
                            else
                            {
                                IncidenciasSupervision.SolucionUNombre.Add("");
                            }
                            if (Inc.SolucionFecha != null)
                            {
                                IncidenciasSupervision.SolucionFecha.Add((DateTime)Inc.SolucionFecha);
                            }
                            else
                            {
                                IncidenciasSupervision.SolucionFecha.Add(Convert.ToDateTime("18/09/2019"));
                            }
                            if (Inc.SolucionDescripcion != null)
                            {
                                IncidenciasSupervision.SolucionDescripcion.Add(Inc.SolucionDescripcion);
                            }
                            else
                            {
                                IncidenciasSupervision.SolucionDescripcion.Add("");
                            }
                            if (Inc.SolucionFoto != null)
                            {
                                IncidenciasSupervision.SolucionFoto.Add(Inc.SolucionFoto);
                            }
                            else
                            {
                                IncidenciasSupervision.SolucionFoto.Add("");
                            }
                            if (Inc.Estatus != null)
                            {
                                IncidenciasSupervision.Estatus.Add((int)Inc.Estatus);
                            }
                            else
                            {
                                IncidenciasSupervision.Estatus.Add(0);
                            }
                        }
                    }
                }
            }
        }

        public JsonResult GraficaReporte()
        {
            string TiendasS = Session["Tiendas"].ToString();
            string[] Tiendas = TiendasS.Split(',');
            /**************************************************/
            string FechaActua = DateTime.Now.ToString("dd-MM-yyyy");
            string[] ArrayFecha = FechaActua.Split('-');
            DateTime NFecha = Convert.ToDateTime(ArrayFecha[2] + "/" + ArrayFecha[1] + "/" + ArrayFecha[0]);
            DateTime MFecha = NFecha.AddDays(-30);
            /**************************************************/
            //Optiene los nombres de las sucursales
            string NTiendas = "";
            for (int t = 0; t < Tiendas.Length; t++)
            {
                var Nombre_Tienda = SIGES.System_Sis_Tienda.Where(p => p.IDTienda.Equals(Convert.ToInt64(Tiendas[t])))
                .Select(p => new
                {
                    ID = p.IDTienda,
                    p.Nombre
                }).First();
                if (Nombre_Tienda != null)
                {
                    NTiendas += Nombre_Tienda.Nombre + ",";
                }
            }
            /**************************************************/
            string No_Incidencias_Sucursal = "";
            string IncidenciasDPtos = "";
            for (int D = 0; D < Departamentos.IDArea.Count(); D++)
            {
                //Departamentos
                IncidenciasDPtos += Departamentos.Nombre[D] + ",";
                string No_Incidencias = "";
                for (int t = 0; t < Tiendas.Length; t++)
                {
                    var Incidencias_Departamento_Sucursal = SIGES.System_Incidencias_User_RIncidencias.Where(p => p.IDArea.Equals(Departamentos.IDArea[D])
                 && p.IDTienda.Equals(Convert.ToInt32(Tiendas[t]))
                 && p.ReporteFecha >= MFecha)
                    .Select(p => new
                    {
                        ID = p.IDRIncidencia
                    });
                    No_Incidencias += Incidencias_Departamento_Sucursal.Count().ToString() + ",";
                }
                No_Incidencias_Sucursal += No_Incidencias.Substring(0, No_Incidencias.Length - 1) + "/";
            }
            /**************************************************/
            var Resultado = new { Tiendas = NTiendas.Substring(0, NTiendas.Length - 1), Areas = IncidenciasDPtos.Substring(0, IncidenciasDPtos.Length - 1), NoIncidencias = No_Incidencias_Sucursal.Substring(0, No_Incidencias_Sucursal.Length - 1) };
            return Json(Resultado, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ReportesArea()
        {
            CargarIncidenciasDepartamentos();
            return View();
        }
        public JsonResult GraficaReporteAreas()
        {
            long IDArea = Convert.ToInt64(Session["IDArea"]);
            var Incidencias = SIGES.System_Incidencias.Where(p => p.IDArea.Equals(IDArea) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDIncidencia,
                    p.IDArea,
                    p.IDSubArea,
                    p.NoSoluciones,
                    p.Nombre,
                    p.Descripcion
                });

            /**************************************************/


            string IncidenciasArea = "";
            string No_Incidencias = "";
            foreach (var inc in Incidencias)
            {
                IncidenciasArea += inc.Nombre + ",";
                var Incidencias_Departamento = SIGES.System_Incidencias_User_RIncidencias.Where(p => p.IDArea.Equals(inc.IDArea))
             .Select(p => new
             {
                 ID = p.IDRIncidencia
             });
                No_Incidencias += Incidencias_Departamento.Count().ToString() + ",";
            }
            /**************************************************/
            var Resultado = new { Incidencias = IncidenciasArea.Substring(0, IncidenciasArea.Length - 1), NoIncidencias = No_Incidencias.Substring(0, No_Incidencias.Length - 1) };
            return Json(Resultado, JsonRequestBehavior.AllowGet);
        }
        public void CargarIncidenciasDepartamentos()
        {
            IncidenciasSupervision ListaIncidencias = new IncidenciasSupervision();
            IncidenciasSupervision.IDRIncidencia = new List<long>();
            IncidenciasSupervision.Nombre_Area = new List<string>();
            IncidenciasSupervision.Nombre_Subarea = new List<string>();
            IncidenciasSupervision.Tienda = new List<string>();
            IncidenciasSupervision.NombreIncidencia = new List<string>();
            IncidenciasSupervision.ReporteUNombre = new List<string>();
            IncidenciasSupervision.NoInsidencia = new List<long>();
            IncidenciasSupervision.ReporteFecha = new List<DateTime>();
            IncidenciasSupervision.ReporteObservaciones = new List<string>();
            IncidenciasSupervision.ReporteFoto = new List<string>();
            IncidenciasSupervision.SolucionUNombre = new List<string>();
            IncidenciasSupervision.SolucionFecha = new List<DateTime>();
            IncidenciasSupervision.SolucionDescripcion = new List<string>();
            IncidenciasSupervision.SolucionFoto = new List<string>();
            IncidenciasSupervision.Estatus = new List<int>();
            int Resultado = 0;

            long IDArea = Convert.ToInt64(Session["IDArea"]);
            string FechaActua = DateTime.Now.ToString("dd-MM-yyyy");
            string[] ArrayFecha = FechaActua.Split('-');
            DateTime NFecha = Convert.ToDateTime(ArrayFecha[2] + "/" + ArrayFecha[1] + "/" + ArrayFecha[0]);
            DateTime MFecha = NFecha.AddDays(-30);
            var IncidenciasXTienda = (from TableReportes in SIGES.System_Incidencias_User_RIncidencias
                                      join TableIncidencias in SIGES.System_Incidencias
                                      on TableReportes.IDIncidencia equals TableIncidencias.IDIncidencia
                                      join TableAreas in SIGES.System_Areas
                                      on TableReportes.IDArea equals TableAreas.IDArea
                                      join TableSubareas in SIGES.System_Areas_SubAreas
                                      on TableReportes.IDSubArea equals TableSubareas.IDSubArea
                                      join TableTiendas in SIGES.System_Sis_Tienda
                                      on TableReportes.IDTienda equals TableTiendas.IDTienda
                                      where TableReportes.IDArea.Equals(IDArea) && TableReportes.ReporteFecha >= MFecha
                                      select new
                                      {
                                          IDRIncidencia = TableReportes.IDRIncidencia,
                                          NombreArea = TableAreas.Nombre,
                                          NombreSubarea = TableSubareas.Nombre,
                                          Tienda = TableTiendas.Nombre,
                                          NombreIncidencia = TableIncidencias.Nombre,
                                          ReporteUNombre = TableReportes.ReporteUNombre,
                                          NoInsidencia = TableReportes.NoInsidencia,
                                          ReporteFecha = TableReportes.ReporteFecha,
                                          ReporteObservaciones = TableReportes.ReporteObservaciones,
                                          ReporteFoto = Convert.ToBase64String(TableReportes.ReporteFoto.ToArray()),
                                          SolucionUNombre = TableReportes.SolucionUNombre,
                                          SolucionFecha = TableReportes.SolucionFecha,
                                          SolucionDescripcion = TableReportes.SolucionDescripcion,
                                          SolucionFoto = Convert.ToBase64String(TableReportes.SolucionFoto.ToArray()),
                                          Estatus = TableReportes.Estatus
                                      }).ToList();
            Resultado += IncidenciasXTienda.Count();
            if (IncidenciasXTienda.Count() > 0)
            {
                foreach (var Inc in IncidenciasXTienda)
                {
                    IncidenciasSupervision.IDRIncidencia.Add(Inc.IDRIncidencia);
                    IncidenciasSupervision.Nombre_Area.Add(Inc.NombreArea);
                    IncidenciasSupervision.Nombre_Subarea.Add(Inc.NombreSubarea);
                    IncidenciasSupervision.Tienda.Add(Inc.Tienda);
                    IncidenciasSupervision.NombreIncidencia.Add(Inc.NombreIncidencia);
                    IncidenciasSupervision.ReporteUNombre.Add(Inc.ReporteUNombre);
                    IncidenciasSupervision.NoInsidencia.Add(Inc.NoInsidencia);
                    IncidenciasSupervision.ReporteFecha.Add(Inc.ReporteFecha);
                    IncidenciasSupervision.ReporteObservaciones.Add(Inc.ReporteObservaciones);
                    IncidenciasSupervision.ReporteFoto.Add(Inc.ReporteFoto);
                    if (Inc.SolucionUNombre != null)
                    {
                        IncidenciasSupervision.SolucionUNombre.Add(Inc.SolucionUNombre);
                    }
                    else
                    {
                        IncidenciasSupervision.SolucionUNombre.Add("");
                    }
                    if (Inc.SolucionFecha != null)
                    {
                        IncidenciasSupervision.SolucionFecha.Add((DateTime)Inc.SolucionFecha);
                    }
                    else
                    {
                        IncidenciasSupervision.SolucionFecha.Add(Convert.ToDateTime("18/09/2019"));
                    }
                    if (Inc.SolucionDescripcion != null)
                    {
                        IncidenciasSupervision.SolucionDescripcion.Add(Inc.SolucionDescripcion);
                    }
                    else
                    {
                        IncidenciasSupervision.SolucionDescripcion.Add("");
                    }
                    if (Inc.SolucionFoto != null)
                    {
                        IncidenciasSupervision.SolucionFoto.Add(Inc.SolucionFoto);
                    }
                    else
                    {
                        IncidenciasSupervision.SolucionFoto.Add("");
                    }
                    if (Inc.Estatus != null)
                    {
                        IncidenciasSupervision.Estatus.Add((int)Inc.Estatus);
                    }
                    else
                    {
                        IncidenciasSupervision.Estatus.Add(0);
                    }
                }
            }
        }
    }
}