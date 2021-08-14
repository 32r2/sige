using System.Linq;
using System.Web.Mvc;

namespace SIGES.Controllers
{
    public class CardinalController : Controller
    {
        SIGESDBDataContext SIGES = new SIGESDBDataContext();
        // GET: Cardinal
        public ActionResult Index()
        {
            return View();
        }
        //Selecciona todas las areas activas(1)
        public JsonResult BDAreas()
        {
            var DatosAreas = SIGES.System_Areas.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDArea,
                    p.Nombre,
                    p.UNombre,
                    p.Correo,
                    p.Telefono,
                    p.Carpeta
                });
            return Json(DatosAreas, JsonRequestBehavior.AllowGet);
        }
        //consulta SubAreas
        public JsonResult BDSubAreas(long IDA)
        {
            var datos = SIGES.System_Areas_SubAreas.Where(p => p.Estatus.Equals(1) && p.IDArea.Equals(IDA))
                .Select(p => new
                {
                    ID = p.IDSubArea,
                    Nombre = p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Estados
        public JsonResult BDEstados()
        {
            var datos = SIGES.System_Inf_Estados.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDEstado,
                    Nombre = p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Municipio
        public JsonResult BDMunicipio(int IDE)
        {
            var datos = SIGES.System_Inf_Municipios.Where(p => p.Estatus.Equals(1) && p.IDEstado.Equals(IDE))
                .Select(p => new
                {
                    ID = p.IDMunicipio,
                    Nombre = p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Localidades
        public JsonResult BDLocalidades(int IDM)
        {
            var datos = SIGES.System_Inf_Localidades.Where(p => p.Estatus.Equals(1) && p.IDMunicipio.Equals(IDM))
                .Select(p => new
                {
                    ID = p.IDLocalidad,
                    Nombre = p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Tiendas
        public JsonResult BDTiendas()
        {
            var datos = SIGES.System_Sis_Tienda.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDTienda,
                    p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Tiendas
        public JsonResult BDSupervision()
        {
            var DatosSupervisiones = SIGES.System_Supervision.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDSupervision,
                    Nombre = p.Supervision
                });
            return Json(DatosSupervisiones, JsonRequestBehavior.AllowGet);
        }
    }
}