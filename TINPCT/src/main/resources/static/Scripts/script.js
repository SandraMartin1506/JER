$(document).ready(function() {
    $("#createAccountForm").submit(function(event) {
        // Evitar que se envíe el formulario de manera convencional
        event.preventDefault();

        // Obtener los valores del formulario
        var userName = $("#userNamec").val();
        var password = $("#passwordc").val();
		
		
        var userData = {
            name: userName,
            password: password,
        };        
        // Realizar la solicitud AJAX
        $.ajax({
			method: "POST",
			url: "http://localhost:8080/CreateAccount",
			data: JSON.stringify(userData),
			processData: false,
			headers: {"Content-type": "application/json"},
			success: function(response) {
                // Manejar la respuesta exitosa
                console.log("Usuario registrado.", response);
                document.getElementById("incorrectData").style.display = "none";
                document.getElementById("nameTaken").style.display = "none";
                document.getElementById("login").style.display = "none";
                // Puedes realizar acciones adicionales aquí si es necesario
            },
            error: function(error) {
                // Manejar errores
                console.error("Ese nombre de usuario ya está en uso.", error);
                document.getElementById("incorrectData").style.display = "none";
                document.getElementById("nameTaken").style.display = "block";
            }
		});
    });
    
    $("#registerForm").submit(function(event) {
        // Evitar que se envíe el formulario de manera convencional
        event.preventDefault();

        // Obtener los valores del formulario
        var userName = $("#userNamer").val();
        var password = $("#passwordr").val();
		
		
        var userData = {
            name: userName,
            password: password,
        };
        $.ajax({
			method: "POST",
			url: "http://localhost:8080/Login",
			data: JSON.stringify(userData),
			processData: false,
			headers: {"Content-type": "application/json"},
			success: function(response) {
                // Manejar la respuesta exitosa
                console.log("Sesión iniciada correctamente", response);
                document.getElementById("nameTaken").style.display = "none";
                document.getElementById("incorrectData").style.display = "none";
                document.getElementById("login").style.display = "none";
                // Puedes realizar acciones adicionales aquí si es necesario
            },
            error: function(error) {
                // Manejar errores
                console.error("Credenciales incorrectas", error);
                document.getElementById("incorrectData").style.display = "block";
                document.getElementById("nameTaken").style.display = "none";
            }
		})       
    });
});
