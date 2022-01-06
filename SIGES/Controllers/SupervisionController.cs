using SIGES.Filtro;
using SIGES.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace SIGES.Controllers
{
    [Seguridad]
    public class SupervisionController : Controller
    {
        SIGESDBDataContext SIGES = new SIGESDBDataContext();
        // GET: Supervision
        public ActionResult Supervision()
        {
            return View();
        }
        public JsonResult BDSupervisiones()
        {
            var datos = SIGES.System_Supervision.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDSupervision,
                    Nombre = p.Supervision,
                    p.UNombre,
                    p.Tiendas
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta subarea por id
        public JsonResult BDSupervision(long ID)
        {
            var datos = SIGES.System_Supervision.Where(p => p.IDSupervision.Equals(ID))
                .Select(p => new
                {
                    ID = p.IDSupervision,
                    Nombre = p.Supervision,
                    p.IDUsuario,
                    p.Tiendas
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        public int GuardarSupervision(System_Supervision DSupervision)
        {
            int Afectados = 0;
            try
            {
                long idarea = DSupervision.IDSupervision;
                if (idarea.Equals(0))
                {
                    int nveces = SIGES.System_Supervision.Where(p => p.Supervision.Equals(DSupervision.Supervision) && p.IDUsuario.Equals(DSupervision.IDUsuario) && p.UNombre.Equals(DSupervision.UNombre) && p.IDUsuario.Equals(DSupervision.IDUsuario) && p.Tiendas.Equals(DSupervision.Tiendas)).Count();
                    if (nveces == 0)
                    {
                        SIGES.System_Supervision.InsertOnSubmit(DSupervision);
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
                    int nveces = SIGES.System_Supervision.Where(p => p.Supervision.Equals(DSupervision.Supervision) && p.IDUsuario.Equals(DSupervision.IDUsuario) && p.UNombre.Equals(DSupervision.UNombre) && p.IDUsuario.Equals(DSupervision.IDUsuario) && p.Tiendas.Equals(DSupervision.Tiendas)).Count();
                    if (nveces == 0)
                    {
                        System_Supervision obj = SIGES.System_Supervision.Where(p => p.IDSupervision.Equals(idarea)).First();
                        obj.Supervision = DSupervision.Supervision;
                        obj.IDUsuario = DSupervision.IDUsuario;
                        obj.UNombre = DSupervision.UNombre;
                        obj.Tiendas = DSupervision.Tiendas;
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
        //eliminar
        public int EliminarSupervision(long ID)
        {
            int Afectados = 0;
            try
            {
                System_Supervision Supervision = SIGES.System_Supervision.Where(p => p.IDSupervision.Equals(ID)).First();
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
        public ActionResult SucursalesSupervision()
        {
            return View();
        }
        public int CargarSucursalesXSupervision(string Tiendas)
        {
            int Encontrados = 0;
            //string Tiendas = Session["Tiendas"].ToString();
            string[] Sucursales = Tiendas.Split(',');
            TiendasSupervision.IDTienda = new List<long>();
            TiendasSupervision.NoTienda = new List<long>();
            TiendasSupervision.Nombre = new List<string>();
            TiendasSupervision.LNombre = new List<string>();
            TiendasSupervision.E1Nombre = new List<string>();
            TiendasSupervision.E2Nombre = new List<string>();
            TiendasSupervision.E3Nombre = new List<string>();
            TiendasSupervision.A1Nombre = new List<string>();
            TiendasSupervision.A2Nombre = new List<string>();
            TiendasSupervision.A3Nombre = new List<string>();
            TiendasSupervision.Estado = new List<string>();
            TiendasSupervision.Municipio = new List<string>();
            TiendasSupervision.Localidad = new List<string>();
            TiendasSupervision.Calle = new List<string>();
            TiendasSupervision.CP = new List<long>();
            TiendasSupervision.Telefono = new List<long>();
            TiendasSupervision.Latitud = new List<string>();
            TiendasSupervision.Longitud = new List<string>();
            TiendasSupervision.HApertura = new List<string>();
            TiendasSupervision.HCierre = new List<string>();
            TiendasSupervision.IUSACodigo = new List<string>();
            TiendasSupervision.IUSAUsuario = new List<string>();
            TiendasSupervision.IUSAContraseña = new List<string>();
            TiendasSupervision.PCPAYUsuario = new List<string>();
            TiendasSupervision.PCPAYContraseña = new List<string>();
            TiendasSupervision.NoServicioLuz = new List<string>();
            TiendasSupervision.Estatus = new List<int>();
            for (int i = 0; i < Sucursales.Length; i++)
            {
                var Tienda = SIGES.System_Sis_Tienda.Where(p => p.IDTienda.Equals(Sucursales[i]))
                .Select(p => new
                {
                    p.IDTienda,
                    p.NoTienda,
                    p.Nombre,
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
                }).First();
                TiendasSupervision.IDTienda.Add(Tienda.IDTienda);
                TiendasSupervision.NoTienda.Add(Tienda.NoTienda);
                TiendasSupervision.Nombre.Add(Tienda.Nombre);
                TiendasSupervision.LNombre.Add(Tienda.LNombre);
                if (Tienda.E1Nombre != "--Seleccione--")
                {
                    TiendasSupervision.E1Nombre.Add(Tienda.E1Nombre);
                }
                else
                {
                    TiendasSupervision.E1Nombre.Add("");
                }
                if (Tienda.E2Nombre != "--Seleccione--")
                {
                    TiendasSupervision.E2Nombre.Add(Tienda.E2Nombre);
                }
                else
                {
                    TiendasSupervision.E2Nombre.Add("");
                }
                if (Tienda.E3Nombre != "--Seleccione--")
                {
                    TiendasSupervision.E3Nombre.Add(Tienda.E3Nombre);
                }
                else
                {
                    TiendasSupervision.E3Nombre.Add("");
                }
                if (Tienda.A1Nombre != "--Seleccione--")
                {
                    TiendasSupervision.A1Nombre.Add(Tienda.A1Nombre);
                }
                else
                {
                    TiendasSupervision.A1Nombre.Add("");
                }
                if (Tienda.A2Nombre != "--Seleccione--")
                {
                    TiendasSupervision.A2Nombre.Add(Tienda.A2Nombre);
                }
                else
                {
                    TiendasSupervision.A2Nombre.Add("");
                }
                if (Tienda.A3Nombre != "--Seleccione--")
                {
                    TiendasSupervision.A3Nombre.Add(Tienda.A3Nombre);
                }
                else
                {
                    TiendasSupervision.A3Nombre.Add("");
                }
                TiendasSupervision.Estado.Add(Tienda.Estado);
                TiendasSupervision.Municipio.Add(Tienda.Municipio);
                TiendasSupervision.Localidad.Add(Tienda.Localidad);
                TiendasSupervision.Calle.Add(Tienda.Calle);
                TiendasSupervision.CP.Add(Tienda.CP);
                TiendasSupervision.Telefono.Add(Tienda.Telefono);
                TiendasSupervision.Estatus.Add(Convert.ToInt32(Tienda.Estatus));
                if (Tienda.Latitud != null)
                {
                    TiendasSupervision.Latitud.Add(Tienda.Latitud);

                }
                else
                {
                    TiendasSupervision.Latitud.Add("");
                }
                if (Tienda.Longitud != null)
                {
                    TiendasSupervision.Longitud.Add(Tienda.Longitud);
                }
                else
                {
                    TiendasSupervision.Longitud.Add("");
                }
                if (Tienda.HApertura != null)
                {
                    TiendasSupervision.HApertura.Add(Tienda.HApertura);
                }
                else
                {
                    TiendasSupervision.HApertura.Add("");

                }
                if (Tienda.HCierre != null)
                {
                    TiendasSupervision.HCierre.Add(Tienda.HCierre);
                }
                else
                {
                    TiendasSupervision.HCierre.Add("");
                }
                if (Tienda.IUSACodigo != null)
                {
                    TiendasSupervision.IUSACodigo.Add(Tienda.IUSACodigo);
                }
                else
                {
                    TiendasSupervision.IUSACodigo.Add("");
                }
                if (Tienda.IUSAUsuario != null)
                {
                    TiendasSupervision.IUSAUsuario.Add(Tienda.IUSAUsuario);
                }
                else
                {
                    TiendasSupervision.IUSAUsuario.Add("");
                }
                if (Tienda.IUSAContraseña != null)
                {
                    TiendasSupervision.IUSAContraseña.Add(Tienda.IUSAContraseña);
                }
                else
                {
                    TiendasSupervision.IUSAContraseña.Add("");
                }
                if (Tienda.PCPAYUsuario != null)
                {
                    TiendasSupervision.PCPAYUsuario.Add(Tienda.PCPAYUsuario);
                }
                else
                {
                    TiendasSupervision.PCPAYUsuario.Add("");
                }
                if (Tienda.PCPAYContraseña != null)
                {
                    TiendasSupervision.PCPAYContraseña.Add(Tienda.PCPAYContraseña);
                }
                else
                {
                    TiendasSupervision.PCPAYContraseña.Add("");
                }
                if (Tienda.NoServicioLuz != null)
                {
                    TiendasSupervision.NoServicioLuz.Add(Tienda.NoServicioLuz);
                }
                else
                {
                    TiendasSupervision.NoServicioLuz.Add("");
                }
            }
            return Encontrados;
        }

        //*********************************************************************************************************************************
        public JsonResult ReportesXArea(long IDArea, long IDTienda)
        {
            var IncidenciasRpt = from Reportes in SIGES.System_Incidencias_User_RIncidencias
                                 join Incidencias in SIGES.System_Incidencias
                                 on Reportes.IDIncidencia equals Incidencias.IDIncidencia
                                 where Reportes.IDTienda.Equals(IDTienda) && Incidencias.IDArea.Equals(IDArea) && Reportes.Estatus.Equals(1)
                                 select new
                                 {
                                     ID = Reportes.IDRIncidencia,
                                     IDArea = Incidencias.IDArea,
                                     Nombre = Incidencias.Nombre,
                                     NOIncidencia = Reportes.NoInsidencia,
                                     Fecha = ((DateTime)Reportes.ReporteFecha).ToShortDateString(),
                                     Descripcion = Reportes.ReporteObservaciones,
                                     //IncidenciasRpt = Convert.ToBase64String(Reportes.Foto.ToArray()),
                                     Estatus = Reportes.Estatus
                                 };
            return Json(IncidenciasRpt, JsonRequestBehavior.AllowGet);
        }
    }
}