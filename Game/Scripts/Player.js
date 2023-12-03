class Player extends Phaser.GameObjects.Group
{
    constructor(initialX, initialY, img, scene, spriteSheet)
    {
        super({key: "Player"});
        this.body = scene.add.sprite(initialX, initialY, img); //Imagen del jugador
        this.body.setScale(4); //De momento está así para diferenciarse del resto
        this.CreateAnimations(spriteSheet, scene); //Función que crea las animaciones dado un spriteSheet
        this.direction; //Dirección en la que camina
        this.currentInput; //Input correspondiente a la dirección actual
        this.killed = false; //Si está vivo o no
        //Gestión de clicks para ser eliminado:
        scene.physics.add.existing(this.body);
        scene.physics.world.enable(this.body);
        this.body.setInteractive();
        this.body.on('pointerdown',function(pointer)
        {
            this.killed = true;
            this.body.setVisible(false);
        }.bind(this));
    }

    ManageInput(scene) //Añade al evento keydown la función de detección de direcciones del jugador
    {
        scene.input.keyboard.on('keydown', function (event)
        {
            if(event.key === 'w')
            {
                this.direction = "Arriba";
                this.currentInput = event.key;
                //this.body.anims.play("front_walk");
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
                //this.body.anims.stop();
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

    CreateAnimations(spriteSheet, scene)
    {
        scene.anims.create(
            {
                key: "front_walk",
                frames: scene.anims.generateFrameNumbers(spriteSheet),
                repeat: -1,
                frameRate: 24
            }
        );
    }
}