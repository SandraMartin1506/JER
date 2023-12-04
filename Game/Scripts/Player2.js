class Player2 extends Phaser.GameObjects.Group
{
    constructor(scene, weapon, bulletsImg, crosshairImg){
        super({key: "Player2"});
        this.scene = scene;
        this.bulletsImg = bulletsImg;
        this.weapon = weapon;
        this.crosshair = this.scene.add.image(100, 100, crosshairImg).setScale(0.2);
        this.crosshair.depth = 1000;
        this.bullets;
    }

    //Hacer función que gestione que dependiendo del tipo de bala tenga X balas
    InitializeBullets()
    {
        if(this.weapon == "LG")
        {
            this.bullets = new Array(1);
            
        } 
        else if(this.weapon == "F")
        { 
            this.bullets = new Array(3);
        }

        for(var i = 0; i<this.bullets.length; i++)
        {
            this.bullets[i] = this.scene.add.sprite(1434 + (i*20),50, this.bulletsImg) //Aparecen las imágenes una tras otra siguiendo una distancia x+20
        }
    }
    //Si tiene 0 balas se duerme la escena. Luego meter condición de que sean 0 balas y que el jugador1 siga vivo
    CheckLose()
    {
        if(this.bullets.length == 0)
        { 
            this.scene.scene.pause(); //En pause para que se siga viendo la partida para de fondo
            this.scene.scene.pause("InfoMenu");
        }
    }

    UpdatePositionP2(pointer) //Se le pasa directamente el puntero activo
    { 
        this.crosshair.x = pointer.x;
        this.crosshair.y = pointer.y;
        game.canvas.style.cursor = "crosshair"; //A partir de ahora el cursor será una mira (no la nuestra, una por defecto)
    }

    ManageBullets() //Función que hace que se elimine una bala cada vez que se pulsa el botón izquierdo del ratón
    { 
        this.scene.input.on('pointerdown', function(pointer)
        {
            if(pointer.leftButtonDown())
            {
                if(this.bullets.length > 0)
                {
                    const bullet = this.bullets.pop() //Elige la última bala del array 
                    bullet.destroy(); //destruye su sprite
                }
            }
        }.bind(this));
    }
}
