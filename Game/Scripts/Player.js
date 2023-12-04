class Player extends Phaser.GameObjects.Group
{
    constructor(initialX, initialY, scene, spriteSheet)
    {
        super({key: "Player"});
        this.body = scene.add.sprite(initialX, initialY, spriteSheet).setScale(0.25); //Imagen del jugador
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
            if(event.key === 'w' && this.currentInput !== 'w') //Con currentInput se hace que sólo se registre una vez la pulsación
            {
                this.direction = "Arriba";
                this.currentInput = event.key;
                this.body.anims.play("back_walk");
            }
            else if (event.key === 's' && this.currentInput !== 's')
            {
                this.direction = "Abajo";
                this.currentInput = event.key;
                this.body.anims.play("front_walk");
            }
            else if (event.key === 'a' && this.currentInput !== 'a')
            {
                this.direction = "Izquierda";
                this.currentInput = event.key;
                this.body.anims.play("left_walk");
            }
            else if (event.key === 'd' && this.currentInput !== 'd')
            {
                this.direction = "Derecha";
                this.currentInput = event.key;
                this.body.anims.play("right_walk");
            };
        }.bind(this));
    }

    StopMovement(scene) //Añade al eveneto keyup la detención de movimiento del jugador
    {
        scene.input.keyboard.on('keyup', function(event)
        {
            if(this.currentInput === event.key) //Sólo se para si la tecla que ha dejado de pulsarse es la que hacia que se moviese
            {
                this.direction = "Quieto";
                if(this.currentInput === 'w') this.body.anims.play("idle_back");
                else if(this.currentInput === 'a') this.body.anims.play("idle_left");
                else if(this.currentInput === 's') this.body.anims.play("idle_front");
                else if(this.currentInput === 'd') this.body.anims.play("idle_right");
                this.currentInput = "Sin input";
            }
        }.bind(this))
    }

    UpdatePosition() //Actualiza la posición del jugador
    {
        if (this.direction === 'Arriba' && this.body.y > 0) this.body.y--;
		else if (this.direction === "Abajo" && this.body.y < 900) this.body.y++;
		else if (this.direction === "Izquierda" && this.body.x > 0) this.body.x--;
		else if (this.direction === "Derecha" && this.body.x < 1600) this.body.x++;
        this.body.depth = this.body.y; //Cuanto más abajo está mayor nivel de profundidad para que se vea por encima de los que están más arriba

    }

    CreateAnimations(spriteSheet, scene)
    {
        scene.anims.create(
            {
                key: "idle_front",
                frames: scene.anims.generateFrameNumbers(spriteSheet, 
                    {
                        frames: [0]
                    }),
                repeat: -1,
                frameRate: 1
            }
        );
        scene.anims.create(
            {
                key: "idle_back",
                frames: scene.anims.generateFrameNumbers(spriteSheet, 
                    {
                        frames: [10]
                    }),
                repeat: -1,
                frameRate: 1
            }
        );
        scene.anims.create(
            {
                key: "idle_left",
                frames: scene.anims.generateFrameNumbers(spriteSheet, 
                    {
                        frames: [15]
                    }),
                repeat: -1,
                frameRate: 1
            }
        );
        scene.anims.create(
            {
                key: "idle_right",
                frames: scene.anims.generateFrameNumbers(spriteSheet, 
                    {
                        frames: [1]
                    }),
                repeat: -1,
                frameRate: 1
            }
        );
        scene.anims.create(
            {
                key: "front_walk",
                frames: scene.anims.generateFrameNumbers(spriteSheet, 
                    {
                        frames: [6, 7, 8, 9, 0]
                    }),
                repeat: -1,
                frameRate: 6
            }
        );
        scene.anims.create(
            {
                key: "back_walk",
                frames: scene.anims.generateFrameNumbers(spriteSheet, 
                    {
                        frames: [11, 12, 13, 14, 10]
                    }),
                repeat: -1,
                frameRate: 6
            }
        );
        scene.anims.create(
            {
                key: "left_walk",
                frames: scene.anims.generateFrameNumbers(spriteSheet, 
                    {
                        frames: [16, 17, 18, 19, 15]
                    }),
                repeat: -1,
                frameRate: 6
            }
        );
        scene.anims.create(
            {
                key: "right_walk",
                frames: scene.anims.generateFrameNumbers(spriteSheet, 
                    {
                        frames: [2, 3, 4, 5, 1]
                    }),
                repeat: -1,
                frameRate: 6
            }
        );
    }
}