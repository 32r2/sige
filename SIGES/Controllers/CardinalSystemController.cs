using System;
using System.Linq;
using System.Web.Mvc;

namespace SIGES.Controllers
{
    public class CardinalSystemController : Controller
    {
        SIGESDBDataContext SIGES = new SIGESDBDataContext();
        // GET: CardinalSystem
        public ActionResult Configuracion()
        {
            return View();
        }
        //************************************************************************************************
        //Consulta todas las páginas
        public JsonResult BDPaginas()
        {
            var DatosPaginas = SIGES.System_Sis_Pagina.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDPagina,
                    Nombre = p.Mensaje,
                    p.Abreviatura,
                    p.Accion,
                    p.Controlador,
                    p.Descripcion,
                    p.Icono
                });
            return Json(DatosPaginas, JsonRequestBehavior.AllowGet);
        }
        //Consulta la página que tenga el ID
        public JsonResult BDPagina(long ID)
        {
            var DatosPagina = SIGES.System_Sis_Pagina.Where(p => p.Estatus.Equals(1) && p.IDPagina.Equals(ID))
                .Select(p => new
                {
                    ID = p.IDPagina,
                    Nombre = p.Mensaje,
                    p.Abreviatura,
                    p.Accion,
                    p.Controlador,
                    p.Icono,
                    p.Descripcion
                });
            return Json(DatosPagina, JsonRequestBehavior.AllowGet);
        }
        //Guarda las nuevas páginas y los cambios
        public int GuardarPagina(System_Sis_Pagina DataPagina)
        {
            int Afectados = 0;
            try
            {
                long IDPagina = DataPagina.IDPagina;
                if (IDPagina.Equals(0))
                {
                    int nveces = SIGES.System_Sis_Pagina.Where(p => p.Accion.Equals(DataPagina.Accion) && p.Controlador.Equals(DataPagina.Controlador) && p.Mensaje.Equals(DataPagina.Mensaje)).Count();
                    if (nveces == 0)
                    {
                        SIGES.System_Sis_Pagina.InsertOnSubmit(DataPagina);
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
                    int nveces = SIGES.System_Sis_Pagina.Where(p => p.Accion.Equals(DataPagina.Accion) && p.Controlador.Equals(DataPagina.Controlador) && p.Mensaje.Equals(DataPagina.Mensaje) && p.Icono.Equals(DataPagina.Icono) && p.Descripcion.Equals(DataPagina.Descripcion)).Count();
                    if (nveces == 0)
                    {
                        System_Sis_Pagina obj = SIGES.System_Sis_Pagina.Where(p => p.IDPagina.Equals(IDPagina)).First();
                        obj.Abreviatura = DataPagina.Abreviatura;
                        obj.Mensaje = DataPagina.Mensaje;
                        obj.Accion = DataPagina.Accion;
                        obj.Controlador = DataPagina.Controlador;
                        obj.Icono = DataPagina.Icono;
                        obj.Descripcion = DataPagina.Descripcion;
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
        //Eliminia la área
        public int EliminarPagina(long IdPagina)
        {
            int Afectado = 0;
            try
            {
                System_Sis_Pagina Pagina = SIGES.System_Sis_Pagina.Where(p => p.IDPagina.Equals(IdPagina)).First();
                Pagina.Estatus = 0;
                SIGES.SubmitChanges();
                Afectado = 1;
            }
            catch (Exception ex)
            {
                Afectado = 0;
            }
            return Afectado;
        }
        //****************************************************************************************
        //Consulta todos los perfiles
        public JsonResult BDPerfiles()
        {
            var DatosPaginas = SIGES.System_Sis_PerfilUsuario.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDPerfil,
                    Nombre = p.Perfil,
                    p.Nivel,
                    p.Permisos,
                    p.Comentarios
                });
            return Json(DatosPaginas, JsonRequestBehavior.AllowGet);
        }
        //Busca el perfil según su ID
        public JsonResult BDPerfil(long IDPerfil)
        {
            var DatosPaginas = SIGES.System_Sis_PerfilUsuario.Where(p => p.Estatus.Equals(1) && p.IDPerfil.Equals(IDPerfil))
                .Select(p => new
                {
                    ID = p.IDPerfil,
                    Nombre = p.Perfil,
                    p.Nivel,
                    p.Permisos,
                    p.Comentarios
                });
            return Json(DatosPaginas, JsonRequestBehavior.AllowGet);
        }
        //Guarda las nuevas páginas y los cambios
        public int GuardarPerfil(System_Sis_PerfilUsuario DataPerfil)
        {
            int Afectados = 0;
            try
            {
                long IDPerfil = DataPerfil.IDPerfil;
                if (IDPerfil.Equals(0))
                {
                    int nveces = SIGES.System_Sis_PerfilUsuario.Where(p => p.Perfil.Equals(DataPerfil.Perfil) && p.Nivel.Equals(DataPerfil.Nivel) && p.Permisos.Equals(DataPerfil.Permisos)).Count();
                    if (nveces == 0)
                    {
                        SIGES.System_Sis_PerfilUsuario.InsertOnSubmit(DataPerfil);
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
                    int nveces = SIGES.System_Sis_PerfilUsuario.Where(p => p.Perfil.Equals(DataPerfil.Perfil) && p.Nivel.Equals(DataPerfil.Nivel) && p.Permisos.Equals(DataPerfil.Permisos) && p.Comentarios.Equals(DataPerfil.Comentarios)).Count();
                    if (nveces == 0)
                    {
                        System_Sis_PerfilUsuario obj = SIGES.System_Sis_PerfilUsuario.Where(p => p.IDPerfil.Equals(IDPerfil)).First();
                        obj.Perfil = DataPerfil.Perfil;
                        obj.Nivel = DataPerfil.Nivel;
                        obj.Permisos = DataPerfil.Permisos;
                        obj.Comentarios = DataPerfil.Comentarios;
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
        //Eliminia la área
        public int EliminarPerfil(long IdPerfil)
        {
            int Afectado = 0;
            try
            {
                System_Sis_PerfilUsuario Perfil = SIGES.System_Sis_PerfilUsuario.Where(p => p.IDPerfil.Equals(IdPerfil)).First();
                Perfil.Estatus = 0;
                SIGES.SubmitChanges();
                Afectado = 1;
            }
            catch (Exception ex)
            {
                Afectado = 0;
            }
            return Afectado;
        }
    }
}