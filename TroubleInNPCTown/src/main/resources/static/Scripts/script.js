$(document).ready(function() {
    $("#registerForm").submit(function(event) {
        // Evitar que se envíe el formulario de manera convencional
        event.preventDefault();

        // Obtener los valores del formulario
        var userName = $("#userName").val();
        var password = $("#password").val();

        var userData = {
            name: userName,
            password: password
        };
        
        // Realizar la solicitud AJAX
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/users",  // Cambié la URL para que coincida con la ruta del controlador
            data: JSON.stringify(userData),
            processData: false,
            contentType: 'application/json',
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
