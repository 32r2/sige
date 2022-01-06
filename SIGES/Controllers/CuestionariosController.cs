using SIGES.Filtro;
using SIGES.Models;
using System;
using System.Linq;
using System.Web.Mvc;

namespace SIGES.Controllers
{
    [Seguridad]
    public class CuestionariosController : Controller
    {
        SIGESDBDataContext SIGES = new SIGESDBDataContext();
        // GET: Cuestionarios
        public ActionResult Cuestionarios()
        {
            return View();
        }
        public JsonResult BDCuestionarios()
        {
            var datos = SIGES.Trainig_Cuestionario.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IDCuestionario,
                    p.NoCuestionario,
                    p.Nombre,
                    p.IDArea,
                    p.NombreA,
                    p.IDUsuario,
                    p.UNombre,
                    p.Usuarios,
                    p.NoPreguntas,
                    p.NoRespuestas,
                    p.Calificacion,
                    FechaInicio = ((DateTime)p.FInicio).ToShortDateString(),
                    FechaFin = ((DateTime)p.FFin).ToShortDateString(),
                    p.Descripcion
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Selecciona un cuestionario mediante su id
        public JsonResult BDCuestionario(long ID)
        {
            var Cuestionario = SIGES.Trainig_Cuestionario.Where(p => p.Estatus.Equals(1) && p.IDCuestionario.Equals(ID))
                .Select(p => new
                {
                    p.IDCuestionario,
                    p.NoCuestionario,
                    p.Nombre,
                    p.IDArea,
                    p.NombreA,
                    p.NoRespuestas,
                    p.Calificacion,
                    p.IDUsuario,
                    p.UNombre,
                    p.Usuarios,
                    p.NoPreguntas,
                    FechaInicio = ((DateTime)p.FInicio).ToShortDateString(),
                    FechaFin = ((DateTime)p.FFin).ToShortDateString(),
                    p.Descripcion
                });
            return Json(Cuestionario, JsonRequestBehavior.AllowGet);
        }
        //GuardarCuestionario
        public int GuardarCuestionario(Trainig_Cuestionario DCuestionario)
        {
            int Afectados = 0;
            try
            {
                long idTest = DCuestionario.IDCuestionario;
                if (idTest.Equals(0))
                {
                    int nveces = SIGES.Trainig_Cuestionario.Where(p => p.NoCuestionario.Equals(DCuestionario.NoCuestionario) && p.IDUsuario.Equals(DCuestionario.IDUsuario) && p.IDArea.Equals(DCuestionario.IDArea) && p.Usuarios.Equals(DCuestionario.Usuarios) && p.Descripcion.Equals(DCuestionario.Descripcion)).Count();
                    if (nveces == 0)
                    {
                        SIGES.Trainig_Cuestionario.InsertOnSubmit(DCuestionario);
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
                    int nveces = SIGES.Trainig_Cuestionario.Where(p => p.NoCuestionario.Equals(DCuestionario.NoCuestionario)
                    && p.Usuarios.Equals(DCuestionario.Usuarios)
                    && p.FInicio.Equals(DCuestionario.FInicio)
                    && p.FFin.Equals(DCuestionario.FFin)
                    && p.Usuarios.Equals(DCuestionario.Usuarios)
                    && p.Descripcion.Equals(DCuestionario.Descripcion)).Count();
                    if (nveces == 0)
                    {
                        Trainig_Cuestionario obj = SIGES.Trainig_Cuestionario.Where(p => p.IDCuestionario.Equals(idTest)).First();
                        obj.Nombre = DCuestionario.Nombre;                        
                        obj.Usuarios = DCuestionario.Usuarios;                        
                        obj.FInicio = DCuestionario.FInicio;
                        obj.FFin = DCuestionario.FFin;
                        obj.Descripcion = DCuestionario.Descripcion;
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
        //EliminarCuestionarios
        public int EliminarCuestionario(long ID)
        {
            int Afectados = 0;
            try
            {
                Trainig_Cuestionario Supervision = SIGES.Trainig_Cuestionario.Where(p => p.IDCuestionario.Equals(ID)).First();
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
        //****************************************************************************************
        public JsonResult BDPreguntasTabla(long IDc)
        {
            var datos = SIGES.Trainig_Cuestionario_Preguntas.Where(p => p.Estatus.Equals(1) && p.IDCuestionario.Equals(IDc))
                .Select(p => new
                {
                    p.IDPregunta,
                    p.IDCuestionario,
                    p.NoPregunta,
                    p.Pregunta,
                    p.IDRespuesta,
                    p.Valor
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //*****************************************PREGUNTAS
        //Respuestas por preguntas
        public JsonResult Respuestas(long IDp)
        {
            var datos = SIGES.Trainig_Cuestionario_Respuestas.Where(p => p.IDPregunta.Equals(IDp))
                .Select(p => new {
                    ID = p.IDRespuesta,
                    Nombre = p.Respuesta,
                    p.IDPregunta,
                    p.IDCuestionario,                    
                    p.NoRespuesta
                }).OrderBy(p => p.ID);
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        public int GuardarRespuestas(Trainig_Cuestionario_Respuestas DRespuestas)
        {
            int Afectados = 0;
            try
            {
            long idANSWER = DRespuestas.IDRespuesta;
            if (idANSWER.Equals(0))
            {
                int nveces = SIGES.Trainig_Cuestionario_Respuestas.Where(p => p.IDPregunta.Equals(DRespuestas.IDPregunta) && p.IDCuestionario.Equals(DRespuestas.IDCuestionario) && p.NoRespuesta.Equals(DRespuestas.NoRespuesta) && p.Respuesta.Equals(DRespuestas.Respuesta)).Count();
                if (nveces == 0)
                {
                    SIGES.Trainig_Cuestionario_Respuestas.InsertOnSubmit(DRespuestas);
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
                int nveces = SIGES.Trainig_Cuestionario_Respuestas.Where(p => p.IDPregunta.Equals(DRespuestas.IDPregunta) && p.IDCuestionario.Equals(DRespuestas.IDCuestionario) && p.NoRespuesta.Equals(DRespuestas.NoRespuesta) && p.Respuesta.Equals(DRespuestas.Respuesta)).Count();
                if (nveces == 0)
                {
                    Trainig_Cuestionario_Respuestas obj = SIGES.Trainig_Cuestionario_Respuestas.Where(p => p.IDRespuesta.Equals(idANSWER)).First();
                    obj.Respuesta = DRespuestas.Respuesta;
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

        public JsonResult BDRespuesta(long IDr)
        {
            var datos = SIGES.Trainig_Cuestionario_Respuestas.Where(p => p.IDRespuesta.Equals(IDr))
                .Select(p => new {
                    p.IDRespuesta,
                    p.IDPregunta,
                    p.IDCuestionario,
                    p.NoRespuesta,
                    p.Respuesta
                }).OrderBy(p => p.NoRespuesta);
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Selecciona Una Pregunta usando el ID de la pregunta
        public JsonResult BDPregunta(long IDp)
        {
            var datos = SIGES.Trainig_Cuestionario_Preguntas.Where(p => p.Estatus.Equals(1) && p.IDPregunta.Equals(IDp))
                .Select(p => new {
                    p.IDPregunta,
                    p.IDCuestionario,
                    p.NoPregunta,
                    p.Pregunta,
                    p.IDRespuesta,
                    p.Valor
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        public int GuardarPregunta(Trainig_Cuestionario_Preguntas DPregunta)
        {
            int Afectados = 0;
            try
            {
                long idQuestion = DPregunta.IDPregunta;                
                if (idQuestion.Equals(0))
                {
                    int nveces = SIGES.Trainig_Cuestionario_Preguntas.Where(p => p.NoPregunta.Equals(DPregunta.NoPregunta) && p.Pregunta.Equals(DPregunta.Pregunta) && p.IDRespuesta.Equals(DPregunta.IDRespuesta) && p.Valor.Equals(DPregunta.Valor)).Count();
                    if (nveces == 0)
                    {
                        SIGES.Trainig_Cuestionario_Preguntas.InsertOnSubmit(DPregunta);
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
                    int nveces = SIGES.Trainig_Cuestionario_Preguntas.Where(p => p.NoPregunta.Equals(DPregunta.NoPregunta) && p.Pregunta.Equals(DPregunta.Pregunta) && p.IDRespuesta.Equals(DPregunta.IDRespuesta) && p.Valor.Equals(DPregunta.Valor)).Count();
                    if (nveces == 0)
                    {
                        Trainig_Cuestionario_Preguntas obj = SIGES.Trainig_Cuestionario_Preguntas.Where(p => p.IDPregunta.Equals(idQuestion)).First();
                        obj.IDRespuesta = DPregunta.IDRespuesta;
                        obj.Valor = DPregunta.Valor;
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
        //*****************************************************************************************************************************************************************
        public ActionResult CuestionariosAreas()
        {
            return View();
        }
        public JsonResult BDCuestionariosArea()
        {
            long IDArea = Convert.ToInt64(Session["IDArea"]);
            var datos = SIGES.Trainig_Cuestionario.Where(p => p.Estatus.Equals(1)&& p.IDArea.Equals(IDArea))
                .Select(p => new
                {
                    p.IDCuestionario,
                    p.NoCuestionario,
                    p.Nombre,
                    p.IDArea,
                    p.NombreA,
                    p.IDUsuario,
                    p.UNombre,
                    p.Usuarios,
                    p.NoPreguntas,
                    p.NoRespuestas,
                    p.Calificacion,
                    FechaInicio = ((DateTime)p.FInicio).ToShortDateString(),
                    FechaFin = ((DateTime)p.FFin).ToShortDateString(),
                    p.Descripcion
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
    }
}