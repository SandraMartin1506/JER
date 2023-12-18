$(document).ready(function() {
    $("#registerForm").submit(function(event) {
        // Evitar que se envíe el formulario de manera convencional
        event.preventDefault();

        // Obtener los valores del formulario
        var userName = $("#userName").val();
        var password = $("#password").val();

        // Realizar la solicitud AJAX
        $.ajax({
            type: "POST",
            url: "/CreateAccount", 
            data: {
                userName: userName,
                password: password
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(response) {
                // Manejar la respuesta exitosa
                console.log("Usuario registrado:", response);
                // Puedes realizar acciones adicionales aquí si es necesario
            },
            error: function(error) {
                // Manejar errores
                console.error("Error al registrar usuario:", error);
            }
        });
    });
});

