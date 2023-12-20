window.userName = null;
window.numGames = null;
window.numPlayers = null;
$(document).ready(function() {
    RestoreUsers();   
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
                EmptyForms();
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
                EmptyForms();
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

$(window).on('beforeunload', function() {
    $.ajax({
        method: 'GET',
        url: "http://localhost:8080/DecreasePlayers",
        async: false, 
    });
}); 

function EmptyForms()
{
	$("#registerForm")[0].reset();
	$("#createAccountForm")[0].reset();
}

function RestoreUsers()
{
	$.ajax({
		method: "GET",
		url: "http://localhost:8080/LoadUsers",
		success: function(response) {
            // Manejar la respuesta exitosa
            console.log("Usuarios cargados con éxito", response);
        },
        error: function(error) {
            // Manejar errores
            console.error("Fichero no encontrado", error);
       	}
	});   
}

function DisplayUserInformation(userName)
{
	if(window.userName == null) window.userName = userName;
	document.getElementById("UserInfo").style.display = "block";
	document.getElementById("UserName").innerHTML = window.userName;
	$.ajax({
		method: "GET",
		url: "http://localhost:8080/NumGames/" + window.userName,
		success: function(response) {
            // Manejar la respuesta exitosa
            window.numGames = response;
            document.getElementById("NumGames").innerHTML = window.numGames;
        },
        error: function(error) {
            // Manejar errores
            console.error("Error al acceder a las partidas", error);
       	}
	});
	CurrentPlayers();
	setInterval(CurrentPlayers, 10000);     
}

function Logout()
{
	window.userName = null;
	document.getElementById("UserInfo").style.display = "none";
	document.getElementById("login").style.display = "block";
	$.ajax({
        method: 'GET',
        url: "http://localhost:8080/DecreasePlayers",
        async: false, 
    });
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
		url: "http://localhost:8080/DeleteAccount/" + window.userName,
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

function CurrentPlayers()
{
	console.log("Jugadores actualizados");
	$.ajax({
		method: "GET",
		url: "http://localhost:8080/CurrentPlayers",
		success: function(response) {
            // Manejar la respuesta exitosa
            window.numPlayers = response;
            document.getElementById("CurrentPlayers").innerHTML = window.numPlayers;
        },
        error: function(error) {
            // Manejar errores
            console.error("No se puede acceder al número de jugadores", error);
       	}
	});   
}