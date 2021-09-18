using SIGES.Filtro;
using System.Web.Mvc;

namespace SIGES.Controllers
{
    [Seguridad]
    public class EvaluacionController : Controller
    {
        // GET: Evaluacion
        public ActionResult Evaluacion()
        {
            return View();
        }
    }
}