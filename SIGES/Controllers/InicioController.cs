using SIGES.Filtro;
using System.Web.Mvc;

namespace SIGES.Controllers
{
    [Seguridad]
    public class InicioController : Controller
    {
        // GET: Inicio
        public ActionResult Inicio()
        {
            return View();
        }
    }
}