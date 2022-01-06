using SIGES.Models;
using SIGES.Filtro;
using System.Web;
using System.Web.Mvc;
using System;

namespace SIGES.Controllers
{
    [Seguridad]
    public class InicioController : Controller
    {
        // GET: Inicio
        public ActionResult Inicio()
        {
            long IDAsignacion = Convert.ToInt64(Session["IDAsignacion"].ToString());

            CardinalController Cardinal = new CardinalController();
            Cardinal.Clases_Departamentos();
            Cardinal.CargarSucursales();
            Cardinal.CargarPerfiles(Convert.ToInt64(Session["LVLPerfil"].ToString()));
            Cardinal.RazorEstados();
            
            string Tiendas = Session["Tiendas"].ToString();
            if (IDAsignacion == 1) { }
            else if(IDAsignacion == 2) {
                if (Tiendas != "")
                {
                    SupervisionController Super = new SupervisionController();
                    Super.CargarSucursalesXSupervision(Session["Tiendas"].ToString());
                }
            }
            return View();
        }
    }
}