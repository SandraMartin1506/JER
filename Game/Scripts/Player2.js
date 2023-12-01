class Player2 extends Phaser.GameObjects.Group
{
    constructor(scene){
        super({key: "Player2"});
        this.scene = scene
        //this.bullets = 0;
        //Meter el arma en constructor
        //this.arma = armaElegida
        this.p2x = 0;
        this.p2y = 0;
        this.gunsight;
        this.mousePosition;
    }

    //Hacer función que gestione que dependiendo del tipo de bala tenga X balas
    //Hacer función que gestione que si tiene menos de las balas que vienen dada por el arma (que vaya comprobando el game) mate al pj dos
    

    UpdatePositionP2(pointer) //Se le pasa directamente el puntero activo
    { 
        this.p2x = pointer.x;
        this.p2y = pointer.y;
        //console.log(this.p2x,this.p2y);
    }
}
