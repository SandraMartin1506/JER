var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);
var imgNPC = new Image();
imgNPC.src = "Sprites/Enemy.png";
var npcs;
var player;

//NPCS:
function NPC(initialX, initialY)
{
	this.x = initialX;
	this.y = initialY;
	this.nextX = this.x;
	this.nextY = this.y;
	this.calculatingPosition = false; //Indica si el NPC está parado esperando a calcular su próxima posición
	
	this.CalculateNextPosition = function() //Determina aleatoriamente la próxima posición a la que el NPC se desplazará
	{
		// 0 - arriba; 1 - derecha; 2 - abajo; 3 - izquierda
		var direction = Math.floor(Math.random() * 4)
		//El NPC se mueve una distancia aleatoria de entre 10 y 200 posiciones en la posición determinada
		var distance = Math.floor(Math.random() * (200-10+1) + 10);
		//Se determina la siguiente posición:
		if(direction === 0) this.nextY = this.y - distance; //Hay que recordar que en HTML5 el 0 equivale a la parte superior del canvas
		else if(direction === 1) this.nextX = this.x + distance;
		else if(direction === 2) this.nextY = this.y + distance;
		else if(direction === 3) this.nextX = this.x - distance;
		//Los enemigos ahora han podido salirse de la pantalla si han calculado una posición fuera del canvas.
		//Se invierte su movimiento (si por ejemplo querían salirse hacia arriba caminando 30 pasos ahora caminan 30 pasos hacia abajo)
		if(this.nextX < 0) this.nextX = this.x + distance;
		else if(this.nextX > canvas.clientWidth) this.nextX = this.x - distance;
		else if(this.nextY < 0) this.nextY = this.y + distance;
		else if(this.nextY > canvas.clientHeight) this.nextY = this.y - distance;
		this.calculatingPosition = false;
	}
	
	this.UpdatePosition = function()
	{
		if(this.x < this.nextX) this.x++;
		else if(this.x > this.nextX) this.x--;
		else if(this.y < this.nextY) this.y++;
		else if(this.y > this.nextY) this.y--;
		else //Si el NPC ya ha llegado a su destino se esperará un intervalo aleatorio de tiempo (corto) antes de elegir su nueva ruta
		{
			if(!this.calculatingPosition)
			{
				this.calculatingPosition = true;
				var randomTime = Math.floor(Math.random() * 1500); //Tiempo entre 0 y 1.5 segundos
				setTimeout(this.CalculateNextPosition.bind(this), randomTime);
			}
		}			
	}
	
	this.PaintNPC = function()
	{
		ctx.drawImage(imgNPC, this.x, this.y, 25, 25);
	}
}

//JUGADOR:
function Player(initialX, initialY)
{
	this.x = initialX;
	this.y = initialY;
	this.direction;
	this.currentInput; //Input que está pulsando actualmente el jugador

	this.ManageInput = function(e)
	{
		e.preventDefault(); //Se previene la acción por defecto de la tecla pulsada

		if (e.key === 'w')
		{
			this.direction = "Arriba";
			this.currentInput = e.key;
		}
		else if (e.key === 's')
		{
			this.direction = "Abajo";
			this.currentInput = e.key;
		}
		else if (e.key === 'a')
		{
			this.direction = "Izquierda";
			this.currentInput = e.key;
		}
		else if (e.key === 'd')
		{
			this.direction = "Derecha";
			this.currentInput = e.key;
		}
		
	}

	this.StopMovement = function (e)
	{
		if (this.currentInput === e.key)
		{
			this.direction = "Quieto";
        }
    }

	this.UpdatePosition = function()
	{
		if (this.direction === 'Arriba' && this.y > 0) this.y--;
		else if (this.direction === "Abajo" && this.y < canvas.clientHeight) this.y++;
		else if (this.direction === "Izquierda" && this.x > 0) this.x--;
		else if (this.direction === "Derecha" && this.x < canvas.clientWidth) this.x++;
    }

	this.PaintPlayer = function ()
	{
		ctx.drawImage(imgNPC, this.x, this.y, 50, 50); //De momento usamos la misma foto que para los NPCs de placeholder, pero el doble de grande para saber cuál es
    }
}

imgNPC.onload = function()
{
	var numberNPC = Math.floor(Math.random() * (60-40+1) + 40); //NPCs son un número aleatorio entre 40 y 60 (de momento)
	npcs = new Array(numberNPC);
	InitializeNPCS();
	InitializePlayer();
	document.addEventListener("keydown", player.ManageInput.bind(player))
	document.addEventListener("keyup", player.StopMovement.bind(player))
	requestAnimationFrame(GameLoop);
}

function InitializeNPCS()
{
	for(var i = 0; i < npcs.length; i++)
	{
		var randomX = Math.floor(Math.random() * (1550-50+1) + 50);
		var randomY = Math.floor(Math.random() * (850-50+1) + 50);
		npcs[i] = new NPC(randomX, randomY);
	}
}

function InitializePlayer()
{
	var randomX = Math.floor(Math.random() * (1550 - 50 + 1) + 50);
	var randomY = Math.floor(Math.random() * (850 - 50 + 1) + 50);
	player = new Player(randomX, randomY);
}

function UpdateCharacters()
{
	for(var i = 0; i < npcs.length; i++)
	{
		npcs[i].UpdatePosition();
		npcs[i].PaintNPC();
	}
	if(typeof player.direction !== 'undefined') player.UpdatePosition();
	player.PaintPlayer();
}

function GameLoop()
{
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight); //Se borra el contenido del lienzo para ser repintado
	ctx.fillRect(0, 0, canvas.width, canvas.height); //Se vuelve a poner el fondo
	UpdateCharacters();
	requestAnimationFrame(GameLoop);
}