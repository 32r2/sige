using SIGES.Filtro;
using SIGES.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace SIGES.Controllers
{
    [Seguridad]
    public class IncidenciasController : Controller
    {
        SIGESDBDataContext SIGES = new SIGESDBDataContext();
        //List<IncidenciasSupervision> ListaIncidencias = new List<IncidenciasSupervision>();
        // GET: Incidencias
        public ActionResult Incidencias()
        {
            return View();
        }
        //Consulta Incidencias por área
        public JsonResult BDIncidenciasArea(long IDA)
        {
            var datos = SIGES.System_Incidencias.Where(p => p.IDArea.Equals(IDA) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDIncidencia,
                    p.IDArea,
                    p.IDSubArea,
                    p.NoSoluciones,
                    p.Nombre,
                    p.Descripcion
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta subarea por id
        public JsonResult BDIncidencia(long ID)
        {
            var datos = SIGES.System_Incidencias.Where(p => p.IDIncidencia.Equals(ID))
                .Select(p => new
                {
                    p.IDIncidencia,
                    p.IDArea,
                    p.IDSubArea,
                    p.NoSoluciones,
                    p.Nombre,
                    p.Descripcion,
                    p.Reporte
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Guarda y Modifica las incidencias
        public int GuardarIncidencia(System_Incidencias Incidencia)
        {
            int Afectados = 0;
            try
            {
                long idInsident = Incidencia.IDIncidencia;
                if (idInsident.Equals(0))
                {
                    int nveces = SIGES.System_Incidencias.Where(p => p.IDIncidencia.Equals(Incidencia.IDIncidencia)).Count();
                    if (nveces == 0)
                    {
                        SIGES.System_Incidencias.InsertOnSubmit(Incidencia);
                        SIGES.SubmitChanges();
                        Afectados = 1;
                    }
                    else
                    {
                        Afectados = -1;
                    }
                }
                else
                {
                    int nveces = SIGES.System_Incidencias.Where(p => p.Nombre.Equals(Incidencia.Nombre) && p.Descripcion.Equals(Incidencia.Descripcion) && p.IDSubArea.Equals(Incidencia.IDSubArea) && p.NoSoluciones.Equals(Incidencia.NoSoluciones) && p.Reporte.Equals(Incidencia.Reporte)).Count();
                    if (nveces == 0)
                    {
                        System_Incidencias obj = SIGES.System_Incidencias.Where(p => p.IDIncidencia.Equals(idInsident)).First();
                        obj.Nombre = Incidencia.Nombre;
                        obj.IDSubArea = Incidencia.IDSubArea;
                        obj.NoSoluciones = Incidencia.NoSoluciones;
                        obj.Descripcion = Incidencia.Descripcion;
                        obj.Reporte = Incidencia.Reporte;
                        SIGES.SubmitChanges();
                        Afectados = 1;
                    }
                    else
                    {
                        Afectados = -1;
                    }
                }
            }
            catch (Exception ex)
            {
                Afectados = 0;
            }
            return Afectados;
        }
        //eliminar
        public int EliminarIncidencia(long id)
        {
            int Afectados = 0;
            try
            {
                System_Incidencias Incident = SIGES.System_Incidencias.Where(p => p.IDIncidencia.Equals(id)).First();
                Incident.Estatus = 0;
                SIGES.SubmitChanges();
                Afectados = 1;
            }
            catch (Exception ex)
            {
                Afectados = 0;
            }
            return Afectados;
        }
        //************************************************************************************************************
        public ActionResult Incidencias_Area()
        {
            return View();
        }
        public JsonResult BDIncidencias_Area()
        {
            long IDArea = Convert.ToInt64(Session["IDArea"]);
            var datos = from Inicidencias in SIGES.System_Incidencias
                        join Area in SIGES.System_Areas
                        on Inicidencias.IDArea equals Area.IDArea
                        join Subareas in SIGES.System_Areas_SubAreas
                        on Inicidencias.IDSubArea equals Subareas.IDSubArea
                        where Inicidencias.IDArea.Equals(IDArea)
                        select new
                        {
                            ID = Inicidencias.IDIncidencia,
                            Nombre = Inicidencias.Nombre,
                            IDArea= Area.IDArea,
                            Area = Area.Nombre,
                            SubArea = Subareas.Nombre,
                            Telefono = Area.Telefono,
                            Descripcion = Inicidencias.Descripcion,
                            Nos = Inicidencias.NoSoluciones
                        };
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //************************************************************************************************************
        public JsonResult BDAyudaID(long IDm)
        {
            var datos = SIGES.System_Incidencias_MesaAyuda.Where(p => p.IDMesaAyuda.Equals(IDm) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDMesaAyuda,
                    p.IDIncidencia,
                    p.IDArea,
                    p.NoSolucion,
                    FechaModificacion = ((DateTime)p.FModificacion).ToShortDateString(),
                    p.NoPaso,
                    p.Descripcion,
                    p.Imagen
                }).OrderBy(p => p.NoPaso);//.OrderByDescending(p=>p.NoPaso);
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Conculta metodo por IDIncidencia y No de Solucion
        public JsonResult BDAyudaPasos(long ID, long NoS)
        {
            var datos = SIGES.System_Incidencias_MesaAyuda.Where(p => p.IDIncidencia.Equals(ID) && p.NoSolucion.Equals(NoS) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDMesaAyuda,
                    p.IDIncidencia,
                    p.IDArea,
                    p.NoSolucion,
                    p.FModificacion,
                    p.NoPaso,
                    p.Descripcion,
                    p.Imagen
                }).OrderBy(p => p.NoPaso);//.OrderByDescending(p=>p.NoPaso);
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Guarda el nuevo procedimiento o modificacion de los procedimientos
        public int GuardarPro(System_Incidencias_MesaAyuda MAyuda)
        {
            int Afectados = 0;
            try
            {
                long IdMesaAyuda = MAyuda.IDMesaAyuda;
                if (IdMesaAyuda.Equals(0))
                {
                    int nveces = SIGES.System_Incidencias_MesaAyuda.Where(p => p.IDMesaAyuda.Equals(MAyuda.IDMesaAyuda)).Count();
                    if (nveces == 0)
                    {
                        SIGES.System_Incidencias_MesaAyuda.InsertOnSubmit(MAyuda);
                        SIGES.SubmitChanges();
                        Afectados = 1;
                    }
                    else
                    {
                        Afectados = -1;
                    }
                }
                else
                {
                    int nveces = SIGES.System_Incidencias_MesaAyuda.Where(p => p.NoPaso.Equals(MAyuda.NoPaso) && p.Descripcion.Equals(MAyuda.Descripcion) && p.Imagen.Equals(MAyuda.Imagen)).Count();
                    if (nveces == 0)
                    {
                        System_Incidencias_MesaAyuda obj = SIGES.System_Incidencias_MesaAyuda.Where(p => p.IDMesaAyuda.Equals(IdMesaAyuda)).First();
                        obj.NoPaso = MAyuda.NoPaso;
                        obj.Imagen = MAyuda.Imagen;
                        obj.Descripcion = MAyuda.Descripcion;
                        SIGES.SubmitChanges();
                        Afectados = 1;
                    }
                    else
                    {
                        Afectados = -1;
                    }
                }
            }
            catch (Exception ex)
            {
                Afectados = 0;
            }
            return Afectados;
        }
        //************************************************************************************************************
        public ActionResult Mayuda()
        {
            return View();
        }
        //Consulta Incidencias por área usando join
        public JsonResult BDIncidenciasJoinArea(long IDA)
        {
            var datos = from Inicidencias in SIGES.System_Incidencias
                        join Area in SIGES.System_Areas
                        on Inicidencias.IDArea equals Area.IDArea
                        join Subareas in SIGES.System_Areas_SubAreas
                        on Inicidencias.IDSubArea equals Subareas.IDSubArea
                        where Inicidencias.IDArea.Equals(IDA)
                        select new
                        {
                            ID = Inicidencias.IDIncidencia,
                            Nombre = Inicidencias.Nombre,
                            Area = Area.Nombre,
                            SubArea = Subareas.Nombre,
                            Telefono = Area.Telefono,
                            Descripcion = Inicidencias.Descripcion,
                            Nos = Inicidencias.NoSoluciones
                        };
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Consulta Incidencias que contengan usando join
        public JsonResult BDIncidenciasContienen(string Contener)
        {
            var datos = from incidencia in SIGES.System_Incidencias
                        join area in SIGES.System_Areas
                        on incidencia.IDArea equals area.IDArea
                        join subareas in SIGES.System_Areas_SubAreas
                        on incidencia.IDSubArea equals subareas.IDSubArea
                        where incidencia.Descripcion.Contains(Contener)
                        select new
                        {
                            ID = incidencia.IDIncidencia,
                            Nombre = incidencia.Nombre,
                            Area = area.Nombre,
                            SubArea = subareas.Nombre,
                            Telefono = area.Telefono,
                            Descripcion = incidencia.Descripcion,
                            Nos = incidencia.NoSoluciones
                        };
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //--------metodos para los procedimientos
        //Conculta metodo por IDIncidencia y No de Solucion
        public JsonResult BDMesaayuda(long IDI, long NoS)
        {
            var datos = SIGES.System_Incidencias_MesaAyuda.Where(p => p.IDIncidencia.Equals(IDI) && p.NoSolucion.Equals(NoS) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDMesaAyuda,
                    p.IDIncidencia,
                    p.IDArea,
                    p.NoSolucion,
                    p.FModificacion,
                    p.NoPaso,
                    p.Descripcion,
                    p.Imagen
                }).OrderBy(p => p.NoPaso);//.OrderByDescending(p=>p.NoPaso);
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ReporteIncidenciasXTienda(long IDTienda)
        {
            var IncidenciasTienda = SIGES.System_Incidencias_User_RIncidencias.Where(p => p.IDTienda.Equals(IDTienda))
                .Select(p => new
                {
                    ID = p.IDRIncidencia,
                    p.IDArea,
                    p.IDSubArea,
                    p.IDIncidencia,
                    p.ReporteIDUsuario,
                    p.ReporteUNombre,
                    p.IDTienda,
                    p.NoInsidencia,
                    p.ReporteFecha,
                    p.ReporteObservaciones,
                    p.ReporteFoto
                });
            return Json(IncidenciasTienda, JsonRequestBehavior.AllowGet);
        }
        
        //************************************************************************************************************************************************************
        //Reportes tiendas
        //************************************************************************************************************************************************************
        public ActionResult ReportesTienda()
        {
            return View();
        }
        //join ReporteIncidencias
        public JsonResult ReportesXArea(long IDArea)
        {
            long IDSitio = Convert.ToInt64(Session["IDSitio"]);
            var IncidenciasRpt = from Reportes in SIGES.System_Incidencias_User_RIncidencias
                                 join Incidencias in SIGES.System_Incidencias
                                 on Reportes.IDIncidencia equals Incidencias.IDIncidencia
                                 where Reportes.IDTienda.Equals(IDSitio) && Incidencias.IDArea.Equals(IDArea) && Reportes.Estatus.Equals(1)
                                 select new
                                 {
                                     ID = Reportes.IDRIncidencia,
                                     IDArea = Incidencias.IDArea,
                                     Nombre = Incidencias.Nombre,
                                     NOIncidencia = Reportes.NoInsidencia,
                                     Fecha = ((DateTime)Reportes.ReporteFecha).ToShortDateString(),
                                     Descripcion = Reportes.ReporteObservaciones,
                                     //IncidenciasRpt = Convert.ToBase64String(Reportes.Foto.ToArray()),
                                     Estatus = Reportes.Estatus
                                 };
            return Json(IncidenciasRpt, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SeguimientoReporte(long IDRIncidencia)
        {
            var datos = SIGES.System_Incidencias_User_RIncidencias.Where(p => p.IDRIncidencia.Equals(IDRIncidencia) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDRIncidencia,
                    p.IDIncidencia,
                    p.ReporteUNombre,
                    p.IDTienda,
                    p.NoInsidencia,
                    p.ReporteObservaciones,
                    ReporteFoto = Convert.ToBase64String(p.ReporteFoto.ToArray()),

                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        public int FinalizarReporte(System_Incidencias_User_RIncidencias Solucion, string cadF)
        {
            int Afectados = 0;
            try
            {
                System_Incidencias_User_RIncidencias Reporte = SIGES.System_Incidencias_User_RIncidencias.Where(p => p.IDRIncidencia.Equals(Solucion.IDRIncidencia)).First();
                if (IsBase64(cadF))
                {
                    Reporte.SolucionFoto = Convert.FromBase64String(cadF);
                }
                Reporte.SolucionIDUsuario = Solucion.SolucionIDUsuario;
                Reporte.SolucionUNombre = Solucion.SolucionUNombre;
                Reporte.SolucionFecha = Solucion.SolucionFecha;
                Reporte.SolucionDescripcion = Solucion.SolucionDescripcion;
                Reporte.Estatus = 0;
                SIGES.SubmitChanges();
                Afectados = 1;
            }
            catch (Exception ex)
            {
                Afectados = 0;
            }
            return Afectados;
        }
        //************************************************************************************************************************************************************
        //************************************************************************************************************************************************************
        public int GuardarReporte(System_Incidencias_User_RIncidencias Reporte, string cadF, string SFoto)
        {
            int Afectados = 0;
            try
            {
                long IDReporte = Reporte.IDRIncidencia;
                if (IDReporte.Equals(0))
                {
                    int nveces = SIGES.System_Incidencias_User_RIncidencias.Where(p => p.IDRIncidencia.Equals(Reporte.IDRIncidencia)).Count();
                    if (nveces == 0)
                    {
                        if (IsBase64(cadF))
                        {
                            Reporte.ReporteFoto = Convert.FromBase64String(cadF);
                        }
                        if (IsBase64(SFoto))
                        {
                            Reporte.SolucionFoto = Convert.FromBase64String(SFoto);
                        }
                        SIGES.System_Incidencias_User_RIncidencias.InsertOnSubmit(Reporte);
                        SIGES.SubmitChanges();
                        Afectados = 1;
                    }
                    else
                    {
                        Afectados = -1;
                    }
                }
                else
                {
                    int nveces = SIGES.System_Incidencias_User_RIncidencias.Where(p => p.ReporteObservaciones.Equals(Reporte.ReporteObservaciones)
                    && p.IDArea.Equals(Reporte.IDArea) && p.IDSubArea.Equals(Reporte.IDSubArea)
                    && p.IDIncidencia.Equals(Reporte.IDIncidencia)).Count();
                    if (nveces == 0)
                    {
                        System_Incidencias Report = SIGES.System_Incidencias.Where(p => p.IDIncidencia.Equals(IDReporte)).First();
                        Report.IDArea = Reporte.IDArea;
                        Report.IDSubArea = Reporte.IDSubArea;
                        Report.IDIncidencia = Reporte.IDIncidencia;
                        SIGES.SubmitChanges();
                        Afectados = 1;
                    }
                    else
                    {
                        Afectados = -1;
                    }
                }
            }
            catch (Exception ex)
            {
                Afectados = 0;
            }
            return Afectados;
        }
        public bool IsBase64(string base64String)
        {
            if (string.IsNullOrEmpty(base64String) || base64String.Length % 4 != 0
               || base64String.Contains(" ") || base64String.Contains("\t") || base64String.Contains("\r") || base64String.Contains("\n"))
                return false;
            try
            {
                Convert.FromBase64String(base64String);
                return true;
            }
            catch (Exception exception)
            {
                // Handle the exception
            }
            return false;
        }
        //************************************************************************************************************************************************************
        //************************************************************************************************************************************************************
        public ActionResult ReportesArea()
        {
            return View();
        }
        public JsonResult ReportesPArea(long IDIncidencia)
        {
            var IncidenciasRpt = SIGES.System_Incidencias_User_RIncidencias.Where(p => p.IDIncidencia.Equals(IDIncidencia) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDRIncidencia,
                    //p.IDIncidencia,
                    //p.ReporteUNombre,
                    p.IDArea,
                    p.IDTienda,
                    p.NoInsidencia,
                    ReporteFecha=((DateTime)p.ReporteFecha).ToShortDateString(),
                    p.ReporteObservaciones
                });
            return Json(IncidenciasRpt, JsonRequestBehavior.AllowGet);
        }
    }
}
