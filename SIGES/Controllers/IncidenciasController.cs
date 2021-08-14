using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SIGES.Controllers
{
    public class IncidenciasController : Controller
    {
        SIGESDBDataContext SIGES = new SIGESDBDataContext();
        // GET: Incidencias
        public ActionResult Incidencias()
        {
            return View();
        }
        //Consulta Insidencias por área
        public JsonResult BDInsidenciasArea(long IDA)
        {
            var datos = SIGES.System_Incidencias.Where(p => p.IDArea.Equals(IDA) && p.Estatus.Equals(1))
                .Select(p => new {
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
        public JsonResult BDInsidencia(long ID)
        {
            var datos = SIGES.System_Incidencias.Where(p => p.IDIncidencia.Equals(ID))
                .Select(p => new {
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
    }
}