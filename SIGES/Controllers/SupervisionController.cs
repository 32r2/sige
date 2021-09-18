using SIGES.Filtro;
using System;
using System.Linq;
using System.Web.Mvc;

namespace SIGES.Controllers
{
    [Seguridad]
    public class SupervisionController : Controller
    {
        SIGESDBDataContext SIGES = new SIGESDBDataContext();
        // GET: Supervision
        public ActionResult Supervision()
        {
            return View();
        }
        public JsonResult BDSupervisiones()
        {
            var datos = SIGES.System_Supervision.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDSupervision,
                    Nombre = p.Supervision,
                    p.UNombre,
                    p.Tiendas
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta subarea por id
        public JsonResult BDSupervision(long ID)
        {
            var datos = SIGES.System_Supervision.Where(p => p.IDSupervision.Equals(ID))
                .Select(p => new
                {
                    ID = p.IDSupervision,
                    Nombre = p.Supervision,
                    p.IDUsuario,
                    p.Tiendas
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        public int GuardarSupervision(System_Supervision DSupervision)
        {
            int Afectados = 0;
            try
            {
                long idarea = DSupervision.IDSupervision;
                if (idarea.Equals(0))
                {
                    int nveces = SIGES.System_Supervision.Where(p => p.Supervision.Equals(DSupervision.Supervision) && p.IDUsuario.Equals(DSupervision.IDUsuario) && p.UNombre.Equals(DSupervision.UNombre) && p.IDUsuario.Equals(DSupervision.IDUsuario) && p.Tiendas.Equals(DSupervision.Tiendas)).Count();
                    if (nveces == 0)
                    {
                        SIGES.System_Supervision.InsertOnSubmit(DSupervision);
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
                    int nveces = SIGES.System_Supervision.Where(p => p.Supervision.Equals(DSupervision.Supervision) && p.IDUsuario.Equals(DSupervision.IDUsuario) && p.UNombre.Equals(DSupervision.UNombre) && p.IDUsuario.Equals(DSupervision.IDUsuario) && p.Tiendas.Equals(DSupervision.Tiendas)).Count();
                    if (nveces == 0)
                    {
                        System_Supervision obj = SIGES.System_Supervision.Where(p => p.IDSupervision.Equals(idarea)).First();
                        obj.Supervision = DSupervision.Supervision;
                        obj.IDUsuario = DSupervision.IDUsuario;
                        obj.UNombre = DSupervision.UNombre;
                        obj.Tiendas = DSupervision.Tiendas;
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
        public int EliminarSupervision(long ID)
        {
            int Afectados = 0;
            try
            {
                System_Supervision Supervision = SIGES.System_Supervision.Where(p => p.IDSupervision.Equals(ID)).First();
                Supervision.Estatus = 0;
                SIGES.SubmitChanges();
                Afectados = 1;
            }
            catch (Exception ex)
            {
                Afectados = 0;
            }
            return Afectados;
        }
    }
}