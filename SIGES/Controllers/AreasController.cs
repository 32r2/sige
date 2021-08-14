using System;
using System.Linq;
using System.Web.Mvc;

namespace SIGES.Controllers
{
    public class AreasController : Controller
    {
        SIGESDBDataContext SIGES = new SIGESDBDataContext();
        // GET: Areas
        public ActionResult Areas()
        {
            return View();
        }
        //Busca el area con el ID especificado
        public JsonResult ConsultaArea(long IDArea)
        {
            var datos = SIGES.System_Areas.Where(p => p.IDArea.Equals(IDArea))
                .Select(p => new
                {
                    p.IDArea,
                    p.Nombre,
                    p.IDUsuario,
                    p.UNombre,
                    p.Correo,
                    p.Telefono,
                    p.Carpeta
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Guarda las altas y modificaciones realizadas en una área
        public int GuardarArea(System_Areas DatosArea)
        {
            int Afectados = 0;
            try
            {
                long idarea = DatosArea.IDArea;
                if (idarea.Equals(0))
                {
                    int nveces = SIGES.System_Areas.Where(p => p.Nombre.Equals(DatosArea.Nombre) && p.IDUsuario.Equals(DatosArea.IDUsuario) && p.UNombre.Equals(DatosArea.UNombre) && p.Correo.Equals(DatosArea.Correo) && p.Telefono.Equals(DatosArea.Telefono)).Count();
                    if (nveces == 0)
                    {
                        SIGES.System_Areas.InsertOnSubmit(DatosArea);
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
                    int nveces = SIGES.System_Areas.Where(p => p.Nombre.Equals(DatosArea.Nombre) && p.IDUsuario.Equals(DatosArea.IDUsuario) && p.UNombre.Equals(DatosArea.UNombre) && p.Correo.Equals(DatosArea.Correo) && p.Telefono.Equals(DatosArea.Telefono) && p.Carpeta.Equals(DatosArea.Carpeta)).Count();
                    if (nveces == 0)
                    {
                        System_Areas obj = SIGES.System_Areas.Where(p => p.IDArea.Equals(idarea)).First();
                        obj.Nombre = DatosArea.Nombre;
                        obj.IDUsuario = DatosArea.IDUsuario;
                        obj.UNombre = DatosArea.UNombre;
                        obj.Correo = DatosArea.Correo;
                        obj.Telefono = DatosArea.Telefono;
                        obj.Carpeta = DatosArea.Carpeta;
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
        public int EliminarArea(long IDArea)
        {
            int nregistradosAfectados = 0;
            try
            {
                System_Areas Areas = SIGES.System_Areas.Where(p => p.IDArea.Equals(IDArea)).First();
                Areas.Estatus = 0;
                SIGES.SubmitChanges();
                nregistradosAfectados = 1;
            }
            catch (Exception ex)
            {
                nregistradosAfectados = 0;
            }
            return nregistradosAfectados;
        }
        //*****************************************************************************************************************
        //Subárea
        //Consulta las subáreas por id de área
        public JsonResult BDSubAreas(long IDArea)
        {
            var datos = SIGES.System_Areas_SubAreas.Where(p => p.Estatus.Equals(1) && p.IDArea.Equals(IDArea))
                .Select(p => new
                {
                    ID = p.IDSubArea,
                    p.NoSubArea,
                    p.Nombre,
                    p.IDArea,
                    p.UNombre,
                    p.Telefono,
                    p.Correo,
                    p.NEncargado2,
                    p.TelefonoE2,
                    p.CorreoE2,
                    p.NEncargado3,
                    p.TelefonoE3,
                    p.CorreoE3
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Consulta subarea por id
        public JsonResult BDSubArea(long ID)
        {
            var datos = SIGES.System_Areas_SubAreas.Where(p => p.IDSubArea.Equals(ID))
                .Select(p => new
                {
                    ID = p.IDSubArea,
                    p.NoSubArea,
                    p.Nombre,
                    p.IDArea,
                    p.IDUsuario,
                    p.Telefono,
                    p.Correo,
                    p.IDEncargado2,
                    p.TelefonoE2,
                    p.CorreoE2,
                    p.IDEncargado3,
                    p.TelefonoE3,
                    p.CorreoE3
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //guardar subareas
        public int GuardarSubarea(System_Areas_SubAreas DSubArea)
        {
            int Afectados = 0;
            try
            {
                long idarea = DSubArea.IDSubArea;
                if (idarea.Equals(0))
                {
                    int nveces = SIGES.System_Areas_SubAreas.Where(p => p.NoSubArea.Equals(DSubArea.NoSubArea) && p.Nombre.Equals(DSubArea.Nombre) && p.IDArea.Equals(DSubArea.IDArea) && p.IDArea.Equals(DSubArea.IDArea) && p.IDUsuario.Equals(DSubArea.IDUsuario)).Count();
                    if (nveces == 0)
                    {
                        DSubArea.IDSubArea = Convert.ToInt64(DSubArea.IDArea.ToString() + DSubArea.NoSubArea.ToString());
                        SIGES.System_Areas_SubAreas.InsertOnSubmit(DSubArea);
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
                    int nveces = SIGES.System_Areas_SubAreas.Where(p => p.IDUsuario.Equals(DSubArea.IDUsuario) && p.UNombre.Equals(DSubArea.UNombre) && p.Correo.Equals(DSubArea.Correo) && p.Telefono.Equals(DSubArea.Telefono) && p.IDEncargado2.Equals(DSubArea.IDEncargado2) && p.NEncargado2.Equals(DSubArea.NEncargado2) && p.TelefonoE2.Equals(DSubArea.TelefonoE2) && p.CorreoE2.Equals(DSubArea.CorreoE2) && p.IDEncargado3.Equals(DSubArea.IDEncargado3) && p.NEncargado3.Equals(DSubArea.NEncargado3) && p.CorreoE3.Equals(DSubArea.CorreoE3) && p.TelefonoE3.Equals(DSubArea.TelefonoE3)).Count();
                    if (nveces == 0)
                    {
                        System_Areas_SubAreas obj = SIGES.System_Areas_SubAreas.Where(p => p.IDSubArea.Equals(idarea)).First();
                        obj.Nombre = DSubArea.Nombre;
                        obj.IDArea = DSubArea.IDArea;
                        obj.IDUsuario = DSubArea.IDUsuario;
                        obj.UNombre = DSubArea.UNombre;
                        obj.Telefono = DSubArea.Telefono;
                        obj.Correo = DSubArea.Correo;
                        obj.IDEncargado2 = DSubArea.IDEncargado2;
                        obj.NEncargado2 = DSubArea.NEncargado2;
                        obj.TelefonoE2 = DSubArea.TelefonoE2;
                        obj.CorreoE2 = DSubArea.CorreoE2;
                        obj.IDEncargado3 = DSubArea.IDEncargado3;
                        obj.NEncargado3 = DSubArea.NEncargado3;
                        obj.TelefonoE3 = DSubArea.TelefonoE3;
                        obj.CorreoE3 = DSubArea.CorreoE3;
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
        //eliminar subárea
        public int EliminarSub(long id)
        {
            int Afectados = 0;
            try
            {
                System_Areas_SubAreas Areas = SIGES.System_Areas_SubAreas.Where(p => p.IDSubArea.Equals(id)).First();
                Areas.Estatus = 0;
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
        //Recursos
        //Consulta que muestra los recursos por área
        public JsonResult BDRecursos(long IDArea)
        {
            var Recursos = SIGES.System_Areas_Recursos.Where(p => p.IDArea.Equals(IDArea) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDRecurso,
                    p.Tipo,
                    Nombre = p.Titulo,
                    p.IDArea,
                    FechaM = ((DateTime)p.FModificacion).ToShortDateString(),
                    p.Direccion
                });
            return Json(Recursos, JsonRequestBehavior.AllowGet);
        }
        //Consulta que muestra los recursos por área
        public JsonResult BDRecursosImagenes(long IDArea)
        {
            var Recursos = SIGES.System_Areas_Recursos.Where(p => p.IDArea.Equals(IDArea) && p.Estatus.Equals(1) && p.Tipo.Equals("Imagen"))
                .Select(p => new
                {
                    ID = p.Direccion,
                    Nombre = p.Titulo
                });
            return Json(Recursos, JsonRequestBehavior.AllowGet);
        }
        //seleccion de los recursos por ID
        public JsonResult BDRecurso(long IDRecurso)
        {
            var datos = SIGES.System_Areas_Recursos.Where(p => p.Estatus.Equals(1) && p.IDRecurso.Equals(IDRecurso))
                .Select(p => new
                {
                    ID = p.IDRecurso,
                    p.Tipo,
                    p.Titulo,
                    p.IDArea,
                    FechaM = ((DateTime)p.FModificacion).ToShortDateString(),
                    p.Direccion
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //guardar subareas
        public int GuardarRecurso(System_Areas_Recursos SRecursos)
        {
            int Afectados = 0;
            //try
            //{
            int Recurso = SIGES.System_Areas_Recursos.Where(p => p.IDRecurso.Equals(SRecursos.IDRecurso)).Count();
            if (Recurso.Equals(0))
            {
                int nveces = SIGES.System_Areas_Recursos.Where(p => p.Titulo.Equals(SRecursos.Titulo) && p.Direccion.Equals(SRecursos.Direccion)).Count();
                if (nveces == 0)
                {
                    SIGES.System_Areas_Recursos.InsertOnSubmit(SRecursos);
                    SIGES.SubmitChanges();
                    Afectados = 1;
                }
                else
                {
                    Afectados = 0;
                }
            }
            else {
                int nveces = SIGES.System_Areas_Recursos.Where(p => p.IDRecurso.Equals(SRecursos.IDRecurso) && p.Titulo.Equals(SRecursos.Titulo) && p.Direccion.Equals(SRecursos.Direccion)).Count();
                if (nveces == 0)
                {
                    System_Areas_Recursos obj = SIGES.System_Areas_Recursos.Where(p => p.IDRecurso.Equals(SRecursos.IDRecurso)).First();
                    obj.Titulo = SRecursos.Titulo;
                    obj.Direccion = SRecursos.Direccion;
                    obj.FModificacion = SRecursos.FModificacion;
                    SIGES.SubmitChanges();
                    Afectados = 1;
                }
                else {
                    Afectados = -1;
                }
            }
            //}
            //catch (Exception ex)
            //{
            //    Afectados = 0;
            //}
            return Afectados;
        }
        //eliman los recursos por id
        public int ERecursos(long id)
        {
            int Afectados = 0;
            try
            {
                System_Areas_Recursos Recursos = SIGES.System_Areas_Recursos.Where(p => p.IDRecurso.Equals(id)).First();
                Recursos.Estatus = 0;
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