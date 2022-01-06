using System.Web;
using System.Web.Mvc;

namespace SIGES.Filtro
{
    public class Seguridad : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var Usuario = HttpContext.Current.Session["IDUsuario"];
            if (Usuario == null)
            {
                filterContext.Result = new RedirectResult("~/Login/Login");
            }
            base.OnActionExecuting(filterContext);
        }
    }
}