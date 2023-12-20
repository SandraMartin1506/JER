this.userName = null;
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
                DisplayUserInformation(response.userName);
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
                DisplayUserInformation(response.userName);
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

function DisplayUserInformation(userName)
{
	if(this.userName == null) this.userName = userName;
	document.getElementById("UserInfo").style.display = "block";
	document.getElementById("UserName").innerHTML = this.userName;
	$.ajax({
		method: "GET",
		url: "http://localhost:8080/NumGames/" + this.userName,
		success: function(response) {
            // Manejar la respuesta exitosa
            document.getElementById("NumGames").innerHTML = response;
        },
        error: function(error) {
            // Manejar errores
            console.error("Error al acceder a las partidas", error);
       	}
	});       
}

function Logout()
{
	this.userName = null;
	document.getElementById("UserInfo").style.display = "none";
	document.getElementById("login").style.display = "block";
}

function DeleteAccount()
{
	document.getElementById("Confirmation").style.display = "block";
	document.getElementById("UserInfo").style.display = "none";
}

function Cancel()
{
	document.getElementById("Confirmation").style.display = "none";
	document.getElementById("UserInfo").style.display = "block";
}

function Confirm()
{
	$.ajax({
		method: "DELETE",
		url: "http://localhost:8080/DeleteAccount/" + this.userName,
		success: function(response) {
            Logout();
            document.getElementById("Confirmation").style.display = "none";
            console.log("Cuenta eliminada con éxito", response)
        },
        error: function(error) {
            // Manejar errores
            console.error("Ha sucedido un error inesperado.", error);
       	}
	})
}