using SIGES.Filtro;
using System.Linq;
using System.Web.Mvc;

namespace SIGES.Controllers
{
    //[Seguridad]
    public class TiendasController : Controller
    {
        SIGESDBDataContext SIGES = new SIGESDBDataContext();
        // GET: Tiendas
        public ActionResult Tiendas()
        {
            return View();
        }
        public JsonResult ConsultaSucursales()
        {
            var datos = SIGES.System_Sis_Tienda.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDTienda,
                    p.Nombre,
                    p.NombreS,
                    p.UNombre,
                    p.LNombre,
                    p.E1Nombre,
                    p.E2Nombre,
                    p.E3Nombre,                    
                    p.A1Nombre,
                    p.A2Nombre,
                    p.A3Nombre,
                    p.Estado,
                    p.Municipio,
                    p.Localidad,
                    p.Calle,                    
                    p.Telefono,
                    p.CP,
                    p.Latitud,
                    p.Longitud,
                    p.HApertura,
                    p.HCierre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
    }
}