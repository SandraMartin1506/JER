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
        this.winp2 = false;
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

    areaShot(){ //Saber si se va a cambiar la mira al final
        var distanceP1 = Phaser.Math.Distance.Between(this.crosshair.x,this.crosshair.y, this.scene.player.body.x,this.scene.player.body.y) //Calcula la distancia entre el jugador y la mira
        this.scene.npcs.forEach((objeto)=>{ //Calcula la distancia por cada npc
            var distanceNPC = Phaser.Math.Distance.Between(this.crosshair.x,this.crosshair.y, objeto.body.x,objeto.body.y)
            if(distanceNPC < 100){ //Si es menor que 100, se vuelve invisible (muere)
                objeto.body.setVisible(false);
                
            }
        })
        if(distanceP1 < 100){ //Si el jugador está en área, entonces muere y por tanto gana la partida
            this.scene.player.body.setVisible(false) 
            this.scene.player.killed = true;
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
                    if(this.weapon = "LG"){
                        this.areaShot();
                    }
                }
            }
        }.bind(this));
    }
}
