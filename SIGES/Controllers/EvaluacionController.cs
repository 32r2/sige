using SIGES.Filtro;
using SIGES.Models;
using System;
using System.Linq;
using System.Web.Mvc;
using System.Globalization;

namespace SIGES.Controllers
{
    [Seguridad]
    public class EvaluacionController : Controller
    {
        SIGESDBDataContext SIGES = new SIGESDBDataContext();
        // GET: Evaluacion
        public ActionResult Evaluacion()
        {
            return View();
        }
        public ActionResult Cuestionario()
        {
            return View();
        }
        public JsonResult ConsultaExamen(long IDCuestionario)
        {
            DateTime DiaHora = DateTime.Now;
            string Fecha = DiaHora.ToString("d");
            string[] AFecha = Fecha.Split('/');

            var currentCulture = CultureInfo.CurrentCulture;

            long IDUsuario = Convert.ToInt64(Session["IDUsuario"]);
            var Semana = currentCulture.Calendar.GetWeekOfYear(
                            new DateTime(Convert.ToInt32(AFecha[2]), Convert.ToInt32(AFecha[1]), Convert.ToInt32(AFecha[0])),
                            currentCulture.DateTimeFormat.CalendarWeekRule,
                            currentCulture.DateTimeFormat.FirstDayOfWeek);

            var datos = SIGES.Trainig_Cuestionario_Respuestas_User.Where(p => p.IDCuestionario.Equals(IDCuestionario)
        && p.IDUsuario.Equals(IDUsuario)
        && p.NoSemana.Equals(Semana)
        && p.Año.Equals(Convert.ToInt32(AFecha[2])))
            .Select(p => new
            {
                p.IDRespuestas,
                p.IDCuestionario,
                p.NoSemana,
                p.IDUsuario,
                p.Año,
                p.Respuestas,
                p.Finalizado
            });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaRespuestas(long IDRespuestas)
        {
            var Respuestas = SIGES.Trainig_Cuestionario_Respuestas_User.Where(p => p.IDRespuestas.Equals(IDRespuestas))
                .Select(P => new
                {
                    P.NoSemana,
                    P.Año,
                    P.Respuestas,
                    P.Observacion,
                    P.Total,
                    P.Fecha
                });
            return Json(Respuestas, JsonRequestBehavior.AllowGet);
        }

        public int GuardarRespuestasUsuario(Trainig_Cuestionario_Respuestas_User DatosRespuestasU)
        {
            int Afectados = 0;
            try
            {
                long IDRespuestas = DatosRespuestasU.IDRespuestas;
                long IDUsuario = Convert.ToInt64(Session["IDUsuario"]);
                DatosRespuestasU.IDUsuario = IDUsuario;
                if (IDRespuestas.Equals(0))
                {
                    int nveces = SIGES.Trainig_Cuestionario_Respuestas_User.Where(p => p.IDCuestionario.Equals(DatosRespuestasU.IDCuestionario)
                    && p.IDUsuario.Equals(DatosRespuestasU.IDUsuario)
                    && p.NoSemana.Equals(DatosRespuestasU.NoSemana)
                    && p.Año.Equals(DatosRespuestasU.Año)).Count();
                    if (nveces == 0)
                    {
                        SIGES.Trainig_Cuestionario_Respuestas_User.InsertOnSubmit(DatosRespuestasU);
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
                    int nveces = SIGES.Trainig_Cuestionario_Respuestas_User.Where(p => p.IDCuestionario.Equals(DatosRespuestasU.IDCuestionario)
                    && p.IDUsuario.Equals(DatosRespuestasU.IDUsuario)
                    && p.NoSemana.Equals(DatosRespuestasU.NoSemana)
                    && p.Respuestas.Equals(DatosRespuestasU.Respuestas)
                    && p.Finalizado.Equals(DatosRespuestasU.Finalizado)
                    && p.Año.Equals(DatosRespuestasU.Año)).Count();
                    if (nveces == 0)
                    {
                        Trainig_Cuestionario_Respuestas_User obj = SIGES.Trainig_Cuestionario_Respuestas_User.Where(p => p.IDRespuestas.Equals(IDRespuestas)).First();
                        obj.Respuestas = DatosRespuestasU.Respuestas;
                        obj.Total = DatosRespuestasU.Total;
                        obj.Observacion = DatosRespuestasU.Observacion;
                        obj.Finalizado = DatosRespuestasU.Finalizado;
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

    }
}