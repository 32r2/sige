using SIGES.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web.Mvc;
using System.Web.Security;

namespace SIGES.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Login(string Usuario, string Contrasena)
        {
            using (SIGESDBDataContext SIGES = new SIGESDBDataContext())
            {
                int solicitud = 0;
                try
                {
                    solicitud = SIGES.User_Usuarios.Where(p => p.Usuario == Usuario && p.Contraseña == Encrypt(Contrasena) && p.Estatus.Equals(1)).Count();
                    if (solicitud == 1)
                    {
                        var DatosUsuario = SIGES.User_Usuarios.Where(p => p.Usuario == Usuario && p.Contraseña == Encrypt(Contrasena) && p.Estatus.Equals(1))
                        .Select(p => new
                        {
                            p.IDUsuario,
                            p.CURP,
                            p.Nombre,
                            p.APaterno,
                            p.AMaterno,
                            p.FNacimiento,
                            p.RFC,
                            p.NoSS,
                            p.Foto,
                            p.IDArea,
                            p.NArea,
                            p.NSArea,
                            p.IDAsignacion,
                            p.CManejador,
                            p.CPlataforma,
                            p.IDSitio,
                            p.IDPerfil,
                            p.LVLPerfil
                        }).First();

                        Session["IDUsuario"] = DatosUsuario.IDUsuario;
                        Session["CURP"] = DatosUsuario.CURP;
                        Session["Nombre"] = DatosUsuario.Nombre + " " + DatosUsuario.APaterno + " " + DatosUsuario.AMaterno;
                        /*****/
                        //Accesos.FNacimiento = DatosUsuario.FNacimiento;

                        Session["RFC"] = DatosUsuario.RFC;
                        Session["NoSS"] = DatosUsuario.NoSS;
                        Session["Foto"] = "data:image/png;base64," + Convert.ToBase64String(DatosUsuario.Foto.ToArray());
                        Session["IDArea"] = DatosUsuario.IDArea;
                        Session["LVLPerfil"] = (long)DatosUsuario.LVLPerfil;
                        Session["IDAsignacion"] = (long)DatosUsuario.IDAsignacion;
                        Session["IDSitio"] = (long)DatosUsuario.IDSitio;
                        if ((long)DatosUsuario.IDAsignacion != 0)
                        {
                            var Asignasion = SIGES.System_Inf_Asignacion.Where(p => p.IDAsignacion.Equals(DatosUsuario.IDAsignacion)).First();
                            Session["NombreAsignacion"] = Asignasion.Nombre;
                            if (DatosUsuario.IDAsignacion == 1)
                            {
                                var Sucursal = SIGES.System_Sis_Tienda.Where(p => p.IDTienda.Equals(DatosUsuario.IDSitio)).First();
                                Session["Sitio"] = Sucursal.Nombre;
                                Session["Tiendas"] = DatosUsuario.IDSitio.ToString();
                            }
                            else if (DatosUsuario.IDAsignacion == 2)
                            {
                                var Supervision = SIGES.System_Supervision.Where(p => p.IDSupervision.Equals(DatosUsuario.IDSitio)).First();
                                Session["Sitio"] = Supervision.Supervision;
                                Session["Tiendas"] = Supervision.Tiendas;
                            }
                            else if (DatosUsuario.IDAsignacion == 3)
                            {
                                Session["Sitio"] = "Oficina";
                                Session["Tiendas"] = "";
                            }
                            else
                            {
                                Session["Sitio"] = "No tiene ninguna asignación";
                                Session["Tiendas"] = "";
                            }
                        }
                        if (DatosUsuario.NSArea != "--Seleccione--")
                        {
                            Session["NSArea"] = DatosUsuario.NSArea;
                        }
                        else
                        {
                            Session["NSArea"] = "";
                        }
                        if (DatosUsuario.CManejador != null)
                        {
                            Session["CManejador"] = DatosUsuario.CManejador;
                        }
                        else
                        {
                            Session["CManejador"] = "Aun no se le ha asignado una contraseña de la plataforma FRONT.";
                        }
                        if (DatosUsuario.CPlataforma != null)
                        {
                            Session["CPlataforma"] = DatosUsuario.CPlataforma;
                        }
                        else
                        {
                            Session["CPlataforma"] = "Aun no se le ha asignado una contraseña de la plataforma MTCenter.";
                        }
                        var Permisos = SIGES.System_Sis_PerfilUsuario.Where(p => p.IDPerfil.Equals(DatosUsuario.IDPerfil)).First();
                        string[] abreviaturas = Permisos.Permisos.Split('$');
                        int Filas = abreviaturas.GetLength(0);
                        string[,] Paginas = new string[Filas, 3];

                        Session["Perfil"] = Permisos.Perfil;
                        List<string> Acceso_Perfil = new List<string>();

                        for (int i = 0; i < Filas; i++)
                        {
                            var Pagina = SIGES.System_Sis_Pagina.Where(p => p.IDPagina.Equals(abreviaturas[i]))
                                .Select(p => new
                                {
                                    p.Accion,
                                    p.Controlador,
                                    p.Mensaje,
                                    p.Icono
                                });
                            foreach (var item in Pagina)
                            {
                                Acceso_Perfil.Add(item.Accion + "," + item.Controlador + "," + item.Mensaje + "," + item.Icono);
                            }
                        }
                        Session["Acceso_Perfil"] = Acceso_Perfil;
                        return RedirectToAction("Inicio", "Inicio");
                    }
                }
                catch (Exception ex)
                {
                    solicitud = 0;
                }
            }
            return View();
        }
        /*****************************************************************************************************/
        static readonly string password = "P455W0rd";
        public static string Encrypt(string plainText)
        {
            if (plainText == null)
            {
                return null;
            }
            var bytesToBeEncrypted = Encoding.UTF8.GetBytes(plainText);
            var passwordBytes = Encoding.UTF8.GetBytes(password);
            passwordBytes = SHA512.Create().ComputeHash(passwordBytes);
            var bytesEncrypted = Encrypt(bytesToBeEncrypted, passwordBytes);
            return Convert.ToBase64String(bytesEncrypted);
        }
        private static byte[] Encrypt(byte[] bytesToBeEncrypted, byte[] passwordBytes)
        {
            byte[] encryptedBytes = null;
            var saltBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };
            using (MemoryStream ms = new MemoryStream())
            {
                using (RijndaelManaged AES = new RijndaelManaged())
                {
                    var key = new Rfc2898DeriveBytes(passwordBytes, saltBytes, 1000);
                    AES.KeySize = 256;
                    AES.BlockSize = 128;
                    AES.Key = key.GetBytes(AES.KeySize / 8);
                    AES.IV = key.GetBytes(AES.BlockSize / 8);
                    AES.Mode = CipherMode.CBC;
                    using (var cs = new CryptoStream(ms, AES.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(bytesToBeEncrypted, 0, bytesToBeEncrypted.Length);
                        cs.Close();
                    }
                    encryptedBytes = ms.ToArray();
                }
            }
            return encryptedBytes;
        }
        public ActionResult Logout()
        {
            Session["IDUsuario"] = null;
            Session["CURP"] = null;
            Session["Nombre"] = null;
            Session["RFC"] = null;
            Session["NoSS"] = null;
            Session["Foto"] = null;
            Session["IDArea"] = null;
            Session["LVLPerfil"] = null;
            Session["IDAsignacion"] = null;
            Session["IDSitio"] = null;
            Session["NombreAsignacion"] = null;
            Session["Sitio"] = null;
            Session["Tiendas"] = null;
            Session["NSArea"] = null;
            Session["CManejador"] = null;
            Session["CPlataforma"] = null;
            Session["Perfil"] = null;
            Session["Acceso_Perfil"] = null;
            return RedirectToAction("Login");
        }
    }
}