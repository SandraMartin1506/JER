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
            url: "http://localhost:8080/CreateAccount", // La URL de tu endpoint de registro
            data: {
                userName: userName,
                password: password
            },
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

