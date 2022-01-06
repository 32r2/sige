using SIGES.Filtro;
using SIGES.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace SIGES.Controllers
{
    [Seguridad]
    public class CardinalController : Controller
    {
        //private const int V = 1;
        readonly SIGESDBDataContext SIGES = new SIGESDBDataContext();
        readonly DateTime Fecha = DateTime.Now.Date;
        // GET: Cardinal
        public ActionResult Index()
        {
            return View();
        }
        //**********************************************************************************************************************************************************************
        //Comunicados a mostrar en el inicio
        public JsonResult ComunicadosUsuario()
        {
            string Perfil = Session["Perfil"].ToString();
            var datos = SIGES.System_Sis_Notificacion.Where(p => p.Estatus.Equals(1) && p.Usuarios.Contains(Perfil) || p.Usuarios.Contains("Todos") && Fecha >= p.FInicio && Fecha <= p.FFin)
                .Select(p => new
                {
                    p.Nombre,
                    p.Foto,
                    p.Descripcion
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Selecciona todas las areas activas(1)
        public JsonResult BDAreas()
        {
            var DatosAreas = SIGES.System_Areas.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDArea,
                    p.Nombre,
                    p.UNombre,
                    p.Correo,
                    p.Telefono,
                    p.Carpeta
                });
            return Json(DatosAreas, JsonRequestBehavior.AllowGet);
        }
        public int Clases_Departamentos()
        {
            int Resultado = 0;
            Departamentos Departamento = new Departamentos();
            Departamentos.IDArea = new List<long>();
            Departamentos.Nombre = new List<string>();
            Departamentos.IDUsuario = new List<long>();
            Departamentos.UNombre = new List<string>();
            Departamentos.Correo = new List<string>();
            Departamentos.Telefono = new List<long>();
            Departamentos.Carpeta = new List<string>();
            var DatosDepartamentos = SIGES.System_Areas.Where(p => p.Estatus.Equals(1))
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
            Resultado = DatosDepartamentos.Count();
            foreach (var Depto in DatosDepartamentos)
            {
                Departamentos.IDArea.Add(Depto.IDArea);
                Departamentos.Nombre.Add(Depto.Nombre);
                Departamentos.IDUsuario.Add((long)Depto.IDUsuario);
                Departamentos.UNombre.Add(Depto.UNombre);
                Departamentos.Correo.Add(Depto.Correo);
                Departamentos.Telefono.Add((long)Depto.Telefono);
                Departamentos.Carpeta.Add(Depto.Carpeta);
            }
            return Resultado;
        }

        //Consulta Para llenar con Razor
        public void CargarPerfiles(long LVLPerfil)
        {
            int Resultado = 0;
            PerfilesUsuario PerfilesU = new PerfilesUsuario();
            PerfilesUsuario.IDPerfil = new List<long>();
            PerfilesUsuario.Perfil = new List<string>();
            PerfilesUsuario.Nivel = new List<long>();
            
            var DatosPerfiles = SIGES.System_Sis_PerfilUsuario.Where(p => p.Estatus.Equals(1) && p.Nivel > LVLPerfil)
                .Select(p => new
                {
                    p.IDPerfil,
                    p.Perfil,
                    p.Nivel,
                    p.Permisos,
                    p.Comentarios
                });
            Resultado = DatosPerfiles.Count();
            foreach (var PerfilBD in DatosPerfiles)
            {
                PerfilesUsuario.IDPerfil.Add(PerfilBD.IDPerfil);
                PerfilesUsuario.Perfil.Add(PerfilBD.Perfil);
                PerfilesUsuario.Nivel.Add(PerfilBD.Nivel);
            }
            //return Resultado;
        }

        //consulta SubAreas
        public JsonResult BDSubAreas(long IDA)
        {
            var datos = SIGES.System_Areas_SubAreas.Where(p => p.Estatus.Equals(1) && p.IDArea.Equals(IDA))
                .Select(p => new
                {
                    ID = p.IDSubArea,
                    p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Estados
        public JsonResult BDEstados()
        {
            var datos = SIGES.System_Inf_Estados.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDEstado,
                    p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Estados
        public void RazorEstados()
        {
            System_EstadosM EstadosM = new System_EstadosM();
            System_EstadosM.IDEstado = new List<long>();
            System_EstadosM.Nombre = new List<string>();
            var Estados = SIGES.System_Inf_Estados.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IDEstado,
                    p.Nombre
                });
            foreach (var Edo in Estados)
            {
                System_EstadosM.IDEstado.Add(Edo.IDEstado);
                System_EstadosM.Nombre.Add(Edo.Nombre);
            }

        }
        //consulta Municipio
        public JsonResult BDMunicipio(int IDE)
        {
            var datos = SIGES.System_Inf_Municipios.Where(p => p.Estatus.Equals(1) && p.IDEstado.Equals(IDE))
                .Select(p => new
                {
                    ID = p.IDMunicipio,
                    p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Localidades
        public JsonResult BDLocalidades(int IDM)
        {
            var datos = SIGES.System_Inf_Localidades.Where(p => p.Estatus.Equals(1) && p.IDMunicipio.Equals(IDM))
                .Select(p => new
                {
                    ID = p.IDLocalidad,
                    p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Tiendas
        public JsonResult BDTiendas()
        {
            var datos = SIGES.System_Sis_Tienda.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDTienda,
                    p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Tiendas
        public JsonResult BDSupervision()
        {
            var DatosSupervisiones = SIGES.System_Supervision.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDSupervision,
                    Nombre = p.Supervision
                });
            return Json(DatosSupervisiones, JsonRequestBehavior.AllowGet);
        }
        //Notificaciones inicio*****************************************************************************************************************************
        public JsonResult NoUsuarios()
        {
            var NUsuarios = SIGES.User_Usuarios.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Estatus
                });
            return Json(NUsuarios, JsonRequestBehavior.AllowGet);
        }
        public JsonResult NuUsuarios()
        {
            var NuUsuarios = SIGES.User_Usuarios.Where(p => p.Estatus.Equals(1) && p.FIngreso.Equals(Fecha))
                .Select(p => new
                {
                    p.Estatus
                });
            return Json(NuUsuarios, JsonRequestBehavior.AllowGet);
        }
        public JsonResult NoCursos()
        {
            var NCursos = SIGES.Trainig_Cursos.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Nombre
                });
            return Json(NCursos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult NoCuestinoarios()
        {
            var NCuestionarios = SIGES.Trainig_Cuestionario.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Nombre
                });
            return Json(NCuestionarios, JsonRequestBehavior.AllowGet);
        }
        public JsonResult NoIncidenciaTienda(long IDTienda)
        {
            var NIncidenciaTienda = SIGES.System_Incidencias_User_RIncidencias.Where(p => p.Estatus.Equals(1) && p.IDTienda.Equals(IDTienda))
             .Select(p => new
             {
                 p.Estatus
             });
            return Json(NIncidenciaTienda, JsonRequestBehavior.AllowGet);
        }
        public JsonResult NoReportesIncidencia(long IDIncidencia)
        {
            var NIncidenciaTienda = SIGES.System_Incidencias_User_RIncidencias.Where(p => p.Estatus.Equals(1) && p.IDIncidencia.Equals(IDIncidencia))
             .Select(p => new
             {
                 p.Estatus
             });
            return Json(NIncidenciaTienda, JsonRequestBehavior.AllowGet);
        }
        //Evaluación personal*****************************************************************************************************************************
        public JsonResult EvaluacionCuestionario()
        {
            string Perfil = Session["Perfil"].ToString();
            var EvaluacionPersonal = SIGES.Trainig_Cuestionario.Where(p => p.Estatus.Equals(1) && p.Usuarios.Contains(Perfil) || p.Usuarios.Contains("Todos") && Fecha >= p.FInicio && Fecha <= p.FFin)
                .Select(p => new
                {
                    ID = p.IDCuestionario,
                    p.Nombre,
                    p.NombreA,
                    p.NoPreguntas,
                    FInicio = ((DateTime)p.FInicio).ToShortDateString(),
                    FFin = ((DateTime)p.FFin).ToShortDateString(),
                    p.Descripcion
                });
            return Json(EvaluacionPersonal, JsonRequestBehavior.AllowGet);
        }
        public JsonResult EvaluacionPreguntasCuestionario(long IDCuestionario)
        {
            var EvaluacionPreguntas = SIGES.Trainig_Cuestionario_Preguntas.Where(p => p.IDCuestionario.Equals(IDCuestionario))
                .Select(p => new
                {
                    p.IDPregunta,
                    p.NoPregunta,
                    p.Pregunta,
                    p.IDRespuesta,
                    p.Valor
                });
            return Json(EvaluacionPreguntas, JsonRequestBehavior.AllowGet);
        }
        public JsonResult EvaluacionRespuestasCuestionario(long IDPregunta)
        {
            var EvaluacionRespuestas = SIGES.Trainig_Cuestionario_Respuestas.Where(p => p.IDPregunta.Equals(IDPregunta))
                .Select(p => new
                {
                    p.IDPregunta,
                    p.IDRespuesta,
                    p.NoRespuesta,
                    p.Respuesta
                });
            return Json(EvaluacionRespuestas, JsonRequestBehavior.AllowGet);
        }
        //Supervision *****************************************************************************************************************************
        public JsonResult BDSupervisionTiendas()
        {
            long IDUsuario = Convert.ToInt64(Session["IDUsuario"]);
            long IDSitio = Convert.ToInt64(Session["IDSitio"]);

            var datos = SIGES.System_Supervision.Where(p => p.IDSupervision.Equals(IDSitio) && p.IDUsuario.Equals(IDUsuario))
                .Select(p => new
                {
                    ID = p.IDSupervision,
                    Nombre = p.Supervision,
                    p.IDUsuario,
                    p.Tiendas
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        public void CargarSucursales()
        {
            Sucursales Sucursal = new Sucursales();
            Sucursales.IDTienda = new List<long>();
            Sucursales.NoTienda = new List<long>();
            Sucursales.Nombre = new List<string>();
            Sucursales.NombreS = new List<string>();
            Sucursales.LNombre = new List<string>();
            Sucursales.E1Nombre = new List<string>();
            Sucursales.E2Nombre = new List<string>();
            Sucursales.E3Nombre = new List<string>();
            Sucursales.A1Nombre = new List<string>();
            Sucursales.A2Nombre = new List<string>();
            Sucursales.A3Nombre = new List<string>();
            Sucursales.Estado = new List<string>();
            Sucursales.Municipio = new List<string>();
            Sucursales.Localidad = new List<string>();
            Sucursales.Calle = new List<string>();
            Sucursales.CP = new List<long>();
            Sucursales.Telefono = new List<long>();
            Sucursales.Latitud = new List<string>();
            Sucursales.Longitud = new List<string>();
            Sucursales.HApertura = new List<string>();
            Sucursales.HCierre = new List<string>();
            Sucursales.IUSACodigo = new List<string>();
            Sucursales.IUSAUsuario = new List<string>();
            Sucursales.IUSAContraseña = new List<string>();
            Sucursales.PCPAYUsuario = new List<string>();
            Sucursales.PCPAYContraseña = new List<string>();
            Sucursales.NoServicioLuz = new List<string>();
            Sucursales.Estatus = new List<int>();

            var Tienda = SIGES.System_Sis_Tienda.Where(p => p.Estatus.Equals(1))
            .Select(p => new
            {
                p.IDTienda,
                p.NoTienda,
                p.Nombre,
                p.NombreS,
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
                p.CP,
                p.Telefono,
                p.Latitud,
                p.Longitud,
                p.HApertura,
                p.HCierre,
                p.IUSACodigo,
                p.IUSAUsuario,
                p.IUSAContraseña,
                p.PCPAYUsuario,
                p.PCPAYContraseña,
                p.NoServicioLuz,
                p.Estatus
            });
            foreach (var Suc in Tienda)
            {
                Sucursales.IDTienda.Add(Suc.IDTienda);
                Sucursales.NoTienda.Add(Suc.NoTienda);
                Sucursales.Nombre.Add(Suc.Nombre);
                Sucursales.NombreS.Add(Suc.NombreS);
                Sucursales.LNombre.Add(Suc.LNombre);
                if (Suc.E1Nombre != "--Seleccione--")
                {
                    Sucursales.E1Nombre.Add(Suc.E1Nombre);
                }
                else
                {
                    Sucursales.E1Nombre.Add("");
                }
                if (Suc.E2Nombre != "--Seleccione--")
                {
                    Sucursales.E2Nombre.Add(Suc.E2Nombre);
                }
                else
                {
                    Sucursales.E2Nombre.Add("");
                }
                if (Suc.E3Nombre != "--Seleccione--")
                {
                    Sucursales.E3Nombre.Add(Suc.E3Nombre);
                }
                else
                {
                    Sucursales.E3Nombre.Add("");
                }
                if (Suc.A1Nombre != "--Seleccione--")
                {
                    Sucursales.A1Nombre.Add(Suc.A1Nombre);
                }
                else
                {
                    Sucursales.A1Nombre.Add("");
                }
                if (Suc.A2Nombre != "--Seleccione--")
                {
                    Sucursales.A2Nombre.Add(Suc.A2Nombre);
                }
                else
                {
                    Sucursales.A2Nombre.Add("");
                }
                if (Suc.A3Nombre != "--Seleccione--")
                {
                    Sucursales.A3Nombre.Add(Suc.A3Nombre);
                }
                else
                {
                    Sucursales.A3Nombre.Add("");
                }
                Sucursales.Estado.Add(Suc.Estado);
                Sucursales.Municipio.Add(Suc.Municipio);
                Sucursales.Localidad.Add(Suc.Localidad);
                Sucursales.Calle.Add(Suc.Calle);
                Sucursales.CP.Add(Suc.CP);
                Sucursales.Telefono.Add(Suc.Telefono);
                Sucursales.Estatus.Add(Convert.ToInt32(Suc.Estatus));
                if (Suc.Latitud != null)
                {
                    Sucursales.Latitud.Add(Suc.Latitud);

                }
                else
                {
                    Sucursales.Latitud.Add("");
                }
                if (Suc.Longitud != null)
                {
                    Sucursales.Longitud.Add(Suc.Longitud);
                }
                else
                {
                    Sucursales.Longitud.Add("");
                }
                if (Suc.HApertura != null)
                {
                    Sucursales.HApertura.Add(Suc.HApertura);
                }
                else
                {
                    Sucursales.HApertura.Add("");

                }
                if (Suc.HCierre != null)
                {
                    Sucursales.HCierre.Add(Suc.HCierre);
                }
                else
                {
                    Sucursales.HCierre.Add("");
                }
                if (Suc.IUSACodigo != null)
                {
                    Sucursales.IUSACodigo.Add(Suc.IUSACodigo);
                }
                else
                {
                    Sucursales.IUSACodigo.Add("");
                }
                if (Suc.IUSAUsuario != null)
                {
                    Sucursales.IUSAUsuario.Add(Suc.IUSAUsuario);
                }
                else
                {
                    Sucursales.IUSAUsuario.Add("");
                }
                if (Suc.IUSAContraseña != null)
                {
                    Sucursales.IUSAContraseña.Add(Suc.IUSAContraseña);
                }
                else
                {
                    Sucursales.IUSAContraseña.Add("");
                }
                if (Suc.PCPAYUsuario != null)
                {
                    Sucursales.PCPAYUsuario.Add(Suc.PCPAYUsuario);
                }
                else
                {
                    Sucursales.PCPAYUsuario.Add("");
                }
                if (Suc.PCPAYContraseña != null)
                {
                    Sucursales.PCPAYContraseña.Add(Suc.PCPAYContraseña);
                }
                else
                {
                    Sucursales.PCPAYContraseña.Add("");
                }
                if (Suc.NoServicioLuz != null)
                {
                    Sucursales.NoServicioLuz.Add(Suc.NoServicioLuz);
                }
                else
                {
                    Sucursales.NoServicioLuz.Add("");
                }
            }
        }
    }
}