using SIGES.Filtro;
using SIGES.Models;
using System;
using System.Linq;
using System.Web.Mvc;

namespace SIGES.Controllers
{
    [Seguridad]
    public class ComunicadosController : Controller
    {
        SIGESDBDataContext SIGES = new SIGESDBDataContext();
        readonly DateTime Fecha = DateTime.Now.Date;
        // GET: Informacion
        public ActionResult Comunicados()
        {
            return View();
        }
        //Consulta los Comunicados por area
        public JsonResult ComunicadosArea(long IDArea)
        {
            var datos = SIGES.System_Sis_Notificacion.Where(p => p.Estatus.Equals(1) && p.IDArea.Equals(IDArea))
                .Select(p => new
                {
                    ID = p.IDNotificacion,
                    p.Nombre,
                    p.NombreA,
                    FechaIni = ((DateTime)p.FInicio).ToShortDateString(),
                    FechaFin = ((DateTime)p.FFin).ToShortDateString(),
                    p.Usuarios,
                    p.Descripcion
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult BDComunicado(long ID)
        {
            var datos = SIGES.System_Sis_Notificacion.Where(p => p.IDNotificacion.Equals(ID))
                .Select(p => new
                {
                    p.IDNotificacion,
                    p.Nombre,
                    p.IDArea,
                    FI = ((DateTime)p.FInicio).ToShortDateString(),
                    FF = ((DateTime)p.FFin).ToShortDateString(),
                    p.Usuarios,
                    p.Descripcion,
                    p.Foto
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Guardar Comunicado
        public int GuardarComunicado(System_Sis_Notificacion Notif)
        {
            int Afectados = 0;
            try
            {
                long idUser = Notif.IDNotificacion;
                if (idUser.Equals(0))
                {
                    int nveces = SIGES.System_Sis_Notificacion.Where(p => p.Nombre.Equals(Notif.Nombre)).Count();
                    if (nveces == 0)
                    {
                        SIGES.System_Sis_Notificacion.InsertOnSubmit(Notif);
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
                    int nveces = SIGES.System_Sis_Notificacion.Where(p => p.Nombre.Equals(Notif.Nombre) && p.IDArea.Equals(Notif.IDArea) && p.FInicio.Equals(Notif.FInicio) && p.FFin.Equals(Notif.FFin) && p.Usuarios.Equals(Notif.Usuarios) && p.Descripcion.Equals(Notif.Descripcion)).Count();
                    if (nveces == 0)
                    {
                        System_Sis_Notificacion obj = SIGES.System_Sis_Notificacion.Where(p => p.IDNotificacion.Equals(idUser)).First();
                        obj.IDArea = Notif.IDArea;
                        obj.NombreA = Notif.NombreA;
                        obj.Nombre = Notif.Nombre;
                        obj.Usuarios = Notif.Usuarios;
                        obj.FCreacion = Notif.FCreacion;
                        obj.FInicio = Notif.FInicio;
                        obj.Foto = Notif.Foto;
                        obj.FFin = Notif.FFin;
                        obj.Descripcion = Notif.Descripcion;
                        obj.Estatus = Notif.Estatus;
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
        //Eliminar Comunicado
        public int EliminarComunicado(long ID)
        {
            int Afectados = 0;
            try
            {
                System_Sis_Notificacion Notif = SIGES.System_Sis_Notificacion.Where(p => p.IDNotificacion.Equals(ID)).First();
                Notif.Estatus = 0;
                SIGES.SubmitChanges();
                Afectados = 1;
            }
            catch (Exception ex)
            {
                Afectados = 0;
            }
            return Afectados;
        }
        //*****************************************************************************************************************
        public ActionResult AvisosArea()
        {
            return View();
        }

        public JsonResult Comunicados_Area()
        {
            long IDArea = Convert.ToInt64(Session["IDArea"]);
            var datos = SIGES.System_Sis_Notificacion.Where(p => p.Estatus.Equals(1) && p.IDArea.Equals(IDArea) && Fecha >= p.FInicio && Fecha <= p.FFin)
                .Select(p => new
                {
                    ID = p.IDNotificacion,
                    p.Nombre,
                    p.NombreA,
                    p.Foto,
                    FechaIni = ((DateTime)p.FInicio).ToShortDateString(),
                    FechaFin = ((DateTime)p.FFin).ToShortDateString(),
                    p.Usuarios,
                    p.Descripcion
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }

        public JsonResult TodosComunicados_Area()
        {
            long IDArea = Convert.ToInt64(Session["IDArea"]);
            var datos = SIGES.System_Sis_Notificacion.Where(p => p.IDArea.Equals(IDArea))
                .Select(p => new
                {
                    ID = p.IDNotificacion,
                    p.Nombre,
                    p.NombreA,
                    p.Foto,
                    FechaIni = ((DateTime)p.FInicio).ToShortDateString(),
                    FechaFin = ((DateTime)p.FFin).ToShortDateString(),
                    p.Usuarios,
                    p.Descripcion
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
    }
}