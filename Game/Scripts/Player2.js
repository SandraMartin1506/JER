class Player2 extends Phaser.GameObjects.Group
{
    constructor(scene, weapon, weaponimg){
        super({key: "Player2"});
        this.scene = scene
        this.bullets;
        this.weaponimg = weaponimg;
        this.weapon = weapon
        this.p2x = 0;
        this.p2y = 0;
        this.gunsight;
        this.mousePosition;
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
        console.log(this.bullets.length)

        for(var i = 0; i<this.bullets.length; i++)
        {
            this.bullets[i] = this.scene.add.sprite(1434 + (i*20),50, this.weaponimg) //Aparecen las imágenes una tras otra siguiendo una distancia x+20
        }
    }
    //Si tiene 0 balas se duerme la escena. Luego meter condición de que sean 0 balas y que el jugador1 siga vivo
    CheckLose()
    {
        if(this.bullets.length == 0)
        { 
            this.scene.scene.pause(); //En pause para que se siga viendo la partida para de fondo
        }
    }

    UpdatePositionP2(pointer) //Se le pasa directamente el puntero activo
    { 
        this.p2x = pointer.x;
        this.p2y = pointer.y;
        //console.log(this.p2x,this.p2y);
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
                console.log(this.bullets.length)
            }
        }.bind(this));
    }
}
