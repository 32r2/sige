using System;
using System.Linq;
using System.Web.Mvc;

namespace SIGES.Controllers
{
    public class UsuariosController : Controller
    {
        SIGESDBDataContext SIGES = new SIGESDBDataContext();
        // GET: Usuarios
        public ActionResult Usuario()
        {
            return View();
        }
        //consulta general 
        public JsonResult BDUsuarios()
        {
            var datos = SIGES.User_Usuarios.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDUsuario,
                    p.Nombre,
                    p.APaterno,
                    p.AMaterno,
                    p.NArea,
                    p.Correo,
                    p.Telefono,
                    FechaIngreso = ((DateTime)p.FIngreso).ToShortDateString(),
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }

        //consulta usuario por id
        public JsonResult BDUsuario(long ID)
        {
            var InfUsuario = SIGES.User_Usuarios.Where(p => p.IDUsuario.Equals(ID))
                .Select(p => new
                {
                    p.IDUsuario,
                    p.CURP,
                    p.Nombre,
                    p.APaterno,
                    p.AMaterno,
                    p.Contraseña,
                    p.IDArea,
                    p.IDSubArea,
                    //FOTOMOSTRAR = Convert.ToBase64String(p.Foto.ToArray()),
                    FechaNaci = ((DateTime)p.FNacimiento).ToShortDateString(),
                    p.RFC,
                    p.NoSS,
                    p.IDPerfil,
                    p.Asignacion,
                    p.Sitio,
                    p.IDEstado,
                    p.IDMunicipio,
                    p.IDLocalidad,
                    p.Correo,
                    p.Telefono
                });
            return Json(InfUsuario, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DUsuario(string Usuario, string contrasena)
        {
            var InfUsuario = SIGES.User_Usuarios.Where(p => p.Usuario.Equals(Usuario) && p.Contraseña.Equals(contrasena))
                .Select(p => new
                {
                    p.IDUsuario,                    
                    p.LVLPerfil                    
                });
            return Json(InfUsuario, JsonRequestBehavior.AllowGet);
        }
    }
}