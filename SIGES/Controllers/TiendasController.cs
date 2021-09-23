using SIGES.Filtro;
using System;
using System.Linq;
using System.Web.Mvc;

namespace SIGES.Controllers
{
    [Seguridad]
    public class TiendasController : Controller
    {
        SIGESDBDataContext SIGES = new SIGESDBDataContext();
        // GET: Tiendas
        public ActionResult Tiendas()
        {
            return View();
        }
        public JsonResult ConsultaSucursales()
        {
            var datos = SIGES.System_Sis_Tienda.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDTienda,
                    p.NoTienda,
                    p.Nombre,
                    p.NombreS,
                    p.UNombre,
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
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Tienda por ID
        public JsonResult BDTienda(long ID)
        {
            var datos = SIGES.System_Sis_Tienda.Where(p => p.IDTienda.Equals(ID))
                .Select(p => new {
                    ID= p.IDTienda,
                    p.NoTienda,
                    p.Nombre,
                    p.IDSupervision,                    
                    p.IDSupervisor,
                    p.IDLider,
                    p.IDEncargado1,
                    p.IDEncargado2,
                    p.IDEncargado3,
                    p.IDAuxsiliar1,
                    p.IDAuxsiliar2,
                    p.IDAuxsiliar3,
                    p.IDEstado,
                    p.IDMunicipio,
                    p.IDLocalidad,
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
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Guardar sucursa
        public int GuardarSucursal(System_Sis_Tienda Tienda)
        {
            int Afectados = 0;
            try
            {
                long idTienda = Tienda.IDTienda;
                if (idTienda.Equals(0))
                {
                    int nveces = SIGES.System_Sis_Tienda.Where(p => p.Nombre.Equals(Tienda.Nombre)).Count();
                    if (nveces == 0)
                    {
                        SIGES.System_Sis_Tienda.InsertOnSubmit(Tienda);
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
                    int nveces = SIGES.System_Sis_Tienda.Where(
                        p => p.NoTienda.Equals(Tienda.NoTienda) 
                        && p.Nombre.Equals(Tienda.Nombre) 
                        && p.IDSupervision.Equals(Tienda.IDSupervision)
                        && p.IDSupervisor.Equals(Tienda.IDSupervisor) 
                        && p.IDLider.Equals(Tienda.IDLider) 
                        && p.IDEncargado1.Equals(Tienda.IDEncargado1) 
                        && p.IDEncargado2.Equals(Tienda.IDEncargado2) 
                        && p.IDEncargado3.Equals(Tienda.IDEncargado3) 
                        && p.IDAuxsiliar1.Equals(Tienda.IDAuxsiliar1)
                        && p.IDAuxsiliar2.Equals(Tienda.IDAuxsiliar2) 
                        && p.IDAuxsiliar3.Equals(Tienda.IDAuxsiliar3)
                        && p.IDEstado.Equals(Tienda.IDEstado) 
                        && p.IDMunicipio.Equals(Tienda.IDMunicipio) 
                        && p.IDLocalidad.Equals(Tienda.IDLocalidad) 
                        && p.Calle.Equals(Tienda.Calle)
                        && p.CP.Equals(Tienda.CP) 
                        && p.Telefono.Equals(Tienda.Telefono) 
                        && p.Latitud.Equals(Tienda.Latitud) 
                        && p.Longitud.Equals(Tienda.Longitud) 
                        && p.HApertura.Equals(Tienda.HApertura) 
                        && p.HCierre.Equals(Tienda.HCierre)
                        && p.IUSACodigo.Equals(Tienda.IUSACodigo) 
                        && p.IUSAUsuario.Equals(Tienda.IUSAUsuario) 
                        && p.IUSAContraseña.Equals(Tienda.IUSAContraseña)
                        && p.PCPAYUsuario.Equals(Tienda.PCPAYUsuario)
                        && p.PCPAYContraseña.Equals(Tienda.PCPAYContraseña)
                        && p.NoServicioLuz.Equals(Tienda.NoServicioLuz)).Count();
                    if (nveces == 0)
                    {
                        System_Sis_Tienda obj = SIGES.System_Sis_Tienda.Where(p => p.IDTienda.Equals(idTienda)).First();
                        obj.NoTienda = Tienda.NoTienda;
                        obj.IDSupervision = Tienda.IDSupervision;                        
                        obj.NombreS = Tienda.NombreS;                        
                        obj.IDSupervisor = Tienda.IDSupervisor;
                        obj.UNombre = Tienda.UNombre;
                        obj.IDLider = Tienda.IDLider;
                        obj.LNombre = Tienda.LNombre;
                        obj.IDEncargado1 = Tienda.IDEncargado1;
                        obj.E1Nombre = Tienda.E1Nombre;
                        obj.IDEncargado2 = Tienda.IDEncargado2;
                        obj.E2Nombre = Tienda.E2Nombre;
                        obj.IDEncargado3 = Tienda.IDEncargado3;
                        obj.E3Nombre = Tienda.E3Nombre;
                        obj.IDAuxsiliar1 = Tienda.IDAuxsiliar1;
                        obj.A1Nombre = Tienda.A1Nombre;
                        obj.IDAuxsiliar2 = Tienda.IDAuxsiliar2;
                        obj.A2Nombre = Tienda.A2Nombre;
                        obj.IDAuxsiliar3 = Tienda.IDAuxsiliar3;
                        obj.A3Nombre = Tienda.A3Nombre;
                        obj.IDEstado = Tienda.IDEstado;
                        obj.Estado = Tienda.Estado;
                        obj.IDMunicipio = Tienda.IDMunicipio;
                        obj.Municipio = Tienda.Municipio;
                        obj.IDLocalidad = Tienda.IDLocalidad;
                        obj.Localidad = Tienda.Localidad;
                        obj.Calle = Tienda.Calle;
                        obj.CP = Tienda.CP;
                        obj.Telefono = Tienda.Telefono;
                        obj.Latitud = Tienda.Latitud;
                        obj.Longitud = Tienda.Longitud;
                        obj.HApertura = Tienda.HApertura;
                        obj.HCierre = Tienda.HCierre;
                        obj.IUSACodigo = Tienda.IUSACodigo;
                        obj.IUSAUsuario = Tienda.IUSAUsuario;
                        obj.IUSAContraseña = Tienda.IUSAContraseña;
                        obj.PCPAYUsuario = Tienda.PCPAYUsuario;
                        obj.PCPAYContraseña = Tienda.PCPAYContraseña;
                        obj.NoServicioLuz = Tienda.NoServicioLuz;
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
        //Eliminar Sucursa
        public int EliminarSucursal(long id)
        {
            int Afectados = 0;
            try
            {
                System_Sis_Tienda Tienda = SIGES.System_Sis_Tienda.Where(p => p.IDTienda.Equals(id)).First();
                Tienda.Estatus = 0;
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