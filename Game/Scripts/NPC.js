class NPC extends Phaser.GameObjects.Group
{
    constructor(initialX,initialY,img, scene)
    {
        super({key: "NPC"});
		this.body = scene.add.image(initialX, initialY, img).setScale(3); //Imagen del NPC
        this.nextX = this.body.x; //Próxima posición en x
        this.nextY = this.body.y; //Próxima posición en y
        this.calculatingPosition = false; //Indica si el NPC está quieto calculando cuál va a ser su próxima posición
		//Gestión de clicks para ser eliminados:
		scene.physics.add.existing(this.body);
        this.body.setInteractive();
        this.body.on('pointerdown',function(pointer)
		{
            this.body.setVisible(false);
        }.bind(this));
    }

    CalculateNextPosition() //Calcula la próxima posición del NPC
    {
        // 0 - arriba; 1 - derecha; 2 - abajo; 3 - izquierda
		var direction = Math.floor(Math.random() * 4)
		//El NPC se mueve una distancia aleatoria de entre 10 y 200 posiciones en la posición determinada
		var distance = Math.floor(Math.random() * (200-10+1) + 10);
		//Se determina la siguiente posición:
		if(direction === 0) this.nextY = this.body.y - distance; //Hay que recordar que en HTML5 el 0 equivale a la parte superior del canvas
		else if(direction === 1) this.nextX = this.body.x + distance;
		else if(direction === 2) this.nextY = this.body.y + distance;
		else if(direction === 3) this.nextX = this.body.x - distance;
		//Los enemigos ahora han podido salirse de la pantalla si han calculado una posición fuera del canvas.
		//Se invierte su movimiento (si por ejemplo querían salirse hacia arriba caminando 30 pasos ahora caminan 30 pasos hacia abajo)
		if(this.nextX < 0) this.nextX = this.body.x + distance;
		else if(this.nextX > 1600) this.nextX = this.body.x - distance;
		else if(this.nextY < 0) this.nextY = this.body.y + distance;
		else if(this.nextY > 900) this.nextY = this.body.y - distance;
		this.calculatingPosition = false;
    }

    UpdatePosition() //Actualiza la posición de los enemigos
    {
        if(this.body.x < this.nextX) this.body.x++;
		else if(this.body.x > this.nextX) this.body.x--;
		else if(this.body.y < this.nextY) this.body.y++;
		else if(this.body.y > this.nextY) this.body.y--;
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
}