class Player extends Phaser.GameObjects.Group
{
    constructor(initialX, initialY, img, scene)
    {
        super({key: "Player"});
        this.body = scene.add.image(initialX, initialY, img); //Imagen del jugador
        this.body.setScale(1.5); //De momento está así para diferenciarse del resto
        this.direction; //Dirección en la que camina
        this.currentInput; //Input correspondiente a la dirección actual
        scene.physics.add.existing(this.body);
        this.body.setInteractive();
        this.body.on('pointerdown',function(pointer){
            this.destroy();
        })
    }

    ManageInput(scene) //Añade al evento keydown la función de detección de direcciones del jugador
    {
        scene.input.keyboard.on('keydown', function (event)
        {
            if(event.key === 'w')
            {
                this.direction = "Arriba";
                this.currentInput = event.key;
            }
            else if (event.key === 's')
            {
                this.direction = "Abajo";
                this.currentInput = event.key;
            }
            else if (event.key === 'a')
            {
                this.direction = "Izquierda";
                this.currentInput = event.key;
            }
            else if (event.key === 'd')
            {
                this.direction = "Derecha";
                this.currentInput = event.key;
            }
        }.bind(this));
    }

    StopMovement(scene) //Añade al eveneto keyup la detención de movimiento del jugador
    {
        scene.input.keyboard.on('keyup', function(event)
        {
            if(this.currentInput === event.key) //Sólo se para si la tecla que ha dejado de pulsarse es la que hacia que se moviese
            {
                this.direction = "Quieto";
            }
        }.bind(this))
    }

    UpdatePosition() //Actualiza la posición del jugador
    {
        if (this.direction === 'Arriba' && this.body.y > 0) this.body.y--;
		else if (this.direction === "Abajo" && this.body.y < 900) this.body.y++;
		else if (this.direction === "Izquierda" && this.body.x > 0) this.body.x--;
		else if (this.direction === "Derecha" && this.body.x < 1600) this.body.x++;
    }
}