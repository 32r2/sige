using SIGES.Filtro;
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
    [Seguridad]
    public class UsuariosController : Controller
    {
        SIGESDBDataContext SIGES = new SIGESDBDataContext();
        // GET: Usuarios
        public ActionResult Usuario()
        {
            Razor_Asignasion();
            RazorUsuarios();
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

        //consulta general 
        public void RazorUsuarios()
        {
            User_UsuariosM DatosUsuarios = new User_UsuariosM();
            User_UsuariosM.IDUsuario = new List<long>();
            User_UsuariosM.Nombre = new List<string>();
            User_UsuariosM.APaterno = new List<string>();
            User_UsuariosM.AMaterno = new List<string>();
            User_UsuariosM.NArea = new List<string>();
            User_UsuariosM.RFC = new List<string>();
            User_UsuariosM.NoSS = new List<string>();
            User_UsuariosM.Correo = new List<string>();
            User_UsuariosM.Telefono = new List<long>();
            User_UsuariosM.ContactoEmergencia = new List<long>();
            User_UsuariosM.ContactoNombre = new List<string>();
            User_UsuariosM.ContactoParentesco = new List<string>();
            User_UsuariosM.FIngreso = new List<string>();
            long LVLPerfil = Convert.ToInt64(Session["LVLPerfil"]);
            var DUsuarios = SIGES.User_Usuarios.Where(p => p.LVLPerfil > LVLPerfil && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IDUsuario,
                    p.Nombre,
                    p.APaterno,
                    p.AMaterno,
                    p.NArea,
                    p.RFC,
                    p.NoSS,
                    p.Correo,
                    p.Telefono,
                    p.ContactoEmergencia,
                    p.ContactoNombre,
                    p.ContactoParentesco,
                    FechaIngreso = ((DateTime)p.FIngreso).ToShortDateString(),
                });
            foreach (var DU in DUsuarios)
            {
                User_UsuariosM.IDUsuario.Add(DU.IDUsuario);
                User_UsuariosM.Nombre.Add(DU.Nombre);
                User_UsuariosM.APaterno.Add(DU.APaterno);
                User_UsuariosM.AMaterno.Add(DU.AMaterno);
                User_UsuariosM.NArea.Add(DU.NArea);
                User_UsuariosM.RFC.Add(DU.RFC);
                User_UsuariosM.NoSS.Add(DU.NoSS);
                User_UsuariosM.Correo.Add(DU.Correo);
                if (DU.Telefono != null)
                {
                    User_UsuariosM.Telefono.Add((long)DU.Telefono);
                }
                else
                {
                    User_UsuariosM.Telefono.Add(0);
                }
                if (DU.ContactoEmergencia != null)
                {
                    User_UsuariosM.ContactoEmergencia.Add((long)DU.ContactoEmergencia);
                }
                else
                {
                    User_UsuariosM.ContactoEmergencia.Add(9535300087);
                }
                User_UsuariosM.ContactoNombre.Add(DU.ContactoNombre);
                User_UsuariosM.ContactoParentesco.Add(DU.ContactoParentesco);
                User_UsuariosM.FIngreso.Add(DU.FechaIngreso);
            }
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
                    p.Usuario,
                    p.ContactoNombre,
                    p.ContactoEmergencia,
                    p.ContactoParentesco,
                    Contrasena = Decrypt(p.Contraseña),
                    p.IDArea,
                    p.IDSubArea,
                    FOTOMOSTRAR = Convert.ToBase64String(p.Foto.ToArray()),
                    FechaNaci = ((DateTime)p.FNacimiento).ToShortDateString(),
                    p.RFC,
                    p.NoSS,
                    p.IDPerfil,
                    p.IDAsignacion,
                    p.IDSitio,
                    p.IDEstado,
                    p.IDMunicipio,
                    p.IDLocalidad,
                    p.Correo,
                    p.Telefono
                });
            return Json(InfUsuario, JsonRequestBehavior.AllowGet);
        }
        //USUARIO
        public JsonResult UsuarioINF()
        {
            long IDUsuario = Convert.ToInt64(Session["IDUsuario"]);
            var InfUsuario = SIGES.User_Usuarios.Where(p => p.IDUsuario.Equals(IDUsuario))
                .Select(p => new
                {
                    ID = p.IDUsuario,
                    p.CURP,
                    Nombre = p.Nombre + " " + p.APaterno + " " + p.AMaterno,
                    p.IDArea,
                    p.IDSubArea,
                    FOTOMOSTRAR = Convert.ToBase64String(p.Foto.ToArray()),
                    FechaNaci = ((DateTime)p.FNacimiento).ToShortDateString(),
                    p.RFC,
                    p.NoSS,
                    p.IDPerfil,
                    p.IDAsignacion,
                    p.IDSitio,
                    p.IDEstado,
                    p.IDMunicipio,
                    p.IDLocalidad,
                    p.Correo,
                    p.Telefono
                });
            return Json(InfUsuario, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UsuariosXTienda(long IDTienda)
        {
            var UsuariosSitio = SIGES.User_Usuarios.Where(p => p.IDAsignacion.Equals(1) && p.IDSitio.Equals(IDTienda) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDUsuario,
                    Nombre = p.Nombre + " " + p.APaterno + " " + p.AMaterno
                });
            return Json(UsuariosSitio, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DUsuario(string Usuario, string contrasena)
        {
            string encriptada = Encrypt(contrasena);
            var InfUsuario = SIGES.User_Usuarios.Where(p => p.Usuario.Equals(Usuario) && p.Contraseña.Equals(encriptada))
                .Select(p => new
                {
                    p.IDUsuario,
                    p.LVLPerfil
                });
            return Json(InfUsuario, JsonRequestBehavior.AllowGet);
        }
        //consulta usuario por perfil
        public JsonResult BDUserNivel(long LVLPerfil)
        {
            var datos = SIGES.User_Usuarios.Where(p => p.LVLPerfil.Equals(LVLPerfil) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDUsuario,
                    Nombre = p.Nombre + " " + p.APaterno + " " + p.AMaterno
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta usuario por perfil
        public JsonResult BDUserPerfil(long IDPerfil)
        {
            var datos = SIGES.User_Usuarios.Where(p => p.IDPerfil.Equals(IDPerfil) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDUsuario,
                    p.Nombre,
                    p.APaterno,
                    p.AMaterno
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        public int GuardarUsuario(User_Usuarios DatosUsuario, string cadF)
        {
            int Afectados = 0;
            try
            {
                long idUser = DatosUsuario.IDUsuario;
                string newpass = Encrypt(DatosUsuario.Contraseña);
                if (idUser.Equals(0))
                {
                    int nveces = SIGES.User_Usuarios.Where(p => p.CURP.Equals(DatosUsuario.CURP)).Count();
                    if (nveces == 0)
                    {
                        DatosUsuario.Contraseña = newpass;
                        DatosUsuario.Foto = Convert.FromBase64String(cadF);
                        SIGES.User_Usuarios.InsertOnSubmit(DatosUsuario);
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
                    int nveces = SIGES.User_Usuarios.Where(p => p.CURP.Equals(DatosUsuario.CURP) && p.Nombre.Equals(DatosUsuario.Nombre) &&
                    p.APaterno.Equals(DatosUsuario.APaterno) && p.AMaterno.Equals(DatosUsuario.AMaterno) && p.Foto.Equals(DatosUsuario.Foto) &&
                    p.IDEstado.Equals(DatosUsuario.IDEstado) && p.IDMunicipio.Equals(DatosUsuario.IDMunicipio) && p.IDLocalidad.Equals(DatosUsuario.IDLocalidad) &&
                    p.RFC.Equals(DatosUsuario.RFC) && p.NoSS.Equals(DatosUsuario.NoSS) && p.ContactoNombre.Equals(DatosUsuario.ContactoNombre) &&
                    p.ContactoEmergencia.Equals(DatosUsuario.ContactoEmergencia) && p.ContactoParentesco.Equals(DatosUsuario.ContactoParentesco) &&
                    p.Correo.Equals(DatosUsuario.Correo) && p.Telefono.Equals(DatosUsuario.Telefono) && p.IDPerfil.Equals(DatosUsuario.IDPerfil) &&
                    p.LVLPerfil.Equals(DatosUsuario.LVLPerfil) && p.IDArea.Equals(DatosUsuario.IDArea) && p.IDSubArea.Equals(DatosUsuario.IDSubArea) &&
                    p.IDAsignacion.Equals(DatosUsuario.IDAsignacion) && p.IDSitio.Equals(DatosUsuario.IDSitio) && p.Usuario.Equals(DatosUsuario.Usuario) &&
                    p.Contraseña.Equals(DatosUsuario.Contraseña) && p.CManejador.Equals(DatosUsuario.CManejador) && p.CPlataforma.Equals(DatosUsuario.CPlataforma)).Count();
                    if (nveces == 0)
                    {
                        User_Usuarios obj = SIGES.User_Usuarios.Where(p => p.IDUsuario.Equals(idUser)).First();
                        obj.Nombre = DatosUsuario.Nombre;
                        obj.APaterno = DatosUsuario.APaterno;
                        obj.AMaterno = DatosUsuario.AMaterno;
                        obj.Foto = Convert.FromBase64String(cadF);
                        obj.IDEstado = DatosUsuario.IDEstado;
                        obj.IDMunicipio = DatosUsuario.IDMunicipio;
                        obj.IDLocalidad = DatosUsuario.IDLocalidad;
                        obj.RFC = DatosUsuario.RFC;
                        obj.NoSS = DatosUsuario.NoSS;
                        obj.ContactoNombre = DatosUsuario.ContactoNombre;
                        obj.ContactoEmergencia = DatosUsuario.ContactoEmergencia;
                        obj.ContactoParentesco = DatosUsuario.ContactoParentesco;
                        obj.Correo = DatosUsuario.Correo;
                        obj.Telefono = DatosUsuario.Telefono;
                        obj.IDPerfil = DatosUsuario.IDPerfil;
                        obj.LVLPerfil = DatosUsuario.LVLPerfil;
                        obj.IDArea = DatosUsuario.IDArea;
                        obj.NArea = DatosUsuario.NArea;
                        obj.IDSubArea = DatosUsuario.IDSubArea;
                        obj.NSArea = DatosUsuario.NSArea;
                        obj.IDAsignacion = DatosUsuario.IDAsignacion;
                        obj.IDSitio = DatosUsuario.IDSitio;
                        obj.Usuario = DatosUsuario.Usuario;
                        obj.Contraseña = DatosUsuario.Contraseña;
                        obj.Usuario = DatosUsuario.Usuario;
                        obj.Contraseña = newpass;
                        obj.CManejador = DatosUsuario.CManejador;
                        obj.FManejador = DatosUsuario.FManejador;
                        obj.CPlataforma = DatosUsuario.CPlataforma;
                        obj.FPlataforma = DatosUsuario.FPlataforma;
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
            RazorUsuarios();
            return Afectados;
        }
        //eliminar
        public int EliminarUsuario(long ID)
        {
            int Afectados = 0;
            try
            {
                User_Usuarios usuario = SIGES.User_Usuarios.Where(p => p.IDUsuario.Equals(ID)).First();
                usuario.Estatus = 0;
                SIGES.SubmitChanges();
                Afectados = 1;
            }
            catch (Exception ex)
            {
                Afectados = 0;
            }
            RazorUsuarios();
            return Afectados;
        }

        public JsonResult Asignasion()
        {
            var datos = SIGES.System_Inf_Asignacion.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IDAsignacion,
                    p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        public void Razor_Asignasion()
        {
            System_Asignacion Asignaciones = new System_Asignacion();
            System_Asignacion.IDAsignacion = new List<long>();
            System_Asignacion.Nombre = new List<string>();
            var Asignar = SIGES.System_Inf_Asignacion.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IDAsignacion,
                    p.Nombre
                });
            foreach (var Asg in Asignar)
            {
                System_Asignacion.IDAsignacion.Add(Asg.IDAsignacion);
                System_Asignacion.Nombre.Add(Asg.Nombre);
            }
        }

        //**********************************************************************************************************************************************************************
        public ActionResult AdministrarUsuarios()
        {
            RazorUsuarios();
            Razor_Asignasion();
            return View();
        }
        public JsonResult BDUsuariosNivel()
        {
            long LVLPerfil = Convert.ToInt64(Session["LVLPerfil"]);
            var datos = SIGES.User_Usuarios.Where(p => p.Estatus.Equals(1) && p.LVLPerfil > LVLPerfil)
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
        //*********************************************************************************** Encriptar y desencriptar ***********************************************************************************
        static readonly string password = "P455W0rd";
        public static string Encrypt(string plainText)
        {
            if (plainText == null)
            {
                return null;
            }
            // Get the bytes of the string
            var bytesToBeEncrypted = Encoding.UTF8.GetBytes(plainText);
            var passwordBytes = Encoding.UTF8.GetBytes(password);
            // Hash the password with SHA256
            passwordBytes = SHA512.Create().ComputeHash(passwordBytes);
            var bytesEncrypted = Encrypt(bytesToBeEncrypted, passwordBytes);
            return Convert.ToBase64String(bytesEncrypted);
        }
        public static string Decrypt(string encryptedText)
        {
            if (encryptedText == null)
            {
                return null;
            }
            // Get the bytes of the string
            var bytesToBeDecrypted = Convert.FromBase64String(encryptedText);
            var passwordBytes = Encoding.UTF8.GetBytes(password);
            passwordBytes = SHA512.Create().ComputeHash(passwordBytes);
            var bytesDecrypted = Decrypt(bytesToBeDecrypted, passwordBytes);
            return Encoding.UTF8.GetString(bytesDecrypted);
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
        private static byte[] Decrypt(byte[] bytesToBeDecrypted, byte[] passwordBytes)
        {
            byte[] decryptedBytes = null;
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
                    using (var cs = new CryptoStream(ms, AES.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(bytesToBeDecrypted, 0, bytesToBeDecrypted.Length);
                        cs.Close();
                    }
                    decryptedBytes = ms.ToArray();
                }
            }
            return decryptedBytes;
        }
    }
}