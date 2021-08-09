$(document).ready(function () {
    $('#TxtContrasena').keyup(function () {
        $('#strengthMessage').html(checkStrength($('#TxtContrasena').val()))
    })
    function checkStrength(password) {
        var strength = 0
        if (password.length < 6) {
            $('#strengthMessage').removeClass()
            $('#strengthMessage').addClass('Short')
            return 'Muy corta'
        }
        if (password.length > 7) strength += 1
        // If password contains both lower and uppercase characters, increase strength value.
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1
        // If it has numbers and characters, increase strength value.
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1
        // If it has one special character, increase strength value.
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
        // If it has two special characters, increase strength value.
        if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
        // Calculated strength value, we can return messages
        // If value is less than 2
        if (strength < 2) {
            $('#strengthMessage').removeClass()
            $('#strengthMessage').addClass('Weak')
            return 'Débil'
        } else if (strength == 2) {
            $('#strengthMessage').removeClass()
            $('#strengthMessage').addClass('Good')
            return 'Buena'
        } else {
            $('#strengthMessage').removeClass()
            $('#strengthMessage').addClass('Strong')
            return 'Fuerte'
        }
    }
    $('#TxtContrasenaConf').keyup(function () {
        $('#warningMessage').html(checkSize($('#TxtContrasenaConf').val(), $('#TxtContrasena').val()))
    })
    function checkSize(size, password) {
        if (size === password) {
            $('#warningMessage').removeClass()
            $('#warningMessage').addClass('Good')
            return 'Contraseña correcta'
        }
        else {
            $('#warningMessage').removeClass()
            $('#warningMessage').addClass('Short')
            return 'Contraseña incorrecta'
        }
    }
});