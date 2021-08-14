using System;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web.Mvc;

namespace SIGES.Controllers
{
    public class UsuariosController : Controller
    {
        SIGESDBDataContext SIGES = new SIGESDBDataContext();
        // GET: Usuarios
        public ActionResult Usuario()
        {
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
                    Contrasena = Decrypt(p.Contraseña),
                    p.IDArea,
                    p.IDSubArea,
                    FOTOMOSTRAR = Convert.ToBase64String(p.Foto.ToArray()),
                    FechaNaci = ((DateTime)p.FNacimiento).ToShortDateString(),
                    p.RFC,
                    p.NoSS,
                    p.IDPerfil,
                    p.Asignacion,
                    p.Sitio,
                    p.IDEstado,
                    p.IDMunicipio,
                    p.IDLocalidad,
                    p.Correo,
                    p.Telefono
                });
            return Json(InfUsuario, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DUsuario(string Usuario, string contrasena)
        {
            var InfUsuario = SIGES.User_Usuarios.Where(p => p.Usuario.Equals(Usuario) && p.Contraseña.Equals(contrasena))
                .Select(p => new
                {
                    p.IDUsuario,
                    p.LVLPerfil
                });
            return Json(InfUsuario, JsonRequestBehavior.AllowGet);
        }
        //
        //consulta usuario por perfil
        public JsonResult BDUserPerfil(long LVLPerfil)
        {
            var datos = SIGES.User_Usuarios.Where(p => p.LVLPerfil.Equals(LVLPerfil) && p.Estatus.Equals(1))
                .Select(p => new {
                    p.IDUsuario,
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
                    int nveces = SIGES.User_Usuarios.Where(p => p.CURP.Equals(DatosUsuario.CURP) && p.Nombre.Equals(DatosUsuario.Nombre) && p.APaterno.Equals(DatosUsuario.APaterno) && p.AMaterno.Equals(DatosUsuario.AMaterno) &&
                    p.Foto.Equals(DatosUsuario.Foto) && p.IDEstado.Equals(DatosUsuario.IDEstado) && p.IDMunicipio.Equals(DatosUsuario.IDMunicipio) && p.IDLocalidad.Equals(DatosUsuario.IDLocalidad) &&
                    p.RFC.Equals(DatosUsuario.RFC) && p.NoSS.Equals(DatosUsuario.NoSS) && p.Correo.Equals(DatosUsuario.Correo) && p.Telefono.Equals(DatosUsuario.Telefono) && p.IDPerfil.Equals(DatosUsuario.IDPerfil) &&
                    p.LVLPerfil.Equals(DatosUsuario.LVLPerfil) && p.IDArea.Equals(DatosUsuario.IDArea) && p.IDSubArea.Equals(DatosUsuario.IDSubArea) && p.Asignacion.Equals(DatosUsuario.Asignacion) && p.Sitio.Equals(DatosUsuario.Sitio) &&
                    p.Usuario.Equals(DatosUsuario.Usuario) && p.Contraseña.Equals(DatosUsuario.Contraseña) && p.CManejador.Equals(DatosUsuario.CManejador) && p.CPlataforma.Equals(DatosUsuario.CPlataforma)).Count();
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
                        obj.Correo = DatosUsuario.Correo;
                        obj.Telefono = DatosUsuario.Telefono;
                        obj.IDPerfil = DatosUsuario.IDPerfil;
                        obj.LVLPerfil = DatosUsuario.LVLPerfil;
                        obj.IDArea = DatosUsuario.IDArea;
                        obj.NArea = DatosUsuario.NArea;
                        obj.IDSubArea = DatosUsuario.IDSubArea;
                        obj.NSArea = DatosUsuario.NSArea;
                        obj.Asignacion = DatosUsuario.Asignacion;
                        obj.Sitio = DatosUsuario.Sitio;
                        obj.Usuario = DatosUsuario.Usuario;
                        obj.Contraseña = DatosUsuario.Contraseña;
                        obj.Sitio = DatosUsuario.Sitio;
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
            return Afectados;
        }
        //****** Encriptar y desencriptar
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