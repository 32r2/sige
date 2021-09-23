using SIGES.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web.Mvc;

namespace SIGES.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Login()
        {
            return View();
        }
        public int IniciarUsuario(string User, string Password)
        {
            int solicitud = 0;
            try
            {
                string ConSif = Encrypt(Password);
                using (SIGESDBDataContext SIGES = new SIGESDBDataContext())
                {
                    solicitud = SIGES.User_Usuarios.Where(p => p.Usuario == User && p.Contraseña == ConSif && p.Estatus.Equals(1)).Count();
                    if (solicitud == 1)
                    {
                        var DatosUsuario = SIGES.User_Usuarios.Where(p => p.Usuario == User && p.Contraseña == ConSif && p.Estatus.Equals(1))
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
                            p.NArea,
                            p.NSArea,
                            p.Asignacion,
                            p.CManejador,
                            p.CPlataforma,
                            p.Sitio,
                            p.IDPerfil
                        }).First();

                        Session["Usuario"] = DatosUsuario.IDUsuario;
                        Accesos.ID = DatosUsuario.IDUsuario;
                        Accesos.CURP = DatosUsuario.CURP;
                        Accesos.Nombre = DatosUsuario.Nombre;
                        Accesos.APaterno = DatosUsuario.APaterno;
                        Accesos.AMaterno = DatosUsuario.AMaterno;
                        Accesos.FNacimiento = DatosUsuario.FNacimiento;
                        Accesos.RFC = DatosUsuario.RFC;
                        Accesos.NoSS = DatosUsuario.NoSS;
                        Accesos.Foto = "data:image/png;base64," + Convert.ToBase64String(DatosUsuario.Foto.ToArray());
                        Accesos.NArea = DatosUsuario.NArea;
                        Accesos.Sitio = DatosUsuario.Sitio;
                        if (DatosUsuario.NSArea != "--Seleccione--")
                        {
                            Accesos.NSArea = DatosUsuario.NSArea;
                        }
                        else
                        {
                            Accesos.NSArea = "";
                        }
                        Accesos.Asignacion = DatosUsuario.Asignacion;
                        if (DatosUsuario.CManejador != null)
                        {
                            Accesos.CManejador = DatosUsuario.CManejador;
                        }
                        else
                        {
                            Accesos.CManejador = "Aun no se le ha asignado una contraseña de la plataforma FRONT.";
                        }

                        if (DatosUsuario.CPlataforma != null)
                        {
                            Accesos.CPlataforma = DatosUsuario.CPlataforma;
                        }
                        else
                        {
                            Accesos.CPlataforma = "Aun no se le ha asignado una contraseña de la plataforma MTCenter.";
                        }

                        Accesos.Sitio = DatosUsuario.Sitio;

                        var Permisos = SIGES.System_Sis_PerfilUsuario.Where(p => p.IDPerfil.Equals(DatosUsuario.IDPerfil)).First().Permisos;
                        string[] abreviaturas = Permisos.Split('$');
                        int Filas = abreviaturas.GetLength(0);
                        string[,] Paginas = new string[Filas, 3];
                        Accesos.Accion = new List<string>();
                        Accesos.Controlador = new List<string>();
                        Accesos.Mensaje = new List<string>();
                        Accesos.Icono = new List<string>();
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
                                Accesos.Accion.Add(item.Accion);
                                Accesos.Controlador.Add(item.Controlador);
                                Accesos.Mensaje.Add(item.Mensaje);
                                Accesos.Icono.Add(item.Icono);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                solicitud = 0;
            }
            return solicitud;
        }

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

        public ActionResult logout()
        {
            Session["Usuario"] = null;
            return RedirectToAction("Login");
        }
    }
}